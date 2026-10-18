import { test, expect, type Page, type Locator } from '@playwright/test';
import { humanLayerMessages, type HumanMessageId } from '../src/data/humanLayerMessages';

// A route change or adjacent-trigger handoff can leave a just-closed node in
// React's commit queue for one frame. Geometry assertions should target the
// rendered description, never that transient hidden node.
const tooltip = (page: Page) => page.locator('[role="tooltip"]:visible');
const trigger = (page: Page, id: string) => page.locator(`[data-human-tooltip-trigger="${id}"]`);
async function contained(page: Page, reference: Locator) {
  const targetId = await reference.getAttribute('data-human-tooltip-trigger');
  const activeTooltip = targetId
    ? page.locator(`[role="tooltip"]:visible[data-human-tooltip-id="${targetId}"]`)
    : tooltip(page);
  await expect(activeTooltip).toBeVisible();
  await expect.poll(async () => activeTooltip.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const content = el.firstElementChild!.getBoundingClientRect();
    const v = window.visualViewport!;
    return r.left >= v.offsetLeft + 13 && r.top >= v.offsetTop + 13 &&
      r.right <= v.offsetLeft + v.width - 13 && r.bottom <= v.offsetTop + v.height - 13 &&
      content.left >= r.left - 1 && content.right <= r.right + 1 &&
      el.scrollWidth <= el.clientWidth + 1;
  })).toBe(true);
  const a = (await reference.boundingBox())!;
  const b = (await activeTooltip.boundingBox())!;
  expect(a.x >= b.x + b.width || a.x + a.width <= b.x || a.y >= b.y + b.height || a.y + a.height <= b.y).toBe(true);
  await expect(reference).toHaveAttribute('aria-describedby', await activeTooltip.getAttribute('id') as string);
  await expect(activeTooltip.locator('a,button,input,[tabindex]')).toHaveCount(0);
}
async function dismiss(page: Page) {
  await page.keyboard.press('Escape');
  await expect(tooltip(page)).toHaveCount(0);
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.mouse.move(0, 0);
}

test.describe('Desktop integration', () => {
  test.skip(({ isMobile }) => isMobile, 'Touch behavior is tested separately without simulated hover.');
  for (const route of ['/', '/hire', '/projects/trustos', '/projects/pushguard', '/projects/pulseforge-ai', '/projects/loksetu-ai', '/projects/jeeratype', '/projects/wasm-sandbox']) {
    test(`Every mounted action: copy, focus association, hover and bounds ${route}`, async ({ page }) => {
      test.setTimeout(90000);
      await page.goto(route);
      const controls = page.locator('[data-human-tooltip-trigger]');
      expect(await controls.count()).toBeGreaterThan(5);
      for (let index = 0; index < await controls.count(); index++) {
        const control = controls.nth(index);
        if (!await control.isVisible()) continue; // responsive navigation is intentionally hidden
        await control.evaluate(el => el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }));
        await control.focus();
        const id = await control.getAttribute('data-human-tooltip-trigger') as HumanMessageId;
        const message = humanLayerMessages[id];
        await contained(page, control);
        await expect(tooltip(page)).toHaveText(route === '/hire' && message.tone === 'personal' ? message.professionalMessage! : message.defaultMessage);
        if (route === '/hire') await expect(tooltip(page)).not.toHaveAttribute('data-profile', 'personal');
        await dismiss(page);
        await control.hover();
        await contained(page, control);
        await dismiss(page);
      }
      if (route === '/hire') {
        await trigger(page, 'resume').first().focus();
        await page.screenshot({ path: 'test-results/screenshots/hire-desktop.png' });
      }
    });
  }
  test('PORTAL search ref, Escape layering, actions and guestbook authentication labels', async ({ page }) => {
    await page.goto('/');
    await trigger(page, 'portal').click();
    const dialog = page.getByRole('dialog', { name: 'PORTAL OS Interactive Command Center' });
    await expect(dialog).toBeVisible();
    const search = page.getByRole('textbox', { name: 'Search PORTAL commands' });
    await expect(search).toBeFocused();
    await search.fill('resume');
    const resume = trigger(page, 'portal-resume');
    await resume.hover();
    await contained(page, resume);
    await page.keyboard.press('Escape');
    await expect(tooltip(page)).toHaveCount(0);
    await expect(dialog).toBeVisible();
    await search.fill('zzzznotacommand');
    await expect(dialog).toContainText(humanLayerMessages['portal-empty'].defaultMessage);
    await search.fill('');
    await trigger(page, 'guestbook').last().click();
    for (const id of ['note-write', 'auth-github', 'auth-google', 'portal-close']) {
      const control = dialog.locator(`[data-human-tooltip-trigger="${id}"]`).first();
      await control.focus();
      await contained(page, control);
      await expect(tooltip(page)).toHaveText(humanLayerMessages[id as HumanMessageId].defaultMessage);
      await dismiss(page);
    }
    await trigger(page, 'auth-github').first().click();
    await expect(page.getByText('Or sign in via GitHub OAuth redirect')).toBeVisible();
    // No OAuth redirect or real guestbook mutation is performed by this test.
    await page.screenshot({ path: 'test-results/screenshots/margins-auth-desktop.png' });
  });
  test('Hoverable content, adjacent icons, theme state and action integrity', async ({ page }) => {
    await page.goto('/');
    const social = trigger(page, 'social-linkedin');
    await social.hover();
    await contained(page, social);
    await tooltip(page).hover();
    await expect(tooltip(page)).toBeVisible();
    await page.waitForTimeout(250);
    await expect(tooltip(page)).toBeVisible();
    const socialX = trigger(page, 'social-x');
    await socialX.hover();
    await contained(page, socialX);
    await expect(page.locator('[role="tooltip"]:visible[data-human-tooltip-id="social-x"]'))
      .toHaveText(humanLayerMessages['social-x'].defaultMessage);
    await page.screenshot({ path: 'test-results/screenshots/home-desktop.png' });
    await dismiss(page);
    const theme = page.getByRole('button', { name: /Switch to .* mode/ });
    const before = await theme.getAttribute('aria-label');
    await theme.click();
    await expect(theme).not.toHaveAttribute('aria-label', before!);
    await expect(tooltip(page)).toHaveCount(0);
    await theme.hover();
    // Move away and back after click to start a new interaction.
    await page.mouse.move(0, 100); await theme.hover();
    await contained(page, theme);
    await page.screenshot({ path: 'test-results/screenshots/theme-desktop.png' });
  });
});

test.describe('Engine geometry', () => {
  test.skip(({ isMobile }) => isMobile, 'Engine mouse and keyboard fixture runs in desktop project.');
  test('All curated messages fit and remain stable; click handler is preserved', async ({ page }) => {
    await page.goto('/tests/human-layer-fixture.html');
    await page.evaluate(() => document.fonts.ready);
    const control = page.locator('#edge');
    for (const id of Object.keys(humanLayerMessages) as HumanMessageId[]) {
      await page.getByLabel('Message').selectOption(id);
      await control.focus();
      await contained(page, control);
      await expect(tooltip(page)).toHaveText(humanLayerMessages[id].defaultMessage);
      const box = await tooltip(page).boundingBox();
      await page.waitForTimeout(160);
      expect(await tooltip(page).boundingBox()).toEqual(box);
      await dismiss(page);
    }
    await control.click();
    await expect(page.getByLabel('Clicks')).toHaveText('1');
  });
  for (const width of [320, 360, 375, 390, 430, 768]) {
    test(`Four corners, resize and enlarged text at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 720 });
      await page.goto('/tests/human-layer-fixture.html');
      await page.evaluate(() => document.fonts.ready);
      const control = page.locator('#edge');
      for (const [x,y] of [[18,18],[width-105,18],[18,650],[width-105,650]]) {
        await control.evaluate((el, pos) => Object.assign(el.style, { left: `${pos[0]}px`, top: `${pos[1]}px` }), [x,y]);
        await control.focus(); await contained(page, control);
        if (y === 18) await expect(tooltip(page)).not.toHaveAttribute('data-placement', 'top');
        await dismiss(page);
      }
      await control.evaluate(el => Object.assign(el.style, { left: '18px', top: '18px' }));
      await page.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
      await control.focus(); await contained(page, control);
      await page.setViewportSize({ width: width + 60, height: 360 });
      await contained(page, control);
      await page.screenshot({ path: `test-results/screenshots/geometry-${width}.png` });
    });
  }
  test('Nested scroll hides invisible reference and reduced motion removes transforms', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/tests/human-layer-fixture.html');
    const control = page.locator('#nested');
    await control.focus(); await contained(page, control);
    await expect(tooltip(page).locator('.human-tooltip-content')).toHaveCSS('animation-name','none');
    await page.locator('#scroll-box').evaluate(el => el.scrollTop = 30);
    await contained(page, control);
    await page.locator('#scroll-box').evaluate(el => el.scrollTop = 450);
    await expect(tooltip(page)).toBeHidden();
  });
});

test.describe('Touch fallback', () => {
  test.skip(({ isMobile }) => !isMobile, 'Uses real touch emulation.');
  test('Homepage stays within the viewport at every supported touch width', async ({ page }) => {
    for (const width of [320, 360, 375, 390, 430, 768]) {
      await page.setViewportSize({ width, height: 780 });
      await page.goto('/');
      await expect.poll(() => page.evaluate(() => {
        const viewport = window.visualViewport;
        return document.documentElement.scrollWidth <= (viewport?.width ?? window.innerWidth) + 1 &&
          document.body.scrollWidth <= (viewport?.width ?? window.innerWidth) + 1;
      })).toBe(true);
    }
  });
  for (const width of [320, 360, 375, 390, 430, 768]) {
    test(`Single tap navigation and accessible optional sheet at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 780 });
      await page.goto('/');
      await trigger(page, 'explore-work').tap();
      await expect(page).toHaveURL(/#projects/);
      await expect(tooltip(page)).toHaveCount(0);
      await page.goto('/');
      const social = trigger(page, 'social-linkedin');
      const popupPromise = page.waitForEvent('popup');
      await social.tap();
      const popup = await popupPromise; await popup.close();
      await expect(tooltip(page)).toHaveCount(0);
      await expect(social).toHaveAttribute('href', /linkedin\.com/);
      if (width < 640) {
        await page.getByRole('button', { name: 'View social personality jokes' }).tap();
        const sheet = page.getByRole('dialog', { name: 'Social Signals personality' });
        await expect(sheet).toBeVisible();
        await expect(sheet).toContainText(humanLayerMessages['social-linkedin'].defaultMessage);
        await expect(sheet.getByRole('link')).toHaveCount(7);
        await page.screenshot({ path: `test-results/screenshots/social-mobile-${width}.png` });
        await sheet.getByRole('button', { name: 'Close modal' }).tap();
        await expect(sheet).not.toBeVisible();
      }
      await trigger(page, 'portal').tap();
      await expect(page.getByRole('dialog', { name: /PORTAL OS/ })).toBeVisible();
      await page.getByRole('textbox', { name: 'Search PORTAL commands' }).fill('theme');
      await trigger(page, 'portal-theme').tap();
      await expect(tooltip(page)).toHaveCount(0);
      await page.screenshot({ path: `test-results/screenshots/portal-mobile-${width}.png` });
    });
  }
});

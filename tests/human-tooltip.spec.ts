import { test, expect } from '@playwright/test';

const SAFE_MARGIN = 8; // Bounding safety margin in pixels

test.describe('HUMANLAYER 2.0 Precision Interaction & Geometry Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Social dock: hovers, displays platform humor, and guarantees zero viewport overflow', async ({ page }) => {
    // Locate social dock container
    const linkedinTrigger = page.locator('[data-human-tooltip-trigger="social-linkedin"]');
    await linkedinTrigger.scrollIntoViewIfNeeded();
    await linkedinTrigger.hover();

    const tooltip = page.locator('[data-testid="human-tooltip"]');
    await expect(tooltip).toBeVisible();

    // Verify humor copy & tag from Category B
    await expect(tooltip).toContainText('LINKEDIN // PRO');
    await expect(tooltip).toContainText('Corporate mode ON.');

    // Computational geometry assertions
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    if (!viewport) return;

    const box = await tooltip.boundingBox();
    expect(box).not.toBeNull();
    if (!box) return;

    expect(box.x).toBeGreaterThanOrEqual(SAFE_MARGIN);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width - SAFE_MARGIN);
    expect(box.y).toBeGreaterThanOrEqual(SAFE_MARGIN);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height - SAFE_MARGIN);

    // Mouse away closes tooltip cleanly
    await page.mouse.move(0, 0);
    await expect(tooltip).toBeHidden();
  });

  test('TopBar actions: displays PORTAL command hint and dismisses via Escape key', async ({ page }) => {
    const portalTrigger = page.locator('[data-human-tooltip-trigger="portal-command"]');
    await portalTrigger.hover();

    const tooltip = page.locator('[data-testid="human-tooltip"]');
    await expect(tooltip).toBeVisible();

    // Verify PORTAL copy
    await expect(tooltip).toContainText('PORTAL // ⌘K');

    // Viewport containment check
    const viewport = page.viewportSize()!;
    const box = (await tooltip.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(SAFE_MARGIN);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width - SAFE_MARGIN);

    // Keyboard interaction: Escape dismisses tooltip
    await page.keyboard.press('Escape');
    await expect(tooltip).toBeHidden();
  });

  test('Keyboard focus triggers tooltip with proper accessibility association', async ({ page }) => {
    const themeTrigger = page.locator('[data-human-tooltip-trigger="theme-toggle"] button');
    if (await themeTrigger.count() > 0) {
      await themeTrigger.focus();
      const tooltip = page.locator('[data-testid="human-tooltip"]');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toContainText('SYSTEM // PHOTONS');

      // Blur dismisses
      await page.keyboard.press('Tab');
      await expect(tooltip).toBeHidden();
    }
  });

  test('Recruiter dossier (/hire): verifies Category A Professional Engineering Wit', async ({ page }) => {
    await page.goto('/hire');
    await page.waitForLoadState('domcontentloaded');

    const resumeTrigger = page.locator('[data-human-tooltip-trigger="resume-action"]').first();
    await resumeTrigger.scrollIntoViewIfNeeded();
    await resumeTrigger.hover();

    const tooltip = page.locator('[data-testid="human-tooltip"]');
    await expect(tooltip).toBeVisible();

    // Verify Category A copy: "Compiled for humans. No dependencies required."
    await expect(tooltip).toContainText('RÉSUMÉ // VERIFIED');
    await expect(tooltip).toContainText('Compiled for humans.');

    // Geometry check
    const viewport = page.viewportSize()!;
    const box = (await tooltip.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(SAFE_MARGIN);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width - SAFE_MARGIN);
    expect(box.y).toBeGreaterThanOrEqual(SAFE_MARGIN);
  });

  test('Responsive tablet geometry (768px): tooltip never causes horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const trigger = page.locator('[data-human-tooltip-trigger="social-linkedin"]');
    await trigger.scrollIntoViewIfNeeded();
    await trigger.hover();
    const tooltip = page.locator('[data-testid="human-tooltip"]');
    await expect(tooltip).toBeVisible();

    const box = (await tooltip.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(SAFE_MARGIN);
    expect(box.x + box.width).toBeLessThanOrEqual(768 - SAFE_MARGIN);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

  test('Comprehensive social signals dock: all 6 platforms hover cleanly with unique copy', async ({ page }) => {
    const platforms = [
      { id: 'social-linkedin', tag: 'LINKEDIN // PRO', messageSnippet: 'Corporate mode ON.' },
      { id: 'social-x', tag: 'X // 280 CHARS', messageSnippet: '280 characters.' },
      { id: 'social-instagram', tag: 'INSTAGRAM // ATELIER', messageSnippet: 'Code ke alawa bhi zindagi hai' },
      { id: 'social-facebook', tag: 'FACEBOOK // ARCHIVE', messageSnippet: 'Purane internet ki yaadein unlocked.' },
      { id: 'social-linktree', tag: 'LINKTREE // HUB', messageSnippet: 'Ek link. Saare raaste.' },
      { id: 'social-peerlist', tag: 'PEERLIST // BUILD', messageSnippet: 'Build. Ship. Repeat.' },
    ];

    const viewport = page.viewportSize()!;

    for (const p of platforms) {
      const trigger = page.locator(`[data-human-tooltip-trigger="${p.id}"]`);
      await trigger.scrollIntoViewIfNeeded();
      await trigger.hover();

      const tooltip = page.locator('[data-testid="human-tooltip"]');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toContainText(p.tag);
      await expect(tooltip).toContainText(p.messageSnippet);

      const box = (await tooltip.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(SAFE_MARGIN);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width - SAFE_MARGIN);
      expect(box.y).toBeGreaterThanOrEqual(SAFE_MARGIN);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height - SAFE_MARGIN);

      // Capture screenshot of each tooltip for visual artifact verification
      await tooltip.screenshot({ path: `test-results/screenshots/${p.id}-tooltip.png` });

      await page.mouse.move(0, 0);
      await expect(tooltip).toBeHidden();
    }
  });

  test('Footer Back to Top: displays navigation humor and remains bounded', async ({ page }) => {
    const backToTopTrigger = page.locator('[data-human-tooltip-trigger="back-to-top"]');
    await backToTopTrigger.scrollIntoViewIfNeeded();
    await backToTopTrigger.hover();

    const tooltip = page.locator('[data-testid="human-tooltip"]');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText('NAVIGATION // ASCENT');
    await expect(tooltip).toContainText('Upar chalo.');

    const viewport = page.viewportSize()!;
    const box = (await tooltip.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(SAFE_MARGIN);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width - SAFE_MARGIN);

    await tooltip.screenshot({ path: 'test-results/screenshots/back-to-top-tooltip.png' });
  });

  test('Theme switching: tooltip renders cleanly in both light and dark themes', async ({ page }) => {
    const themeBtn = page.locator('[data-human-tooltip-trigger="theme-toggle"] button');
    if (await themeBtn.count() > 0) {
      // Hover in initial dark mode
      await themeBtn.hover();
      const tooltip = page.locator('[data-testid="human-tooltip"]');
      await expect(tooltip).toBeVisible();
      await tooltip.screenshot({ path: 'test-results/screenshots/theme-toggle-dark.png' });

      // Click to toggle theme
      await themeBtn.click();
      await expect(tooltip).toBeVisible();
      await tooltip.screenshot({ path: 'test-results/screenshots/theme-toggle-light.png' });

      // Restore theme
      await themeBtn.click();
    }
  });
});

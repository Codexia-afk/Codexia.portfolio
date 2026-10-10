import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = "Srinjoy Pramanick — Portfolio v2.0 | AI Engineer & Systems Builder";
const DEFAULT_DESC = "Srinjoy Pramanick is an AI Engineer, ML Engineer, and Full-Stack Developer building intelligent applications, AI agents, and experimental systems.";
const DEFAULT_CANONICAL = "https://codexia-portfolio.vercel.app/";
const DEFAULT_OG_IMAGE = "https://codexia-portfolio.vercel.app/og-image.png";

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  keywords,
  canonical = DEFAULT_CANONICAL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/meta\[name="(.*?)"\]/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/meta\[property="(.*?)"\]/)?.[1];
          if (prop) el.setAttribute('property', prop);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // 3. Update Standard & Social Meta
    setMeta('meta[name="description"]', 'content', description);
    if (keywords) {
      setMeta('meta[name="keywords"]', 'content', keywords);
    }
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // 4. Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    // 5. Update or Inject JSON-LD Schema
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonical, ogImage, ogType, jsonLd]);

  return null;
};

export default SEO;

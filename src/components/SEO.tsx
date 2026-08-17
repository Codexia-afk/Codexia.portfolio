import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object | object[];
}

const DEFAULT_TITLE = "Srinjoy Pramanick — AI Engineer & ML Engineer | Full-Stack Developer";
const DEFAULT_DESCRIPTION = "Srinjoy Pramanick is an AI Engineer, ML Engineer, and Full-Stack Developer building intelligent applications, AI agents, and experimental systems. Explore projects including TrustOS, PulseForge AI, Loksetu.ai, and JeeraType.";
const DEFAULT_KEYWORDS = "Srinjoy Pramanick, Srinjoy Pramanick AI Engineer, Srinjoy Pramanick ML Engineer, Srinjoy Pramanick portfolio, Srinjoy Pramanick GitHub, Srinjoy Pramanick developer, AI Engineer, ML Engineer, Full-Stack Developer, TrustOS, PulseForge AI, Loksetu.ai, JeeraType";
const DEFAULT_CANONICAL = "https://codexia-portfolio.vercel.app/";
const DEFAULT_OG_IMAGE = "https://codexia-portfolio.vercel.app/og-image.png";

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical = DEFAULT_CANONICAL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper for updating or creating meta tags
    const updateMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Metadata
    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    updateMeta('meta[name="author"]', 'name', 'author', 'Srinjoy Pramanick');

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // 4. Open Graph Tags
    updateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    updateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Srinjoy Pramanick Portfolio');

    // 5. Twitter Card Tags
    updateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. Inject JSON-LD
    if (jsonLd) {
      let script = document.querySelector('script[id="json-ld-schema"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, keywords, canonical, ogImage, ogType, jsonLd]);

  return null;
};

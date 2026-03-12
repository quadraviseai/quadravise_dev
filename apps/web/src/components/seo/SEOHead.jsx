import { useEffect } from "react";

import { seoDefaults } from "../../constants/seo";

function trimText(text, max) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

function setMetaTag(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value == null || value === "") {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, value);
    }
  });
}

function setLinkTag(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value == null || value === "") {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, value);
    }
  });
}

function setJsonLd(schema) {
  const scriptId = "quadravise-seo-schema";
  let element = document.head.querySelector(`#${scriptId}`);

  if (!schema) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.id = scriptId;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
}

function SEOHead({
  title,
  description,
  keywords,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema
}) {
  useEffect(() => {
    const pageTitle = trimText(title || seoDefaults.title, 60);
    const pageDescription = trimText(description || seoDefaults.description, 160);
    const pageKeywords = keywords || seoDefaults.keywords;
    const pageCanonical = canonical || seoDefaults.canonical;
    const pageOgImage = ogImage || seoDefaults.ogImage;

    document.title = pageTitle;

    setMetaTag('meta[name="description"]', { name: "description", content: pageDescription });
    setMetaTag('meta[name="keywords"]', { name: "keywords", content: pageKeywords });

    const robotsSelector = 'meta[name="robots"]';
    if (robots) {
      setMetaTag(robotsSelector, { name: "robots", content: robots });
    } else {
      document.head.querySelector(robotsSelector)?.remove();
    }

    setLinkTag('link[rel="canonical"]', { rel: "canonical", href: pageCanonical });
    setLinkTag('link[rel="icon"][href="/logo.png"]', { rel: "icon", href: "/logo.png", type: "image/png" });

    setMetaTag('meta[property="og:title"]', { property: "og:title", content: ogTitle || pageTitle });
    setMetaTag('meta[property="og:description"]', { property: "og:description", content: ogDescription || pageDescription });
    setMetaTag('meta[property="og:image"]', { property: "og:image", content: pageOgImage });
    setMetaTag('meta[property="og:url"]', { property: "og:url", content: pageCanonical });
    setMetaTag('meta[property="og:type"]', { property: "og:type", content: "website" });

    setMetaTag('meta[name="twitter:card"]', { name: "twitter:card", content: seoDefaults.twitterCard });
    setMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: twitterTitle || ogTitle || pageTitle });
    setMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: twitterDescription || ogDescription || pageDescription
    });
    setMetaTag('meta[name="twitter:image"]', { name: "twitter:image", content: twitterImage || pageOgImage });

    setJsonLd(schema);
  }, [
    canonical,
    description,
    keywords,
    ogDescription,
    ogImage,
    ogTitle,
    robots,
    schema,
    title,
    twitterDescription,
    twitterImage,
    twitterTitle
  ]);

  return null;
}

export default SEOHead;

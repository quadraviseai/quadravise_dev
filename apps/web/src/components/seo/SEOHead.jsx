import { Helmet } from "react-helmet-async";

import { seoDefaults } from "../../constants/seo";

function trimText(text, max) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  schema
}) {
  const pageTitle = trimText(title || seoDefaults.title, 60);
  const pageDescription = trimText(description || seoDefaults.description, 160);
  const pageKeywords = keywords || seoDefaults.keywords;
  const pageCanonical = canonical || seoDefaults.canonical;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={pageCanonical} />
      <meta property="og:title" content={ogTitle || pageTitle} />
      <meta property="og:description" content={ogDescription || pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageCanonical} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  );
}

export default SEOHead;

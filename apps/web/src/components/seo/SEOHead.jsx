import { Helmet } from "react-helmet-async";

import { seoDefaults } from "../../constants/seo";

function trimText(text, max) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
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
  const pageTitle = trimText(title || seoDefaults.title, 60);
  const pageDescription = trimText(description || seoDefaults.description, 160);
  const pageKeywords = keywords || seoDefaults.keywords;
  const pageCanonical = canonical || seoDefaults.canonical;
  const pageOgImage = ogImage || seoDefaults.ogImage;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      {robots ? <meta name="robots" content={robots} /> : null}
      <link rel="canonical" href={pageCanonical} />
      <link rel="icon" href="/logo.png" type="image/png" />
      <meta property="og:title" content={ogTitle || pageTitle} />
      <meta property="og:description" content={ogDescription || pageDescription} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content={seoDefaults.twitterCard} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || pageTitle} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || pageDescription} />
      <meta name="twitter:image" content={twitterImage || pageOgImage} />
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  );
}

export default SEOHead;

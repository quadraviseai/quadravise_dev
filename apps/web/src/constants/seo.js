const siteUrl = import.meta.env.VITE_SITE_URL || "https://quadravise.com";

export const seoDefaults = {
  title: "Quadravise | Home",
  description:
    "Quadravise helps startups and businesses build websites, mobile apps, and scalable SaaS products.",
  keywords:
    "website development company,mobile app development company,saas development company,startup mvp development",
  canonical: siteUrl
};

export const pageSeo = {
  home: {
    title: "Quadravise | Home",
    description:
      "Quadravise helps startups and businesses build powerful websites, mobile applications, and SaaS products with scalable modern architecture.",
    canonical: `${siteUrl}/`
  },
  services: {
    title: "Quadravise | Services",
    description:
      "Explore website, mobile app, custom software, SaaS, and startup MVP development services.",
    canonical: `${siteUrl}/services`
  },
  blog: {
    title: "Quadravise | Blog",
    description:
      "Read practical guides on SaaS, startup technology, website development, mobile apps, and AI.",
    canonical: `${siteUrl}/blog`
  }
};

const siteUrl = import.meta.env.VITE_SITE_URL || "https://quadravise.com";
const defaultOgImage = `${siteUrl}/logo.png`;

export const seoDefaults = {
  title: "Quadravise | Software Development Company",
  description:
    "Quadravise is a software development company providing web development, mobile app development, and custom software solutions.",
  keywords:
    "software development company, web development company, mobile app development, custom software development, quadravise",
  canonical: `${siteUrl}/`,
  ogImage: defaultOgImage,
  twitterCard: "summary_large_image"
};

export const pageSeo = {
  home: {
    title: "Quadravise | Software Development Company",
    description:
      "Quadravise is a software development company providing web development, mobile app development, and custom software solutions for startups and businesses.",
    canonical: `${siteUrl}/`
  },
  services: {
    title: "Quadravise | Software Development Services",
    description:
      "Explore Quadravise services across web development, mobile app development, SaaS engineering, and custom software delivery.",
    canonical: `${siteUrl}/services`
  },
  products: {
    title: "Quadravise | Software Products",
    description:
      "Explore Quadravise products, AI-powered platforms, and scalable software solutions built for startups and growing businesses.",
    canonical: `${siteUrl}/products`
  },
  quadraILearn: {
    title: "QuadraiLearn | AI Learning Platform",
    description:
      "Discover QuadraiLearn, the AI-powered learning platform from Quadravise built for structured education and measurable progress.",
    canonical: `${siteUrl}/products/quadra-ilearn`
  },
  portfolio: {
    title: "Quadravise | Software Development Portfolio",
    description:
      "View the Quadravise portfolio featuring web apps, SaaS products, mobile experiences, and custom software delivery outcomes.",
    canonical: `${siteUrl}/portfolio`
  },
  blog: {
    title: "Quadravise | Software Development Blog",
    description:
      "Read Quadravise insights on software development, SaaS, mobile apps, web engineering, AI, and product strategy.",
    canonical: `${siteUrl}/blog`
  },
  about: {
    title: "About Quadravise | Software Company",
    description:
      "Learn about Quadravise, our product mindset, engineering approach, and how we help businesses build scalable software.",
    canonical: `${siteUrl}/about`
  },
  contact: {
    title: "Contact Quadravise | Start Your Project",
    description:
      "Contact Quadravise to discuss web development, mobile app development, SaaS platforms, and custom software projects.",
    canonical: `${siteUrl}/contact`
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Quadravise",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: ["https://www.linkedin.com/company/quadravise"]
};

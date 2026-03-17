export const siteUrl = (import.meta.env.VITE_SITE_URL || "https://quadravise.com").replace(/\/+$/, "");
const defaultOgImage = `${siteUrl}/logo.png`;
const coreKeywords = [
  "software development company",
  "web development company",
  "mobile app development company",
  "custom software development company",
  "SaaS development company",
  "software development for startups",
  "MVP development company",
  "startup app development company",
  "startup product development company",
  "SaaS product development company",
  "custom web application development",
  "web application development services",
  "enterprise software development company",
  "React development company",
  "Node.js development company",
  "full stack development company",
  "hire mobile app developers",
  "hire web developers",
  "software development outsourcing company",
  "build SaaS platform development company"
];

const joinKeywords = (...groups) => [...new Set(groups.flat())].join(", ");

export const seoDefaults = {
  title: "Quadravise | Software Development Company",
  description:
    "Quadravise is a software development company providing web development, mobile app development, and custom software solutions.",
  keywords: joinKeywords(coreKeywords, ["quadravise"]),
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
  quadraILearnSurvey: {
    title: "QuadraiLearn Survey | Quadravise",
    description:
      "Submit feedback about QuadraiLearn through the official survey form from Quadravise.",
    canonical: `${siteUrl}/products/quadra-ilearn/survey`
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
  },
  privacyPolicy: {
    title: "Privacy Policy | Quadravise",
    description:
      "Read the Quadravise privacy policy to understand what data is collected, how it is used, and how analytics consent works.",
    canonical: `${siteUrl}/privacy-policy`
  },
  cookiePolicy: {
    title: "Cookie Policy | Quadravise",
    description:
      "Read the Quadravise cookie policy to understand the cookies used on the website, their purpose, and how to manage consent.",
    canonical: `${siteUrl}/cookie-policy`
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

export const seoKeywords = {
  default: seoDefaults.keywords,
  home: joinKeywords(coreKeywords, ["quadravise"]),
  services: joinKeywords(coreKeywords, [
    "software development services",
    "web development services",
    "mobile app development services",
    "custom software development"
  ]),
  serviceDetail: joinKeywords(coreKeywords, [
    "software development service",
    "web development service",
    "mobile app development",
    "custom software service"
  ]),
  products: joinKeywords(coreKeywords, [
    "software products",
    "SaaS products",
    "startup software solutions",
    "SaaS product development company"
  ]),
  quadraILearn: joinKeywords(coreKeywords, [
    "QuadraiLearn",
    "AI learning platform",
    "edtech software",
    "digital learning platform"
  ]),
  quadraILearnSurvey: joinKeywords(coreKeywords, [
    "QuadraiLearn survey",
    "QuadraiLearn feedback",
    "education software feedback form"
  ]),
  portfolio: joinKeywords(coreKeywords, [
    "software development portfolio",
    "web app portfolio",
    "mobile app portfolio",
    "SaaS case studies"
  ]),
  blog: joinKeywords(coreKeywords, [
    "software development blog",
    "SaaS blog",
    "mobile app development insights",
    "web development articles"
  ]),
  blogDetail: joinKeywords(coreKeywords, [
    "software development blog",
    "quadravise blog",
    "web development insights"
  ]),
  about: joinKeywords(coreKeywords, [
    "about quadravise",
    "software company",
    "product engineering company",
    "custom software team"
  ]),
  contact: joinKeywords(coreKeywords, [
    "contact quadravise",
    "software project consultation",
    "web development company contact"
  ])
};

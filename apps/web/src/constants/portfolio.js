import { ROUTES } from "./routes";

export const staticPortfolioProjects = [
  {
    id: "website-audit-tool",
    title: "Website Audit Tool",
    category: "Lead Generation Tool",
    shortSummary:
      "Lightweight audit product built to explain SEO, performance, and technical issues in a simple way for business owners.",
    techStack: ["SEO Insights", "Performance Analysis", "Lead Funnel"],
    outcome: "Turned a free utility into a strategic acquisition and conversion asset.",
    route: ROUTES.CASE_STUDY_WEBSITE_AUDIT,
    projectBadge: "Featured Case Study",
    isFeatured: true,
    projectType: "Growth Product",
    sortOrder: 1
  }
];

export const staticHomepagePortfolioProjects = staticPortfolioProjects.slice(0, 3);

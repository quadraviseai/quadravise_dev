import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin, Tag, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { useHomepagePortfolio } from "../../hooks/usePortfolio";
import EmptyState from "../common/EmptyState";
import ErrorState from "../common/ErrorState";
import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";

const demoProjects = [
  {
    id: "demo-1",
    category: "SaaS Platform",
    title: "Startup SaaS Platform",
    slug: "startup-saas-platform",
    description: "Subscription-based platform for workflow automation and client onboarding.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    outcome: "Reduced operational turnaround time by 60%"
  },
  {
    id: "demo-2",
    category: "Business Website",
    title: "Corporate Business Website",
    slug: "corporate-business-website",
    description: "SEO-focused business website with lead capture and service conversion flows.",
    techStack: ["React", "Ant Design", "Express"],
    outcome: "Improved qualified lead conversion by 38%"
  },
  {
    id: "demo-3",
    category: "Education Platform",
    title: "Education Platform",
    slug: "education-platform",
    description: "Learning platform with structured modules, tests, and performance analytics.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    outcome: "Increased learner engagement by 42%"
  }
];

function getCategory(project) {
  if (project.category) return project.category;
  if (project.title?.toLowerCase().includes("saas")) return "SaaS Platform";
  if (project.title?.toLowerCase().includes("education")) return "Education Platform";
  return "Business Website";
}

function getCategoryTone(category) {
  if (category.includes("SaaS")) return "blue";
  if (category.includes("Education")) return "green";
  return "orange";
}

function getOutcomeMetric(outcome = "") {
  const match = outcome.match(/\d+%/);
  return match ? match[0] : "";
}

function PortfolioPreviewSection() {
  const { data, isLoading, isError, refetch } = useHomepagePortfolio();
  const sourceProjects = (data?.data && data.data.length ? data.data : demoProjects) || [];
  const projects = sourceProjects
    .slice()
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999) || Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)))
    .slice(0, 3);

  return (
    <section className="section portfolio-preview-section">
      <div className="section-inner">
        <div className="portfolio-section-top">
          <SectionHeader title="Featured Project Previews" subtitle="Real outcomes across startup SaaS, business platforms, and education products." />
        </div>
        {isLoading ? <Spin /> : null}
        {isError ? <ErrorState onRetry={refetch} /> : null}
        {!isLoading && !isError && !projects.length ? <EmptyState message="No portfolio items available." /> : null}
        <Row gutter={[20, 20]} className="portfolio-preview-carousel">
          {projects.map((project, index) => {
            const category = getCategory(project);
            const tone = getCategoryTone(category);
            return (
              <Col key={project.slug || project.id} xs={24} md={12} lg={8} className="portfolio-preview-slide">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <article className="case-study-card">
                    <Tag className={`case-study-badge case-study-badge-${tone}`}>{project.projectBadge || category}</Tag>
                    <h3 className="case-study-title">{project.title}</h3>
                    <Typography.Paragraph className="case-study-description">
                      {project.shortSummary || project.description}
                    </Typography.Paragraph>
                    <div className="case-study-stack">
                      {project.techStack?.map((tech) => (
                        <Tag key={tech} className="case-study-chip">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                    <div className={`case-study-outcome case-study-outcome-${tone}`}>
                      <span className="case-study-outcome-label">Outcome</span>
                      <p>
                        {project.outcome}{" "}
                        {getOutcomeMetric(project.outcome) ? (
                          <strong className="case-study-metric">{getOutcomeMetric(project.outcome)}</strong>
                        ) : null}
                      </p>
                    </div>
                    <Link className="case-study-cta" to={project.slug ? `${ROUTES.PORTFOLIO}/${project.slug}` : ROUTES.PORTFOLIO}>
                      View Case Study <ArrowRightOutlined />
                    </Link>
                  </article>
                </motion.div>
              </Col>
            );
          })}
        </Row>
        <Button type="primary" className="hero-btn hero-btn-primary portfolio-section-cta">
          <Link to={ROUTES.PORTFOLIO}>View All Projects</Link>
        </Button>
      </div>
    </section>
  );
}

export default PortfolioPreviewSection;

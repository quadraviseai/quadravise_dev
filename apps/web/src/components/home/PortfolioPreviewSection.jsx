import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tag, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { staticHomepagePortfolioProjects } from "../../constants/portfolio";
import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";

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
  const projects = staticHomepagePortfolioProjects
    .slice()
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999) || Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)))
    .slice(0, 3);

  return (
    <section className="section portfolio-preview-section">
      <div className="section-inner">
        <div className="portfolio-section-top">
          <SectionHeader title="Featured Project Previews" subtitle="Real outcomes across startup SaaS, business platforms, and education products." />
        </div>
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
                    <Link
                      className="case-study-cta"
                      to={project.route || ROUTES.PORTFOLIO}
                    >
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

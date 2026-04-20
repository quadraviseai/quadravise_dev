import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import PortfolioCard from "../components/portfolio/PortfolioCard";
import SEOHead from "../components/seo/SEOHead";
import { staticPortfolioProjects } from "../constants/portfolio";
import { ROUTES } from "../constants/routes";
import { pageSeo, seoKeywords } from "../constants/seo";

function PortfolioPage() {
  const projects = staticPortfolioProjects;

  return (
    <>
      <SEOHead
        title={pageSeo.portfolio.title}
        description={pageSeo.portfolio.description}
        keywords={seoKeywords.portfolio}
        canonical={pageSeo.portfolio.canonical}
      />
      <section className="section portfolio-page-hero-section">
        <div className="section-inner">
          <Row gutter={[32, 32]} align="middle" className="page-hero-layout">
            <Col xs={24} lg={13}>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography.Title className="portfolio-page-hero-title">
                  Featured Digital
                  <br />
                  Product Outcomes
                </Typography.Title>
                <Typography.Paragraph className="portfolio-page-hero-description">
                  Selected project highlights across SaaS platforms, business websites, and product engineering
                  engagements.
                </Typography.Paragraph>
                <div className="page-hero-points">
                  <span>
                    <CheckCircleFilled />
                    SaaS and platform engineering delivery
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Measurable business-focused outcomes
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Scalable architecture implementation
                  </span>
                </div>
                <Space size={14} wrap style={{ marginTop: 20 }}>
                  <Button type="primary" className="hero-btn hero-btn-primary" href="#portfolio-grid">
                    View Projects
                  </Button>
                  <Button className="hero-btn hero-btn-secondary">
                    <Link to={ROUTES.CONTACT}>Start Your Project</Link>
                  </Button>
                </Space>
              </motion.div>
            </Col>
            <Col xs={24} lg={11}>
              <motion.div
                className="page-hero-preview-panel"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                <div className="page-hero-preview-head">
                  <strong>Portfolio Snapshot</strong>
                </div>
                <div className="page-hero-preview-metrics">
                  <div>
                    <strong>{projects.length}</strong>
                    <span>Projects Delivered</span>
                  </div>
                  <div>
                    <strong>3</strong>
                    <span>Industries Supported</span>
                  </div>
                  <div>
                    <strong>React</strong>
                    <span>Modern Frontend Stack</span>
                  </div>
                  <div>
                    <strong>Node</strong>
                    <span>Scalable Backend Delivery</span>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="section portfolio-page-grid-section">
        <div className="section-inner" id="portfolio-grid">
          <div className="portfolio-page-featured-case-study">
            <div className="portfolio-page-featured-copy">
              <span className="portfolio-page-featured-eyebrow">Featured Case Study</span>
              <Typography.Title level={2}>Website Audit Tool That Turns Traffic Into Leads</Typography.Title>
              <Typography.Paragraph>
                See how Quadravise built a lightweight audit experience on Nexaburst that simplifies SEO and website
                performance data, then turns that insight into a natural lead-generation funnel.
              </Typography.Paragraph>
              <div className="page-hero-points">
                <span>
                  <CheckCircleFilled />
                  Beginner-friendly website audit experience
                </span>
                <span>
                  <CheckCircleFilled />
                  Built for conversion, not raw data overload
                </span>
              </div>
              <Space size={14} wrap style={{ marginTop: 20 }}>
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.CASE_STUDY_WEBSITE_AUDIT}>Read Case Study</Link>
                </Button>
              </Space>
            </div>
            <div className="portfolio-page-featured-panel">
              <div>
                <strong>Nexaburst</strong>
                <span>Hosted Platform</span>
              </div>
              <div>
                <strong>Instant</strong>
                <span>Audit Delivery</span>
              </div>
              <div>
                <strong>SEO + Tech</strong>
                <span>Insight Coverage</span>
              </div>
              <div>
                <strong>Lead Gen</strong>
                <span>Business Outcome</span>
              </div>
            </div>
          </div>
          <Row gutter={[20, 20]}>
            {projects.map((project) => (
              <Col key={project.id || project.title} xs={24} md={12} lg={8}>
                <PortfolioCard project={project} />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </>
  );
}

export default PortfolioPage;

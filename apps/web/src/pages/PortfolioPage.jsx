import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Row, Space, Spin, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import PortfolioCard from "../components/portfolio/PortfolioCard";
import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { pageSeo } from "../constants/seo";
import { usePortfolio } from "../hooks/usePortfolio";
import { useSiteSettings } from "../hooks/useSiteSettings";

function PortfolioPage() {
  const { data, isLoading, isError, refetch } = usePortfolio();
  const { data: settingsData } = useSiteSettings();
  const projects = data?.data || [];
  const settings = settingsData?.data || {};

  return (
    <>
      <SEOHead
        title={pageSeo.portfolio.title}
        description={pageSeo.portfolio.description}
        keywords="software development portfolio, web app portfolio, mobile app portfolio, SaaS case studies"
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
                    <strong>{projects.length || "50+"}</strong>
                    <span>Projects Delivered</span>
                  </div>
                  <div>
                    <strong>{settings.industriesServed || "6"}</strong>
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
          {isLoading ? <Spin /> : null}
          {isError ? <ErrorState onRetry={refetch} /> : null}
          {!isLoading && !isError && !projects.length ? <EmptyState message="No projects published yet." /> : null}
          <Row gutter={[20, 20]}>
            {projects.map((project) => (
              <Col key={project.slug || project.title} xs={24} md={12} lg={8}>
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

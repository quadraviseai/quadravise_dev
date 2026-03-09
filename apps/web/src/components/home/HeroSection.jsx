import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";

import { useSiteSettings } from "../../hooks/useSiteSettings";
import { ROUTES } from "../../constants/routes";

function HeroSection() {
  const trustItems = ["React + Node.js + PostgreSQL", "Startup MVPs", "SEO-Ready Architecture", "VPS Deployment"];
  const { data } = useSiteSettings();
  const settings = data?.data || {};

  return (
    <section className="section hero-section">
      <div className="section-inner">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={13}>
            <h1 className="hero-title">
              Build Powerful
              <br />
              Websites, Mobile Apps,
              <br />
              and SaaS Products
              <br />
              <span className="hero-title-subline">with Quadravise</span>
            </h1>
            <div>
              <Typography.Paragraph className="hero-description">
                We help startups and businesses transform ideas into scalable digital products through expert website
                development, mobile app development, and custom software solutions.
              </Typography.Paragraph>
            </div>
            <div>
              <Space size={14} wrap className="hero-cta-group">
                <Button type="primary" size="large" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
                </Button>
                <Button size="large" className="hero-btn hero-btn-secondary">
                  <Link to={ROUTES.PORTFOLIO}>View Our Work</Link>
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={24} lg={11}>
            <div className="hero-visual">
              <div className="hero-glass-panel">
                <h3>Delivery Snapshot</h3>
                <div className="hero-metric-grid">
                  <div>
                    <strong>{settings.projectsDelivered || "50+"}</strong>
                    <span>Projects Delivered</span>
                  </div>
                  <div>
                    <strong>{settings.mvpKickoffSpeed || "7 Days"}</strong>
                    <span>MVP Kickoff Speed</span>
                  </div>
                  <div>
                    <strong>{settings.reliabilityFocus || "99.9%"}</strong>
                    <span>Platform Reliability Focus</span>
                  </div>
                  <div>
                    <strong>{settings.performanceBuild || "SEO+"}</strong>
                    <span>Performance-first Build</span>
                  </div>
                </div>
              </div>
              <div className="hero-layer-card hero-layer-main">
                <span>Websites</span>
                <span>Mobile Apps</span>
                <span>SaaS Platforms</span>
                <span>MVP Delivery</span>
                <Link to={ROUTES.SERVICES}>
                  Explore Capabilities <ArrowRightOutlined />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="hero-trust-strip">
          <div className="hero-trust-head">Trusted for Scalable Digital Builds</div>
          <div className="hero-trust-row">
            {trustItems.map((item) => (
              <span key={item} className="hero-trust-chip">
                <CheckCircleFilled />
                {item}
              </span>
            ))}
          </div>
          <div className="hero-trust-badge">Startup-Friendly Build Process</div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

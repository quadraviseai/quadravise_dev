import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { motion } from "motion/react";
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
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              Build Powerful
              <br />
              Websites, Mobile Apps,
              <br />
              and SaaS Products
              <br />
              <span className="hero-title-subline">with Quadravise</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
              <Typography.Paragraph className="hero-description">
              We help startups and businesses transform ideas into scalable digital products through expert website development, mobile app development, and custom software solutions.
              </Typography.Paragraph>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }}>
              <Space size={14} wrap className="hero-cta-group">
              <Button type="primary" size="large" className="hero-btn hero-btn-primary">
                <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
              </Button>
              <Button size="large" className="hero-btn hero-btn-secondary">
                <Link to={ROUTES.PORTFOLIO}>View Our Work</Link>
              </Button>
              </Space>
            </motion.div>
          </Col>
          <Col xs={24} lg={11}>
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
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
            </motion.div>
          </Col>
        </Row>
        <motion.div
          className="hero-trust-strip"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;

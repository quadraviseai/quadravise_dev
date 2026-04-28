import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { useSiteSettings } from "../../hooks/useSiteSettings";
import { ROUTES } from "../../constants/routes";

function ServicesHeroSection() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};
  const trustPoints = [
    "Startup MVP specialists",
    "Modern React + Node architecture",
    "Scalable cloud-ready systems"
  ];

  return (
    <section className="section services-hero-section">
      <div className="section-inner">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={13}>
            <motion.h1
              className="services-hero-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              Software Development Services
              <br />
              for Startups and
              <br />
              Growing Businesses
            </motion.h1>
            <motion.p
              className="services-hero-subtitle"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              We build scalable websites, SaaS platforms, and mobile applications for startups.
            </motion.p>
            <div className="services-trust-list">
              {trustPoints.map((point) => (
                <span key={point} className="services-trust-item">
                  <CheckCircleFilled />
                  {point}
                </span>
              ))}
            </div>
            <Space wrap size={14} className="services-hero-actions">
              <Button type="primary" className="hero-btn hero-btn-primary">
                <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
              </Button>
              <Button className="hero-btn hero-btn-secondary">
                <Link to={ROUTES.PORTFOLIO}>View Portfolio</Link>
              </Button>
            </Space>
            
          </Col>
          <Col xs={24} lg={11}>
            <motion.div
              className="services-hero-visual"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="services-hero-panel">
                <h3>Delivery Snapshot</h3>
                <div className="services-hero-metrics">
                  <div>
                    <strong>{settings.projectsDelivered || "24/7"}</strong>
                    <span>Support</span>
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
              <div className="services-hero-capabilities">
                <span>Websites</span>
                <span>Mobile Apps</span>
                <span>SaaS Platforms</span>
                <span>MCP Solutions</span>
                <Link to={ROUTES.CONTACT}>
                  Explore Capabilities <ArrowRightOutlined />
                </Link>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ServicesHeroSection;

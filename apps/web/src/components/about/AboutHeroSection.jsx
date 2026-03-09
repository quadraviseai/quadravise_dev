import { AppstoreOutlined, CheckCircleFilled, SafetyCertificateOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { useSiteSettings } from "../../hooks/useSiteSettings";
import { ROUTES } from "../../constants/routes";

function AboutHeroSection() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};
  const trustPoints = [
    "50+ digital product deliveries",
    "Startup-focused execution model",
    "Architecture-first development approach",
    "Scalable systems from day one"
  ];

  return (
    <section className="section about-hero-section">
      <div className="section-inner">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={13}>
            <motion.h1
              className="about-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Product Engineering
              <br />
              for Startups That Want to
              <br />
              Build Right the First Time
            </motion.h1>
            <Typography.Paragraph className="about-hero-description">
              Quadravise is a product engineering company helping startups and growing businesses build scalable
              websites, mobile apps, and SaaS platforms with a structured development approach.
            </Typography.Paragraph>
            <div className="about-hero-trust-list">
              {trustPoints.map((point) => (
                <span key={point}>
                  <CheckCircleFilled />
                  {point}
                </span>
              ))}
            </div>
            <Space size={14} wrap className="about-hero-actions">
              <Button type="primary" className="hero-btn hero-btn-primary">
                <Link to={ROUTES.CONTACT}>Start a Project</Link>
              </Button>
              <Button className="hero-btn hero-btn-secondary">
                <Link to={ROUTES.PORTFOLIO}>View Work</Link>
              </Button>
            </Space>
          </Col>
          <Col xs={24} lg={11}>
            <div className="about-hero-panel">
              <h3>Quadravise Snapshot</h3>
              <div className="about-hero-metrics">
                <div>
                  <em>
                    <TrophyOutlined />
                  </em>
                  <strong>{settings.aboutYearsExperience || "6+"}</strong>
                  <span>Years Product Engineering Experience</span>
                </div>
                <div>
                  <em>
                    <AppstoreOutlined />
                  </em>
                  <strong>{settings.aboutProductsDelivered || "50+"}</strong>
                  <span>Products Delivered</span>
                </div>
                <div>
                  <em>
                    <TeamOutlined />
                  </em>
                  <strong>{settings.aboutCoreTeamSize || "10+"}</strong>
                  <span>Core Engineers & Designers</span>
                </div>
                <div>
                  <em>
                    <SafetyCertificateOutlined />
                  </em>
                  <strong>{settings.aboutReliabilityFocus || "99.9%"}</strong>
                  <span>Reliability-first Delivery Process</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default AboutHeroSection;

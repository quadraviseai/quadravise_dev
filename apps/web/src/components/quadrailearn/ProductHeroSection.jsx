import { CheckCircleFilled, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import { useSiteSettings } from "../../hooks/useSiteSettings";
import { ROUTES } from "../../constants/routes";

const QUADRAILEARN_LIVE_URL = "https://quadrailearn.quadravise.com";

function ProductHeroSection() {
  const navigate = useNavigate();
  const { data } = useSiteSettings();
  const settings = data?.data || {};
  const points = ["Structured learning modules", "AI-powered learning support", "Performance analytics dashboard"];

  return (
    <section className="section quadrailearn-hero-section">
      <div className="section-inner">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={13}>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Typography.Title className="quadrailearn-hero-title">
                QuadraiLearn
                <br />
                Smarter Digital
                <br />
                Learning Platform
              </Typography.Title>
              <Typography.Paragraph className="quadrailearn-hero-description">
                Modern learning product built to improve concept mastery using structured modules, adaptive learning
                tools, and progress tracking.
              </Typography.Paragraph>
              <div className="quadrailearn-hero-points">
                {points.map((item) => (
                  <span key={item}>
                    <CheckCircleFilled />
                    {item}
                  </span>
                ))}
              </div>
              <Space size={14} wrap style={{ marginTop: 20 }}>
                <Button type="primary" className="hero-btn hero-btn-primary" onClick={() => navigate(ROUTES.CONTACT)}>
                  Request Demo
                </Button>
                <Button className="hero-btn hero-btn-secondary" href={QUADRAILEARN_LIVE_URL}>
                  Visit Live Landing Page
                </Button>
                <Button className="hero-btn hero-btn-secondary" onClick={() => navigate(ROUTES.CONTACT)}>
                  Talk to Product Team
                </Button>
              </Space>
            </motion.div>
          </Col>
          <Col xs={24} lg={11}>
            <motion.div
              className="quadrailearn-preview-panel"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              <div className="quadrailearn-preview-head">
                <strong>Product Preview</strong>
                <PlayCircleOutlined />
              </div>
                <div className="quadrailearn-preview-metrics">
                <div>
                  <strong>{settings.quadrailearnTracks || "12+"}</strong>
                  <span>Learning Tracks</span>
                </div>
                <div>
                  <strong>AI</strong>
                  <span>Adaptive Learning Cues</span>
                </div>
                <div>
                  <strong>Live</strong>
                  <span>Student Performance View</span>
                </div>
                <div>
                  <strong>Tests</strong>
                  <span>Practice & Assessments</span>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ProductHeroSection;

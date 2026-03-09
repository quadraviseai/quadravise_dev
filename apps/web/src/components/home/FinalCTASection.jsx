import { DeploymentUnitOutlined, ProjectOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function FinalCTASection() {
  const nextSteps = [
    {
      icon: <SearchOutlined />,
      title: "Understand your project",
      subtitle: "We learn your goals and requirements.",
      eta: "20-30 min call"
    },
    {
      icon: <ProjectOutlined />,
      title: "Define the scope",
      subtitle: "We prepare architecture and delivery plan.",
      eta: "1-2 days"
    },
    {
      icon: <DeploymentUnitOutlined />,
      title: "Share the build plan",
      subtitle: "You receive timeline, cost, and next steps.",
      eta: "Within 48 hours"
    }
  ];

  return (
    <section className="section final-cta-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="final-cta-card">
            <Row gutter={[30, 30]} align="middle">
              <Col xs={24} lg={15}>
                <Typography.Title level={2} className="final-cta-title">
                  Ready to Build Your
                  <br />
                  Digital Product?
                </Typography.Title>
                <Typography.Paragraph className="final-cta-description">
                  Let&apos;s discuss your goals and turn your idea into a scalable website, mobile app, or SaaS platform.
                </Typography.Paragraph>
                <Space size={16} wrap className="final-cta-buttons">
                  <Button type="primary" className="hero-btn hero-btn-primary">
                    <Link to={ROUTES.CONTACT}>Start Your Project</Link>
                  </Button>
                  <Button className="hero-btn hero-btn-secondary-contrast">
                    <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
                  </Button>
                </Space>
              </Col>
              <Col xs={24} lg={9}>
                <div className="final-cta-trust-card">
                  <p className="final-cta-trust-label">After You Contact Us</p>
                  <h4>What Happens Next</h4>
                  <div className="final-cta-trust-list">
                    {nextSteps.map((step) => (
                      <article key={step.title} className="final-cta-step-card">
                        <span className="final-cta-step-icon">{step.icon}</span>
                        <div className="final-cta-step-text">
                          <strong>{step.title}</strong>
                          <span>{step.subtitle}</span>
                          <em>{step.eta}</em>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTASection;

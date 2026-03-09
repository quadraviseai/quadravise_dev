import { DeploymentUnitOutlined, ProjectOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function ServicesCTASection() {
  const nextSteps = [
    {
      icon: <SearchOutlined />,
      title: "Understand your project",
      subtitle: "20-30 minute discovery call"
    },
    {
      icon: <ProjectOutlined />,
      title: "Define the scope",
      subtitle: "Requirements and architecture plan"
    },
    {
      icon: <DeploymentUnitOutlined />,
      title: "Share the build plan",
      subtitle: "Timeline, budget, and roadmap"
    }
  ];

  return (
    <section className="section services-page-cta-section">
      <div className="section-inner">
        <div className="services-page-cta-block">
          <Row gutter={[28, 28]} align="middle">
            <Col xs={24} lg={15}>
              <Typography.Title level={2} className="services-cta-title">
                Ready to Build Your
                <br />
                Digital Product?
              </Typography.Title>
              <Typography.Paragraph className="services-cta-description">
                Let&apos;s discuss your idea and turn it into a scalable website, mobile app, or SaaS platform.
              </Typography.Paragraph>
              <Space wrap size={14} className="services-cta-buttons">
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
                </Button>
                <Button className="hero-btn hero-btn-secondary-contrast">
                  <Link to={ROUTES.PORTFOLIO}>View Portfolio</Link>
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={9}>
              <div className="services-cta-steps">
                <p className="services-cta-steps-label">After You Contact Us</p>
                {nextSteps.map((step) => (
                  <article key={step.title} className="services-cta-step">
                    <span className="services-cta-step-icon">{step.icon}</span>
                    <div className="services-cta-step-copy">
                      <strong>{step.title}</strong>
                      <span>{step.subtitle}</span>
                    </div>
                  </article>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}

export default ServicesCTASection;

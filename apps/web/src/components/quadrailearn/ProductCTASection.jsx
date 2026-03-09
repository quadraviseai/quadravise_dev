import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function ProductCTASection() {
  const navigate = useNavigate();
  return (
    <section className="section quadrailearn-cta-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <Card className="quadrailearn-cta-card">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} lg={15}>
                <Typography.Title level={2} className="quadrailearn-cta-title">
                  Start Learning with
                  <br />
                  QuadraiLearn
                </Typography.Title>
                <Typography.Paragraph className="quadrailearn-cta-description">
                  Launch digital learning experiences with structured modules, AI tools, and measurable progress
                  workflows.
                </Typography.Paragraph>
                <Space size={14} wrap>
                  <Button type="primary" className="hero-btn hero-btn-primary" onClick={() => navigate(ROUTES.CONTACT)}>
                    Request Demo
                  </Button>
                  <Button className="hero-btn hero-btn-secondary-contrast" onClick={() => navigate(ROUTES.CONTACT)}>
                    Talk to Team
                  </Button>
                </Space>
              </Col>
              <Col xs={24} lg={9}>
                <div className="quadrailearn-cta-points">
                  <span>
                    <CheckCircleFilled />
                    Learner-first UX and flow
                  </span>
                  <span>
                    <CheckCircleFilled />
                    AI-powered adaptive paths
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Analytics-ready architecture
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductCTASection;

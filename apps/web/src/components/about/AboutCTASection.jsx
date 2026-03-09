import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function AboutCTASection() {
  return (
    <section className="section about-cta-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <Card className="about-cta-card">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} lg={15}>
                <Typography.Title level={2} className="about-cta-title">
                  Start Building Your
                  <br />
                  Product with Quadravise
                </Typography.Title>
                <Typography.Paragraph className="about-cta-description">
                  Work with a structured product engineering team that focuses on reliability, scalability, and
                  long-term success.
                </Typography.Paragraph>
                <Space size={14} wrap>
                  <Button type="primary" className="hero-btn hero-btn-primary">
                    <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
                  </Button>
                  <Button className="hero-btn hero-btn-secondary-contrast">
                    <Link to={ROUTES.SERVICES}>Explore Services</Link>
                  </Button>
                </Space>
              </Col>
              <Col xs={24} lg={9}>
                <div className="about-cta-points">
                  <span>
                    <CheckCircleFilled />
                    Product strategy and engineering execution
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Modern React, Node, and scalable backend architecture
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Launch-ready quality and testing process
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

export default AboutCTASection;

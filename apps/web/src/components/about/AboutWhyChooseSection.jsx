import { CheckCircleFilled } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const points = [
  {
    title: "Product-first engineering approach",
    description: "We prioritize product outcomes, not just feature output."
  },
  {
    title: "Architecture designed for scale",
    description: "Systems are planned for growth, reliability, and maintainability."
  },
  {
    title: "Transparent milestone delivery",
    description: "Clear roadmap, regular updates, and predictable execution."
  },
  {
    title: "Startup-friendly collaboration model",
    description: "Lean communication and practical timelines for fast-moving teams."
  },
  {
    title: "Long-term maintainable codebases",
    description: "Clean structure and standards that support future expansion."
  }
];

function AboutWhyChooseSection() {
  return (
    <section className="section about-why-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader title="Why Teams Choose Quadravise" />
        </motion.div>
        <Row gutter={[20, 20]}>
          {points.map((point, index) => (
            <Col key={point.title} xs={24} md={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="about-why-card">
                  <div className="about-why-card-inner">
                    <span className="about-why-card-icon">
                      <CheckCircleFilled />
                    </span>
                    <div className="about-why-card-copy">
                      <Typography.Title level={4}>{point.title}</Typography.Title>
                      <Typography.Paragraph>{point.description}</Typography.Paragraph>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default AboutWhyChooseSection;

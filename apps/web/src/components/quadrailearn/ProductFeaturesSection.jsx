import { BookOutlined, LineChartOutlined, RobotOutlined, SolutionOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const features = [
  {
    icon: <BookOutlined />,
    title: "Interactive Learning Content",
    description: "Structured modules designed for better understanding and consistent concept progression."
  },
  {
    icon: <RobotOutlined />,
    title: "AI-Powered Learning Tools",
    description: "Adaptive guidance that helps students focus on weak areas and improve faster."
  },
  {
    icon: <SolutionOutlined />,
    title: "Practice Tests",
    description: "Assessment workflows for regular practice, self-evaluation, and topic reinforcement."
  },
  {
    icon: <LineChartOutlined />,
    title: "Performance Tracking",
    description: "Progress analytics for students, mentors, and institutions with actionable insight."
  }
];

function ProductFeaturesSection() {
  return (
    <section className="section quadrailearn-features-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader title="Key Features" />
        </motion.div>
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col key={feature.title} xs={24} md={12}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="quadrailearn-feature-card">
                  <span className="quadrailearn-feature-icon">{feature.icon}</span>
                  <Typography.Title level={4}>{feature.title}</Typography.Title>
                  <Typography.Paragraph>{feature.description}</Typography.Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default ProductFeaturesSection;

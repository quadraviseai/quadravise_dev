import { BulbOutlined, CompassOutlined, SafetyOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const blocks = [
  {
    icon: <BulbOutlined />,
    title: "Mission",
    description: "Build practical digital products that create measurable value for businesses and learners."
  },
  {
    icon: <CompassOutlined />,
    title: "Vision",
    description: "Become a trusted global partner for scalable product engineering."
  },
  {
    icon: <TeamOutlined />,
    title: "Collaboration",
    description: "Work transparently with founders and teams through structured milestone delivery."
  },
  {
    icon: <SafetyOutlined />,
    title: "Engineering Standard",
    description: "Architecture-first development with security, performance, and long-term maintainability."
  }
];

function MissionVisionSection() {
  return (
    <section className="section about-values-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            title="What Drives Quadravise"
            subtitle="Every delivery combines business context, product thinking, and execution quality."
          />
        </motion.div>
        <Row gutter={[20, 20]}>
          {blocks.map((block, index) => (
            <Col key={block.title} xs={24} md={12}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="about-value-card">
                  <span className="about-value-icon">{block.icon}</span>
                  <Typography.Title level={4}>{block.title}</Typography.Title>
                  <Typography.Paragraph>{block.description}</Typography.Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default MissionVisionSection;

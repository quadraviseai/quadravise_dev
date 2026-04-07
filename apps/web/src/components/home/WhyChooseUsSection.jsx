import { SafetyCertificateOutlined, TeamOutlined, ThunderboltOutlined, TrophyOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const items = [
  {
    icon: <TeamOutlined />,
    title: "Expert Product Team",
    description: "Engineers and designers focused on clear execution and long-term maintainability."
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Startup-Speed Delivery",
    description: "Lean delivery cycles with milestone visibility from discovery to launch."
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "Scalable Architecture",
    description: "Performance, security, and structured APIs designed for growth from day one."
  },
  {
    icon: <TrophyOutlined />,
    title: "Reliable Project Execution",
    description: "Process-driven delivery with clear communication, ownership, and predictable outcomes."
  }
];

function WhyChooseUsSection() {
  return (
    <section className="section why-section">
      <div className="section-inner">
        <SectionHeader title="Why Businesses Choose Octane" />
        <Row gutter={[20, 20]}>
          {items.map((item, index) => (
            <Col key={item.title} xs={24} md={12} lg={12}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="why-card">
                <div className="why-icon">{item.icon}</div>
                <Typography.Title level={4}>{item.title}</Typography.Title>
                <Typography.Paragraph>{item.description}</Typography.Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;

import { DeploymentUnitOutlined, FundProjectionScreenOutlined, SearchOutlined, ToolOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const steps = [
  {
    step: "01",
    icon: <SearchOutlined />,
    title: "Product Discovery",
    description: "Understand users, business goals, and the right product scope before development starts."
  },
  {
    step: "02",
    icon: <FundProjectionScreenOutlined />,
    title: "Architecture & Planning",
    description: "Define scalable architecture, select the stack, and map a practical delivery roadmap."
  },
  {
    step: "03",
    icon: <ToolOutlined />,
    title: "Agile Development",
    description: "Build in milestones with continuous testing, feedback loops, and transparent progress."
  },
  {
    step: "04",
    icon: <DeploymentUnitOutlined />,
    title: "Launch & Scale",
    description: "Deployment, monitoring, and optimization for long-term growth."
  }
];

function AboutProcessSection() {
  return (
    <section className="section about-process-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader title="How We Build Products" />
        </motion.div>
        <Row gutter={[20, 20]}>
          {steps.map((item, index) => (
            <Col key={item.step} xs={24} md={12}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="about-process-card">
                  <span className="about-process-step">{item.step}</span>
                  <span className="about-process-icon">{item.icon}</span>
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

export default AboutProcessSection;

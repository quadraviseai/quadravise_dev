import {
  CloudServerOutlined,
  CodeOutlined,
  LaptopOutlined,
  MobileOutlined,
  RocketOutlined,
  ToolOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";

const services = [
  {
    tone: "blue",
    icon: <LaptopOutlined />,
    title: "Website Development",
    description: "Modern, high-performance business websites built for speed, SEO, and growth.",
    chips: ["Corporate Sites", "Landing Pages", "Business Portals"]
  },
  {
    tone: "sky",
    icon: <MobileOutlined />,
    title: "Mobile App Development",
    description: "Cross-platform app builds with robust architecture and user-focused experiences.",
    chips: ["Android", "iOS", "Cross Platform"]
  },
  {
    tone: "gold",
    icon: <ToolOutlined />,
    title: "Custom Software Development",
    description: "Tailored software systems to streamline operations and improve team productivity.",
    chips: ["Automation", "Internal Tools", "Integrations"]
  },
  {
    tone: "green",
    icon: <CloudServerOutlined />,
    title: "SaaS Development",
    description: "Subscription-based SaaS platforms with scalable infrastructure and clean user flows.",
    chips: ["Dashboards", "Admin Panels", "Secure APIs"]
  },
  {
    tone: "orange",
    icon: <RocketOutlined />,
    title: "Startup MVP Development",
    description: "Rapid MVP delivery to validate your product idea and accelerate investor readiness.",
    chips: ["Fast Launch", "Lean Scope", "Growth Ready"]
  },
  {
    tone: "blue",
    icon: <CodeOutlined />,
    title: "Product Engineering",
    description: "End-to-end product engineering for scalable platforms with maintainable architecture.",
    chips: ["API Design", "Architecture", "Quality Delivery"]
  }
];

function WhatWeDoSection() {
  return (
    <section className="section services-section">
      <div className="section-inner">
        <SectionHeader
          title="Software Development Services"
          subtitle="Quadravise delivers modern software solutions that help businesses launch faster, scale efficiently, and stay competitive in the digital world."
        />
        <Row gutter={[20, 20]}>
          {services.map((service, index) => (
            <Col key={service.title} xs={24} md={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className={`service-rich-card service-rich-card-${service.tone}`}>
                <Space direction="vertical" size={12} className="service-rich-content">
                  <div className="service-rich-top">
                    <span className="service-rich-icon">{service.icon}</span>
                  </div>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {service.title}
                  </Typography.Title>
                  <Typography.Paragraph style={{ marginBottom: 2 }}>{service.description}</Typography.Paragraph>
                  <div className="service-chip-row">
                    {service.chips.map((chip) => (
                      <Tag key={chip}>{chip}</Tag>
                    ))}
                  </div>
                  <Link className="service-learn-link" to={ROUTES.SERVICES}>
                    Learn More
                  </Link>
                </Space>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        <Button type="primary" className="services-cta-btn">
          <Link to={ROUTES.SERVICES}>Explore Services</Link>
        </Button>
      </div>
    </section>
  );
}

export default WhatWeDoSection;

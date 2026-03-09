import {
  CloudOutlined,
  GlobalOutlined,
  MobileOutlined,
  RocketOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Card, Col, Row, Tag, Typography } from "antd";

const contentBlocks = [
  {
    icon: <GlobalOutlined />,
    title: "Website Development for Trust and Conversion",
    text: "A business website should load quickly, communicate value clearly, and support SEO from the start. Quadravise builds responsive, conversion-aware interfaces with measurable outcomes like improved lead quality, lower bounce rate, and stronger organic visibility."
  },
  {
    icon: <MobileOutlined />,
    title: "Mobile Apps Built for Real Product Adoption",
    text: "Mobile products need reliability, smooth experience, and practical release planning. We design scalable app architecture with robust API integration so teams can launch faster, gather real feedback, and iterate without expensive rebuilds."
  },
  {
    icon: <SettingOutlined />,
    title: "Custom Software That Fits Operations",
    text: "Off-the-shelf tools often limit growth. We build tailored systems for internal workflows, automation, and data visibility so teams reduce manual bottlenecks, improve control, and keep operations aligned with real business processes."
  },
  {
    icon: <CloudOutlined />,
    title: "SaaS Platforms with Long-Term Stability",
    text: "SaaS products require clean architecture, secure role-aware access, and performance under scale. Quadravise builds API-driven services, structured data models, and deployment-ready infrastructure to support predictable product growth."
  },
  {
    icon: <RocketOutlined />,
    title: "Startup MVP Delivery with Execution Clarity",
    text: "MVP success requires focused scope and production-grade fundamentals. We prioritize core user flows, ship quickly, and keep architecture extensible so startups can validate ideas, attract users, and prepare for growth phases."
  }
];

function ServicesSeoContentSection() {
  return (
    <section className="section services-seo-content-section">
      <div className="section-inner">
        <Card className="services-seo-card services-seo-intro-card">
          <Tag className="services-seo-tag">Strategic Engineering Value</Tag>
          <Typography.Title level={2}>Why Businesses Choose Professional Software Development Services</Typography.Title>
          <Typography.Paragraph>
            Digital execution directly affects revenue, trust, and scalability. Quadravise approaches software
            development as a business growth function, aligning architecture decisions with user behavior, operational
            needs, and long-term product stability.
          </Typography.Paragraph>
        </Card>
        <Row gutter={[20, 20]}>
          {contentBlocks.map((block) => (
            <Col key={block.title} xs={24} md={12} lg={8}>
              <Card className="services-seo-card services-seo-knowledge-card">
                <span className="services-seo-card-icon">{block.icon}</span>
                <Typography.Title level={4}>{block.title}</Typography.Title>
                <Typography.Paragraph>{block.text}</Typography.Paragraph>
              </Card>
            </Col>
          ))}
          <Col xs={24}>
            <Card className="services-seo-card services-seo-summary-card">
              <Typography.Title level={4}>Technology Foundation for Reliable Scale</Typography.Title>
              <Typography.Paragraph>
                Our stack combines React, Node.js, and PostgreSQL to deliver fast interfaces, clean API services, and
                dependable data workflows. With deployment-ready infrastructure, security-first middleware, and clear
                delivery milestones, businesses get systems they can trust in production.
              </Typography.Paragraph>
              <div className="services-seo-tech-chips">
                <Tag>React</Tag>
                <Tag>Node.js</Tag>
                <Tag>PostgreSQL</Tag>
                <Tag>API Architecture</Tag>
                <Tag>VPS Deployment</Tag>
                <Tag>Security-first Middleware</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ServicesSeoContentSection;

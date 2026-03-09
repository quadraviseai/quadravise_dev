import {
  CheckCircleFilled,
  ClockCircleOutlined,
  ExperimentOutlined,
  PlayCircleOutlined,
  RocketOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import SectionHeader from "../components/common/SectionHeader";
import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { pageSeo, seoKeywords } from "../constants/seo";
import { useSiteSettings } from "../hooks/useSiteSettings";

const productFeatures = [
  "Structured learning modules",
  "Practice tests",
  "AI-powered learning tools",
  "Performance analytics"
];

const productCards = [
  {
    status: "Live Product",
    title: "QuadraiLearn",
    description:
      "AI-powered digital learning platform designed to improve concept mastery with structured content and smart assessment.",
    tags: ["EdTech", "AI Learning", "Analytics"],
    action: "Explore Product",
    href: ROUTES.QUADRA_ILEARN
  },
  {
    status: "In Discovery",
    title: "Operations Automation Suite",
    description:
      "Modular business operations toolkit for workflow automation, reporting, and internal process visibility.",
    tags: ["Business Ops", "Automation", "Workflow"],
    action: "Discuss Product Build",
    href: ROUTES.CONTACT
  },
  {
    status: "New Concept",
    title: "Vertical SaaS Accelerator",
    description:
      "A launch-ready SaaS foundation for founders who need faster product development with scalable architecture.",
    tags: ["SaaS", "Starter Platform", "Scalable"],
    action: "Start with Quadravise",
    href: ROUTES.CONTACT
  }
];

const productExecutionBlocks = [
  {
    icon: <RocketOutlined />,
    title: "Fast Product Iteration",
    description: "Ship quickly with milestone-based release planning and reliable engineering execution."
  },
  {
    icon: <ExperimentOutlined />,
    title: "Validation-Driven Build",
    description: "Prioritize high-impact features first and validate adoption before scaling complexity."
  },
  {
    icon: <ClockCircleOutlined />,
    title: "Long-Term Product Support",
    description: "From launch to growth phases, maintain architecture quality and product performance."
  }
];

function ProductsPage() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};

  return (
    <>
      <SEOHead
        title={pageSeo.products.title}
        description={pageSeo.products.description}
        keywords={seoKeywords.products}
        canonical={pageSeo.products.canonical}
      />

      <section className="section products-page-hero-section">
        <div className="section-inner">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} lg={13}>
              <motion.h1
                className="products-page-hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Products Built for
                <br />
                Real Users, Growth,
                <br />
                and Scale
              </motion.h1>
              <Typography.Paragraph className="products-page-hero-description">
                Quadravise builds scalable SaaS platforms, automation systems, and AI-powered tools for startups and
                growing businesses.
              </Typography.Paragraph>
              <Space size={14} wrap>
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.QUADRA_ILEARN}>Explore QuadraiLearn</Link>
                </Button>
                <Button className="hero-btn hero-btn-secondary">
                  <Link to={ROUTES.CONTACT}>Build a Product with Us</Link>
                </Button>
              </Space>
              <div className="products-page-hero-trust-row">
                <span>
                  <strong>{settings.projectsDelivered || "50+"}</strong>
                  Product & Platform Builds
                </span>
                <span>
                  <strong>{settings.industriesServed || "6"}</strong>
                  Industries Served
                </span>
                <span>
                  <strong>{settings.reliabilityFocus || "99.9%"}</strong>
                  Reliability Focus
                </span>
              </div>
            </Col>
            <Col xs={24} lg={11}>
              <motion.div
                className="products-page-hero-visual"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.15 }}
              >
                <div className="product-preview-panel">
                  <div className="product-preview-head">
                    <strong>QuadraiLearn Preview</strong>
                    <PlayCircleOutlined />
                  </div>
                  <div className="product-preview-metrics">
                    <div>
                      <strong>{settings.quadrailearnTracks || "12+"}</strong>
                      <span>Learning Tracks</span>
                    </div>
                    <div>
                      <strong>AI</strong>
                      <span>Adaptive Suggestions</span>
                    </div>
                    <div>
                      <strong>Live</strong>
                      <span>Progress Dashboard</span>
                    </div>
                    <div>
                      <strong>Tests</strong>
                      <span>Practice Assessments</span>
                    </div>
                  </div>
                </div>
                <div className="products-page-feature-panel">
                  {productFeatures.map((feature) => (
                    <span key={feature}>
                      <CheckCircleFilled />
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section products-page-grid-section">
        <div className="section-inner">
          <SectionHeader
            title="Product Ecosystem"
            subtitle="From production-ready solutions to strategic product concepts, each build follows a scalability-first architecture."
          />
          <Row gutter={[20, 20]}>
            {productCards.map((product) => (
              <Col key={product.title} xs={24} md={12} lg={8}>
                <Card className="products-page-card">
                  <Tag className="products-page-card-status">{product.status}</Tag>
                  <Typography.Title level={4}>{product.title}</Typography.Title>
                  <Typography.Paragraph>{product.description}</Typography.Paragraph>
                  <div className="products-page-card-tags">
                    {product.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <Link to={product.href} className="products-page-card-link">
                    {product.action}
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="section products-page-execution-section">
        <div className="section-inner">
          <SectionHeader
            title="How We Build Product Success"
            subtitle="Product strategy, modern engineering, and execution clarity from discovery to scalable release."
          />
          <Row gutter={[20, 20]}>
            {productExecutionBlocks.map((block) => (
              <Col key={block.title} xs={24} md={8}>
                <Card className="products-page-execution-card">
                  <span className="products-page-execution-icon">{block.icon}</span>
                  <Typography.Title level={4}>{block.title}</Typography.Title>
                  <Typography.Paragraph>{block.description}</Typography.Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="section products-page-cta-section">
        <div className="section-inner">
          <Card className="products-page-cta-card">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} lg={15}>
                <Typography.Title level={2} className="products-page-cta-title">
                  Ready to Launch Your
                  <br />
                  Product Idea?
                </Typography.Title>
                <Typography.Paragraph className="products-page-cta-description">
                  Collaborate with Quadravise to design, build, and launch product experiences that scale with your
                  business.
                </Typography.Paragraph>
                <Space size={14} wrap>
                  <Button type="primary" className="hero-btn hero-btn-primary">
                    <Link to={ROUTES.CONTACT}>Book Product Consultation</Link>
                  </Button>
                  <Button className="hero-btn hero-btn-secondary-contrast">
                    <Link to={ROUTES.PORTFOLIO}>View Product Case Studies</Link>
                  </Button>
                </Space>
              </Col>
              <Col xs={24} lg={9}>
                <div className="products-page-cta-points">
                  <span>
                    <CheckCircleFilled />
                    Discovery-driven product planning
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Modern React + Node architecture
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Release-ready quality assurance
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
    </>
  );
}

export default ProductsPage;

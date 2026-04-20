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
  "Code generation for domain workflows",
  "Project audits and drift detection",
  "Safe file write and update planning",
  "Inspector-ready MCP development workflow"
];

const productCards = [
  {
    status: "Live Product",
    title: "Auth Domain MCP",
    description:
      "Authentication-focused MCP server for generating, auditing, updating, and safely writing auth system code.",
    tags: ["Authentication", "MCP Server", "Code Generation"],
    action: "Know and Get MCP",
    href: ROUTES.AUTH_DOMAIN_MCP
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

const productDetailBlocks = [
  {
    title: "Auth Domain MCP",
    eyebrow: "Live MCP Product",
    summary:
      "Specialized MCP server that helps teams generate, audit, update, refactor, and safely write authentication system code with support for both one-time setup and recurring maintenance work.",
    audience: ["Founders building SaaS products", "Agencies delivering secure client portals", "CTOs, backend teams, and security-conscious engineering teams"],
    capabilities: [
      "Login, signup, passkeys, password reset, session management, RBAC, and audit logging support",
      "Backend generation, frontend auth screens, PostgreSQL schema output, and SQL migration generation",
      "Diffs against existing projects, auth audits, update planning, and refactor planning",
      "Preview-before-write, safe apply modes, path safety protection, and management-ready reports"
    ]
  },
  {
    title: "Operations Automation MCP",
    eyebrow: "Roadmap MCP",
    summary:
      "Future MCP product direction focused on turning internal operations work into repeatable workflows with safer automation, structured updates, and clearer operating visibility.",
    audience: ["Operations-heavy businesses", "Agencies managing repeatable delivery processes", "Teams standardizing internal execution"],
    capabilities: [
      "MCP-first workflow generation for operational tasks",
      "Safer update and maintenance flows for internal systems",
      "Business-readable reporting and execution visibility",
      "Domain-specific automation packaged as a reusable server product"
    ]
  },
  {
    title: "Vertical SaaS Accelerator MCP",
    eyebrow: "Roadmap MCP",
    summary:
      "Future MCP product direction for teams building domain-specific SaaS systems faster through reusable server workflows, scaffolding, audits, and rollout support.",
    audience: ["Founders launching vertical SaaS products", "Platform teams standardizing delivery patterns", "Agencies packaging repeatable SaaS build workflows"],
    capabilities: [
      "Reusable MCP workflows for SaaS-oriented engineering tasks",
      "Scaffolding, audits, and structured rollout support",
      "A productized server model rather than one-off project implementation",
      "Expansion path from today’s auth tooling into a broader MCP product suite"
    ]
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
                MCP Products Built for
                <br />
                Real Engineering,
                <br />
                Repeatability, and Scale
              </motion.h1>
              <Typography.Paragraph className="products-page-hero-description">
                Quadravise is building a focused suite of MCP server products. Auth Domain MCP is the current live
                product, with future MCP servers planned for additional business and platform domains.
              </Typography.Paragraph>
              <Space size={14} wrap>
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.AUTH_DOMAIN_MCP}>Know and Get MCP</Link>
                </Button>
                <Button className="hero-btn hero-btn-secondary">
                  <Link to={ROUTES.CONTACT}>Talk About the MCP Roadmap</Link>
                </Button>
              </Space>
              <div className="products-page-hero-trust-row">
                <span>
                  <strong>{settings.projectsDelivered || "50+"}</strong>
                  Product Engineering Projects
                </span>
                <span>
                  <strong>{settings.industriesServed || "6"}</strong>
                  Domains Studied
                </span>
                <span>
                  <strong>{settings.reliabilityFocus || "99.9%"}</strong>
                  Delivery Reliability Focus
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
                    <strong>Auth Domain MCP</strong>
                    <PlayCircleOutlined />
                  </div>
                  <div className="product-preview-metrics">
                    <div>
                      <strong>{settings.quadrailearnTracks || "18+"}</strong>
                      <span>Auth Workflow Areas</span>
                    </div>
                    <div>
                      <strong>MCP</strong>
                      <span>Inspector-Ready Tooling</span>
                    </div>
                    <div>
                      <strong>Safe</strong>
                      <span>Preview and Apply Modes</span>
                    </div>
                    <div>
                      <strong>Audit</strong>
                      <span>Drift and Update Reports</span>
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
            title="MCP Product Suite"
            subtitle="The product roadmap is MCP-first. Today the live offer is Auth Domain MCP, with future MCP servers planned for adjacent domains."
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
            title="How We Build MCP Products"
            subtitle="Each MCP product is positioned as a reusable server workflow, not a one-off implementation deliverable."
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

      <section className="section products-page-detail-section">
        <div className="section-inner">
          <SectionHeader
            title="Current Product and Roadmap"
            subtitle="Auth Domain MCP is the current product. The other entries show how the suite can expand while staying fully centered on MCP servers."
          />
          <Row gutter={[20, 20]}>
            {productDetailBlocks.map((product) => (
              <Col key={product.title} xs={24} lg={8}>
                <Card className="products-page-detail-card">
                  <Tag className="products-page-detail-eyebrow">{product.eyebrow}</Tag>
                  <Typography.Title level={3}>{product.title}</Typography.Title>
                  <Typography.Paragraph>{product.summary}</Typography.Paragraph>

                  <div className="products-page-detail-group">
                    <Typography.Title level={5}>Built for</Typography.Title>
                    <div className="products-page-detail-list">
                      {product.audience.map((item) => (
                        <span key={item}>
                          <CheckCircleFilled />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="products-page-detail-group">
                    <Typography.Title level={5}>Core capabilities</Typography.Title>
                    <div className="products-page-detail-list">
                      {product.capabilities.map((item) => (
                        <span key={item}>
                          <CheckCircleFilled />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
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
                  Want to Shape the
                  <br />
                  MCP Product Suite?
                </Typography.Title>
                <Typography.Paragraph className="products-page-cta-description">
                  Start with Auth Domain MCP today, or talk with Quadravise about the future MCP server roadmap across
                  additional product domains.
                </Typography.Paragraph>
                <Space size={14} wrap>
                  <Button type="primary" className="hero-btn hero-btn-primary">
                    <Link to={ROUTES.AUTH_DOMAIN_MCP}>Know and Get MCP</Link>
                  </Button>
                  <Button className="hero-btn hero-btn-secondary-contrast">
                    <Link to={ROUTES.CONTACT}>Plan Future MCP Products</Link>
                  </Button>
                </Space>
              </Col>
              <Col xs={24} lg={9}>
                <div className="products-page-cta-points">
                  <span>
                    <CheckCircleFilled />
                    MCP-first product direction
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Safe generation and maintenance workflows
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Expandable multi-product roadmap
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

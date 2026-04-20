import {
  AuditOutlined,
  CheckCircleFilled,
  CodeOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Statistic, Tag, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import McpAccessModal from "../components/products/McpAccessModal";
import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { pageSeo, seoKeywords } from "../constants/seo";
import { mcpCatalog } from "../data/mcpCatalog";

const heroMetrics = [
  { label: "Core auth workflow areas", value: "10+" },
  { label: "Production API groups", value: "2" },
  { label: "Maintenance and reporting layers", value: "5+" }
];

const positioningCards = [
  {
    icon: <CodeOutlined />,
    title: "Generate Faster",
    description: "Generate backend auth modules, frontend auth screens, schemas, migrations, RBAC assets, and tests."
  },
  {
    icon: <AuditOutlined />,
    title: "Audit Existing Systems",
    description: "Compare against live projects, detect drift, identify missing pieces, and prepare update or refactor plans."
  },
  {
    icon: <FileProtectOutlined />,
    title: "Write Safely",
    description: "Use preview-before-write, safe apply modes, path protections, and management-ready reporting."
  }
];

const whatItDoes = [
  "login and signup systems",
  "passkeys and WebAuthn flows",
  "password reset flows",
  "session management",
  "RBAC and permissions",
  "audit logging",
  "security and risk controls",
  "frontend auth screens",
  "backend auth modules",
  "database schema and SQL migrations"
];

const whoItsFor = [
  "founders building SaaS products",
  "agencies delivering client portals",
  "CTOs and engineering managers",
  "backend developers",
  "frontend developers",
  "DevOps and platform teams",
  "security-conscious product teams",
  "management teams that need business-friendly audit reports"
];

const moduleGroups = [
  {
    title: "Generation Stack",
    items: [
      "Backend Generator",
      "Frontend Generator",
      "PostgreSQL Schema Generator",
      "SQL Migration Generator",
      "RBAC Generator",
      "Session and Token Generator",
      "Security and Risk Generator",
      "Audit Generator",
      "Test Generator"
    ]
  },
  {
    title: "Maintenance Workflow",
    items: ["Diff Against Existing Project", "Audit Existing Project", "Update Planning", "Refactor Planning"]
  },
  {
    title: "Safe Apply and Reporting",
    items: ["Preview Before Write", "Safe Apply to Disk", "Path Safety Protection", "Execution Reports", "Audit Reports for Management"]
  }
];

const developerTooling = [
  "inspect registered tools",
  "validate input schemas",
  "run tool calls interactively",
  "verify stdio connectivity before integration",
  "npm run inspect launches MCP Inspector UI",
  "npm run inspect:cli runs the Inspector in CLI mode",
  "Inspector package requires Node 22.7.5 or newer",
  "the MCP server can still run independently with npm start"
];

const businessValue = [
  "launch a new auth system faster",
  "add Passkeys to an existing password stack",
  "standardize auth setup across projects",
  "reduce engineering time spent on boilerplate",
  "audit client systems regularly",
  "update older auth implementations",
  "deliver recurring modernization reviews",
  "produce management-ready audit reports"
];

const productionChecks = [
  "admin login works",
  "customer register works",
  "customer token creation works",
  "customer token listing works",
  "MCP service still healthy",
  "secure bearer auth still enforced on /mcp"
];

function Checklist({ items }) {
  return (
    <div className="auth-mcp-checklist">
      {items.map((item) => (
        <span key={item}>
          <CheckCircleFilled />
          {item}
        </span>
      ))}
    </div>
  );
}

function AuthDomainMcpPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("register");

  const authDomainMcp = mcpCatalog.find((item) => item.key === "auth-domain-mcp");

  function openAuthModal(mode) {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  }

  return (
    <>
      <SEOHead
        title={pageSeo.authDomainMcp.title}
        description={pageSeo.authDomainMcp.description}
        keywords={seoKeywords.authDomainMcp}
        canonical={pageSeo.authDomainMcp.canonical}
      />

      <section className="section auth-mcp-hero-section">
        <div className="section-inner auth-mcp-shell">
          <div className="auth-mcp-hero-grid">
            <div className="auth-mcp-hero-copy-wrap">
              <Tag className="auth-mcp-eyebrow">Live MCP Product</Tag>
              <Typography.Title className="auth-mcp-hero-title">Auth Domain MCP</Typography.Title>
              <Typography.Paragraph className="auth-mcp-hero-copy">
                Auth Domain MCP is a specialized MCP server that helps teams generate, audit, update, refactor, and
                safely write authentication system code.
              </Typography.Paragraph>
              <Typography.Paragraph className="auth-mcp-hero-copy">
                It turns authentication work into a repeatable product workflow instead of forcing teams to rebuild the
                same auth system from scratch for every new project.
              </Typography.Paragraph>
              <Space size={14} wrap>
                <Button type="primary" className="hero-btn hero-btn-primary" onClick={() => openAuthModal("register")}>
                  Register
                </Button>
                <Button className="hero-btn hero-btn-secondary" onClick={() => openAuthModal("login")}>
                  Login
                </Button>
              </Space>
            </div>

            <Card className="auth-mcp-hero-panel">
              <div className="auth-mcp-summary-top">
                <SafetyCertificateOutlined />
                <strong>Production-Ready Auth Product</strong>
              </div>
              <div className="auth-mcp-metric-grid">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="auth-mcp-metric-card">
                    <Statistic value={metric.value} />
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
              <Checklist items={["supports generation, maintenance, and reporting", "works for both one-time setup and recurring auth modernization"]} />
            </Card>
          </div>
        </div>
      </section>

      <section className="section auth-mcp-section auth-mcp-positioning-section">
        <div className="section-inner auth-mcp-shell">
          <Row gutter={[20, 20]}>
            {positioningCards.map((item) => (
              <Col key={item.title} xs={24} md={8}>
                <Card className="auth-mcp-feature-card">
                  <span className="auth-mcp-feature-icon">{item.icon}</span>
                  <Typography.Title level={3}>{item.title}</Typography.Title>
                  <Typography.Paragraph>{item.description}</Typography.Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="section auth-mcp-section">
        <div className="section-inner auth-mcp-shell">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <Card className="auth-mcp-card">
                <Typography.Title level={2}>What This Product Covers</Typography.Title>
                <Typography.Paragraph className="auth-mcp-paragraph">
                  The product is designed for teams working on the full authentication surface, not only simple login
                  screens.
                </Typography.Paragraph>
                <Checklist items={whatItDoes} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="auth-mcp-card">
                <Typography.Title level={2}>Who This Is For</Typography.Title>
                <Typography.Paragraph className="auth-mcp-paragraph">
                  The product fits both technical teams and decision-makers who need more visibility into auth quality,
                  risk, and delivery status.
                </Typography.Paragraph>
                <Checklist items={whoItsFor} />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section auth-mcp-section auth-mcp-section-soft">
        <div className="section-inner auth-mcp-shell">
          <Card className="auth-mcp-card auth-mcp-wide-card">
            <div className="auth-mcp-section-heading">
              <span className="auth-mcp-section-kicker">Core Value</span>
              <Typography.Title level={2}>Repeatable authentication delivery, not one-off auth work</Typography.Title>
            </div>
            <Typography.Paragraph className="auth-mcp-paragraph">
              Auth Domain MCP lets teams choose only the capabilities they need, generate missing auth layers, compare
              output with a live codebase, audit what is outdated, and safely apply approved changes. It also supports
              mixed auth strategies, so teams can keep password-based login, add Passkeys and WebAuthn, or run both
              together.
            </Typography.Paragraph>
            <Checklist items={businessValue} />
          </Card>
        </div>
      </section>

      <section className="section auth-mcp-section">
        <div className="section-inner auth-mcp-shell">
          <div className="auth-mcp-section-heading">
            <span className="auth-mcp-section-kicker">Modules</span>
            <Typography.Title level={2}>Product modules that map to real auth implementation work</Typography.Title>
          </div>
          <Row gutter={[20, 20]}>
            {moduleGroups.map((group) => (
              <Col key={group.title} xs={24} lg={8}>
                <Card className="auth-mcp-card">
                  <Typography.Title level={3}>{group.title}</Typography.Title>
                  <Checklist items={group.items} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="section auth-mcp-section auth-mcp-section-soft">
        <div className="section-inner auth-mcp-shell">
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <Card className="auth-mcp-card">
                <Typography.Title level={3}>Developer Tooling</Typography.Title>
                <Checklist items={developerTooling} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="auth-mcp-card">
                <Typography.Title level={3}>Production Checks Completed</Typography.Title>
                <Checklist items={productionChecks} />
                
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section auth-mcp-cta-section">
        <div className="section-inner auth-mcp-shell">
          <Card className="auth-mcp-cta-card">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} lg={16}>
                <Typography.Title level={2}>Ready to productize authentication work?</Typography.Title>
                <Typography.Paragraph>
                  Use Auth Domain MCP as the first live product in the broader Quadravise MCP suite, or work with us to
                  deploy it into your current delivery workflow.
                </Typography.Paragraph>
              </Col>
              <Col xs={24} lg={8}>
                <Space direction="vertical" size={12} className="auth-mcp-cta-actions">
                  <Button type="primary" className="hero-btn hero-btn-primary" block onClick={() => openAuthModal("register")}>
                    Register
                  </Button>
                  <Button className="hero-btn hero-btn-secondary" onClick={() => openAuthModal("login")} block>
                    Login
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </div>
      </section>

      <McpAccessModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mcp={authDomainMcp}
        initialMode={authModalMode}
      />
    </>
  );
}

export default AuthDomainMcpPage;

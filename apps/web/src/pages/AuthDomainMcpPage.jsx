import {
  AuditOutlined,
  CheckCircleFilled,
  CodeOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
  ToolOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import { useState } from "react";

import McpAccessModal from "../components/products/McpAccessModal";
import SEOHead from "../components/seo/SEOHead";
import { pageSeo, seoKeywords } from "../constants/seo";
import { mcpCatalog } from "../data/mcpCatalog";

const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "coverage", label: "Coverage" },
  { id: "modules", label: "Modules" },
  { id: "maintenance", label: "Maintenance" },
  { id: "tooling", label: "Tooling" },
  { id: "access", label: "Access" }
];

const coreHighlights = [
  "Generate backend auth modules, frontend auth flows, schema, migrations, RBAC assets, and tests.",
  "Audit existing authentication systems, compare against live codebases, and detect drift.",
  "Preview file changes before writing and apply updates with safer path controls."
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

const moduleGroups = [
  {
    title: "Generation",
    icon: <CodeOutlined />,
    items: [
      "Backend Generator",
      "Frontend Generator",
      "PostgreSQL Schema Generator",
      "SQL Migration Generator",
      "RBAC Generator",
      "Session and Token Generator"
    ]
  },
  {
    title: "Security",
    icon: <SafetyCertificateOutlined />,
    items: ["Security and Risk Generator", "Audit Generator", "Test Generator"]
  },
  {
    title: "Maintenance",
    icon: <AuditOutlined />,
    items: ["Diff Against Existing Project", "Audit Existing Project", "Update Planning", "Refactor Planning"]
  },
  {
    title: "Safe Apply",
    icon: <FileProtectOutlined />,
    items: ["Preview Before Write", "Safe Apply to Disk", "Path Safety Protection", "Execution Reports"]
  }
];

const toolingItems = [
  "inspect registered tools",
  "validate input schemas",
  "run tool calls interactively",
  "verify stdio connectivity before integration",
  "npm run inspect launches MCP Inspector UI",
  "npm run inspect:cli runs the Inspector in CLI mode"
];

const maintenanceItems = [
  "Compare generated bundles with files already on disk.",
  "Return findings, drift information, and recommended next actions.",
  "Prepare update bundles for missing or changed files.",
  "Support refactor planning without replacing everything blindly."
];

const productionChecks = [
  "customer register works",
  "customer login works",
  "API token creation works",
  "token listing works",
  "secure bearer auth remains enforced on /mcp"
];

const setupCommand = `# PowerShell
$env:AUTH_DOMAIN_MCP_TOKEN="paste-your-admcp_live-token-here"
codex.cmd mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN`;

function Checklist({ items, columns = 1 }) {
  return (
    <div className={columns === 2 ? "auth-mcp-docs-checklist auth-mcp-docs-checklist-two" : "auth-mcp-docs-checklist"}>
      {items.map((item) => (
        <div key={item} className="auth-mcp-docs-check-item">
          <CheckCircleFilled />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function AuthDomainMcpPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("register");

  const authDomainMcp = mcpCatalog.find((item) => item.key === "quadrauth-mcp");

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

      <section className="section auth-mcp-docs-page">
        <div className="section-inner auth-mcp-docs-shell">
          <div className="auth-mcp-docs-header">
            <div className="auth-mcp-docs-header-main">
              <Space size={8} wrap className="auth-mcp-docs-header-tags">
                <Tag>Authentication</Tag>
                <Tag>Security</Tag>
                <Tag>MCP Server</Tag>
              </Space>
              <Typography.Title className="auth-mcp-docs-title">QUADRAUTH MCP</Typography.Title>
              <Typography.Paragraph className="auth-mcp-docs-summary">
                Authentication product reference and access workspace for generation, audits, updates, refactors, and
                safer auth delivery workflows.
              </Typography.Paragraph>
            </div>
          </div>

          <div className="auth-mcp-docs-layout">
            <aside className="auth-mcp-docs-sidebar">
              <div className="auth-mcp-docs-sidebar-head">
                <Typography.Text strong>Documentation</Typography.Text>
                <Typography.Paragraph>
                  Product reference modeled as a developer docs page rather than a marketing landing page.
                </Typography.Paragraph>
              </div>
              <nav className="auth-mcp-docs-nav">
                {sectionLinks.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="auth-mcp-docs-nav-link">
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <main className="auth-mcp-docs-main">
              <section id="overview" className="auth-mcp-docs-section">
                <Typography.Title level={2}>Overview</Typography.Title>
                <Typography.Paragraph>
                  QUADRAUTH MCP is a specialized MCP server that helps teams generate, audit, update, refactor, and
                  safely write authentication system code. It turns authentication delivery into a repeatable workflow
                  instead of forcing teams to rebuild the same auth stack for every project.
                </Typography.Paragraph>
                <Checklist items={coreHighlights} />
              </section>

              <section id="coverage" className="auth-mcp-docs-section">
                <Typography.Title level={2}>Coverage</Typography.Title>
                <Typography.Paragraph>
                  The product is designed for teams working across the full authentication surface, not only simple
                  login screens.
                </Typography.Paragraph>
                <Checklist items={whatItDoes} columns={2} />
              </section>

              <section id="modules" className="auth-mcp-docs-section">
                <Typography.Title level={2}>Product Modules</Typography.Title>
                <Row gutter={[16, 16]}>
                  {moduleGroups.map((group) => (
                    <Col key={group.title} xs={24} md={12}>
                      <Card className="auth-mcp-docs-module-card">
                        <div className="auth-mcp-docs-module-head">
                          <span>{group.icon}</span>
                          <Typography.Title level={4}>{group.title}</Typography.Title>
                        </div>
                        <Checklist items={group.items} />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </section>

              <section id="maintenance" className="auth-mcp-docs-section">
                <Typography.Title level={2}>Maintenance Workflow</Typography.Title>
                <Typography.Paragraph>
                  This MCP is not only a one-time generator. It supports recurring audits, update planning, drift
                  checks, and safer refactor workflows for existing authentication systems.
                </Typography.Paragraph>
                <Checklist items={maintenanceItems} />
              </section>

              <section id="tooling" className="auth-mcp-docs-section">
                <Typography.Title level={2}>Developer Tooling</Typography.Title>
                <Typography.Paragraph>
                  MCP Inspector support is included for local testing and debugging, alongside the hosted MCP access
                  flow.
                </Typography.Paragraph>
                <Checklist items={toolingItems} />
                <div className="auth-mcp-docs-inline-note">
                  <ToolOutlined />
                  <span>The bundled Inspector package requires Node 22.7.5 or newer. The MCP server can still run independently with npm start.</span>
                </div>
              </section>

              <section id="access" className="auth-mcp-docs-section">
                <Typography.Title level={2}>Access and Connection</Typography.Title>
                <Typography.Paragraph>
                  Hosted usage is built around customer login, token creation, and bearer-authenticated MCP access.
                </Typography.Paragraph>
                <Card className="auth-mcp-docs-command-card">
                  <div className="auth-mcp-docs-command-head">
                    <Typography.Title level={4}>Quick Start Command</Typography.Title>
                    <Tag>PowerShell</Tag>
                  </div>
                  <pre className="auth-mcp-docs-code">{setupCommand}</pre>
                </Card>
              </section>
            </main>

            <aside className="auth-mcp-docs-rail">
              <Card className="auth-mcp-docs-rail-card auth-mcp-docs-rail-card-primary">
                <Typography.Text strong>Access Workspace</Typography.Text>
                <Typography.Paragraph>
                  Register or sign in to create your live MCP token and open the account workspace.
                </Typography.Paragraph>
                <Space direction="vertical" size={12} className="auth-mcp-docs-rail-actions">
                  <Button type="primary" className="auth-mcp-docs-primary-action" block onClick={() => openAuthModal("register")}>
                    Register
                  </Button>
                  <Button className="auth-mcp-docs-secondary-action" block onClick={() => openAuthModal("login")}>
                    Login
                  </Button>
                </Space>
              </Card>

              <Card className="auth-mcp-docs-rail-card">
                <Typography.Text strong>Connection Details</Typography.Text>
                <div className="auth-mcp-docs-keyvals">
                  <span>Server</span>
                  <strong>auth-domain</strong>
                  <span>Endpoint</span>
                  <strong>https://auth-backend.quadravise.com/mcp</strong>
                  <span>Token Env</span>
                  <strong>AUTH_DOMAIN_MCP_TOKEN</strong>
                </div>
              </Card>

              <Card className="auth-mcp-docs-rail-card">
                <Typography.Text strong>Production Checks</Typography.Text>
                <Checklist items={productionChecks} />
              </Card>
            </aside>
          </div>
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

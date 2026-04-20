import {
  AppstoreOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  CodeOutlined,
  FilterOutlined,
  LaptopOutlined,
  LockOutlined,
  RocketOutlined,
  SearchOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Empty, Input, Row, Select, Space, Tag, Typography } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import SectionHeader from "../components/common/SectionHeader";
import McpAccessModal from "../components/products/McpAccessModal";
import SEOHead from "../components/seo/SEOHead";
import { pageSeo, seoKeywords } from "../constants/seo";
import { mcpCatalog } from "../data/mcpCatalog";

const cardIcons = {
  security: <SafetyCertificateOutlined />,
  automation: <AppstoreOutlined />,
  saas: <RocketOutlined />
};

const userGuideSteps = [
  {
    number: "01",
    icon: <LaptopOutlined />,
    title: "Open the main site",
    description: "Start at the Quadravise homepage and open Auth Domain MCP from the Products menu.",
    detail: "Main website: https://quadravise.com",
    actionLabel: "Open Quadravise",
    href: "https://quadravise.com"
  },
  {
    number: "02",
    icon: <SafetyCertificateOutlined />,
    title: "Create your account and log in",
    description: "Register a new account or log in with an existing account to receive your session token.",
    detail: "Session tokens are the login token you use for account actions."
  },
  {
    number: "03",
    icon: <CheckCircleFilled />,
    title: "Create the live MCP token",
    description: "Use the session token to create the MCP token that Codex or VS Code will use.",
    detail: "Session token starts with `admcp_sess_...` and the MCP token starts with `admcp_live_...`.",
    code: `curl -X POST https://auth-backend.quadravise.com/api/tokens \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <your-session-token>" \\
  -d '{
    "label": "My Codex Token",
    "scopes": ["tools:generate"]
  }'`
  },
  {
    number: "04",
    icon: <CodeOutlined />,
    title: "Add the MCP in Codex",
    description: "Set the MCP token as an environment variable and register the hosted MCP server.",
    code: `# PowerShell
$env:AUTH_DOMAIN_MCP_TOKEN="paste-your-admcp_live-token-here"
codex.cmd mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN`,
    actionLabel: "Codex CLI Help",
    href: "https://help.openai.com/en/articles/11096431-openai-codex-ci-getting-started"
  },
  {
    number: "05",
    icon: <CodeOutlined />,
    title: "Restart and verify",
    description: "Restart Codex or VS Code, then run /mcp and confirm auth-domain appears in the list.",
    detail: "If it does not appear, check token type, URL, and restart the app once more."
  }
];

function McpProductsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedMcp, setSelectedMcp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categoryOptions = useMemo(
    () => ["all", ...new Set(mcpCatalog.map((item) => item.category))].map((value) => ({
      value,
      label: value === "all" ? "All Categories" : value
    })),
    []
  );

  const filteredMcps = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return mcpCatalog.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [categoryFilter, searchValue, statusFilter]);

  function openMcpModal(item) {
    setSelectedMcp(item);
    setModalOpen(true);
  }

  return (
    <>
      <SEOHead
        title={pageSeo.mcpProducts.title}
        description={pageSeo.mcpProducts.description}
        keywords={seoKeywords.mcpProducts}
        canonical={pageSeo.mcpProducts.canonical}
      />

      <section className="section mcp-catalog-page-section">
        <div className="section-inner auth-mcp-shell">
          <div className="mcp-catalog-page-hero">
            <div>
              <Typography.Title className="auth-mcp-account-title">Explore Available MCPs</Typography.Title>
              <Typography.Paragraph className="auth-mcp-paragraph mcp-catalog-page-copy">
                Browse the Quadravise MCP catalog, review product summaries, and open access actions directly from a
                focused product dialog.
              </Typography.Paragraph>
            </div>
          </div>

          <Card className="mcp-catalog-toolbar-card">
            <div className="mcp-catalog-toolbar">
              <Input
                allowClear
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Search MCPs by name, tag, or description"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <Select
                size="large"
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "live", label: "Live" },
                  { value: "roadmap", label: "Roadmap" }
                ]}
              />
              <Select size="large" value={categoryFilter} onChange={setCategoryFilter} options={categoryOptions} />
              <div className="mcp-catalog-toolbar-summary">
                <FilterOutlined />
                <span>{filteredMcps.length} MCPs found</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section auth-mcp-guide-section">
        <div className="section-inner auth-mcp-shell">
          <div className="auth-mcp-guide-header">
            <Typography.Title level={2}>Auth Domain MCP User Guide</Typography.Title>
            <Typography.Paragraph className="auth-mcp-paragraph">
              Follow this flow to register, create the correct token, and connect the hosted MCP to Codex.
            </Typography.Paragraph>
          </div>

          <Card className="auth-mcp-guide-launch-card">
            <div className="auth-mcp-guide-launch-content">
              <span className="auth-mcp-guide-launch-icon">
                <SafetyCertificateOutlined />
              </span>
              <div>
                <Typography.Title level={4}>Start here</Typography.Title>
                <Typography.Paragraph>
                  The hosted Auth Domain MCP is the place to create your session token and the live MCP token for Codex.
                </Typography.Paragraph>
              </div>
            </div>
            <Button type="primary" className="hero-btn hero-btn-primary">
              <Link to="/products/auth-domain-mcp">Open Auth Domain MCP</Link>
            </Button>
          </Card>

          <div className="auth-mcp-guide-list">
            {userGuideSteps.map((step) => (
              <Card key={step.number} className="auth-mcp-guide-card">
                <div className="auth-mcp-guide-step">
                  <div className="auth-mcp-guide-rail">
                    <span className="auth-mcp-guide-step-number">{step.number}</span>
                    <span className="auth-mcp-guide-step-line" />
                  </div>

                  <div className="auth-mcp-guide-content">
                    <div className="auth-mcp-guide-content-top">
                      <span className="auth-mcp-guide-icon">{step.icon}</span>
                      <div>
                        <Typography.Title level={4}>{step.title}</Typography.Title>
                        <Typography.Paragraph>{step.description}</Typography.Paragraph>
                      </div>
                    </div>

                    {step.detail ? <Typography.Text className="auth-mcp-guide-note">{step.detail}</Typography.Text> : null}
                    {step.code ? <pre className="auth-mcp-guide-code-block">{step.code}</pre> : null}

                    {step.actionLabel && step.href ? (
                      step.href.startsWith("http") ? (
                        <a href={step.href} target="_blank" rel="noreferrer" className="auth-mcp-guide-link">
                          {step.actionLabel}
                          <ArrowRightOutlined />
                        </a>
                      ) : (
                        <Link to={step.href} className="auth-mcp-guide-link">
                          {step.actionLabel}
                          <ArrowRightOutlined />
                        </Link>
                      )
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section auth-mcp-section">
        <div className="section-inner auth-mcp-shell">
          <SectionHeader
            title="All Available MCPs"
            subtitle="Each MCP is presented as a reusable product card with quick search, status filtering, and direct access actions."
          />

          {filteredMcps.length ? (
            <Row gutter={[20, 20]}>
              {filteredMcps.map((item) => (
                <Col key={item.key} xs={24} md={12} lg={8}>
                  <Card className="mcp-catalog-card" hoverable onClick={() => openMcpModal(item)}>
                    <div className="mcp-catalog-card-top">
                      <span className={`mcp-catalog-card-icon mcp-catalog-card-icon-${item.iconKey}`}>
                        {cardIcons[item.iconKey] || <LockOutlined />}
                      </span>
                      <div className="mcp-catalog-card-tags">
                        <Tag className={`mcp-catalog-status-tag mcp-catalog-status-tag-${item.status.toLowerCase()}`}>
                          {item.status}
                        </Tag>
                        <Tag>{item.category}</Tag>
                      </div>
                    </div>
                    <Typography.Title level={4}>{item.title}</Typography.Title>
                    <Typography.Paragraph>{item.shortDescription}</Typography.Paragraph>
                    <div className="mcp-catalog-card-chip-row">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="mcp-catalog-card-footer">
                      <Button type="primary" className="hero-btn hero-btn-primary" onClick={(event) => {
                        event.stopPropagation();
                        openMcpModal(item);
                      }}>
                        View Access
                      </Button>
                      {item.route ? (
                        <Link
                          to={item.route}
                          className="mcp-catalog-card-link"
                          onClick={(event) => event.stopPropagation()}
                        >
                          Product Page
                        </Link>
                      ) : null}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="auth-mcp-card">
              <Empty description="No MCP matched your search or filters." />
            </Card>
          )}
        </div>
      </section>

      <McpAccessModal open={modalOpen} onClose={() => setModalOpen(false)} mcp={selectedMcp} initialMode="overview" />
    </>
  );
}

export default McpProductsPage;

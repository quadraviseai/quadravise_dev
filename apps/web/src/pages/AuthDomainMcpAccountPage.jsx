import {
  CodeOutlined,
  CopyOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Typography, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { pageSeo, seoKeywords } from "../constants/seo";

const AUTH_BACKEND_URL = "https://auth-backend.quadravise.com";
const AUTH_MCP_TOKEN_KEY = "auth_domain_mcp_token";
const AUTH_MCP_SESSION_KEY = "auth_domain_mcp_session";

const userGuideSteps = [
  {
    step: "01",
    title: "Copy your token",
    description: "Use the copy button above and keep the token ready. This is the value you will use when you connect the MCP."
  },
  {
    step: "02",
    title: "Add the MCP in Codex",
    description: "Add the hosted Auth Domain MCP using your token in Codex or your local setup."
  },
  {
    step: "03",
    title: "Restart and verify",
    description: "Restart the app once and confirm `auth-domain` appears in your MCP list."
  }
];

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function formatPlanLabel(planCode) {
  const normalizedPlan = String(planCode || "").trim().toLowerCase();

  if (!normalizedPlan) return "-";
  if (normalizedPlan === "pro") return "Trial 7 Days";

  return String(planCode);
}

function maskTokenValue(token) {
  const normalizedToken = String(token || "").trim();

  if (!normalizedToken) return "No token available.";
  if (normalizedToken.length <= 18) return normalizedToken;

  return `${normalizedToken.slice(0, 12)}...${normalizedToken.slice(-6)}`;
}

function AuthDomainMcpAccountPage() {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadProfile() {
      const storedToken = localStorage.getItem(AUTH_MCP_TOKEN_KEY) || "";
      const storedSession = localStorage.getItem(AUTH_MCP_SESSION_KEY);

      if (!storedToken) {
        navigate(ROUTES.AUTH_DOMAIN_MCP);
        return;
      }

      setToken(storedToken);
      setSession(storedSession ? JSON.parse(storedSession) : null);

      try {
        const response = await fetch(`${AUTH_BACKEND_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.message || "Unable to load user profile.");
        }

        setProfile(data?.customer || data?.user || data);
      } catch (requestError) {
        setError(requestError.message || "Unable to load user profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem(AUTH_MCP_TOKEN_KEY);
    localStorage.removeItem(AUTH_MCP_SESSION_KEY);
    api.success("Logged out.");
    navigate(ROUTES.AUTH_DOMAIN_MCP);
  }

  async function handleCopyToken() {
    if (!token) {
      api.error("No token available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(token);
      api.success("Token copied.");
    } catch {
      api.error("Unable to copy token.");
    }
  }

  const summaryCards = [
    {
      key: "name",
      label: "Name",
      value: profile?.name || session?.name || "-",
      icon: <UserOutlined />,
      className: "auth-mcp-summary-card auth-mcp-summary-card-name"
    },
    {
      key: "email",
      label: "Email",
      value: profile?.email || session?.email || "-",
      icon: <MailOutlined />,
      className: "auth-mcp-summary-card auth-mcp-summary-card-email"
    },
    {
      key: "plan",
      label: "Plan",
      value: formatPlanLabel(profile?.planCode || session?.planCode),
      icon: <SafetyCertificateOutlined />,
      className: "auth-mcp-summary-card auth-mcp-summary-card-plan"
    }
  ];

  if (loading) {
    return (
      <>
        {contextHolder}
        <section className="section auth-mcp-account-section">
          <div className="section-inner auth-mcp-shell auth-mcp-account-loading">
            <Spin size="large" />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <SEOHead
        title={`${pageSeo.authDomainMcp.title} Account`}
        description={pageSeo.authDomainMcp.description}
        keywords={seoKeywords.authDomainMcp}
        canonical={`${pageSeo.authDomainMcp.canonical}/account`}
      />

      <section className="section auth-mcp-account-section">
        <div className="section-inner auth-mcp-shell">
          <div className="auth-mcp-account-header">
            <div>
              <Typography.Title className="auth-mcp-account-title">Your Auth Domain MCP Account</Typography.Title>
              
            </div>
            <Space wrap>
              
              <Button type="primary" className="hero-btn hero-btn-primary" onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          </div>

          {error ? (
            <Card className="auth-mcp-card">
              <Typography.Title level={3}>Unable to load profile</Typography.Title>
              <Typography.Paragraph className="auth-mcp-paragraph">{error}</Typography.Paragraph>
            </Card>
          ) : (
            <>
              <Row gutter={[20, 20]}>
                {summaryCards.map((item) => (
                  <Col key={item.key} xs={24} md={8}>
                    <Card className={item.className}>
                      <div className="auth-mcp-summary-card-head">
                        <span className="auth-mcp-summary-card-icon">{item.icon}</span>
                        <span className="auth-mcp-summary-card-label">{item.label}</span>
                      </div>
                      <div className="auth-mcp-summary-card-value">{item.value}</div>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row gutter={[20, 20]} className="auth-mcp-account-grid">
                <Col xs={24} lg={12}>
                  <Card className="auth-mcp-card">
                    <Typography.Title level={3}>User Details</Typography.Title>
                    <div className="auth-mcp-account-list">
                      <span><strong>Status:</strong> {profile?.status || "active"}</span>
                      <span><strong>Company:</strong> {profile?.companyName || session?.companyName || "-"}</span>
                      <span><strong>Role:</strong> {session?.role || "customer"}</span>
                      <span><strong>Session Expires:</strong> {formatDateTime(session?.expiresAt)}</span>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card className="auth-mcp-card auth-mcp-token-card">
                    <div className="auth-mcp-token-header">
                      <div className="auth-mcp-token-title-wrap">
                        <span className="auth-mcp-token-icon">
                          <SafetyCertificateOutlined />
                        </span>
                        <div>
                          <Typography.Title level={3}>Current Token</Typography.Title>
                          <span className="auth-mcp-token-label">API access token</span>
                        </div>
                      </div>
                      <Button icon={<CopyOutlined />} onClick={handleCopyToken} disabled={!token}>
                        Copy
                      </Button>
                    </div>
                    <div className="auth-mcp-token-preview-wrap">
                      <span className="auth-mcp-token-preview-icon">
                        <SafetyCertificateOutlined />
                      </span>
                      <div className="auth-mcp-token-preview">{maskTokenValue(token)}</div>
                    </div>
                  </Card>
                </Col>
              </Row>

              <section className="auth-mcp-guide-section">
                <div className="auth-mcp-guide-header">
                  <Typography.Title level={2}>User Guide</Typography.Title>
                  <Typography.Paragraph className="auth-mcp-paragraph">
                    This guide appears only after login. Follow these simple steps to use the Auth Domain MCP.
                  </Typography.Paragraph>
                </div>
                <Card className="auth-mcp-guide-simple-card">
                  <div className="auth-mcp-guide-simple-list">
                    {userGuideSteps.map((step) => (
                      <div key={step.step} className="auth-mcp-guide-simple-item">
                        <span className="auth-mcp-guide-simple-number">{step.step}</span>
                        <div>
                          <Typography.Title level={4}>{step.title}</Typography.Title>
                          <Typography.Paragraph>{step.description}</Typography.Paragraph>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="auth-mcp-guide-simple-code-wrap">
                    <Typography.Title level={4}>Codex setup</Typography.Title>
                    <pre className="auth-mcp-guide-code-block">{`# PowerShell
$env:AUTH_DOMAIN_MCP_TOKEN="paste-your-token-here"
codex.cmd mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN`}</pre>
                    <Typography.Paragraph className="auth-mcp-guide-note">
                      After this, restart Codex once and check that `auth-domain` appears in the MCP list.
                    </Typography.Paragraph>
                  </div>
                  <Space wrap>
                    <Button
                      type="primary"
                      className="hero-btn hero-btn-primary"
                      icon={<CopyOutlined />}
                      onClick={handleCopyToken}
                      disabled={!token}
                    >
                      Copy Token Again
                    </Button>
                    <Button
                      className="hero-btn hero-btn-secondary"
                      icon={<CodeOutlined />}
                      onClick={() =>
                        window.open(
                          "https://help.openai.com/en/articles/11096431-openai-codex-ci-getting-started",
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Codex CLI Help
                    </Button>
                  </Space>
                </Card>
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default AuthDomainMcpAccountPage;

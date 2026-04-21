import {
  ApiOutlined,
  ArrowRightOutlined,
  BookOutlined,
  CodeOutlined,
  MailOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Card, Space, Typography, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { pageSeo, seoKeywords } from "../constants/seo";

const AUTH_BACKEND_URL = "https://auth-backend.quadravise.com";
const AUTH_MCP_TOKEN_KEY = "auth_domain_mcp_token";
const AUTH_MCP_SESSION_KEY = "auth_domain_mcp_session";
const ACCOUNT_SECTIONS = {
  DOCUMENTATION: "documentation",
  API: "api",
  USER_GUIDE: "user-guide",
  PROFILE: "profile"
};
const PRODUCT_CATALOG_CONTENT = `# QUADRAuth  MCP PPRODUCT DOCUMENTATION

## What This Product Is

Auth Domain MCP is a specialized MCP server that helps teams generate, audit, update, refactor, and safely write authentication system code.

It is built for teams working on:

- login and signup systems
- passkeys and WebAuthn flows
- password reset flows
- session management
- RBAC and permissions
- audit logging
- security and risk controls
- frontend auth screens
- backend auth modules
- database schema and SQL migrations

In plain English: it helps a team build and maintain a complete authentication system much faster, with less manual work.

For hosted usage, the product also includes customer-facing management APIs for:

- customer signup
- customer login
- session-based account access
- API token creation
- API token rotation and revocation

This means the same product can both generate auth system artifacts and control customer access to the hosted MCP service.

## Who This Is For

This product is useful for:

- founders building SaaS products
- agencies delivering client portals
- CTOs and engineering managers
- backend developers
- frontend developers
- DevOps and platform teams
- security-conscious product teams

It is also useful for non-technical management because it can generate reports that explain system status in business-friendly language.

## Core Product Value

Auth Domain MCP turns authentication work into a repeatable workflow.

Instead of building auth from scratch every time, the MCP can:

- let teams choose only the auth capabilities they need
- generate auth code
- generate database design
- generate frontend screens
- generate tests
- compare generated output with an existing project
- audit what is missing or outdated
- produce update and refactor plans
- safely write approved files to disk
- generate execution reports
- generate management-friendly audit reports

This makes it useful not only for project setup, but also for recurring maintenance work.

It also supports mixed auth strategies. A team can keep traditional email/password flows, add Passkeys (WebAuthn), or run both together without removing existing auth behavior.

For hosted customers, the access model is simple:

- user logs in with email and password
- login returns a session token
- user creates an MCP API token
- VS Code or Codex uses that MCP API token to connect to \`/mcp\`

## Developer Tooling

The package now includes MCP Inspector support for local testing and debugging.

This helps a team:

- inspect registered tools
- validate input schemas
- run tool calls interactively
- verify \`stdio\` connectivity before integrating the MCP into a client

For local usage:

- \`npm run inspect\` launches the MCP Inspector UI against this server
- \`npm run inspect:cli\` runs the Inspector in CLI mode

Current note:

- the bundled Inspector package requires Node \`22.7.5\` or newer
- the MCP server itself can still be started independently with \`npm start\`

## Product Modules

### 1. Backend Generator

The MCP can generate a full backend auth module.

This includes:

- Express app wiring
- auth routes
- controllers
- services
- repositories
- JWT access token logic
- refresh token logic
- password hashing
- optional passkey/WebAuthn registration and login flow support
- session handling
- logout-all logic
- force-logout logic
- RBAC middleware
- rate limiting
- config files
- DB helpers
- error handling

This helps teams stand up production-style auth backend code quickly.

### 2. Frontend Generator

The MCP can generate frontend auth and security screens.

This includes:

- login page
- signup page
- passkey sign-in page
- passkey registration page
- forgot password page
- reset password page
- change password page
- sessions page
- access denied page
- admin user security page
- route guard component
- session warning modal
- frontend API client
- HTTP helper
- auth state store
- route wiring

This helps frontend teams move faster without rebuilding auth UI from zero.

### 3. PostgreSQL Schema Generator

The MCP can generate a full PostgreSQL authentication schema.

This includes:

- users table
- optional passkey credential tables
- optional WebAuthn challenge storage
- roles table
- permissions table
- role-permission mapping
- user-role mapping
- user sessions
- refresh tokens
- password reset tokens
- trusted devices
- login attempts
- suspicious login events
- audit logs
- indexes
- constraints
- seed data

This helps teams start with a strong database structure instead of guessing.

### 4. SQL Migration Generator

The MCP can generate SQL migration files for auth rollout.

This includes:

- base schema migration
- session migration
- security migration
- seed migration
- optional passkey/WebAuthn migration

This makes database rollout much easier for teams using PostgreSQL.

### 5. RBAC Generator

The MCP can generate role and permission artifacts.

This includes:

- RBAC constants
- permission design
- role mapping
- dashboard routing logic
- authorization middleware support
- RBAC reference docs

This helps teams standardize how access control works across the product.

### 6. Session and Token Generator

The MCP can generate session and token management logic.

This includes:

- access token generation
- refresh token rotation
- session issuance
- revoke single session
- logout all sessions
- admin force logout
- session lifecycle docs

This helps teams manage device sessions and token security more reliably.

The hosted service also uses real customer session and token controls:

- \`admcp_sess_...\` tokens for account login sessions
- \`admcp_live_...\` tokens for MCP access
- customer self-service token creation
- customer self-service token regeneration
- automatic token blocking for suspicious exposure or origin changes

### 7. Security and Risk Generator

The MCP can generate risk and abuse-control logic.

This includes:

- CAPTCHA threshold rules
- account lock logic
- suspicious login detection
- trusted device logic
- risky login event capture
- passkey-aware device and credential risk support
- security rule docs

This helps teams go beyond simple login flows and move toward safer production security.

### 8. Audit Generator

The MCP can generate audit logging support.

This includes:

- audit service logic
- audit event catalog
- event severity mapping
- target and actor metadata support

This helps teams track important security actions in a consistent way.

### 9. Test Generator

The MCP can generate auth-related tests.

This includes:

- login tests
- signup tests
- passkey registration tests
- passkey login tests
- password reset tests
- change password tests
- RBAC tests
- session tests
- logout-all tests
- admin force logout tests
- refresh token tests
- account lock tests
- risk tests
- audit tests
- helper fixtures
- test app setup

This helps teams ship auth systems with better coverage and fewer regressions.

## Maintenance Features

This MCP is not only a one-time code generator.

It also supports ongoing maintenance work.

### 10. Diff Against Existing Project

The MCP can compare generated bundles with files already on disk.

It can detect:

- missing files
- changed files
- blocked paths
- files that already match

This helps teams understand how far a real project has drifted from the current standard.

### 11. Audit Existing Project

The MCP can audit an existing auth module in a project.

It returns:

- summary counts
- findings
- drift information
- recommended next actions

This is useful for internal audits, client audits, and upgrade planning.

### 12. Update Planning

The MCP can prepare an update bundle for:

- missing files
- changed files

This helps teams roll out improvements in a controlled way instead of replacing everything blindly.

### 13. Refactor Planning

The MCP can isolate changed files that should be reviewed or overwritten during refactoring.

This helps teams modernize existing auth modules without losing control.

## Configurable Generation

This MCP can be used in a modular way.

Teams can choose:

- password-based auth only
- Passkeys/WebAuthn only
- password auth plus Passkeys together
- frontend included or excluded
- tests included or excluded

This means a team does not need to remove an existing auth system just to add a new capability.

## Safe Write Features

The MCP can safely write generated bundles to disk.

### 14. Preview Before Write

The MCP can preview what would happen before any file is written.

It returns:

- target root directory
- normalized file paths
- whether a file already exists
- what action would happen
- blocked files
- unsafe paths

This reduces accidental overwrites.

### 15. Safe Apply to Disk

The MCP can write generated bundles to disk using strict rules.

Supported modes:

- \`create_only\`
- \`overwrite\`
- \`skip_existing\`

It also supports:

- \`dryRun\`
- report generation

### 16. Path Safety Protection

The MCP blocks unsafe writes.

It prevents:

- path traversal
- writing outside the allowed root
- blocked directories like \`node_modules\`
- blocked directories like \`.git\`
- blocked files like \`.env\`

This makes it much safer than naive code-writing tools.

## Reporting Features

### 17. Execution Plan and Write Report

The MCP can generate a Markdown execution report for file write operations.

This report can include:

- execution steps
- file actions
- mode used
- dry run status
- final write results

This is useful for engineers and project leads.

### 18. Audit Report for Management

The MCP can generate a Markdown audit report designed for stakeholders who do not read code.

This report includes:

- executive summary
- risk rating
- missing files
- drifted files
- blocked files
- findings
- recommended actions

This is valuable as a management-facing deliverable and can be sold as an audit output.

## Business Value

This MCP can support several business models.

### One-Time Build Value

Use it to:

- launch a new auth system quickly
- add Passkeys to an existing password-based auth stack
- standardize auth setup across projects
- reduce engineering time spent on boilerplate

### Recurring Revenue Value

Use it to:

- audit client systems regularly
- update older auth implementations
- refactor drifting codebases
- provide recurring security and modernization reviews
- deliver management-ready audit reports

This is what turns it from a one-time generator into a recurring maintenance product.

## Example Use Cases

### Startup Team

- generate backend auth module
- generate frontend login and security screens
- optionally include passkey login and registration
- write files into the app
- generate migrations

### Agency Team

- generate auth stack for each client portal
- customize and apply code safely
- produce delivery reports

### Engineering Manager

- audit current auth system
- generate management-facing report
- identify missing security pieces
- plan updates

### Platform Team

- standardize auth implementation across multiple services
- detect drift across repositories
- roll out upgrades safely

## Current Product Position

Auth Domain MCP is best described as:

- an auth code generator
- an auth maintenance tool
- an auth audit tool
- a safe file-writing MCP
- a reporting tool for both engineers and management

## Summary

Auth Domain MCP helps teams build and maintain authentication systems faster, more safely, and with better reporting.

It supports:

- backend generation
- frontend generation
- schema generation
- migration generation
- optional Passkeys/WebAuthn support
- testing
- RBAC
- sessions
- risk controls
- audit logging
- drift detection
- audits
- updates
- refactors
- safe writes
- execution reports
- management audit reports

In plain English: it helps a team build auth, improve auth, and explain auth to both engineers and management.`;

const USER_INSTALLATION_GUIDE_CONTENT = `# Auth Domain MCP User Installation Guide

This guide explains how to connect the hosted \`Auth Domain MCP\` server to Codex.

Hosted MCP endpoint:

\`https://auth-backend.quadravise.com/mcp\`

Required customer bearer token:

\`AUTH_DOMAIN_MCP_TOKEN\`

Important:

- The MCP server uses an API token that starts with \`admcp_live_...\`
- The login API returns a session token that starts with \`admcp_sess_...\`
- VS Code and Codex must use the \`admcp_live_...\` API token, not the login session token

## What This Is

This is a remote MCP server for Codex. It adds auth-domain tools to Codex so users can generate and work with authentication-related backend artifacts and supporting files.

It is not a normal website. The \`/mcp\` URL is a protocol endpoint used by Codex.

## Requirements

Before installation, the user should have:

- Codex CLI installed, or
- The Codex VS Code extension installed
- A working Codex login
- Internet access to \`https://auth-backend.quadravise.com/mcp\`
- An MCP API token starting with \`admcp_live_...\`

## Which Token To Use

There are two different tokens in this system.

### 1. Login session token

This comes from:

- \`POST /api/auth/login\`

It usually starts with:

\`admcp_sess_...\`

This token is for the customer management API only. It is used for actions like:

- checking the logged-in user
- listing tokens
- creating a new API token

Do not paste this token into VS Code or Codex MCP settings.

### 2. MCP API token

This comes from:

- \`POST /api/tokens\`

It usually starts with:

\`admcp_live_...\`

This is the token that must be used in:

- VS Code
- Codex CLI
- Codex MCP configuration

## How To Get The Correct Token

If the user already received an \`admcp_live_...\` token from the seller or admin, they can skip this section.

If not, do this:

1. Log in with email and password
2. Copy the returned session token
3. Use that session token to create an MCP API token
4. Use the new \`admcp_live_...\` token in VS Code or Codex

### Step 1: Log in

\`\`\`bash
curl -X POST https://auth-backend.quadravise.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "YourStrongPassword123"
  }'
\`\`\`

That response returns a session token like:

\`admcp_sess_...\`

### Step 2: Create the MCP API token

Use the session token from login:

\`\`\`bash
curl -X POST https://auth-backend.quadravise.com/api/tokens \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <your-login-session-token>" \\
  -d '{
    "label": "VS Code",
    "scopes": ["tools:generate"]
  }'
\`\`\`

That response returns a real MCP token like:

\`admcp_live_...\`

Use that token in the installation steps below.

## Important Note

Codex CLI and the Codex VS Code extension share the same MCP configuration.

On Windows, the shared config file is usually:

\`C:\\Users\\<your-user>\\.codex\\config.toml\`

This means a server added in the CLI will also appear in VS Code after restart.

## Option 1: Install Using Codex CLI

This is the recommended method.

### Windows PowerShell

Use \`codex.cmd\`:

\`\`\`powershell
$env:AUTH_DOMAIN_MCP_TOKEN="paste-your-admcp_live-token-here"
codex.cmd mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN
\`\`\`

### Windows Command Prompt

\`\`\`cmd
set AUTH_DOMAIN_MCP_TOKEN=paste-your-admcp_live-token-here
codex mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN
\`\`\`

### macOS or Linux

\`\`\`bash
export AUTH_DOMAIN_MCP_TOKEN="paste-your-admcp_live-token-here"
codex mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN
\`\`\`

## Option 2: Install Manually In config.toml

If the user prefers manual setup, the recommended approach is still to use the Codex CLI once, because that writes the correct MCP configuration automatically, including the bearer-token linkage.

Base server block:

\`\`\`toml
[mcp_servers.auth-domain]
url = "https://auth-backend.quadravise.com/mcp"
enabled = true
\`\`\`

If the Codex client does not accept \`-\` in the server name on a specific platform, use this equivalent block instead:

\`\`\`toml
[mcp_servers.auth_domain]
url = "https://auth-backend.quadravise.com/mcp"
enabled = true
\`\`\`

Then use the Codex CLI command shown above so the client stores the token-env-var binding in the format it expects.

## Using It In VS Code

1. Install the Codex extension in VS Code.
2. Configure the MCP server using one of the methods above.
3. Restart VS Code.
4. Open Codex in VS Code.
5. Confirm the MCP server is available.

Because the VS Code extension uses the same Codex config, no separate server URL entry is normally required inside VS Code if the CLI config is already present.

Plain-English version:

1. Put the \`admcp_live_...\` token into the \`AUTH_DOMAIN_MCP_TOKEN\` environment variable
2. Run the \`codex mcp add ...\` command once
3. Restart VS Code
4. Open Codex in VS Code
5. Check \`/mcp\`

## Using It In Codex CLI

1. Open a terminal.
2. Start Codex:

\`\`\`bash
codex
\`\`\`

3. In the Codex TUI, use:

\`\`\`text
/mcp
\`\`\`

4. Confirm that \`auth-domain\` appears in the active MCP server list.

## Verification

The installation is correct if:

- Codex starts without MCP configuration errors
- The server appears in \`/mcp\`
- Codex can access the server tools
- No authentication error appears when the MCP server is contacted

## Troubleshooting

### 1. Browser shows JSON or an MCP error at \`/mcp\`

This is expected.

\`/mcp\` is a protocol endpoint, not a normal web page.

### 2. PowerShell blocks \`codex\`

On some Windows systems, PowerShell blocks \`codex.ps1\` because of execution policy.

Use:

\`\`\`powershell
codex.cmd mcp add auth-domain --url https://auth-backend.quadravise.com/mcp
\`\`\`

### 3. Server does not appear in Codex

Try:

1. Restart Codex
2. Restart VS Code
3. Recheck \`config.toml\`
4. Ensure the token environment variable exists
5. Ensure the URL is exactly:

\`https://auth-backend.quadravise.com/mcp\`

### 4. Network or firewall issue

The user must be able to reach:

- \`https://auth-backend.quadravise.com/mcp\`
- \`https://auth-backend.quadravise.com/healthz\`

### 5. Manual config was added but still not detected

Make sure:

- The file is valid TOML
- The \`[mcp_servers.<name>]\` section is not duplicated incorrectly
- \`enabled = true\` is present
- The server was added using the CLI command if bearer-token binding is required

### 6. Authentication failed

Check:

- The token value is correct
- The token starts with \`admcp_live_...\`, not \`admcp_sess_...\`
- The token was not revoked
- The token was not entered with extra spaces
- The environment variable name matches exactly
- The customer is using the same token that was issued to them

## Customer Support Copy

You can send the following short version to end users:

\`\`\`text
To connect the Auth Domain MCP to Codex, run:

1. Set your token in the environment variable AUTH_DOMAIN_MCP_TOKEN
2. Run:

codex mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN

If you are on Windows PowerShell, use:

codex.cmd mcp add auth-domain --url https://auth-backend.quadravise.com/mcp --bearer-token-env-var AUTH_DOMAIN_MCP_TOKEN

Then restart Codex or VS Code and use /mcp to confirm the server is active.
\`\`\`

## Notes For Resellers

- This guide assumes the MCP server is already hosted and reachable.
- If you change the public domain in the future, update the endpoint everywhere in this document.
- If you offer project-specific installation, you can place the config in a project-local \`.codex/config.toml\` instead of the user-global config.`;

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

function renderCatalogContent(content) {
  const lines = content.split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <Typography.Title key={`h3-${index}`} level={4} className="auth-mcp-account-doc-h3">
          {line.slice(4)}
        </Typography.Title>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <Typography.Title key={`h2-${index}`} level={3} className="auth-mcp-account-doc-h2">
          {line.slice(3)}
        </Typography.Title>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <Typography.Title key={`h1-${index}`} level={2} className="auth-mcp-account-doc-h1">
          {line.slice(2)}
        </Typography.Title>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const fence = line;
      const codeLines = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== fence) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length && lines[index].trim() === fence) {
        index += 1;
      }

      blocks.push(
        <pre key={`code-${index}`} className="auth-mcp-guide-code-block">
          {codeLines.join("\n")}
        </pre>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }

      blocks.push(
        <ul key={`list-${index}`} className="auth-mcp-account-doc-list">
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];

      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ""));
        index += 1;
      }

      blocks.push(
        <ol key={`olist-${index}`} className="auth-mcp-account-doc-olist">
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{item}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraphLines = [];

    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("# ") &&
      !lines[index].trim().startsWith("## ") &&
      !lines[index].trim().startsWith("### ") &&
      !lines[index].trim().startsWith("- ")
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push(
      <Typography.Paragraph key={`p-${index}`} className="auth-mcp-paragraph auth-mcp-account-doc-paragraph">
        {paragraphLines.join(" ")}
      </Typography.Paragraph>
    );
  }

  return blocks;
}

function AuthDomainMcpAccountPage() {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState(ACCOUNT_SECTIONS.DOCUMENTATION);
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

  const accountMenuItems = [
    {
      key: ACCOUNT_SECTIONS.DOCUMENTATION,
      label: "MCP Documentation",
      icon: <BookOutlined />
    },
    {
      key: ACCOUNT_SECTIONS.API,
      label: "API",
      icon: <ApiOutlined />
    },
    {
      key: ACCOUNT_SECTIONS.USER_GUIDE,
      label: "User Guide",
      icon: <ProfileOutlined />
    },
    {
      key: ACCOUNT_SECTIONS.PROFILE,
      label: "Profile",
      icon: <UserOutlined />
    }
  ];

  const profileItems = [
    { label: "Name", value: profile?.name || session?.name || "-", icon: <UserOutlined /> },
    { label: "Email", value: profile?.email || session?.email || "-", icon: <MailOutlined /> },
    { label: "Plan", value: formatPlanLabel(profile?.planCode || session?.planCode), icon: <SafetyCertificateOutlined /> },
    { label: "Status", value: profile?.status || "active", icon: <SafetyCertificateOutlined /> },
    { label: "Company", value: profile?.companyName || session?.companyName || "-", icon: <ProfileOutlined /> },
    { label: "Role", value: session?.role || "customer", icon: <UserOutlined /> },
    { label: "Session Expires", value: formatDateTime(session?.expiresAt), icon: <SafetyCertificateOutlined /> }
  ];

  function renderDocumentationSection() {
    return (
      <div className="auth-mcp-account-panel">
        <div className="auth-mcp-account-doc-content">
          {renderCatalogContent(PRODUCT_CATALOG_CONTENT)}
        </div>
      </div>
    );
  }

  function renderApiSection() {
    return (
      <div className="auth-mcp-account-panel">
        <div className="auth-mcp-account-panel-header">
          <Typography.Title level={2}>API</Typography.Title>
          <Typography.Paragraph className="auth-mcp-paragraph">
            Manage the token used to connect QUADRAUTH MCP and verify when the active session expires.
          </Typography.Paragraph>
        </div>
        <Card className="auth-mcp-card auth-mcp-token-card">
          <div className="auth-mcp-token-header">
            <div className="auth-mcp-token-title-wrap">
              <span className="auth-mcp-token-icon">
                <SafetyCertificateOutlined />
              </span>
              <div>
                <Typography.Title level={3}>API Key</Typography.Title>
                <span className="auth-mcp-token-label">Use this token for Codex MCP access</span>
              </div>
            </div>
            <Button type="text" className="auth-mcp-account-logout-button" onClick={handleCopyToken} disabled={!token}>
              <span>Copy API Key</span>
              <ArrowRightOutlined />
            </Button>
          </div>
          <div className="auth-mcp-token-preview-wrap">
            <span className="auth-mcp-token-preview-icon">
              <SafetyCertificateOutlined />
            </span>
            <div className="auth-mcp-token-preview">{token || "No token available."}</div>
          </div>
          <div className="auth-mcp-account-list auth-mcp-account-token-meta">
            <span><strong>Session expires:</strong> {formatDateTime(session?.expiresAt)}</span>
            <span><strong>Current plan:</strong> {formatPlanLabel(profile?.planCode || session?.planCode)}</span>
          </div>
        </Card>
      </div>
    );
  }

  function renderUserGuideSection() {
    return (
      <div className="auth-mcp-account-panel">
        <div className="auth-mcp-account-doc-content">
          {renderCatalogContent(USER_INSTALLATION_GUIDE_CONTENT)}
        </div>
      </div>
    );
  }

  function renderProfileSection() {
    return (
      <div className="auth-mcp-account-panel">
        <div className="auth-mcp-account-panel-header">
          <Typography.Title level={2}>Profile</Typography.Title>
          <Typography.Paragraph className="auth-mcp-paragraph">
            Current user and session information for your QUADRAUTH MCP account.
          </Typography.Paragraph>
        </div>
        <div className="auth-mcp-account-profile-grid">
          {profileItems.map((item) => (
            <Card key={item.label} className="auth-mcp-account-detail-card">
              <div className="auth-mcp-account-detail-head">
                <span className="auth-mcp-account-detail-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <div className="auth-mcp-account-detail-value">{item.value}</div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  function renderActiveSection() {
    if (activeSection === ACCOUNT_SECTIONS.API) return renderApiSection();
    if (activeSection === ACCOUNT_SECTIONS.USER_GUIDE) return renderUserGuideSection();
    if (activeSection === ACCOUNT_SECTIONS.PROFILE) return renderProfileSection();
    return renderDocumentationSection();
  }

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
              <Typography.Title className="auth-mcp-account-title">Your QUADRAUTH MCP Account</Typography.Title>
              
            </div>
            <Space wrap>
              
              <Button type="text" className="auth-mcp-account-logout-button" onClick={handleLogout}>
                <span>Logout</span>
                <ArrowRightOutlined />
              </Button>
            </Space>
          </div>

          {error ? (
            <Card className="auth-mcp-card">
              <Typography.Title level={3}>Unable to load profile</Typography.Title>
              <Typography.Paragraph className="auth-mcp-paragraph">{error}</Typography.Paragraph>
            </Card>
          ) : (
            <div className="auth-mcp-account-layout">
              <aside className="auth-mcp-account-sidebar">
                <div className="auth-mcp-account-sidebar-head">
                  <Typography.Text strong>Workspace</Typography.Text>
                  <Typography.Paragraph className="auth-mcp-paragraph">
                    Manage documentation, API access, guides, and your account profile.
                  </Typography.Paragraph>
                </div>
                <div className="auth-mcp-account-menu">
                  {accountMenuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={
                        item.key === activeSection
                          ? "auth-mcp-account-menu-item is-active"
                          : "auth-mcp-account-menu-item"
                      }
                      onClick={() => setActiveSection(item.key)}
                    >
                      <span className="auth-mcp-account-menu-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
                <Button
                  type="text"
                  className="auth-mcp-account-sidebar-link"
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
              </aside>
              <div className="auth-mcp-account-content">
                {renderActiveSection()}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AuthDomainMcpAccountPage;

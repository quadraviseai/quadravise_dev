import { ROUTES } from "../constants/routes";

export const mcpCatalog = [
  {
    key: "auth-domain-mcp",
    title: "Auth Domain MCP",
    status: "Live",
    category: "Security",
    iconKey: "security",
    route: ROUTES.AUTH_DOMAIN_MCP,
    shortDescription: "Authentication-focused MCP server for generation, audits, updates, and safer auth delivery workflows.",
    description:
      "Auth Domain MCP helps teams generate, audit, update, refactor, and safely write authentication system code across login, signup, passkeys, session management, RBAC, and audit workflows.",
    whyRequired: [
      "Authentication work is repeated across projects and usually wastes time on the same boilerplate decisions.",
      "Teams need a safer way to audit existing auth implementations before making risky production updates.",
      "Modern auth stacks now include passkeys, RBAC, sessions, and audit controls that are difficult to standardize manually."
    ],
    usp: [
      "Combines generation, audit, update planning, and safer write workflows in one MCP product.",
      "Works for both new auth builds and modernization of existing production codebases.",
      "Turns technical auth work into a repeatable product workflow instead of one-off implementation effort."
    ],
    tags: ["Authentication", "MCP Server", "Code Generation", "Audit"],
    audience: ["SaaS founders", "Agencies", "Platform teams"]
  }
];

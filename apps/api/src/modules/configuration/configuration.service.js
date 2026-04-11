import { configurationRepository } from "./configuration.repository.js";

export function buildDefaultAdminConfiguration() {
  return {
    roles: [
      {
        key: "admin",
        name: "Admin",
        description: "Full access across all configured products and admin tools.",
        productKeys: ["website", "blog", "portfolio", "services", "quadrailearn", "finance", "crm"],
        isActive: true
      },
      {
        key: "manager",
        name: "Manager",
        description: "Operational access for teams managing delivery and publishing.",
        productKeys: ["website", "blog", "portfolio", "services"],
        isActive: true
      },
      {
        key: "editor",
        name: "Editor",
        description: "Content-focused access for publishing and updates.",
        productKeys: ["website", "blog", "portfolio"],
        isActive: true
      }
    ],
    products: [
      {
        key: "website",
        label: "Website",
        description: "Main website content and structure.",
        isActive: true
      },
      {
        key: "blog",
        label: "Blog",
        description: "Blog authoring, publishing, and editorial operations.",
        isActive: true
      },
      {
        key: "portfolio",
        label: "Portfolio",
        description: "Case studies, project pages, and showcase content.",
        isActive: true
      },
      {
        key: "services",
        label: "Services",
        description: "Service pages and commercial messaging.",
        isActive: true
      },
      {
        key: "quadrailearn",
        label: "QuadraiLearn",
        description: "Learning-product content and operations.",
        isActive: true
      },
      {
        key: "finance",
        label: "Finance",
        description: "Finance-related workflows and records.",
        isActive: true
      },
      {
        key: "crm",
        label: "CRM",
        description: "Customer and pipeline management workflows.",
        isActive: true
      }
    ]
  };
}

export const configurationService = {
  async getConfiguration() {
    return (await configurationRepository.getConfiguration()) || buildDefaultAdminConfiguration();
  },

  async updateConfiguration(payload) {
    return configurationRepository.updateConfiguration(payload);
  }
};

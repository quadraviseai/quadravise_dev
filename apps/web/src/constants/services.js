import {
  CloudOutlined,
  GlobalOutlined,
  MobileOutlined,
  RocketOutlined,
  SettingOutlined
} from "@ant-design/icons";

export const servicesData = [
  {
    slug: "web-development",
    tone: "blue",
    title: "Website Development",
    icon: GlobalOutlined,
    description:
      "Modern, high-performance business websites built for speed, SEO, and long-term growth.",
    features: ["Business websites", "Corporate websites", "E-commerce platforms", "Custom web applications"],
    chips: ["Performance", "SEO", "Responsive UI"]
  },
  {
    slug: "mobile-apps",
    tone: "sky",
    title: "Mobile App Development",
    icon: MobileOutlined,
    description:
      "Scalable mobile apps for Android and iOS with robust architecture and smooth user experience.",
    features: ["Android applications", "iOS applications", "Cross-platform apps", "Startup app MVPs"],
    chips: ["Android", "iOS", "Cross-platform"]
  },
  {
    slug: "custom-software-development",
    tone: "gold",
    title: "Custom Software Development",
    icon: SettingOutlined,
    description:
      "Tailored software systems that automate operations and improve business productivity.",
    features: ["Enterprise workflows", "Internal tools", "Automation systems", "API integrations"],
    chips: ["Automation", "Business Ops", "Integrations"]
  },
  {
    slug: "saas-development",
    tone: "green",
    title: "SaaS Development",
    icon: CloudOutlined,
    description:
      "Cloud-ready SaaS products with secure architecture, dashboards, and subscription-ready workflows.",
    features: ["Cloud architecture", "Subscription systems", "User dashboards", "Admin panels"],
    chips: ["Cloud", "SaaS", "Scalable"]
  },
  {
    slug: "startup-mvp-development",
    tone: "orange",
    title: "Startup MVP Development",
    icon: RocketOutlined,
    description:
      "Rapid MVP delivery for founders who need validation-ready products without sacrificing quality.",
    features: ["Rapid prototyping", "MVP release cycles", "Startup-friendly delivery", "Growth-ready architecture"],
    chips: ["MVP", "Fast Launch", "Founders"]
  },
  {
    slug: "product-engineering",
    tone: "blue",
    title: "Product Engineering",
    icon: SettingOutlined,
    description: "End-to-end product engineering for scalable platforms with clean, maintainable architecture.",
    features: ["API architecture", "Module planning", "Quality engineering", "Release management"],
    chips: ["Architecture", "Engineering", "Quality"]
  }
];

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
    title: "WebApp Development & Maintenance",
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
  }
];

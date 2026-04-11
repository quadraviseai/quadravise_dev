import {
  AppstoreOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LinkOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  TeamOutlined,
  UploadOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Segmented,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tabs,
  Typography,
  Upload,
  message
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { adminService } from "../services/adminService";
import { settingsService } from "../services/settingsService";

function slugifyText(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadTime(content = "") {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return `${words ? Math.max(1, Math.round(words / 220)) : 1} min read`;
}

function formatAdminDate(value) {
  if (!value) return "Just now";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Just now";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getClientWorkspacePath(slug = "") {
  return `/client/projects/${slug}/dashboard`;
}

function getClientWorkspaceUrl(slug = "") {
  if (typeof window === "undefined") return getClientWorkspacePath(slug);
  return `${window.location.origin}${getClientWorkspacePath(slug)}`;
}

function getDefaultPortfolioFormValues() {
  return {
    title: "",
    slug: "",
    category: ["General"],
    shortSummary: "",
    description: "",
    detailedDescription: "",
    timeline: "",
    projectStartDate: "",
    projectEndDate: "",
    projectLaunchDate: "",
    projectDuration: "",
    clientSatisfaction: "",
    projectType: "",
    clientName: "",
    clientIndustry: "",
    clientLocation: "",
    clientWebsite: "",
    showClientName: true,
    servicesProvided: [],
    frontendTechnologies: [],
    backendTechnologies: [],
    databaseTechnologies: [],
    engagementType: "",
    teamSize: "",
    projectRole: "",
    businessProblem: "",
    technicalChallenges: "",
    projectGoals: "",
    solutionSummary: "",
    featuresDelivered: [""],
    modulesImplemented: [""],
    integrationsUsed: [],
    architectureOverview: "",
    kpiMetrics: [{ label: "", value: "" }],
    beforeValue: "",
    afterValue: "",
    impactSummary: "",
    outcomeDescription: "",
    techStack: [],
    outcome: "",
    featuredImage: "",
    featuredImageRelativeUrl: "",
    featuredImageAlt: "",
    galleryImages: [],
    videoUrl: "",
    demoUrl: "",
    liveUrl: "",
    designUrl: "",
    documentAttachments: [],
    testimonialContent: "",
    testimonialAuthorName: "",
    testimonialAuthorDesignation: "",
    testimonialAuthorImage: "",
    testimonialRating: "",
    showTestimonial: false,
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
    seoKeywords: [],
    canonicalUrl: "",
    noindex: false,
    showOnHomepage: false,
    sortOrder: 9999,
    projectBadge: [],
    visibility: "public",
    isFeatured: false,
    isConfidential: false,
    isPublished: false
  };
}

function normalizeEditorContent(value = "") {
  if (typeof value !== "string") return "";

  let normalizedValue = value.replace(/\r\n/g, "\n").trim();

  const emptyBlockPattern =
    /<(p|h1|h2|h3|h4|h5|h6|blockquote|pre|li)(?:\s[^>]*)?>\s*(?:<br\s*\/?>|&nbsp;|\u00a0|\s)*<\/\1>/gi;

  do {
    const previous = normalizedValue;
    normalizedValue = normalizedValue.replace(emptyBlockPattern, "");
    if (previous === normalizedValue) break;
  } while (true);

  normalizedValue = normalizedValue
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<(h[1-6]|p|li)>\s+/gi, "<$1>")
    .replace(/\s+<\/(h[1-6]|p|li)>/gi, "</$1>")
    .replace(/<ul>(?:\s|&nbsp;|\u00a0)*<\/ul>/gi, "")
    .replace(/<ol>(?:\s|&nbsp;|\u00a0)*<\/ol>/gi, "")
    .replace(/(?:<p><br><\/p>\s*){2,}/gi, "<p><br></p>")
    .trim();

  return normalizedValue === "<p><br></p>" ? "" : normalizedValue;
}

const BLOG_EDITOR_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["blockquote", "code-block"],
    [{ align: [] }],
    ["link", "image"],
    ["clean"]
  ]
};

const BLOG_EDITOR_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "blockquote",
  "code-block",
  "align",
  "link",
  "image"
];

const FRONTEND_TECHNOLOGY_OPTIONS = [
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt",
  "Angular",
  "TypeScript",
  "JavaScript",
  "Ant Design",
  "Tailwind CSS",
  "Bootstrap",
  "HTML5",
  "CSS3"
];

const BACKEND_TECHNOLOGY_OPTIONS = [
  "Node.js",
  "Express",
  "NestJS",
  "Python",
  "Django",
  "FastAPI",
  "PHP",
  "Laravel",
  "Java",
  "Spring Boot",
  ".NET",
  "Go"
];

const DATABASE_TECHNOLOGY_OPTIONS = [
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "MariaDB",
  "Firebase Firestore",
  "Supabase",
  "DynamoDB",
  "Elasticsearch"
];

const TOOLS_AND_INTEGRATION_OPTIONS = [
  "Stripe",
  "Razorpay",
  "Firebase",
  "Supabase",
  "AWS",
  "Google Cloud",
  "Vercel",
  "Netlify",
  "Docker",
  "Kubernetes",
  "GitHub Actions",
  "HubSpot",
  "Slack",
  "Twilio",
  "SendGrid"
];

function toDateTimeInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (item) => String(item).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function dedupeTagValues(values = []) {
  const seen = new Set();

  return values
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function calculateProjectDuration(startDate, endDate) {
  if (!startDate || !endDate) return "";

  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return "";
  }

  const dayDiff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (dayDiff >= 90) {
    const months = Math.round(dayDiff / 30);
    return `${months} month${months === 1 ? "" : "s"}`;
  }

  if (dayDiff >= 7) {
    const weeks = Math.round(dayDiff / 7);
    return `${weeks} week${weeks === 1 ? "" : "s"}`;
  }

  return `${dayDiff} day${dayDiff === 1 ? "" : "s"}`;
}

function buildTagOptions(predefinedValues = [], dynamicValues = []) {
  return dedupeTagValues([...predefinedValues, ...dynamicValues]).map((value) => ({
    label: value,
    value
  }));
}

function moveItem(values = [], fromIndex, toIndex) {
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return values;
  }

  const nextValues = [...values];
  const [movedItem] = nextValues.splice(fromIndex, 1);
  nextValues.splice(toIndex, 0, movedItem);
  return nextValues;
}

function getVideoEmbedUrl(value = "") {
  if (!value) return "";

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.pathname.replace(/\//g, "")}`;
    }

    if (host.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (host.includes("vimeo.com")) {
      const videoId = url.pathname.split("/").filter(Boolean).pop();
      return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
    }
  } catch {
    return "";
  }

  return "";
}

function isLocalUpload(relativeUrl = "") {
  return String(relativeUrl || "").startsWith("/uploads/");
}

function getPortfolioPreviewStorageKey(projectId, slug) {
  return `quadravise-portfolio-preview:${projectId || slug || "new"}`;
}

function getDefaultBlogFormValues() {
  return {
    category: ["General"],
    author: "Quadravise Team",
    tags: [],
    coverImage: "",
    thumbnailImage: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    readingTime: "",
    status: "draft",
    isFeatured: false,
    importSource: "manual",
    imageStatus: "missing",
    publishToWebsite: false,
    shareToLinkedin: false,
    shareToFacebook: false,
    linkedinAccountId: "",
    facebookAccountId: "",
    linkedinCaption: "",
    facebookCaption: "",
    useFeaturedImageForSocial: true,
    socialPublishAt: "",
    autoShareAfterWebsitePublish: true
  };
}

function getDefaultAdminConfiguration() {
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

function AdminDashboardPage({ section = "dashboard" }) {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();

  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [clientWorkspaceProjects, setClientWorkspaceProjects] = useState([]);
  const [clientWorkspaceUsers, setClientWorkspaceUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [settings, setSettings] = useState(null);
  const [adminConfiguration, setAdminConfiguration] = useState(getDefaultAdminConfiguration());
  const [blogCategories, setBlogCategories] = useState([]);
  const [socialAccounts, setSocialAccounts] = useState([]);

  const [blogTable, setBlogTable] = useState({ page: 1, pageSize: 6, total: 0, search: "" });
  const [portfolioTable, setPortfolioTable] = useState({
    page: 1,
    pageSize: 6,
    total: 0,
    search: "",
    category: "",
    status: "active"
  });
  const [userTable, setUserTable] = useState({ page: 1, pageSize: 6, total: 0, search: "" });
  const [leadTable, setLeadTable] = useState({ page: 1, pageSize: 8, total: 0, search: "" });

  const [blogLoading, setBlogLoading] = useState(true);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [leadLoading, setLeadLoading] = useState(true);
  const [clientAccessLoading, setClientAccessLoading] = useState(true);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [configurationLoading, setConfigurationLoading] = useState(true);
  const [adminSession, setAdminSession] = useState(null);
  const [activeAdminTab, setActiveAdminTab] = useState(section);
  const isDashboardSection = activeAdminTab === "dashboard";

  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingClientProjectId, setEditingClientProjectId] = useState(null);
  const [editingClientUserId, setEditingClientUserId] = useState(null);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [clientProjectModalOpen, setClientProjectModalOpen] = useState(false);
  const [clientUserModalOpen, setClientUserModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editingRoleIndex, setEditingRoleIndex] = useState(null);
  const [blogEditorMode, setBlogEditorMode] = useState("rich");

  const [blogForm] = Form.useForm();
  const [portfolioForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const [clientProjectForm] = Form.useForm();
  const [clientUserForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  const [configurationForm] = Form.useForm();
  const [productForm] = Form.useForm();
  const [roleForm] = Form.useForm();
  const clientProjectNameValue = Form.useWatch("name", { form: clientProjectForm, preserve: true });
  const clientProjectSlugValue = Form.useWatch("slug", { form: clientProjectForm, preserve: true });
  const blogPreviewValues = Form.useWatch([], { form: blogForm, preserve: true }) || {};
  const portfolioPreviewValues = Form.useWatch([], { form: portfolioForm, preserve: true }) || {};
  const draftConfigurationProducts = Form.useWatch("products", { form: configurationForm, preserve: true }) || [];
  const draftConfigurationRoles = Form.useWatch("roles", { form: configurationForm, preserve: true }) || [];
  const projectStartDateValue = Form.useWatch("projectStartDate", { form: portfolioForm, preserve: true });
  const projectEndDateValue = Form.useWatch("projectEndDate", { form: portfolioForm, preserve: true });
  const blogJsonInputRef = useRef(null);
  const portfolioJsonInputRef = useRef(null);
  const portfolioEditorRef = useRef(null);
  const [portfolioSlugTouched, setPortfolioSlugTouched] = useState(false);
  const [selectedPortfolioRowKeys, setSelectedPortfolioRowKeys] = useState([]);
  const [draggedGalleryImageId, setDraggedGalleryImageId] = useState("");
  const [portfolioAutoSaveStatus, setPortfolioAutoSaveStatus] = useState("");
  const [portfolioAnalytics, setPortfolioAnalytics] = useState({ totalViews: 0, totalLinkClicks: 0, topProjects: [] });
  const [portfolioAnalyticsFilters, setPortfolioAnalyticsFilters] = useState({ from: "", to: "" });
  const [portfolioAnalyticsLoading, setPortfolioAnalyticsLoading] = useState(false);
  const portfolioAutoSaveSnapshotRef = useRef("");

  const portfolioTechnologyOptions = useMemo(() => {
    const frontendValues = projects.flatMap((item) => item.frontendTechnologies || []);
    const backendValues = projects.flatMap((item) => item.backendTechnologies || []);
    const databaseValues = projects.flatMap((item) => item.databaseTechnologies || []);
    const integrationValues = projects.flatMap((item) => item.integrationsUsed || []);

    return {
      frontend: buildTagOptions(FRONTEND_TECHNOLOGY_OPTIONS, frontendValues),
      backend: buildTagOptions(BACKEND_TECHNOLOGY_OPTIONS, backendValues),
      database: buildTagOptions(DATABASE_TECHNOLOGY_OPTIONS, databaseValues),
      integrations: buildTagOptions(TOOLS_AND_INTEGRATION_OPTIONS, integrationValues)
    };
  }, [projects]);

  const portfolioVideoPreviewUrl = useMemo(
    () => getVideoEmbedUrl(portfolioPreviewValues.videoUrl),
    [portfolioPreviewValues.videoUrl]
  );
  const activeRoleOptions = useMemo(
    () =>
      (adminConfiguration.roles || [])
        .filter((role) => role.isActive !== false)
        .map((role) => ({
          label: role.name,
          value: role.key
        })),
    [adminConfiguration]
  );
  const activeProductOptions = useMemo(
    () =>
      (adminConfiguration.products || [])
        .filter((product) => product.isActive !== false)
        .map((product) => ({
          label: product.label,
          value: product.key
        })),
    [adminConfiguration]
  );
  const productLabelMap = useMemo(
    () =>
      Object.fromEntries((adminConfiguration.products || []).map((product) => [product.key, product.label || product.key])),
    [adminConfiguration]
  );
  const roleLabelMap = useMemo(
    () => Object.fromEntries((adminConfiguration.roles || []).map((role) => [role.key, role.name || role.key])),
    [adminConfiguration]
  );
  const configurationProductOptions = useMemo(
    () =>
      (draftConfigurationProducts || []).map((product, index) => ({
        label: product?.label || product?.key || `Product ${index + 1}`,
        value: product?.key
      })),
    [draftConfigurationProducts]
  );
  const configurationProductsTableData = useMemo(
    () =>
      (draftConfigurationProducts || []).map((product, index) => ({
        id: product?.key || `product-${index}`,
        index,
        label: product?.label || "",
        key: product?.key || "",
        description: product?.description || "",
        isActive: product?.isActive !== false
      })),
    [draftConfigurationProducts]
  );
  const configurationRolesTableData = useMemo(
    () =>
      (draftConfigurationRoles || []).map((role, index) => ({
        id: role?.key || `role-${index}`,
        index,
        name: role?.name || "",
        key: role?.key || "",
        description: role?.description || "",
        productKeys: role?.productKeys || [],
        isActive: role?.isActive !== false
      })),
    [draftConfigurationRoles]
  );
  const clientWorkspaceUserOptions = useMemo(
    () =>
      clientWorkspaceUsers.map((user) => ({
        label: `${user.fullName} (${user.email})`,
        value: user.id
      })),
    [clientWorkspaceUsers]
  );
  const clientWorkspaceProjectOptions = useMemo(
    () =>
      clientWorkspaceProjects.map((project) => ({
        label: `${project.name} (${project.slug})`,
        value: project.id
      })),
    [clientWorkspaceProjects]
  );

  useEffect(() => {
    const nextDuration = calculateProjectDuration(projectStartDateValue, projectEndDateValue);
    if ((portfolioForm.getFieldValue("projectDuration") || "") !== nextDuration) {
      portfolioForm.setFieldValue("projectDuration", nextDuration);
    }
  }, [portfolioForm, projectEndDateValue, projectStartDateValue]);

  function openCreateBlogModal() {
    navigate(ROUTES.ADMIN_BLOGS);
    setEditingBlogId(null);
    setBlogEditorMode("rich");
    blogForm.resetFields();
    blogForm.setFieldsValue(getDefaultBlogFormValues());
    setBlogModalOpen(true);
  }

  function openCreatePortfolioModal() {
    navigate(ROUTES.ADMIN_PORTFOLIO);
    setEditingProjectId(null);
    setPortfolioSlugTouched(false);
    portfolioForm.resetFields();
    portfolioForm.setFieldsValue(getDefaultPortfolioFormValues());
    setPortfolioModalOpen(true);
    requestAnimationFrame(() => {
      portfolioEditorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function openCreateUserModal() {
    navigate(ROUTES.ADMIN_USERS);
    setEditingUserId(null);
    userForm.resetFields();
    userForm.setFieldValue("role", activeRoleOptions[0]?.value || "manager");
    userForm.setFieldValue("products", []);
    userForm.setFieldValue("isActive", true);
    setUserModalOpen(true);
  }

  function openCreateClientProjectModal() {
    navigate(ROUTES.ADMIN_CLIENT_ACCESS);
    setEditingClientProjectId(null);
    clientProjectForm.resetFields();
    clientProjectForm.setFieldsValue({
      name: "",
      slug: "",
      description: "",
      status: "active",
      clientUserIds: []
    });
    setClientProjectModalOpen(true);
  }

  function openEditClientProjectModal(project) {
    navigate(ROUTES.ADMIN_CLIENT_ACCESS);
    setEditingClientProjectId(project.id);
    clientProjectForm.resetFields();
    clientProjectForm.setFieldsValue({
      name: project.name,
      slug: project.slug,
      description: project.description || "",
      status: project.status || "active",
      clientUserIds: (project.assignedUsers || []).map((user) => user.id)
    });
    setClientProjectModalOpen(true);
  }

  useEffect(() => {
    if (!clientProjectModalOpen) return;
    const nextSlug = slugifyText(clientProjectNameValue || "");
    if ((clientProjectSlugValue || "") !== nextSlug) {
      clientProjectForm.setFieldValue("slug", nextSlug);
    }
  }, [clientProjectForm, clientProjectModalOpen, clientProjectNameValue, clientProjectSlugValue]);

  function openCreateClientUserModal() {
    navigate(ROUTES.ADMIN_CLIENT_ACCESS);
    setEditingClientUserId(null);
    clientUserForm.resetFields();
    clientUserForm.setFieldsValue({
      fullName: "",
      email: "",
      password: "",
      isActive: true,
      projectIds: []
    });
    setClientUserModalOpen(true);
  }

  function openEditClientUserModal(user) {
    navigate(ROUTES.ADMIN_CLIENT_ACCESS);
    setEditingClientUserId(user.id);
    clientUserForm.resetFields();
    clientUserForm.setFieldsValue({
      fullName: user.fullName,
      email: user.email,
      password: "",
      isActive: user.isActive !== false,
      projectIds: (user.assignedProjects || []).map((project) => project.id)
    });
    setClientUserModalOpen(true);
  }

  function downloadBlogJsonTemplate() {
    const template = {
      title: "How to Build a SaaS Product from Scratch",
      slug: "how-to-build-a-saas-product-from-scratch",
      category: "SaaS Development",
      tags: ["SaaS", "Startup", "Architecture"],
      excerpt: "A practical roadmap for founders moving from idea validation to launch.",
      content: "<h2>Introduction</h2><p>Building a SaaS product requires structured planning...</p>",
      meta_title: "How to Build a SaaS Product from Scratch | Quadravise",
      meta_description: "Learn how to build a SaaS platform from validation to launch."
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "quadravise-blog-template.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  }

  function downloadPortfolioJsonTemplate() {
    const template = {
      title: "Startup SaaS Platform",
      slug: "startup-saas-platform",
      slug_manually_edited: false,
      short_summary: "A concise snapshot of the project outcome and business value.",
      category: "SaaS",
      description: "A portfolio-ready summary of the project scope, delivery, and business outcome.",
      detailed_description: "<p>Rich text project description with <strong>key milestones</strong>, lists, and links.</p>",
      canonical_url: "https://www.quadravise.com/portfolio/startup-saas-platform",
      noindex: false,
      show_on_homepage: true,
      sort_order: 10,
      project_badge: "Featured",
      visibility: "public",
      project_type: "Web App",
      project_start_date: "2026-01-01",
      project_end_date: "2026-02-01",
      project_launch_date: "2026-02-05",
      project_duration: "4 weeks",
      client_name: "Acme Labs",
      client_industry: "SaaS",
      client_location: "San Francisco, USA",
      client_website: "https://example.com",
      show_client_name: true,
      timeline: "8 weeks",
      client_satisfaction: "95% satisfied",
      services_provided: ["Product Strategy", "UI Engineering", "Backend Development"],
      engagement_type: "End-to-end product build",
      team_size: 5,
      project_role: "Technical partner and delivery lead",
      business_problem: "The client needed to replace fragmented manual onboarding with a self-serve SaaS workflow.",
      technical_challenges: "Multi-tenant architecture, payments, and role-based admin workflows had to launch within a tight timeline.",
      project_goals: "Launch an MVP quickly, reduce onboarding friction, and establish a scalable backend foundation.",
      solution_summary: "<p>Quadravise designed and built a product-focused SaaS experience with admin operations, payments, and analytics.</p>",
      features_delivered: ["Self-serve onboarding", "Admin dashboard", "Role-based access", "Subscription billing"],
      modules_implemented: ["Authentication", "Billing", "Project management", "Admin reporting"],
      frontend_technologies: ["React", "Ant Design"],
      backend_technologies: ["Node.js", "Express"],
      database_technologies: ["PostgreSQL"],
      integrations_used: ["Stripe", "Slack"],
      architecture_overview: "<p>React frontend backed by an Express API and PostgreSQL, with modular services for billing and notifications.</p>",
      kpi_metrics: [
        {
          label: "Onboarding completion rate",
          value: "84%"
        },
        {
          label: "Operational time reduced",
          value: "60%"
        }
      ],
      before_value: "Manual onboarding in 2-3 business days",
      after_value: "Self-serve onboarding in under 15 minutes",
      impact_summary: "The client reduced ops overhead, accelerated onboarding, and launched a scalable subscription workflow.",
      outcome_description: "The MVP launched with strong admin usability, faster client onboarding, and measurable operational gains.",
      featured_image_alt: "Dashboard view of the SaaS platform",
      gallery_images: [
        {
          id: "gallery-1",
          url: "https://example.com/gallery-1.jpg",
          altText: "Analytics dashboard overview"
        }
      ],
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      demo_url: "https://demo.example.com",
      live_url: "https://app.example.com",
      design_url: "https://www.figma.com/file/example",
      document_attachments: [
        {
          id: "document-1",
          title: "Project Case Study PDF",
          url: "https://example.com/case-study.pdf",
          fileName: "case-study.pdf"
        }
      ],
      testimonial_content: "<p>Quadravise brought structure, speed, and strong product thinking to the project.</p>",
      testimonial_author_name: "Jane Cooper",
      testimonial_author_designation: "Product Manager, Acme Labs",
      testimonial_author_image: "https://example.com/jane-cooper.jpg",
      testimonial_rating: 5,
      show_testimonial: true,
      meta_title: "Startup SaaS Platform Case Study | Quadravise",
      meta_description: "See how Quadravise delivered a SaaS platform with admin workflows, integrations, and scalable architecture.",
      og_image: "https://example.com/portfolio-og.jpg",
      seo_keywords: ["startup saas case study", "react node postgresql project", "quadravise portfolio"],
      tech_stack: ["React", "Ant Design", "Node.js", "Express", "PostgreSQL", "Stripe", "Slack"],
      outcome: "Launched an MVP with admin workflows and scalable architecture.",
      featured_image: "https://example.com/portfolio-cover.jpg",
      view_count: 0,
      link_click_count: 0,
      is_featured: true,
      is_confidential: false,
      is_published: true,
      is_archived: false
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "quadravise-portfolio-template.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  }

  async function loadSettings() {
    try {
      setSettingsLoading(true);
      const settingsRes = await settingsService.getSettings();
      const settingsData = settingsRes.data || {};
      setSettings(settingsData);
      settingsForm.setFieldsValue(settingsData);
    } catch (_error) {
      api.error("Failed to load settings.");
    } finally {
      setSettingsLoading(false);
    }
  }

  async function loadAdminConfiguration() {
    try {
      setConfigurationLoading(true);
      const response = await adminService.getConfiguration();
      const configurationData = response.data || getDefaultAdminConfiguration();
      setAdminConfiguration(configurationData);
      configurationForm.setFieldsValue(configurationData);
    } catch (_error) {
      const fallback = getDefaultAdminConfiguration();
      setAdminConfiguration(fallback);
      configurationForm.setFieldsValue(fallback);
      api.error("Failed to load configuration.");
    } finally {
      setConfigurationLoading(false);
    }
  }

  async function loadAdminSession() {
    try {
      const response = await adminService.me();
      setAdminSession(response?.data || null);
    } catch (_error) {
      setAdminSession(null);
    }
  }

  async function loadBlogCategories() {
    try {
      const response = await adminService.getBlogCategories();
      const items = response.data || [];
      setBlogCategories(items.map((item) => item.name).filter(Boolean));
    } catch (_error) {
      setBlogCategories([]);
    }
  }

  async function loadSocialAccounts() {
    try {
      const response = await adminService.getSocialAccounts();
      setSocialAccounts(response.data || []);
    } catch (_error) {
      setSocialAccounts([]);
    }
  }

  async function fetchBlogs(overrides = {}) {
    try {
      setBlogLoading(true);
      const next = { ...blogTable, ...overrides };
      const response = await adminService.getBlogs({
        page: next.page,
        pageSize: next.pageSize,
        search: next.search || undefined
      });
      const payload = response.data || {};
      const pagination = payload.pagination || {};
      setBlogs(payload.items || []);
      setBlogTable((prev) => ({
        ...prev,
        ...next,
        page: pagination.page || next.page,
        pageSize: pagination.pageSize || next.pageSize,
        total: pagination.total || 0
      }));
    } catch (_error) {
      api.error("Failed to load blogs.");
    } finally {
      setBlogLoading(false);
    }
  }

  async function fetchPortfolio(overrides = {}) {
    try {
      setPortfolioLoading(true);
      const next = { ...portfolioTable, ...overrides };
      const response = await adminService.getPortfolio({
        page: next.page,
        pageSize: next.pageSize,
        search: next.search || undefined,
        category: next.category || undefined,
        status: next.status || undefined
      });
      const payload = response.data || {};
      const pagination = payload.pagination || {};
      setProjects(payload.items || []);
      setPortfolioTable((prev) => ({
        ...prev,
        ...next,
        page: pagination.page || next.page,
        pageSize: pagination.pageSize || next.pageSize,
        total: pagination.total || 0
      }));
    } catch (_error) {
      api.error("Failed to load portfolio.");
    } finally {
      setPortfolioLoading(false);
    }
  }

  async function loadPortfolioAnalytics(overrides = {}) {
    try {
      setPortfolioAnalyticsLoading(true);
      const nextFilters = { ...portfolioAnalyticsFilters, ...overrides };
      const response = await adminService.getPortfolioAnalytics({
        from: nextFilters.from || undefined,
        to: nextFilters.to || undefined
      });

      setPortfolioAnalyticsFilters(nextFilters);
      setPortfolioAnalytics(response.data || { totalViews: 0, totalLinkClicks: 0, topProjects: [] });
    } catch (_error) {
      api.error("Failed to load portfolio analytics.");
    } finally {
      setPortfolioAnalyticsLoading(false);
    }
  }

  async function fetchUsers(overrides = {}) {
    try {
      setUserLoading(true);
      const next = { ...userTable, ...overrides };
      const response = await adminService.getUsers({
        page: next.page,
        pageSize: next.pageSize,
        search: next.search || undefined
      });
      const payload = response.data || {};
      const pagination = payload.pagination || {};
      setUsers(payload.items || []);
      setUserTable((prev) => ({
        ...prev,
        ...next,
        page: pagination.page || next.page,
        pageSize: pagination.pageSize || next.pageSize,
        total: pagination.total || 0
      }));
    } catch (_error) {
      api.error("Failed to load users.");
    } finally {
      setUserLoading(false);
    }
  }

  async function fetchLeads(overrides = {}) {
    try {
      setLeadLoading(true);
      const next = { ...leadTable, ...overrides };
      const response = await adminService.getLeads({
        page: next.page,
        pageSize: next.pageSize,
        search: next.search || undefined
      });
      const payload = response.data || {};
      const pagination = payload.pagination || {};
      setLeads(payload.items || []);
      setLeadTable((prev) => ({
        ...prev,
        ...next,
        page: pagination.page || next.page,
        pageSize: pagination.pageSize || next.pageSize,
        total: pagination.total || 0
      }));
    } catch (_error) {
      api.error("Failed to load consultation requests.");
    } finally {
      setLeadLoading(false);
    }
  }

  async function fetchClientAccessOverview() {
    try {
      setClientAccessLoading(true);
      const response = await adminService.getClientAccessOverview();
      const payload = response.data || {};
      setClientWorkspaceProjects(payload.projects || []);
      setClientWorkspaceUsers(payload.users || []);
    } catch (_error) {
      api.error("Failed to load client access workspace.");
    } finally {
      setClientAccessLoading(false);
    }
  }

  async function saveClientProject(values) {
    try {
      if (editingClientProjectId) {
        await adminService.updateClientProject(editingClientProjectId, values);
        api.success("Client project updated successfully.");
      } else {
        await adminService.createClientProject(values);
        api.success("Client project created successfully.");
      }
      setClientProjectModalOpen(false);
      setEditingClientProjectId(null);
      clientProjectForm.resetFields();
      fetchClientAccessOverview();
    } catch (error) {
      const details = error?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || error?.response?.data?.message || "Failed to save client project.");
    }
  }

  async function saveClientUser(values) {
    try {
      if (editingClientUserId) {
        await adminService.updateClientUser(editingClientUserId, values);
        api.success("Client user updated successfully.");
      } else {
        await adminService.createClientUser(values);
        api.success("Client user created successfully.");
      }
      setClientUserModalOpen(false);
      setEditingClientUserId(null);
      clientUserForm.resetFields();
      fetchClientAccessOverview();
    } catch (error) {
      const details = error?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || error?.response?.data?.message || "Failed to save client user.");
    }
  }

  async function copyClientWorkspaceLink(slug) {
    try {
      await navigator.clipboard.writeText(getClientWorkspaceUrl(slug));
      api.success("Client workspace link copied.");
    } catch (_error) {
      api.error("Unable to copy the workspace link.");
    }
  }

  useEffect(() => {
    loadAdminSession();
    loadSettings();
    loadAdminConfiguration();
    loadBlogCategories();
    loadSocialAccounts();
    fetchBlogs();
    fetchPortfolio();
    loadPortfolioAnalytics();
    fetchUsers();
    fetchLeads();
    fetchClientAccessOverview();
  }, []);

  useEffect(() => {
    if (!portfolioModalOpen) {
      setPortfolioAutoSaveStatus("");
      portfolioAutoSaveSnapshotRef.current = "";
      return;
    }

    portfolioAutoSaveSnapshotRef.current = JSON.stringify(portfolioForm.getFieldsValue(true));

    const intervalId = window.setInterval(() => {
      const values = portfolioForm.getFieldsValue(true);
      const serializedValues = JSON.stringify(values);

      if (serializedValues === portfolioAutoSaveSnapshotRef.current) {
        return;
      }

      const previewKey = getPortfolioPreviewStorageKey(editingProjectId, values.slug || slugifyText(values.title || ""));
      window.localStorage.setItem(
        previewKey,
        JSON.stringify({
          ...values,
          savedAt: new Date().toISOString()
        })
      );
      portfolioAutoSaveSnapshotRef.current = serializedValues;
      setPortfolioAutoSaveStatus(
        `Auto-saved locally at ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
      );
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, [editingProjectId, portfolioForm, portfolioModalOpen]);

  const blogColumns = useMemo(
    () => [
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Category", dataIndex: "category", key: "category" },
      { title: "Slug", dataIndex: "slug", key: "slug" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (value) => <Tag color={value === "published" ? "green" : value === "archived" ? "default" : "orange"}>{value}</Tag>
      },
      {
        title: "Import Source",
        dataIndex: "importSource",
        key: "importSource",
        render: (value) => <Tag color={value === "json" ? "blue" : "default"}>{value === "json" ? "JSON" : "Manual"}</Tag>
      },
      {
        title: "Image Status",
        dataIndex: "imageStatus",
        key: "imageStatus",
        render: (value) => (
          <Tag color={value === "uploaded" ? "green" : "volcano"}>{value === "uploaded" ? "Image Uploaded" : "Image Missing"}</Tag>
        )
      },
      {
        title: "Action",
        key: "action",
        render: (_, row) => (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={async () => {
                try {
                  const response = await adminService.getBlogById(row.id);
                  const blog = response.data;
                  setEditingBlogId(row.id);
                  setBlogEditorMode("rich");
                  blogForm.setFieldsValue({
                    title: blog.title,
                    slug: blog.slug,
                    category: blog.category ? [blog.category] : [],
                    tags: blog.tags || [],
                    excerpt: blog.excerpt,
                    readingTime: blog.readingTime || "",
                    coverImage: blog.coverImage || blog.featuredImage || "",
                    thumbnailImage: blog.thumbnailImage || "",
                    metaTitle: blog.metaTitle || "",
                    metaDescription: blog.metaDescription || "",
                    canonicalUrl: blog.canonicalUrl || "",
                    ogTitle: blog.ogTitle || "",
                    ogDescription: blog.ogDescription || "",
                    ogImage: blog.ogImage || "",
                    content: blog.content,
                    author: blog.author,
                    status: blog.status || "published",
                    publishedAt: toDateTimeInputValue(blog.publishedAt),
                    isFeatured: Boolean(blog.isFeatured),
                    importSource: blog.importSource || "manual",
                    imageStatus: blog.imageStatus || (blog.coverImage || blog.featuredImage ? "uploaded" : "missing"),
                    publishToWebsite: blog.distribution?.publishToWebsite ?? true,
                    shareToLinkedin: blog.distribution?.shareToLinkedin ?? false,
                    shareToFacebook: blog.distribution?.shareToFacebook ?? false,
                    linkedinAccountId: blog.distribution?.linkedinAccountId || "",
                    facebookAccountId: blog.distribution?.facebookAccountId || "",
                    linkedinCaption: blog.distribution?.linkedinCaption || "",
                    facebookCaption: blog.distribution?.facebookCaption || "",
                    useFeaturedImageForSocial: blog.distribution?.useFeaturedImageForSocial ?? true,
                    socialPublishAt: toDateTimeInputValue(blog.distribution?.socialPublishAt),
                    autoShareAfterWebsitePublish: blog.distribution?.autoShareAfterWebsitePublish ?? true
                  });
                  setBlogModalOpen(true);
                } catch (_error) {
                  api.error("Failed to load blog details.");
                }
              }}
            >
              Edit
            </Button>
            <Button type="text" onClick={() => window.open(`${ROUTES.BLOG_PREVIEW}/${row.slug}`, "_blank", "noopener,noreferrer")}>
              Preview
            </Button>
            <Upload
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  await adminService.uploadBlogCoverImage(row.id, file);
                  api.success("Blog image uploaded.");
                  fetchBlogs();
                  onSuccess?.({});
                } catch (error) {
                  api.error(error?.response?.data?.message || "Image upload failed.");
                  onError?.(error);
                }
              }}
            >
              <Button type="text">Upload Image</Button>
            </Upload>
            {row.status !== "published" ? (
              <Button
                type="text"
                onClick={async () => {
                  try {
                    await adminService.publishBlog(row.id);
                    api.success("Blog published.");
                    fetchBlogs();
                  } catch (error) {
                    api.error(error?.response?.data?.message || "Failed to publish blog.");
                  }
                }}
              >
                Publish
              </Button>
            ) : null}
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={async () => {
                try {
                  await adminService.deleteBlog(row.id);
                  api.success("Blog deleted.");
                  fetchBlogs();
                } catch (_error) {
                  api.error("Failed to delete blog.");
                }
              }}
            >
              Delete
            </Button>
          </Space>
        )
      }
    ],
    [api, blogForm]
  );

  const portfolioColumns = useMemo(
    () => [
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Category", dataIndex: "category", key: "category" },
      {
        title: "Status",
        key: "status",
        render: (_, row) => (
          <Tag color={row.isArchived ? "default" : row.isPublished ? "green" : "orange"}>
            {row.isArchived ? "Archived" : row.isPublished ? "Published" : "Draft"}
          </Tag>
        )
      },
      {
        title: "Last Updated",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (value) => formatAdminDate(value)
      },
      {
        title: "Action",
        key: "action",
        render: (_, row) => (
          <Space>
            <Button type="text" icon={<EyeOutlined />} onClick={() => openPortfolioRowPreview(row)}>
              View
            </Button>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingProjectId(row.id);
                setPortfolioSlugTouched(false);
                portfolioForm.setFieldsValue({
                  title: row.title,
                  slug: row.slug || "",
                  category: row.category ? [row.category] : [],
                  shortSummary: row.shortSummary || "",
                  description: row.description,
                  detailedDescription: row.detailedDescription || "",
                  timeline: row.timeline || "",
                  projectStartDate: row.projectStartDate || "",
                  projectEndDate: row.projectEndDate || "",
                  projectLaunchDate: row.projectLaunchDate || "",
                  projectDuration: row.projectDuration || "",
                  clientSatisfaction: row.clientSatisfaction || "",
                  projectType: row.projectType || "",
                  clientName: row.clientName || "",
                  clientIndustry: row.clientIndustry || "",
                  clientLocation: row.clientLocation || "",
                  clientWebsite: row.clientWebsite || "",
                  showClientName: row.showClientName !== false,
                  servicesProvided: row.servicesProvided || [],
                  frontendTechnologies: row.frontendTechnologies || [],
                  backendTechnologies: row.backendTechnologies || [],
                  databaseTechnologies: row.databaseTechnologies || [],
                  engagementType: row.engagementType || "",
                  teamSize: row.teamSize || "",
                  projectRole: row.projectRole || "",
                  businessProblem: row.businessProblem || "",
                  technicalChallenges: row.technicalChallenges || "",
                  projectGoals: row.projectGoals || "",
                  solutionSummary: row.solutionSummary || "",
                  featuresDelivered: row.featuresDelivered?.length ? row.featuresDelivered : [""],
                  modulesImplemented: row.modulesImplemented?.length ? row.modulesImplemented : [""],
                  integrationsUsed: row.integrationsUsed || [],
                  architectureOverview: row.architectureOverview || "",
                  kpiMetrics: row.kpiMetrics?.length ? row.kpiMetrics : [{ label: "", value: "" }],
                  beforeValue: row.beforeValue || "",
                  afterValue: row.afterValue || "",
                  impactSummary: row.impactSummary || "",
                  outcomeDescription: row.outcomeDescription || "",
                  techStack: row.techStack || [],
                  outcome: row.outcome || "",
                  featuredImage: row.featuredImage || "",
                  featuredImageRelativeUrl: "",
                  featuredImageAlt: row.featuredImageAlt || "",
                  galleryImages: row.galleryImages || [],
                  videoUrl: row.videoUrl || "",
                  demoUrl: row.demoUrl || "",
                  liveUrl: row.liveUrl || "",
                  designUrl: row.designUrl || "",
                  documentAttachments: row.documentAttachments || [],
                  testimonialContent: row.testimonialContent || "",
                  testimonialAuthorName: row.testimonialAuthorName || "",
                  testimonialAuthorDesignation: row.testimonialAuthorDesignation || "",
                  testimonialAuthorImage: row.testimonialAuthorImage || "",
                  testimonialRating: row.testimonialRating || "",
                  showTestimonial: Boolean(row.showTestimonial),
                  metaTitle: row.metaTitle || "",
                  metaDescription: row.metaDescription || "",
                  ogImage: row.ogImage || "",
                  seoKeywords: row.seoKeywords || [],
                  canonicalUrl: row.canonicalUrl || "",
                  noindex: Boolean(row.noindex),
                  showOnHomepage: Boolean(row.showOnHomepage),
                  sortOrder: row.sortOrder ?? 9999,
                  projectBadge: row.projectBadge ? [row.projectBadge] : [],
                  visibility: row.visibility || "public",
                  updatedAt: row.updatedAt || "",
                  createdByUserId: row.createdByUserId || "",
                  lastModifiedByUserId: row.lastModifiedByUserId || "",
                  viewCount: row.viewCount || 0,
                  linkClickCount: row.linkClickCount || 0,
                  isFeatured: Boolean(row.isFeatured),
                  isConfidential: Boolean(row.isConfidential),
                  isPublished: Boolean(row.isPublished)
                });
                setPortfolioModalOpen(true);
                requestAnimationFrame(() => {
                  portfolioEditorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                });
              }}
            >
              Edit
            </Button>
            <Button type="text" icon={<CopyOutlined />} onClick={() => duplicateProject(row)}>
              Duplicate
            </Button>
            <Upload
              showUploadList={false}
              accept="image/*"
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  await adminService.uploadPortfolioImage(row.id, file);
                  api.success("Portfolio image uploaded.");
                  fetchPortfolio();
                  onSuccess?.({});
                } catch (error) {
                  api.error(error?.response?.data?.message || "Image upload failed.");
                  onError?.(error);
                }
              }}
            >
              <Button type="text">Upload Image</Button>
            </Upload>
            <Button
              type="text"
              onClick={() => setProjectArchiveState(row, !row.isArchived)}
            >
              {row.isArchived ? "Restore" : "Archive"}
            </Button>
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: "Delete this project?",
                  content: `This will permanently remove "${row.title}".`,
                  okText: "Delete Project",
                  okButtonProps: { danger: true },
                  cancelText: "Cancel",
                  onOk: async () => {
                    try {
                      await adminService.deletePortfolio(row.id);
                      api.success("Project deleted.");
                      fetchPortfolio();
                      loadPortfolioAnalytics();
                      if (editingProjectId === row.id) {
                        setEditingProjectId(null);
                        setPortfolioModalOpen(false);
                        setPortfolioSlugTouched(false);
                        portfolioForm.resetFields();
                        portfolioForm.setFieldsValue(getDefaultPortfolioFormValues());
                      }
                    } catch (_error) {
                      api.error("Failed to delete project.");
                    }
                  }
                });
              }}
            >
              Delete
            </Button>
          </Space>
        )
      }
    ],
    [api, portfolioForm]
  );

  const userColumns = useMemo(
    () => [
      { title: "Name", dataIndex: "fullName", key: "fullName" },
      { title: "Email", dataIndex: "email", key: "email" },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (value) => roleLabelMap[value] || value
      },
      {
        title: "Products",
        key: "products",
        render: (_, row) => (row.products || []).map((product) => productLabelMap[product] || product).join(", ")
      },
      {
        title: "Status",
        key: "isActive",
        render: (_, row) => (row.isActive ? "Active" : "Disabled")
      },
      {
        title: "Action",
        key: "action",
        render: (_, row) => (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingUserId(row.id);
                userForm.setFieldsValue({
                  fullName: row.fullName,
                  email: row.email,
                  role: row.role,
                  products: row.products || [],
                  isActive: Boolean(row.isActive)
                });
                setUserModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={async () => {
                try {
                  await adminService.deleteUser(row.id);
                  api.success("User deleted.");
                  fetchUsers();
                } catch (_error) {
                  api.error("Failed to delete user.");
                }
              }}
            >
              Delete
            </Button>
          </Space>
        )
      }
    ],
    [api, productLabelMap, roleLabelMap, userForm]
  );

  const leadColumns = useMemo(
    () => [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Mobile", dataIndex: "mobileNumber", key: "mobileNumber", render: (value) => value || "N/A" },
      { title: "Company", dataIndex: "company", key: "company", render: (value) => value || "N/A" },
      { title: "Project Type", dataIndex: "projectType", key: "projectType" },
      { title: "Budget", dataIndex: "budget", key: "budget", render: (value) => value || "N/A" },
      {
        title: "Submitted",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value) =>
          value
            ? new Date(value).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
              })
            : "-"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (value) => (
          <Typography.Paragraph className="admin-lead-description" ellipsis={{ rows: 3, expandable: true, symbol: "More" }}>
            {value || "N/A"}
          </Typography.Paragraph>
        )
      }
    ],
    []
  );

  async function saveBlog(values) {
    try {
      const payload = {
        ...values,
        content: normalizeEditorContent(values.content),
        slug: values.slug || slugifyText(values.title),
        category: (Array.isArray(values.category) && values.category[0]) || values.category || "General",
        tags: values.tags || [],
        author: values.author || "Quadravise Team",
        readingTime: values.readingTime || estimateReadTime(values.content),
        coverImage: values.coverImage || "",
        thumbnailImage: values.thumbnailImage || "",
        metaTitle: values.metaTitle || "",
        metaDescription: values.metaDescription || "",
        canonicalUrl: values.canonicalUrl || "",
        ogTitle: values.ogTitle || "",
        ogDescription: values.ogDescription || "",
        ogImage: values.ogImage || "",
        status: values.publishToWebsite === false ? "draft" : values.status || "published",
        publishedAt: values.publishedAt ? new Date(values.publishedAt).toISOString() : "",
        isFeatured: Boolean(values.isFeatured),
        distribution: {
          publishToWebsite: values.publishToWebsite !== false,
          shareToLinkedin: Boolean(values.shareToLinkedin),
          shareToFacebook: Boolean(values.shareToFacebook),
          linkedinAccountId: values.linkedinAccountId || "",
          facebookAccountId: values.facebookAccountId || "",
          linkedinCaption: values.linkedinCaption || "",
          facebookCaption: values.facebookCaption || "",
          useFeaturedImageForSocial: Boolean(values.useFeaturedImageForSocial),
          socialPublishAt: values.socialPublishAt ? new Date(values.socialPublishAt).toISOString() : "",
          autoShareAfterWebsitePublish: Boolean(values.autoShareAfterWebsitePublish)
        }
      };

      if (editingBlogId) {
        await adminService.updateBlog(editingBlogId, payload);
        api.success("Blog updated.");
      } else {
        await adminService.createBlog(payload);
        api.success("Blog created.");
      }

      setEditingBlogId(null);
      blogForm.resetFields();
      blogForm.setFieldsValue({
        status: "published",
        isFeatured: false,
        category: ["General"],
        author: "Quadravise Team",
        tags: [],
        publishToWebsite: true,
        shareToLinkedin: false,
        shareToFacebook: false,
        useFeaturedImageForSocial: true,
        autoShareAfterWebsitePublish: true
      });
      setBlogModalOpen(false);
      fetchBlogs({ page: 1 });
    } catch (_error) {
      const details = _error?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || _error?.response?.data?.message || "Failed to save blog.");
    }
  }

  async function saveProject(values) {
    try {
      const payload = {
        ...values,
        category: (Array.isArray(values.category) && values.category[0]) || values.category || "General",
        slug: values.slug || "",
        slugManuallyEdited: portfolioSlugTouched,
        shortSummary: values.shortSummary || "",
        description: values.description || values.shortSummary || stripHtml(values.detailedDescription || "").slice(0, 5000),
        detailedDescription: normalizeEditorContent(values.detailedDescription || ""),
        timeline: values.timeline || "",
        projectStartDate: values.projectStartDate || "",
        projectEndDate: values.projectEndDate || "",
        projectLaunchDate: values.projectLaunchDate || "",
        projectDuration: calculateProjectDuration(values.projectStartDate, values.projectEndDate),
        clientSatisfaction: values.clientSatisfaction || "",
        projectType: values.projectType || "",
        clientName: values.clientName || "",
        clientIndustry: values.clientIndustry || "",
        clientLocation: values.clientLocation || "",
        clientWebsite: values.clientWebsite || "",
        showClientName: values.showClientName !== false,
        servicesProvided: dedupeTagValues(values.servicesProvided || []),
        frontendTechnologies: dedupeTagValues(values.frontendTechnologies || []),
        backendTechnologies: dedupeTagValues(values.backendTechnologies || []),
        databaseTechnologies: dedupeTagValues(values.databaseTechnologies || []),
        engagementType: values.engagementType || "",
        teamSize: values.teamSize || undefined,
        projectRole: values.projectRole || "",
        businessProblem: values.businessProblem || "",
        technicalChallenges: values.technicalChallenges || "",
        projectGoals: values.projectGoals || "",
        solutionSummary: normalizeEditorContent(values.solutionSummary || ""),
        featuresDelivered: (values.featuresDelivered || []).map((item) => String(item || "").trim()).filter(Boolean),
        modulesImplemented: (values.modulesImplemented || []).map((item) => String(item || "").trim()).filter(Boolean),
        integrationsUsed: dedupeTagValues(values.integrationsUsed || []),
        architectureOverview: normalizeEditorContent(values.architectureOverview || ""),
        kpiMetrics: (values.kpiMetrics || [])
          .map((item) => ({
            label: String(item?.label || "").trim(),
            value: String(item?.value || "").trim()
          }))
          .filter((item) => item.label && item.value),
        beforeValue: values.beforeValue || "",
        afterValue: values.afterValue || "",
        impactSummary: values.impactSummary || "",
        outcomeDescription: values.outcomeDescription || "",
        techStack: dedupeTagValues([
          ...(values.frontendTechnologies || []),
          ...(values.backendTechnologies || []),
          ...(values.databaseTechnologies || [])
        ]),
        outcome: values.outcome || "",
        featuredImage: values.featuredImage || "",
        featuredImageAlt: values.featuredImageAlt || "",
        galleryImages: (values.galleryImages || [])
          .map((item) => ({
            id: item?.id || `gallery-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
            url: String(item?.url || "").trim(),
            relativeUrl: String(item?.relativeUrl || "").trim(),
            altText: String(item?.altText || "").trim()
          }))
          .filter((item) => item.url),
        videoUrl: values.videoUrl || "",
        demoUrl: values.demoUrl || "",
        liveUrl: values.liveUrl || "",
        designUrl: values.designUrl || "",
        documentAttachments: (values.documentAttachments || [])
          .map((item) => ({
            id: item?.id || `document-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
            title: String(item?.title || item?.fileName || "").trim(),
            url: String(item?.url || "").trim(),
            relativeUrl: String(item?.relativeUrl || "").trim(),
            fileName: String(item?.fileName || "").trim()
          }))
          .filter((item) => item.title && item.url),
        testimonialContent: normalizeEditorContent(values.testimonialContent || ""),
        testimonialAuthorName: values.testimonialAuthorName || "",
        testimonialAuthorDesignation: values.testimonialAuthorDesignation || "",
        testimonialAuthorImage: values.testimonialAuthorImage || "",
        testimonialRating: values.testimonialRating || undefined,
        showTestimonial: Boolean(values.showTestimonial),
        metaTitle: values.metaTitle || "",
        metaDescription: values.metaDescription || "",
        ogImage: values.ogImage || "",
        seoKeywords: dedupeTagValues(values.seoKeywords || []),
        canonicalUrl: values.canonicalUrl || "",
        noindex: Boolean(values.noindex),
        showOnHomepage: Boolean(values.showOnHomepage),
        sortOrder: values.sortOrder === "" ? 9999 : Number(values.sortOrder || 9999),
        projectBadge: Array.isArray(values.projectBadge) ? values.projectBadge[0] || "" : values.projectBadge || "",
        visibility: values.visibility || "public",
        isFeatured: Boolean(values.isFeatured),
        isConfidential: Boolean(values.isConfidential),
        isPublished: Boolean(values.isPublished)
      };

      if (editingProjectId) {
        await adminService.updatePortfolio(editingProjectId, payload);
        api.success("Project updated.");
      } else {
        await adminService.createPortfolio(payload);
        api.success("Project created.");
      }

      setEditingProjectId(null);
      setPortfolioSlugTouched(false);
      portfolioForm.resetFields();
      portfolioForm.setFieldsValue(getDefaultPortfolioFormValues());
      setPortfolioModalOpen(false);
      setSelectedPortfolioRowKeys([]);
      fetchPortfolio({ page: 1 });
      loadPortfolioAnalytics();
    } catch (_error) {
      const details = _error?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || _error?.response?.data?.message || "Failed to save project.");
    }
  }

  function openProjectPreview() {
    const values = portfolioForm.getFieldsValue(true);
    const slug = values.slug || slugifyText(values.title || "preview-project");
    const previewKey = getPortfolioPreviewStorageKey(editingProjectId, slug);

    window.localStorage.setItem(
      previewKey,
      JSON.stringify({
        ...values,
        slug,
        savedAt: new Date().toISOString()
      })
    );

    window.open(`${ROUTES.PORTFOLIO}/${slug}?preview=1&draftKey=${encodeURIComponent(previewKey)}`, "_blank", "noopener,noreferrer");
  }

  function openPortfolioRowPreview(row) {
    const slug = row.slug || slugifyText(row.title || "preview-project");

    if (row.isPublished) {
      window.open(`${ROUTES.PORTFOLIO}/${slug}`, "_blank", "noopener,noreferrer");
      return;
    }

    const previewKey = getPortfolioPreviewStorageKey(row.id, slug);

    window.localStorage.setItem(
      previewKey,
      JSON.stringify({
        ...row,
        slug,
        savedAt: new Date().toISOString()
      })
    );

    window.open(`${ROUTES.PORTFOLIO}/${slug}?preview=1&draftKey=${encodeURIComponent(previewKey)}`, "_blank", "noopener,noreferrer");
  }

  async function removeUploadedAsset(relativeUrl) {
    if (!isLocalUpload(relativeUrl)) {
      return;
    }

    try {
      await adminService.deleteUpload(relativeUrl);
    } catch (_error) {
      api.error("Failed to delete uploaded file.");
      throw _error;
    }
  }

  function confirmRemoveFeaturedImage() {
    Modal.confirm({
      title: "Delete featured image?",
      content: "This will remove the current featured image from the project.",
      okText: "Delete Image",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: async () => {
        const galleryRelativeUrl = portfolioForm.getFieldValue("featuredImageRelativeUrl");
        await removeUploadedAsset(galleryRelativeUrl);
        portfolioForm.setFieldsValue({
          featuredImage: "",
          featuredImageAlt: "",
          featuredImageRelativeUrl: ""
        });
      }
    });
  }

  function confirmRemoveGalleryImage(image) {
    Modal.confirm({
      title: "Delete gallery image?",
      content: "This will remove the image from the gallery.",
      okText: "Delete Image",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: async () => {
        await removeUploadedAsset(image.relativeUrl);
        const nextImages = (portfolioForm.getFieldValue("galleryImages") || []).filter((item) => item.id !== image.id);
        portfolioForm.setFieldValue("galleryImages", nextImages);
      }
    });
  }

  function confirmRemoveDocument(documentItem) {
    Modal.confirm({
      title: "Delete attachment?",
      content: "This will remove the document attachment from the project.",
      okText: "Delete Attachment",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: async () => {
        await removeUploadedAsset(documentItem.relativeUrl);
        const nextDocuments = (portfolioForm.getFieldValue("documentAttachments") || []).filter((item) => item.id !== documentItem.id);
        portfolioForm.setFieldValue("documentAttachments", nextDocuments);
      }
    });
  }

  async function duplicateProject(row) {
    try {
      await adminService.duplicatePortfolio(row.id);
      api.success("Project duplicated as draft.");
      fetchPortfolio({ page: 1 });
    } catch (_error) {
      api.error(_error?.response?.data?.message || "Failed to duplicate project.");
    }
  }

  async function setProjectArchiveState(row, isArchived) {
    try {
      if (isArchived) {
        await adminService.archivePortfolio(row.id);
        api.success("Project archived.");
      } else {
        await adminService.restorePortfolio(row.id);
        api.success("Project restored.");
      }
      if (editingProjectId === row.id) {
        setEditingProjectId(null);
        setPortfolioModalOpen(false);
        setPortfolioSlugTouched(false);
        portfolioForm.resetFields();
        portfolioForm.setFieldsValue(getDefaultPortfolioFormValues());
      }
      fetchPortfolio({ page: 1 });
      loadPortfolioAnalytics();
    } catch (_error) {
      api.error(_error?.response?.data?.message || "Failed to update archive state.");
    }
  }

  async function runPortfolioBulkAction(action) {
    if (!selectedPortfolioRowKeys.length) return;

    try {
      if (action === "delete") {
        await adminService.bulkDeletePortfolio(selectedPortfolioRowKeys);
        api.success("Selected projects deleted.");
      } else if (action === "publish") {
        await adminService.bulkPublishPortfolio(selectedPortfolioRowKeys);
        api.success("Selected projects published.");
      } else if (action === "unpublish") {
        await adminService.bulkUnpublishPortfolio(selectedPortfolioRowKeys);
        api.success("Selected projects moved to draft.");
      }

      setSelectedPortfolioRowKeys([]);
      fetchPortfolio({ page: 1 });
      loadPortfolioAnalytics();
    } catch (_error) {
      api.error(_error?.response?.data?.message || "Bulk action failed.");
    }
  }

  async function saveSettings(values) {
    try {
      const response = await adminService.updateSettings(values);
      setSettings(response.data);
      settingsForm.setFieldsValue(response.data);
      api.success("Settings updated.");
    } catch (_error) {
      api.error("Failed to save settings.");
    }
  }

  async function saveConfiguration(values) {
    try {
      const payload = {
        roles: (values.roles || []).map((role) => ({
          key: String(role?.key || "").trim().toLowerCase(),
          name: String(role?.name || "").trim(),
          description: String(role?.description || "").trim(),
          productKeys: (role?.productKeys || []).map((productKey) => String(productKey || "").trim().toLowerCase()).filter(Boolean),
          isActive: role?.isActive !== false
        })),
        products: (values.products || []).map((product) => ({
          key: String(product?.key || "").trim().toLowerCase(),
          label: String(product?.label || "").trim(),
          description: String(product?.description || "").trim(),
          isActive: product?.isActive !== false
        }))
      };
      const response = await adminService.updateConfiguration(payload);
      const nextConfiguration = response.data || payload;
      setAdminConfiguration(nextConfiguration);
      configurationForm.setFieldsValue(nextConfiguration);
      api.success("Configuration updated.");
    } catch (error) {
      const details = error?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || error?.response?.data?.message || "Failed to save configuration.");
    }
  }

  function openCreateProductModal() {
    setEditingProductIndex(null);
    productForm.resetFields();
    productForm.setFieldsValue({
      key: "",
      label: "",
      description: "",
      isActive: true
    });
    setProductModalOpen(true);
  }

  function openEditProductModal(productIndex) {
    const product = (configurationForm.getFieldValue("products") || [])[productIndex];
    if (!product) return;

    setEditingProductIndex(productIndex);
    productForm.setFieldsValue({
      key: product.key || "",
      label: product.label || "",
      description: product.description || "",
      isActive: product.isActive !== false
    });
    setProductModalOpen(true);
  }

  function deleteProduct(productIndex) {
    const currentProducts = [...(configurationForm.getFieldValue("products") || [])];
    const nextProducts = currentProducts.filter((_, index) => index !== productIndex);
    const nextRoles = (configurationForm.getFieldValue("roles") || []).map((role) => ({
      ...role,
      productKeys: (role.productKeys || []).filter((productKey) => productKey !== currentProducts[productIndex]?.key)
    }));

    configurationForm.setFieldsValue({
      products: nextProducts,
      roles: nextRoles
    });
  }

  function saveProductDraft(values) {
    const normalizedProduct = {
      key: String(values.key || "").trim().toLowerCase(),
      label: String(values.label || "").trim(),
      description: String(values.description || "").trim(),
      isActive: values.isActive !== false
    };
    const currentProducts = [...(configurationForm.getFieldValue("products") || [])];

    if (editingProductIndex === null) {
      currentProducts.push(normalizedProduct);
    } else {
      const previousKey = currentProducts[editingProductIndex]?.key;
      currentProducts[editingProductIndex] = normalizedProduct;

      if (previousKey && previousKey !== normalizedProduct.key) {
        const nextRoles = (configurationForm.getFieldValue("roles") || []).map((role) => ({
          ...role,
          productKeys: (role.productKeys || []).map((productKey) => (productKey === previousKey ? normalizedProduct.key : productKey))
        }));
        configurationForm.setFieldsValue({ roles: nextRoles });
      }
    }

    configurationForm.setFieldValue("products", currentProducts);
    setProductModalOpen(false);
    setEditingProductIndex(null);
    productForm.resetFields();
  }

  function openCreateRoleModal() {
    setEditingRoleIndex(null);
    roleForm.resetFields();
    roleForm.setFieldsValue({
      key: "",
      name: "",
      description: "",
      productKeys: [],
      isActive: true
    });
    setRoleModalOpen(true);
  }

  function openEditRoleModal(roleIndex) {
    const role = (configurationForm.getFieldValue("roles") || [])[roleIndex];
    if (!role) return;

    setEditingRoleIndex(roleIndex);
    roleForm.setFieldsValue({
      key: role.key || "",
      name: role.name || "",
      description: role.description || "",
      productKeys: role.productKeys || [],
      isActive: role.isActive !== false
    });
    setRoleModalOpen(true);
  }

  function deleteRole(roleIndex) {
    const currentRoles = [...(configurationForm.getFieldValue("roles") || [])];
    const nextRoles = currentRoles.filter((_, index) => index !== roleIndex);
    configurationForm.setFieldValue("roles", nextRoles);
  }

  function saveRoleDraft(values) {
    const normalizedRole = {
      key: String(values.key || "").trim().toLowerCase(),
      name: String(values.name || "").trim(),
      description: String(values.description || "").trim(),
      productKeys: (values.productKeys || []).map((productKey) => String(productKey || "").trim().toLowerCase()).filter(Boolean),
      isActive: values.isActive !== false
    };
    const currentRoles = [...(configurationForm.getFieldValue("roles") || [])];

    if (editingRoleIndex === null) {
      currentRoles.push(normalizedRole);
    } else {
      currentRoles[editingRoleIndex] = normalizedRole;
    }

    configurationForm.setFieldValue("roles", currentRoles);
    setRoleModalOpen(false);
    setEditingRoleIndex(null);
    roleForm.resetFields();
  }

  async function saveUser(values) {
    try {
      const payload = {
        ...values,
        products: values.products || [],
        isActive: Boolean(values.isActive)
      };

      if (editingUserId) {
        await adminService.updateUser(editingUserId, payload);
        api.success("User updated.");
      } else {
        await adminService.createUser(payload);
        api.success("User created.");
      }

      setEditingUserId(null);
      userForm.resetFields();
      userForm.setFieldValue("role", activeRoleOptions[0]?.value || "manager");
      userForm.setFieldValue("products", []);
      userForm.setFieldValue("isActive", true);
      setUserModalOpen(false);
      fetchUsers({ page: 1 });
    } catch (error) {
      api.error(error?.response?.data?.message || "Failed to save user.");
    }
  }

  async function importBlogJsonFile(file) {
    try {
      await adminService.importBlogJson(file);
      api.success("Blog JSON imported as draft.");
      fetchBlogs({ page: 1 });
    } catch (error) {
      api.error(error?.response?.data?.message || "Failed to import blog JSON.");
    }
  }

  async function importPortfolioJsonFile(file) {
    try {
      await adminService.importPortfolioJson(file);
      api.success("Portfolio JSON imported.");
      fetchPortfolio({ page: 1 });
    } catch (error) {
      const details = error?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || error?.response?.data?.message || "Failed to import portfolio JSON.");
    }
  }

  useEffect(() => {
    if (section !== activeAdminTab) {
      setActiveAdminTab(section);
    }
  }, [section, activeAdminTab]);

  function navigateToAdminSection(nextSection) {
    const sectionRoutes = {
      dashboard: ROUTES.ADMIN_DASHBOARD,
      "client-access": ROUTES.ADMIN_CLIENT_ACCESS,
      blogs: ROUTES.ADMIN_BLOGS,
      portfolio: ROUTES.ADMIN_PORTFOLIO,
      users: ROUTES.ADMIN_USERS,
      configuration: ROUTES.ADMIN_CONFIGURATION,
      leads: ROUTES.ADMIN_LEADS,
      settings: ROUTES.ADMIN_SETTINGS
    };

    const targetRoute = sectionRoutes[nextSection] || ROUTES.ADMIN_DASHBOARD;
    navigate(targetRoute);
  }

  return (
    <>
      <SEOHead title="Quadravise | Admin Dashboard" robots="noindex, nofollow" />
      {contextHolder}
      <section className="section admin-dashboard-section">
        <div className="section-inner">
          {isDashboardSection ? (
            <>
              <div className="admin-dashboard-hero">
                <div className="admin-dashboard-hero-copy">
                  <Typography.Title level={1} className="admin-dashboard-hero-title">
                    Manage Content,
                    <br />
                    Snapshot Metrics,
                    <br />
                    and Website Updates
                  </Typography.Title>
                  <Typography.Paragraph className="admin-dashboard-hero-description">
                    Use one dashboard to publish blogs, update portfolio case studies, and control all live frontend
                    snapshot numbers.
                  </Typography.Paragraph>
                  <Space size={12} wrap>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      className="hero-btn hero-btn-primary"
                      onClick={openCreateBlogModal}
                    >
                      Add Blog
                    </Button>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      className="hero-btn hero-btn-primary"
                      onClick={openCreatePortfolioModal}
                    >
                      Add Portfolio
                    </Button>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      className="hero-btn hero-btn-primary"
                      onClick={openCreateUserModal}
                    >
                      Add User
                    </Button>
                    <Button
                      className="hero-btn hero-btn-secondary"
                      onClick={() => {
                        navigateToAdminSection("client-access");
                      }}
                    >
                      Open Client Access
                    </Button>
                    <Button
                      className="hero-btn hero-btn-secondary"
                      onClick={() => {
                        navigateToAdminSection("settings");
                      }}
                    >
                      Edit Snapshot Settings
                    </Button>
                  </Space>
                </div>
                <div className="admin-dashboard-hero-panel">
                  <h3>Admin Snapshot</h3>
                  <div className="admin-dashboard-hero-metrics">
                    <div>
                      <strong>{blogTable.total}</strong>
                      <span>Total Blogs</span>
                    </div>
                    <div>
                      <strong>{portfolioTable.total}</strong>
                      <span>Total Projects</span>
                    </div>
                    <div>
                      <strong>{userTable.total}</strong>
                      <span>Total Users</span>
                    </div>
                    <div>
                      <strong>{leadTable.total}</strong>
                      <span>Consultation Requests</span>
                    </div>
                    <div>
                      <strong>{settings?.projectsDelivered || "50+"}</strong>
                      <span>Projects Delivered (Live)</span>
                    </div>
                  </div>
                </div>
              </div>

            </>
          ) : null}
          <Tabs
            className="admin-tabs"
            activeKey={activeAdminTab}
            onChange={navigateToAdminSection}
            items={[
                  {
                    key: "dashboard",
                    label: "Dashboard",
                    children: (
                      <div className="admin-overview-grid">
                        <Card className="admin-card admin-overview-card">
                          <div className="admin-overview-card-head">
                            <Typography.Title level={4}>Overview</Typography.Title>
                            <Typography.Text>Quick access to your main admin areas.</Typography.Text>
                          </div>
                          <div className="admin-overview-stats">
                            <div>
                              <strong>{blogTable.total}</strong>
                              <span>Blogs</span>
                            </div>
                            <div>
                              <strong>{portfolioTable.total}</strong>
                              <span>Portfolio Items</span>
                            </div>
                            <div>
                              <strong>{userTable.total}</strong>
                              <span>Users</span>
                            </div>
                            <div>
                              <strong>{leadTable.total}</strong>
                              <span>Leads</span>
                            </div>
                          </div>
                        </Card>
                        <Card className="admin-card admin-overview-card">
                          <div className="admin-overview-card-head">
                            <Typography.Title level={4}>Quick Actions</Typography.Title>
                            <Typography.Text>Jump straight into the most common admin tasks.</Typography.Text>
                          </div>
                          <Space direction="vertical" size={12} style={{ width: "100%" }}>
                            <Button type="primary" className="hero-btn hero-btn-primary" icon={<PlusOutlined />} onClick={openCreateBlogModal}>
                              Add Blog
                            </Button>
                            <Button type="primary" className="hero-btn hero-btn-primary" icon={<PlusOutlined />} onClick={openCreatePortfolioModal}>
                              Add Portfolio
                            </Button>
                            <Button type="primary" className="hero-btn hero-btn-primary" icon={<PlusOutlined />} onClick={openCreateUserModal}>
                              Add User
                            </Button>
                            <Button className="hero-btn hero-btn-secondary" onClick={() => navigateToAdminSection("client-access")}>
                              Open Client Access
                            </Button>
                            <Button className="hero-btn hero-btn-secondary" onClick={() => navigateToAdminSection("leads")}>
                              Open Leads Record
                            </Button>
                          </Space>
                        </Card>
                      </div>
                    )
                  },
              {
                key: "blogs",
                label: "Blog Content",
                children: (
                  <Card className="admin-card" loading={blogLoading}>
                    <Space style={{ marginBottom: 12 }} wrap>
                      <Input.Search
                        className="admin-search"
                        allowClear
                        placeholder="Search blogs by title, category, author..."
                        value={blogTable.search}
                        onChange={(event) => setBlogTable((prev) => ({ ...prev, search: event.target.value }))}
                        onSearch={(value) => fetchBlogs({ page: 1, search: value })}
                        style={{ width: 360 }}
                      />
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="hero-btn hero-btn-primary"
                        onClick={openCreateBlogModal}
                      >
                        Add Blog
                      </Button>
                      <Button className="hero-btn hero-btn-secondary" onClick={() => blogJsonInputRef.current?.click()}>
                        Upload Blog JSON
                      </Button>
                      <Button className="hero-btn hero-btn-secondary" onClick={downloadBlogJsonTemplate}>
                        Download JSON Template
                      </Button>
                    </Space>
                    <input
                      ref={blogJsonInputRef}
                      type="file"
                      accept=".json,application/json"
                      style={{ display: "none" }}
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          await importBlogJsonFile(file);
                        }
                        event.target.value = "";
                      }}
                    />
                    <Table
                      className="admin-table"
                      rowKey="id"
                      columns={blogColumns}
                      dataSource={blogs}
                      pagination={{
                        current: blogTable.page,
                        pageSize: blogTable.pageSize,
                        total: blogTable.total,
                        showSizeChanger: true
                      }}
                      onChange={(pagination) => {
                        fetchBlogs({ page: pagination.current, pageSize: pagination.pageSize });
                      }}
                    />
                    <Modal
                      title={editingBlogId ? "Edit Blog" : "Add Blog"}
                      open={blogModalOpen}
                      onCancel={() => {
                        setBlogModalOpen(false);
                        setEditingBlogId(null);
                        blogForm.resetFields();
                      }}
                      footer={null}
                      width={1100}
                    >
                      <Form
                        layout="vertical"
                        form={blogForm}
                        onFinish={saveBlog}
                        initialValues={getDefaultBlogFormValues()}
                        onValuesChange={(changedValues, allValues) => {
                          if (Object.prototype.hasOwnProperty.call(changedValues, "title") && !allValues.slug) {
                            blogForm.setFieldValue("slug", slugifyText(changedValues.title));
                          }
                        }}
                      >
                        <Form.Item name="importSource" hidden>
                          <Input />
                        </Form.Item>
                        <Form.Item name="imageStatus" hidden>
                          <Input />
                        </Form.Item>
                        <Tabs
                          className="admin-form-tabs"
                          items={[
                            {
                              key: "basic",
                              label: "Basic Info",
                              children: (
                                <>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                                        <Input placeholder="How to Build a SaaS Product from Scratch" />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
                                        <Input placeholder="build-saas-product" addonBefore="/blog/" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                                        <Select
                                          mode="tags"
                                          maxCount={1}
                                          tokenSeparators={[","]}
                                          placeholder="Select or create category"
                                          options={blogCategories.map((category) => ({ label: category, value: category }))}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="tags" label="Tags">
                                        <Select mode="tags" tokenSeparators={[","]} placeholder="SaaS, Startup, Architecture" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                                        <Input />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="readingTime" label="Reading Time">
                                        <Input placeholder="5 min read" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item name="excerpt" label="Preview Excerpt" rules={[{ required: true }]}>
                                    <Input.TextArea rows={4} />
                                  </Form.Item>
                                </>
                              )
                            },
                            {
                              key: "images",
                              label: "Images",
                              children: (
                                <>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="coverImage" label="Cover Image">
                                        <Input
                                          placeholder="https://..."
                                          addonAfter={
                                            <Upload
                                              showUploadList={false}
                                              accept="image/*"
                                              customRequest={async ({ file, onSuccess, onError }) => {
                                                try {
                                                  const result = await adminService.uploadBlogImage(file);
                                                  const uploadedUrl = result?.data?.url;
                                                  if (uploadedUrl) {
                                                    blogForm.setFieldValue("coverImage", uploadedUrl);
                                                    blogForm.setFieldValue("imageStatus", "uploaded");
                                                    api.success("Cover image uploaded.");
                                                  }
                                                  onSuccess?.(result);
                                                } catch (error) {
                                                  api.error("Image upload failed.");
                                                  onError?.(error);
                                                }
                                              }}
                                            >
                                              <Button type="link" icon={<UploadOutlined />} style={{ paddingInline: 0 }}>
                                                Upload Image
                                              </Button>
                                            </Upload>
                                          }
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="thumbnailImage" label="Thumbnail Image">
                                        <Input
                                          placeholder="https://..."
                                          addonAfter={
                                            <Upload
                                              showUploadList={false}
                                              accept="image/*"
                                              customRequest={async ({ file, onSuccess, onError }) => {
                                                try {
                                                  const result = await adminService.uploadBlogImage(file);
                                                  const uploadedUrl = result?.data?.url;
                                                  if (uploadedUrl) {
                                                    blogForm.setFieldValue("thumbnailImage", uploadedUrl);
                                                    blogForm.setFieldValue("imageStatus", "uploaded");
                                                    api.success("Thumbnail image uploaded.");
                                                  }
                                                  onSuccess?.(result);
                                                } catch (error) {
                                                  api.error("Image upload failed.");
                                                  onError?.(error);
                                                }
                                              }}
                                            >
                                              <Button type="link" icon={<UploadOutlined />} style={{ paddingInline: 0 }}>
                                                Upload Image
                                              </Button>
                                            </Upload>
                                          }
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item noStyle shouldUpdate>
                                    {({ getFieldValue }) =>
                                      getFieldValue("coverImage") ? (
                                        <div className="admin-blog-image-preview">
                                          <img src={getFieldValue("coverImage")} alt="Blog preview" />
                                        </div>
                                      ) : null
                                    }
                                  </Form.Item>
                                </>
                              )
                            },
                            {
                              key: "seo",
                              label: "SEO",
                              children: (
                                <>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="metaTitle" label="Meta Title (SEO)">
                                        <Input maxLength={60} />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="metaDescription" label="Meta Description (SEO)">
                                        <Input maxLength={160} />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item name="canonicalUrl" label="Canonical URL">
                                    <Input placeholder="https://quadravise.com/blog/build-saas-product" />
                                  </Form.Item>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="ogTitle" label="Open Graph Title">
                                        <Input />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="ogDescription" label="Open Graph Description">
                                        <Input />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item name="ogImage" label="Open Graph Image">
                                    <Input
                                      placeholder="https://..."
                                      addonAfter={
                                        <Upload
                                          showUploadList={false}
                                          accept="image/*"
                                          customRequest={async ({ file, onSuccess, onError }) => {
                                            try {
                                              const result = await adminService.uploadBlogImage(file);
                                              const uploadedUrl = result?.data?.url;
                                              if (uploadedUrl) {
                                                blogForm.setFieldValue("ogImage", uploadedUrl);
                                                api.success("OG image uploaded.");
                                              }
                                              onSuccess?.(result);
                                            } catch (error) {
                                              api.error("Image upload failed.");
                                              onError?.(error);
                                            }
                                          }}
                                        >
                                          <Button type="link" icon={<UploadOutlined />} style={{ paddingInline: 0 }}>
                                            Upload Image
                                          </Button>
                                        </Upload>
                                      }
                                    />
                                  </Form.Item>
                                </>
                              )
                            },
                            {
                              key: "publishing",
                              label: "Publishing",
                              children: (
                                <>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={8}>
                                      <Form.Item name="publishToWebsite" label="Publish to Website" valuePropName="checked">
                                        <Switch />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                        <Select
                                          options={[
                                            { label: "Draft", value: "draft" },
                                            { label: "Published", value: "published" },
                                            { label: "Scheduled", value: "scheduled" },
                                            { label: "Archived", value: "archived" }
                                          ]}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                      <Form.Item name="publishedAt" label="Publish Date">
                                        <Input type="datetime-local" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={8}>
                                      <Form.Item name="isFeatured" label="Featured Article" valuePropName="checked">
                                        <Switch />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                      <Form.Item name="shareToLinkedin" label="Share to LinkedIn" valuePropName="checked">
                                        <Switch />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                      <Form.Item name="shareToFacebook" label="Share to Facebook" valuePropName="checked">
                                        <Switch />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={6}>
                                      <Form.Item name="useFeaturedImageForSocial" label="Use Blog Featured Image" valuePropName="checked">
                                        <Switch />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={6}>
                                      <Form.Item name="autoShareAfterWebsitePublish" label="Auto-share After Website Publish" valuePropName="checked">
                                        <Switch />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="socialPublishAt" label="Social Publish Time">
                                        <Input type="datetime-local" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="linkedinAccountId" label="LinkedIn Account / Page">
                                        <Select
                                          allowClear
                                          options={socialAccounts
                                            .filter((account) => account.platform === "linkedin")
                                            .map((account) => ({ label: account.accountName, value: account.id }))}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="facebookAccountId" label="Facebook Page">
                                        <Select
                                          allowClear
                                          options={socialAccounts
                                            .filter((account) => account.platform === "facebook")
                                            .map((account) => ({ label: account.accountName, value: account.id }))}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={[16, 0]}>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="linkedinCaption" label="LinkedIn Caption">
                                        <Input.TextArea rows={3} />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                      <Form.Item name="facebookCaption" label="Facebook Caption">
                                        <Input.TextArea rows={3} />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </>
                              )
                            },
                            {
                              key: "content",
                              label: "Content",
                              children: (
                                <>
                                  <div className="admin-editor-note">
                                    Write the article directly with headings, lists, links, code blocks, and media.
                                    Switch to HTML Source if you want to paste or edit raw HTML markup.
                                  </div>
                                  <Space direction="vertical" size={12} style={{ width: "100%" }}>
                                    <Segmented
                                      value={blogEditorMode}
                                      onChange={setBlogEditorMode}
                                      options={[
                                        { label: "Rich Text", value: "rich" },
                                        { label: "HTML Source", value: "html" }
                                      ]}
                                    />
                                    <Form.Item
                                      name="content"
                                      label="Content"
                                      rules={[{ required: true }]}
                                      getValueFromEvent={(value) => normalizeEditorContent(value)}
                                    >
                                      {blogEditorMode === "html" ? (
                                        <Input.TextArea
                                          rows={18}
                                          spellCheck={false}
                                          placeholder="Paste or write raw HTML here..."
                                        />
                                      ) : (
                                        <ReactQuill
                                          theme="snow"
                                          modules={BLOG_EDITOR_MODULES}
                                          formats={BLOG_EDITOR_FORMATS}
                                          placeholder="Write the full article here..."
                                          className="admin-rich-editor"
                                          preserveWhitespace
                                        />
                                      )}
                                    </Form.Item>
                                  </Space>
                                </>
                              )
                            },
                            {
                              key: "preview",
                              label: "Preview",
                              children: (
                                <div className="admin-blog-preview-shell">
                                  <div className="admin-blog-preview-header">
                                    <span className="admin-blog-preview-kicker">Live Preview</span>
                                    <h3>{blogPreviewValues.title || "Untitled article"}</h3>
                                    <p>
                                      {blogPreviewValues.excerpt ||
                                        "Add a preview excerpt to see how the article summary will appear before publishing."}
                                    </p>
                                    <div className="admin-blog-preview-meta">
                                      <span>
                                        {(Array.isArray(blogPreviewValues.category) && blogPreviewValues.category[0]) ||
                                          blogPreviewValues.category ||
                                          "General"}
                                      </span>
                                      <span>{blogPreviewValues.author || "Quadravise Team"}</span>
                                      <span>{blogPreviewValues.readingTime || estimateReadTime(blogPreviewValues.content)}</span>
                                      <span>{blogPreviewValues.status || "draft"}</span>
                                    </div>
                                  </div>
                                  {blogPreviewValues.coverImage ? (
                                    <div className="admin-blog-preview-cover-wrap">
                                      <img
                                        src={blogPreviewValues.coverImage}
                                        alt={blogPreviewValues.title || "Blog cover preview"}
                                      />
                                    </div>
                                  ) : null}
                                  <div className="admin-blog-preview-card">
                                    <div
                                      className="admin-blog-preview-content prose"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          blogPreviewValues.content ||
                                          "<p>Your formatted article preview will appear here.</p>"
                                      }}
                                    />
                                  </div>
                                </div>
                              )
                            }
                          ]}
                        />
                        <Space>
                          <Button
                            type="default"
                            onClick={() => {
                              blogForm.setFieldValue("status", "draft");
                              blogForm.submit();
                            }}
                          >
                            Save Draft
                          </Button>
                          <Button
                            type="primary"
                            icon={editingBlogId ? <SaveOutlined /> : <PlusOutlined />}
                            onClick={() => {
                              blogForm.setFieldValue("status", "published");
                              blogForm.submit();
                            }}
                          >
                            {editingBlogId ? "Update Article" : "Publish Article"}
                          </Button>
                          <Button
                            onClick={() => {
                              setBlogEditorMode("rich");
                              setBlogModalOpen(false);
                              setEditingBlogId(null);
                              blogForm.resetFields();
                            }}
                          >
                            Cancel
                          </Button>
                        </Space>
                      </Form>
                    </Modal>
                  </Card>
                )
              },
              {
                key: "portfolio",
                label: "Portfolio Content",
                children: (
                  <Card className="admin-card" loading={portfolioLoading}>
                    <div className="admin-portfolio-shell">
                      <div className="admin-portfolio-toolbar">
                        <div className="admin-portfolio-toolbar-copy">
                          <Typography.Title level={4} style={{ margin: 0 }}>
                            Portfolio Project Management
                          </Typography.Title>
                          <Typography.Paragraph style={{ marginBottom: 0 }}>
                            Create, update, search, and retire portfolio case studies from one workspace.
                          </Typography.Paragraph>
                        </div>
                        <Space wrap>
                          <Input.Search
                            className="admin-search"
                            allowClear
                            placeholder="Search portfolio by title"
                            value={portfolioTable.search}
                            onChange={(event) => {
                              const nextValue = event.target.value;
                              setPortfolioTable((prev) => ({ ...prev, search: nextValue }));
                              if (!nextValue) {
                                fetchPortfolio({ page: 1, search: "" });
                              }
                            }}
                            onSearch={(value) => fetchPortfolio({ page: 1, search: value })}
                            style={{ width: 320 }}
                          />
                          <Select
                            value={portfolioTable.category || undefined}
                            placeholder="Filter category"
                            allowClear
                            style={{ width: 180 }}
                            onChange={(value) => {
                              const nextValue = value || "";
                              setPortfolioTable((prev) => ({ ...prev, category: nextValue }));
                              fetchPortfolio({ page: 1, category: nextValue });
                            }}
                            options={[...new Set(projects.map((item) => item.category).filter(Boolean))].map((category) => ({
                              label: category,
                              value: category
                            }))}
                          />
                          <Select
                            value={portfolioTable.status}
                            style={{ width: 180 }}
                            onChange={(value) => {
                              setPortfolioTable((prev) => ({ ...prev, status: value }));
                              fetchPortfolio({ page: 1, status: value });
                            }}
                            options={[
                              { label: "Active", value: "active" },
                              { label: "Published", value: "published" },
                              { label: "Draft", value: "draft" },
                              { label: "Archived", value: "archived" },
                              { label: "All", value: "all" }
                            ]}
                          />
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            className="hero-btn hero-btn-primary"
                            onClick={openCreatePortfolioModal}
                          >
                            Create Project
                          </Button>
                          <Button className="hero-btn hero-btn-secondary" onClick={() => portfolioJsonInputRef.current?.click()}>
                            Upload Portfolio JSON
                          </Button>
                          <Button className="hero-btn hero-btn-secondary" onClick={downloadPortfolioJsonTemplate}>
                            Download JSON Template
                          </Button>
                          {selectedPortfolioRowKeys.length ? (
                            <>
                              {adminSession?.role === "admin" ? (
                                <>
                                  <Button className="hero-btn hero-btn-secondary" onClick={() => runPortfolioBulkAction("publish")}>
                                    Publish Selected
                                  </Button>
                                  <Button className="hero-btn hero-btn-secondary" onClick={() => runPortfolioBulkAction("unpublish")}>
                                    Unpublish Selected
                                  </Button>
                                </>
                              ) : null}
                              <Button
                                danger
                                onClick={() => {
                                  Modal.confirm({
                                    title: "Delete selected projects?",
                                    content: `This will delete ${selectedPortfolioRowKeys.length} selected project(s).`,
                                    okText: "Delete Selected",
                                    okButtonProps: { danger: true },
                                    cancelText: "Cancel",
                                    onOk: async () => runPortfolioBulkAction("delete")
                                  });
                                }}
                              >
                                Delete Selected
                              </Button>
                            </>
                          ) : null}
                        </Space>
                      </div>
                      <div className="admin-portfolio-summary-grid">
                        <article>
                          <strong>{portfolioTable.total}</strong>
                          <span>Total Projects</span>
                        </article>
                        <article>
                          <strong>{projects.filter((item) => item.isPublished).length}</strong>
                          <span>Published</span>
                        </article>
                        <article>
                          <strong>{projects.filter((item) => !item.isPublished).length}</strong>
                          <span>Drafts</span>
                        </article>
                        <article>
                          <strong>{projects.reduce((total, item) => total + (item.viewCount || 0), 0)}</strong>
                          <span>Total Views</span>
                        </article>
                      </div>
                      <Card size="small" loading={portfolioAnalyticsLoading} style={{ marginTop: 16 }}>
                        <Space direction="vertical" size={12} style={{ width: "100%" }}>
                          <Space align="start" style={{ justifyContent: "space-between", width: "100%" }} wrap>
                            <div>
                              <Typography.Text strong>Portfolio Analytics</Typography.Text>
                              <Typography.Paragraph style={{ marginBottom: 0 }}>
                                Track views, link clicks, and top-performing projects with optional date filters.
                              </Typography.Paragraph>
                            </div>
                            <Space wrap>
                              <Input
                                type="date"
                                value={portfolioAnalyticsFilters.from}
                                onChange={(event) =>
                                  setPortfolioAnalyticsFilters((prev) => ({ ...prev, from: event.target.value }))
                                }
                              />
                              <Input
                                type="date"
                                value={portfolioAnalyticsFilters.to}
                                onChange={(event) =>
                                  setPortfolioAnalyticsFilters((prev) => ({ ...prev, to: event.target.value }))
                                }
                              />
                              <Button onClick={() => loadPortfolioAnalytics()}>Apply</Button>
                              <Button
                                onClick={() => {
                                  const resetFilters = { from: "", to: "" };
                                  setPortfolioAnalyticsFilters(resetFilters);
                                  loadPortfolioAnalytics(resetFilters);
                                }}
                              >
                                Reset
                              </Button>
                            </Space>
                          </Space>
                          <div className="admin-portfolio-summary-grid">
                            <article>
                              <strong>{portfolioAnalytics.totalViews || 0}</strong>
                              <span>Tracked Views</span>
                            </article>
                            <article>
                              <strong>{portfolioAnalytics.totalLinkClicks || 0}</strong>
                              <span>Tracked Link Clicks</span>
                            </article>
                            <article>
                              <strong>{portfolioAnalytics.topProjects?.[0]?.title || "No data"}</strong>
                              <span>Top Project</span>
                            </article>
                          </div>
                          <div style={{ display: "grid", gap: 8 }}>
                            {(portfolioAnalytics.topProjects || []).slice(0, 5).map((item) => (
                              <div
                                key={item.id}
                                style={{
                                  display: "grid",
                                  gap: 8,
                                  gridTemplateColumns: "minmax(0, 1fr) auto auto",
                                  alignItems: "center"
                                }}
                              >
                                <Typography.Text>{item.title}</Typography.Text>
                                <Tag color="blue">Views: {item.viewCount || 0}</Tag>
                                <Tag color="green">Clicks: {item.linkClickCount || 0}</Tag>
                              </div>
                            ))}
                            {!portfolioAnalytics.topProjects?.length ? (
                              <Typography.Text type="secondary">No portfolio analytics recorded for the selected range yet.</Typography.Text>
                            ) : null}
                          </div>
                        </Space>
                      </Card>
                      <Table
                        className="admin-table"
                        rowKey="id"
                        columns={portfolioColumns}
                        dataSource={projects}
                        rowSelection={{
                          selectedRowKeys: selectedPortfolioRowKeys,
                          onChange: (nextSelectedRowKeys) => setSelectedPortfolioRowKeys(nextSelectedRowKeys)
                        }}
                        pagination={{
                          current: portfolioTable.page,
                          pageSize: portfolioTable.pageSize,
                          total: portfolioTable.total,
                          showSizeChanger: true
                        }}
                        onChange={(pagination) => {
                          fetchPortfolio({ page: pagination.current, pageSize: pagination.pageSize });
                        }}
                      />
                    </div>
                    <input
                      ref={portfolioJsonInputRef}
                      type="file"
                      accept=".json,application/json"
                      style={{ display: "none" }}
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          await importPortfolioJsonFile(file);
                        }
                        event.target.value = "";
                      }}
                    />
                    {portfolioModalOpen ? (
                      <div ref={portfolioEditorRef}>
                        <Card
                          className="admin-portfolio-editor-card"
                          title={editingProjectId ? "Edit Portfolio Project" : "Create Portfolio Project"}
                          extra={
                            <Button
                              type="text"
                              onClick={() => {
                                setPortfolioModalOpen(false);
                                setEditingProjectId(null);
                                setPortfolioSlugTouched(false);
                                portfolioForm.resetFields();
                                portfolioForm.setFieldsValue(getDefaultPortfolioFormValues());
                              }}
                            >
                              Close
                            </Button>
                          }
                        >
                              <div className="admin-portfolio-editor-head">
                                <Typography.Paragraph>
                                  {editingProjectId
                                    ? "Update an existing portfolio project with pre-filled project details."
                                    : "Create a new portfolio case study. New projects save as draft unless you publish them."}
                                </Typography.Paragraph>
                              </div>
                              <Form
                                layout="vertical"
                                form={portfolioForm}
                                onFinish={saveProject}
                                initialValues={getDefaultPortfolioFormValues()}
                              >
                              {portfolioAutoSaveStatus ? (
                                <Typography.Text type="secondary" style={{ display: "block", marginBottom: 12 }}>
                                  {portfolioAutoSaveStatus}
                                </Typography.Text>
                              ) : null}
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[{ required: true, message: "Title is required." }]}
                                  >
                                    <Input
                                      placeholder="Startup SaaS Platform"
                                      onChange={(event) => {
                                        const nextTitle = event.target.value;
                                        if (!portfolioSlugTouched) {
                                          portfolioForm.setFieldValue("slug", slugifyText(nextTitle));
                                        }
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="slug" label="Slug" rules={[{ required: true, message: "Slug is required." }]}>
                                    <Input
                                      placeholder="startup-saas-platform"
                                      onChange={(event) => {
                                        setPortfolioSlugTouched(true);
                                        portfolioForm.setFieldValue("slug", slugifyText(event.target.value));
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    name="category"
                                    label="Category"
                                    rules={[{ required: true, message: "Category is required." }]}
                                  >
                                    <Select
                                      mode="tags"
                                      maxCount={1}
                                      tokenSeparators={[","]}
                                      placeholder="Select or create category"
                                      options={[...new Set(projects.map((item) => item.category).filter(Boolean))].map((category) => ({
                                        label: category,
                                        value: category
                                      }))}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <div className="admin-portfolio-slug-note">
                                <Typography.Text type="secondary">
                                  URL preview: `/portfolio/${portfolioPreviewValues.slug || slugifyText(portfolioPreviewValues.title || "")}`
                                </Typography.Text>
                              </div>
                              <Form.Item
                                name="shortSummary"
                                label="Short Summary"
                                rules={[{ max: 300, message: "Short summary must be 300 characters or fewer." }]}
                              >
                                <Input.TextArea
                                  rows={3}
                                  maxLength={300}
                                  showCount
                                  placeholder="Concise overview users can understand at a glance."
                                />
                              </Form.Item>
                              <Form.Item name="description" label="Legacy Summary" hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name="detailedDescription" label="Full Project Description">
                                <div className="admin-rich-editor">
                                  <ReactQuill
                                    theme="snow"
                                    modules={BLOG_EDITOR_MODULES}
                                    formats={BLOG_EDITOR_FORMATS}
                                    placeholder="Write the detailed project story with bold text, lists, and links."
                                  />
                                </div>
                              </Form.Item>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="timeline" label="Timeline Notes">
                                    <Input placeholder="Phase 1 in 6 weeks, launch in week 8" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="clientSatisfaction" label="Client Satisfaction">
                                    <Input placeholder="95% satisfied / 5/5 / Very satisfied" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="projectStartDate" label="Project Start Date">
                                    <Input type="date" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    name="projectEndDate"
                                    label="Project End Date"
                                    dependencies={["projectStartDate"]}
                                    rules={[
                                      ({ getFieldValue }) => ({
                                        validator(_, value) {
                                          const startDate = getFieldValue("projectStartDate");
                                          if (!value || !startDate || value > startDate) {
                                            return Promise.resolve();
                                          }
                                          return Promise.reject(new Error("End date must be after the start date."));
                                        }
                                      })
                                    ]}
                                  >
                                    <Input type="date" min={portfolioPreviewValues.projectStartDate || undefined} />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="projectLaunchDate" label="Project Launch Date">
                                    <Input type="date" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="projectDuration" label="Project Duration">
                                    <Input readOnly placeholder="Auto-calculated from start and end date" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="projectType" label="Project Type">
                                    <Select
                                      allowClear
                                      placeholder="Select project type"
                                      options={[
                                        { label: "Web App", value: "Web App" },
                                        { label: "Mobile App", value: "Mobile App" },
                                        { label: "Website", value: "Website" },
                                        { label: "SaaS Platform", value: "SaaS Platform" },
                                        { label: "Internal Tool", value: "Internal Tool" },
                                        { label: "Custom Software", value: "Custom Software" }
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="clientIndustry" label="Client Industry">
                                    <Input placeholder="Fintech, Education, Healthcare..." />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="clientName" label="Client Name">
                                    <Input placeholder="Acme Labs" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="clientLocation" label="Client Location">
                                    <Input placeholder="London, UK" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <div className="admin-portfolio-status-row">
                                <div>
                                  <Typography.Text strong>Show client name</Typography.Text>
                                  <Typography.Paragraph>
                                    Disable this if the project should be public but the client identity should stay hidden.
                                  </Typography.Paragraph>
                                </div>
                                <Form.Item name="showClientName" valuePropName="checked" style={{ marginBottom: 0 }}>
                                  <Switch checkedChildren="Visible" unCheckedChildren="Hidden" />
                                </Form.Item>
                              </div>
                              <Form.Item
                                name="clientWebsite"
                                label="Client Website"
                                rules={[{ type: "url", warningOnly: false, message: "Enter a valid website URL." }]}
                              >
                                <Input placeholder="https://client-site.com" />
                              </Form.Item>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="engagementType" label="Engagement Type">
                                    <Select
                                      allowClear
                                      placeholder="Select engagement type"
                                      options={[
                                        { label: "Fixed", value: "Fixed" },
                                        { label: "Hourly", value: "Hourly" },
                                        { label: "Retainer", value: "Retainer" }
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    name="teamSize"
                                    label="Team Size"
                                    rules={[{ type: "number", min: 1, transform: (value) => (value === "" ? undefined : Number(value)), message: "Team size must be a positive number." }]}
                                  >
                                    <Input type="number" min={1} placeholder="4" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item name="projectRole" label="Project Role">
                                <Input placeholder="Full-stack development, Technical lead, Product design..." />
                              </Form.Item>
                              <Form.Item name="servicesProvided" label="Services Provided">
                                <Select
                                  mode="tags"
                                  tokenSeparators={[","]}
                                  placeholder="Select or add services"
                                  options={[
                                    "Web Development",
                                    "Mobile App Development",
                                    "UI/UX Design",
                                    "API Development",
                                    "Product Strategy",
                                    "QA Testing",
                                    "SEO Optimization",
                                    "Cloud Deployment"
                                  ].map((item) => ({ label: item, value: item }))}
                                />
                              </Form.Item>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="frontendTechnologies" label="Frontend Technologies">
                                    <Select
                                      mode="tags"
                                      tokenSeparators={[","]}
                                      placeholder="Select or add frontend technologies"
                                      options={portfolioTechnologyOptions.frontend}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="backendTechnologies" label="Backend Technologies">
                                    <Select
                                      mode="tags"
                                      tokenSeparators={[","]}
                                      placeholder="Select or add backend technologies"
                                      options={portfolioTechnologyOptions.backend}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="databaseTechnologies" label="Database Technologies">
                                    <Select
                                      mode="tags"
                                      tokenSeparators={[","]}
                                      placeholder="Select or add database technologies"
                                      options={portfolioTechnologyOptions.database}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="outcome" label="Outcome">
                                    <Input.TextArea rows={3} placeholder="Reduced manual effort by 60%." />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item name="techStack" hidden>
                                <Select mode="multiple" />
                              </Form.Item>
                              <Form.Item name="businessProblem" label="Business Problem">
                                <Input.TextArea rows={4} placeholder="Describe the business problem that triggered the project." />
                              </Form.Item>
                              <Form.Item name="technicalChallenges" label="Technical Challenges">
                                <Input.TextArea rows={4} placeholder="Describe the technical complexity, constraints, or integration challenges." />
                              </Form.Item>
                              <Form.Item name="projectGoals" label="Project Goals">
                                <Input.TextArea rows={4} placeholder="List the key goals and expected outcomes for the engagement." />
                              </Form.Item>
                              <Form.Item name="solutionSummary" label="Solution Summary">
                                <div className="admin-rich-editor">
                                  <ReactQuill
                                    theme="snow"
                                    modules={BLOG_EDITOR_MODULES}
                                    formats={BLOG_EDITOR_FORMATS}
                                    placeholder="Describe the implemented solution with rich formatting."
                                  />
                                </div>
                              </Form.Item>
                              <Form.Item label="Features Delivered">
                                <Form.List name="featuresDelivered">
                                  {(fields, { add, remove }) => (
                                    <div className="admin-repeatable-list">
                                      {fields.map(({ key, ...field }) => (
                                        <Space key={key} className="admin-repeatable-row" align="start">
                                          <Form.Item {...field} style={{ flex: 1, marginBottom: 0 }}>
                                            <Input placeholder="User dashboard, lead capture flow, reporting..." />
                                          </Form.Item>
                                          <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
                                        </Space>
                                      ))}
                                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => add("")}>
                                        Add Feature
                                      </Button>
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                              <Form.Item label="Modules Implemented">
                                <Form.List name="modulesImplemented">
                                  {(fields, { add, remove }) => (
                                    <div className="admin-repeatable-list">
                                      {fields.map(({ key, ...field }) => (
                                        <Space key={key} className="admin-repeatable-row" align="start">
                                          <Form.Item {...field} style={{ flex: 1, marginBottom: 0 }}>
                                            <Input placeholder="Admin Panel, Payment System, User Portal..." />
                                          </Form.Item>
                                          <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
                                        </Space>
                                      ))}
                                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => add("")}>
                                        Add Module
                                      </Button>
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                              <Form.Item name="integrationsUsed" label="Tools & Integrations">
                                <Select
                                  mode="tags"
                                  tokenSeparators={[","]}
                                  placeholder="Search, select, or add tools and integrations"
                                  options={portfolioTechnologyOptions.integrations}
                                />
                              </Form.Item>
                              <Form.Item name="architectureOverview" label="Architecture Overview">
                                <div className="admin-rich-editor">
                                  <ReactQuill
                                    theme="snow"
                                    modules={BLOG_EDITOR_MODULES}
                                    formats={BLOG_EDITOR_FORMATS}
                                    placeholder="Describe system architecture, patterns, and any diagram links."
                                  />
                                </div>
                              </Form.Item>
                              <Form.Item label="KPI Metrics">
                                <Form.List name="kpiMetrics">
                                  {(fields, { add, remove }) => (
                                    <div className="admin-repeatable-list">
                                      {fields.map((field) => (
                                        <Row key={field.key} gutter={[12, 0]} className="admin-kpi-row">
                                          <Col xs={24} md={10}>
                                            <Form.Item name={[field.name, "label"]} style={{ marginBottom: 0 }}>
                                              <Input placeholder="Conversion Rate Increase" />
                                            </Form.Item>
                                          </Col>
                                          <Col xs={24} md={10}>
                                            <Form.Item name={[field.name, "value"]} style={{ marginBottom: 0 }}>
                                              <Input placeholder="25%" />
                                            </Form.Item>
                                          </Col>
                                          <Col xs={24} md={4}>
                                            <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(field.name)}>
                                              Delete
                                            </Button>
                                          </Col>
                                        </Row>
                                      ))}
                                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => add({ label: "", value: "" })}>
                                        Add KPI Metric
                                      </Button>
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="beforeValue" label="Before">
                                    <Input placeholder="Manual reporting took 8 hours/week" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="afterValue" label="After">
                                    <Input placeholder="Automated reporting completed in 20 minutes" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item name="impactSummary" label="ROI / Impact Summary">
                                <Input.TextArea rows={4} placeholder="Describe the business impact, ROI, or value delivered." />
                              </Form.Item>
                              <Form.Item name="outcomeDescription" label="Outcome Description">
                                <Input.TextArea rows={4} placeholder="Summarize the final project outcome and conclusion." />
                              </Form.Item>
                              <Divider />
                              <Typography.Title level={5}>Media & Links</Typography.Title>
                              <Form.Item name="featuredImage" label="Featured Image">
                                <Input
                                  placeholder="Upload a JPG, PNG, or WEBP image"
                                  readOnly
                                  addonAfter={
                                    <Space size={8}>
                                      <Upload
                                      showUploadList={false}
                                      accept=".jpg,.jpeg,.png,.webp"
                                      customRequest={async ({ file, onSuccess, onError }) => {
                                        try {
                                          const result = await adminService.uploadImage(file);
                                          const uploadedUrl = result?.data?.url;
                                          if (uploadedUrl) {
                                            portfolioForm.setFieldsValue({
                                              featuredImage: uploadedUrl,
                                              featuredImageRelativeUrl: result?.data?.relativeUrl || ""
                                            });
                                            api.success("Image uploaded.");
                                          }
                                          onSuccess?.(result);
                                        } catch (error) {
                                          api.error("Image upload failed.");
                                          onError?.(error);
                                        }
                                      }}
                                      >
                                        <Button type="link" icon={<UploadOutlined />} style={{ paddingInline: 0 }}>
                                          Upload Image
                                        </Button>
                                      </Upload>
                                      {portfolioPreviewValues.featuredImage ? (
                                        <Button type="link" danger style={{ paddingInline: 0 }} onClick={confirmRemoveFeaturedImage}>
                                          Delete
                                        </Button>
                                      ) : null}
                                    </Space>
                                  }
                                />
                              </Form.Item>
                              <Form.Item name="featuredImageRelativeUrl" hidden>
                                <Input />
                              </Form.Item>
                              <Form.Item name="featuredImageAlt" label="Featured Image Alt Text">
                                <Input placeholder="Describe the primary project visual for accessibility and SEO." />
                              </Form.Item>
                              <Form.Item noStyle shouldUpdate>
                                {({ getFieldValue }) =>
                                  getFieldValue("featuredImage") ? (
                                    <div className="admin-blog-image-preview">
                                      <img src={getFieldValue("featuredImage")} alt={getFieldValue("featuredImageAlt") || "Project preview"} />
                                    </div>
                                  ) : null
                                }
                              </Form.Item>
                              <Form.Item label="Gallery Images">
                                <Space direction="vertical" style={{ width: "100%" }} size={12}>
                                  <Upload
                                    multiple
                                    showUploadList={false}
                                    accept=".jpg,.jpeg,.png,.webp"
                                    customRequest={async ({ file, onSuccess, onError }) => {
                                      try {
                                        const result = await adminService.uploadImage(file);
                                        const uploadedImage = {
                                          id: `gallery-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
                                          url: result?.data?.url || "",
                                          relativeUrl: result?.data?.relativeUrl || "",
                                          altText: ""
                                        };
                                        const nextImages = [...(portfolioForm.getFieldValue("galleryImages") || []), uploadedImage];
                                        portfolioForm.setFieldValue("galleryImages", nextImages);
                                        api.success("Gallery image uploaded.");
                                        onSuccess?.(result);
                                      } catch (error) {
                                        api.error("Gallery image upload failed.");
                                        onError?.(error);
                                      }
                                    }}
                                  >
                                    <Button icon={<UploadOutlined />}>Upload Gallery Images</Button>
                                  </Upload>
                                  <Form.Item noStyle shouldUpdate>
                                    {({ getFieldValue }) => {
                                      const galleryImages = getFieldValue("galleryImages") || [];

                                      if (!galleryImages.length) {
                                        return (
                                          <Typography.Text type="secondary">
                                            Upload multiple images to build a visual gallery. Drag cards to reorder them.
                                          </Typography.Text>
                                        );
                                      }

                                      return (
                                        <div style={{ display: "grid", gap: 12 }}>
                                          {galleryImages.map((image, index) => (
                                            <div
                                              key={image.id}
                                              draggable
                                              onDragStart={() => setDraggedGalleryImageId(image.id)}
                                              onDragOver={(event) => event.preventDefault()}
                                              onDrop={() => {
                                                const currentImages = portfolioForm.getFieldValue("galleryImages") || [];
                                                const fromIndex = currentImages.findIndex((item) => item.id === draggedGalleryImageId);
                                                const toIndex = currentImages.findIndex((item) => item.id === image.id);
                                                portfolioForm.setFieldValue("galleryImages", moveItem(currentImages, fromIndex, toIndex));
                                                setDraggedGalleryImageId("");
                                              }}
                                              onDragEnd={() => setDraggedGalleryImageId("")}
                                              style={{
                                                display: "grid",
                                                gap: 12,
                                                gridTemplateColumns: "120px 1fr auto",
                                                alignItems: "start",
                                                padding: 12,
                                                border: "1px solid var(--color-border, #d9d9d9)",
                                                borderRadius: 12,
                                                background: "#fff"
                                              }}
                                            >
                                              <img
                                                src={image.url}
                                                alt={image.altText || `Gallery image ${index + 1}`}
                                                style={{ width: 120, height: 84, objectFit: "cover", borderRadius: 8 }}
                                              />
                                              <Form.Item
                                                style={{ marginBottom: 0 }}
                                                label={`Gallery Alt Text ${index + 1}`}
                                              >
                                                <Input
                                                  value={image.altText || ""}
                                                  placeholder="Describe what this gallery image shows."
                                                  onChange={(event) => {
                                                    const nextImages = [...galleryImages];
                                                    nextImages[index] = { ...nextImages[index], altText: event.target.value };
                                                    portfolioForm.setFieldValue("galleryImages", nextImages);
                                                  }}
                                                />
                                              </Form.Item>
                                              <Space direction="vertical">
                                                <Typography.Text type="secondary">Drag</Typography.Text>
                                                <Button danger onClick={() => confirmRemoveGalleryImage(image)}>
                                                  Delete
                                                </Button>
                                              </Space>
                                            </div>
                                          ))}
                                        </div>
                                      );
                                    }}
                                  </Form.Item>
                                </Space>
                              </Form.Item>
                              <Form.Item
                                name="videoUrl"
                                label="Video URL"
                                rules={[
                                  {
                                    validator(_, value) {
                                      if (!value || getVideoEmbedUrl(value)) {
                                        return Promise.resolve();
                                      }

                                      return Promise.reject(new Error("Enter a valid YouTube or Vimeo URL."));
                                    }
                                  }
                                ]}
                              >
                                <Input placeholder="https://www.youtube.com/watch?v=..." />
                              </Form.Item>
                              {portfolioVideoPreviewUrl ? (
                                <div style={{ marginBottom: 24 }}>
                                  <Typography.Text strong>Video Preview</Typography.Text>
                                  <div style={{ position: "relative", paddingTop: "56.25%", marginTop: 12, overflow: "hidden", borderRadius: 12 }}>
                                    <iframe
                                      src={portfolioVideoPreviewUrl}
                                      title="Project video preview"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                                    />
                                  </div>
                                </div>
                              ) : null}
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="demoUrl" label="Demo URL" rules={[{ type: "url", message: "Enter a valid demo URL." }]}>
                                    <Input placeholder="https://demo.example.com" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="liveUrl" label="Live Project URL" rules={[{ type: "url", message: "Enter a valid live project URL." }]}>
                                    <Input placeholder="https://app.example.com" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item name="designUrl" label="Design / Figma URL" rules={[{ type: "url", message: "Enter a valid design URL." }]}>
                                <Input placeholder="https://www.figma.com/file/..." />
                              </Form.Item>
                              <Form.Item label="Document Attachments">
                                <Space direction="vertical" style={{ width: "100%" }} size={12}>
                                  <Upload
                                    multiple
                                    showUploadList={false}
                                    accept=".pdf,.doc,.docx"
                                    customRequest={async ({ file, onSuccess, onError }) => {
                                      try {
                                        const result = await adminService.uploadDocument(file);
                                        const nextDocuments = [
                                          ...(portfolioForm.getFieldValue("documentAttachments") || []),
                                          {
                                            id: `document-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
                                            title: file.name.replace(/\.[^.]+$/, ""),
                                            url: result?.data?.url || "",
                                            relativeUrl: result?.data?.relativeUrl || "",
                                            fileName: result?.data?.filename || file.name
                                          }
                                        ];
                                        portfolioForm.setFieldValue("documentAttachments", nextDocuments);
                                        api.success("Document uploaded.");
                                        onSuccess?.(result);
                                      } catch (error) {
                                        api.error("Document upload failed.");
                                        onError?.(error);
                                      }
                                    }}
                                  >
                                    <Button icon={<UploadOutlined />}>Upload Documents</Button>
                                  </Upload>
                                  <Form.Item noStyle shouldUpdate>
                                    {({ getFieldValue }) => {
                                      const documentAttachments = getFieldValue("documentAttachments") || [];

                                      if (!documentAttachments.length) {
                                        return <Typography.Text type="secondary">Upload PDF, DOC, or DOCX attachments.</Typography.Text>;
                                      }

                                      return (
                                        <div style={{ display: "grid", gap: 12 }}>
                                          {documentAttachments.map((documentItem, index) => (
                                            <div
                                              key={documentItem.id}
                                              style={{
                                                display: "grid",
                                                gap: 12,
                                                gridTemplateColumns: "1fr auto",
                                                alignItems: "start",
                                                padding: 12,
                                                border: "1px solid var(--color-border, #d9d9d9)",
                                                borderRadius: 12,
                                                background: "#fff"
                                              }}
                                            >
                                              <Form.Item label={`Attachment Title ${index + 1}`} style={{ marginBottom: 0 }}>
                                                <Input
                                                  value={documentItem.title}
                                                  placeholder="Project brief, case study, requirement doc..."
                                                  onChange={(event) => {
                                                    const nextDocuments = [...documentAttachments];
                                                    nextDocuments[index] = { ...nextDocuments[index], title: event.target.value };
                                                    portfolioForm.setFieldValue("documentAttachments", nextDocuments);
                                                  }}
                                                />
                                              </Form.Item>
                                              <Button danger onClick={() => confirmRemoveDocument(documentItem)}>
                                                Delete
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      );
                                    }}
                                  </Form.Item>
                                </Space>
                              </Form.Item>
                              <Divider />
                              <Typography.Title level={5}>Client Testimonial</Typography.Title>
                              <Form.Item name="testimonialContent" label="Testimonial Text">
                                <div className="admin-rich-editor">
                                  <ReactQuill
                                    theme="snow"
                                    modules={BLOG_EDITOR_MODULES}
                                    formats={BLOG_EDITOR_FORMATS}
                                    placeholder="Write the client testimonial with rich formatting."
                                  />
                                </div>
                              </Form.Item>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="testimonialAuthorName" label="Client Name">
                                    <Input placeholder="Jane Cooper" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="testimonialAuthorDesignation" label="Client Designation">
                                    <Input placeholder="Product Manager, Acme Labs" />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="testimonialAuthorImage" label="Client Photo">
                                    <Input
                                      placeholder="Upload client image"
                                      readOnly
                                      addonAfter={
                                        <Upload
                                          showUploadList={false}
                                          accept=".jpg,.jpeg,.png,.webp"
                                          customRequest={async ({ file, onSuccess, onError }) => {
                                            try {
                                              const result = await adminService.uploadImage(file);
                                              const uploadedUrl = result?.data?.url;
                                              if (uploadedUrl) {
                                                portfolioForm.setFieldValue("testimonialAuthorImage", uploadedUrl);
                                                api.success("Client image uploaded.");
                                              }
                                              onSuccess?.(result);
                                            } catch (error) {
                                              api.error("Client image upload failed.");
                                              onError?.(error);
                                            }
                                          }}
                                        >
                                          <Button type="link" icon={<UploadOutlined />} style={{ paddingInline: 0 }}>
                                            Upload Image
                                          </Button>
                                        </Upload>
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="testimonialRating" label="Testimonial Rating">
                                    <Select
                                      allowClear
                                      placeholder="Select rating"
                                      options={[
                                        { label: "1 Star", value: 1 },
                                        { label: "2 Stars", value: 2 },
                                        { label: "3 Stars", value: 3 },
                                        { label: "4 Stars", value: 4 },
                                        { label: "5 Stars", value: 5 }
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item noStyle shouldUpdate>
                                {({ getFieldValue }) =>
                                  getFieldValue("testimonialAuthorImage") ? (
                                    <div className="admin-blog-image-preview">
                                      <img src={getFieldValue("testimonialAuthorImage")} alt={getFieldValue("testimonialAuthorName") || "Client testimonial"} />
                                    </div>
                                  ) : null
                                }
                              </Form.Item>
                              <div className="admin-portfolio-status-row">
                                <div>
                                  <Typography.Text strong>Show testimonial</Typography.Text>
                                  <Typography.Paragraph>
                                    Hide the testimonial on the frontend without removing the saved content.
                                  </Typography.Paragraph>
                                </div>
                                <Form.Item name="showTestimonial" valuePropName="checked" style={{ marginBottom: 0 }}>
                                  <Switch checkedChildren="Visible" unCheckedChildren="Hidden" />
                                </Form.Item>
                              </div>
                              <Divider />
                              <Typography.Title level={5}>SEO</Typography.Title>
                              <Form.Item
                                name="metaTitle"
                                label="Meta Title"
                                rules={[{ max: 70, message: "Meta title must be 70 characters or fewer." }]}
                              >
                                <Input maxLength={70} showCount placeholder="Project page title for search results" />
                              </Form.Item>
                              <Form.Item
                                name="metaDescription"
                                label="Meta Description"
                                rules={[{ max: 160, message: "Meta description must be 160 characters or fewer." }]}
                              >
                                <Input.TextArea rows={3} maxLength={160} showCount placeholder="Search snippet description for the project page" />
                              </Form.Item>
                              <Form.Item name="seoKeywords" label="SEO Keywords">
                                <Select
                                  mode="tags"
                                  tokenSeparators={[","]}
                                  placeholder="Enter keywords separated by commas"
                                />
                              </Form.Item>
                              <Form.Item name="canonicalUrl" label="Canonical URL" rules={[{ type: "url", message: "Enter a valid canonical URL." }]}>
                                <Input placeholder="https://www.quadravise.com/portfolio/project-slug" />
                              </Form.Item>
                              <div className="admin-portfolio-status-row">
                                <div>
                                  <Typography.Text strong>Noindex</Typography.Text>
                                  <Typography.Paragraph>
                                    Enable this to prevent search engines from indexing this project page.
                                  </Typography.Paragraph>
                                </div>
                                <Form.Item name="noindex" valuePropName="checked" style={{ marginBottom: 0 }}>
                                  <Switch checkedChildren="Noindex" unCheckedChildren="Index" />
                                </Form.Item>
                              </div>
                              <Form.Item name="ogImage" label="Open Graph Image">
                                <Input
                                  placeholder="Upload OG image"
                                  readOnly
                                  addonAfter={
                                    <Upload
                                      showUploadList={false}
                                      accept=".jpg,.jpeg,.png,.webp"
                                      customRequest={async ({ file, onSuccess, onError }) => {
                                        try {
                                          const result = await adminService.uploadImage(file);
                                          const uploadedUrl = result?.data?.url;
                                          if (uploadedUrl) {
                                            portfolioForm.setFieldValue("ogImage", uploadedUrl);
                                            api.success("OG image uploaded.");
                                          }
                                          onSuccess?.(result);
                                        } catch (error) {
                                          api.error("OG image upload failed.");
                                          onError?.(error);
                                        }
                                      }}
                                    >
                                      <Button type="link" icon={<UploadOutlined />} style={{ paddingInline: 0 }}>
                                        Upload Image
                                      </Button>
                                    </Upload>
                                  }
                                />
                              </Form.Item>
                              <Divider />
                              <Typography.Title level={5}>Display & Visibility</Typography.Title>
                              <Row gutter={[16, 0]}>
                                <Col xs={24} md={12}>
                                  <Form.Item name="sortOrder" label="Sort Order">
                                    <Input type="number" min={0} />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item name="projectBadge" label="Project Badge">
                                    <Select
                                      mode="tags"
                                      maxCount={1}
                                      tokenSeparators={[","]}
                                      options={["Featured", "New", "Enterprise", "Launch Ready", "Case Study"].map((item) => ({ label: item, value: item }))}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item name="visibility" label="Project Visibility">
                                <Select
                                  options={[
                                    { label: "Public", value: "public" },
                                    { label: "Private", value: "private" },
                                    { label: "Hidden", value: "hidden" }
                                  ]}
                                />
                              </Form.Item>
                              <div className="admin-portfolio-status-row">
                                <div>
                                  <Typography.Text strong>Show on homepage</Typography.Text>
                                  <Typography.Paragraph>
                                    Include this project in homepage portfolio sections when eligible.
                                  </Typography.Paragraph>
                                </div>
                                <Form.Item name="showOnHomepage" valuePropName="checked" style={{ marginBottom: 0 }}>
                                  <Switch checkedChildren="Homepage On" unCheckedChildren="Homepage Off" />
                                </Form.Item>
                              </div>
                              {editingProjectId ? (
                                <Card size="small" style={{ marginBottom: 24 }}>
                                  <Typography.Text strong>Project Metadata</Typography.Text>
                                  <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
                                    <Typography.Text type="secondary">Last updated: {formatAdminDate(portfolioPreviewValues.updatedAt)}</Typography.Text>
                                    <Typography.Text type="secondary">Creator ID: {portfolioPreviewValues.createdByUserId || "Unknown"}</Typography.Text>
                                    <Typography.Text type="secondary">Last modified by ID: {portfolioPreviewValues.lastModifiedByUserId || "Unknown"}</Typography.Text>
                                    <Typography.Text type="secondary">Views: {portfolioPreviewValues.viewCount || 0}</Typography.Text>
                                    <Typography.Text type="secondary">Link clicks: {portfolioPreviewValues.linkClickCount || 0}</Typography.Text>
                                  </div>
                                </Card>
                              ) : null}
                              <div className="admin-portfolio-status-row">
                                <div>
                                  <Typography.Text strong>Project status</Typography.Text>
                                  <Typography.Paragraph>
                                    Leave this off to keep the project in draft. Enable it when the project is ready to publish.
                                  </Typography.Paragraph>
                                </div>
                                {adminSession?.role === "admin" ? (
                                  <Form.Item name="isPublished" valuePropName="checked" style={{ marginBottom: 0 }}>
                                    <Switch checkedChildren="Published" unCheckedChildren="Draft" />
                                  </Form.Item>
                                ) : (
                                  <Typography.Text type="secondary">Admin only</Typography.Text>
                                )}
                              </div>
                              <div className="admin-portfolio-status-row">
                                <div>
                                  <Typography.Text strong>Featured project</Typography.Text>
                                  <Typography.Paragraph>
                                    Featured projects are prioritized for homepage and portfolio highlight sections.
                                  </Typography.Paragraph>
                                </div>
                                <Form.Item name="isFeatured" valuePropName="checked" style={{ marginBottom: 0 }}>
                                  <Switch checkedChildren="Featured" unCheckedChildren="Standard" />
                                </Form.Item>
                              </div>
                              <div className="admin-portfolio-status-row">
                                <div>
                                  <Typography.Text strong>Confidential project</Typography.Text>
                                  <Typography.Paragraph>
                                    Hide client-identifying details on the public frontend while keeping the project visible.
                                  </Typography.Paragraph>
                                </div>
                                <Form.Item name="isConfidential" valuePropName="checked" style={{ marginBottom: 0 }}>
                                  <Switch checkedChildren="Confidential" unCheckedChildren="Public Details" />
                                </Form.Item>
                              </div>
                                <Space className="admin-portfolio-editor-actions" wrap>
                                  <Button
                                    type="primary"
                                    icon={editingProjectId ? <SaveOutlined /> : <PlusOutlined />}
                                    htmlType="submit"
                                    onClick={() => {
                                      if (!portfolioPreviewValues.isPublished) {
                                        portfolioForm.setFieldValue("isPublished", false);
                                      }
                                    }}
                                  >
                                    {editingProjectId
                                      ? portfolioPreviewValues.isPublished
                                        ? "Save Changes"
                                        : "Save Draft"
                                      : "Save Project"}
                                  </Button>
                                  {adminSession?.role === "admin" ? (
                                    <Button
                                      onClick={() => {
                                        portfolioForm.setFieldValue("isPublished", !portfolioPreviewValues.isPublished);
                                        portfolioForm.submit();
                                      }}
                                    >
                                      {portfolioPreviewValues.isPublished
                                        ? "Unpublish"
                                        : editingProjectId
                                          ? "Publish"
                                          : "Create & Publish"}
                                    </Button>
                                  ) : null}
                                  <Button onClick={openProjectPreview}>Preview</Button>
                                  <Button
                                    onClick={() => {
                                      setPortfolioModalOpen(false);
                                      setEditingProjectId(null);
                                      setPortfolioSlugTouched(false);
                                      portfolioForm.resetFields();
                                      portfolioForm.setFieldsValue(getDefaultPortfolioFormValues());
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </Space>
                              </Form>
                        </Card>
                      </div>
                    ) : null}
                  </Card>
                )
              },
              {
                key: "client-access",
                label: "Client Access",
                children: (
                  <Card className="admin-card" loading={clientAccessLoading}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} xl={14}>
                        <Card
                          size="small"
                          title="Client Projects"
                          extra={(
                            <Button type="primary" icon={<PlusOutlined />} onClick={openCreateClientProjectModal}>
                              Add Client Project
                            </Button>
                          )}
                        >
                          <Table
                            className="admin-table"
                            rowKey="id"
                            pagination={{ pageSize: 5, showSizeChanger: true }}
                            scroll={{ x: 880 }}
                            dataSource={clientWorkspaceProjects}
                            columns={[
                              { title: "Project", dataIndex: "name", key: "name" },
                              { title: "Slug", dataIndex: "slug", key: "slug" },
                              {
                                title: "Status",
                                dataIndex: "status",
                                key: "status",
                                render: (value) => <Tag color={value === "active" ? "green" : "default"}>{value || "active"}</Tag>
                              },
                              {
                                title: "Assigned Clients",
                                dataIndex: "assignedUsers",
                                key: "assignedUsers",
                                render: (items) => (items || []).length
                                  ? (items || []).map((item) => item.fullName).join(", ")
                                  : "-"
                              },
                              {
                                title: "Workspace Link",
                                key: "workspaceLink",
                                render: (_, row) => (
                                  <Space>
                                    <Typography.Text copyable={{ text: getClientWorkspaceUrl(row.slug) }}>
                                      {getClientWorkspacePath(row.slug)}
                                    </Typography.Text>
                                    <Button type="text" icon={<CopyOutlined />} onClick={() => copyClientWorkspaceLink(row.slug)}>
                                      Copy
                                    </Button>
                                  </Space>
                                )
                              },
                              {
                                title: "Action",
                                key: "action",
                                render: (_, row) => (
                                  <Space>
                                    <Button
                                      type="text"
                                      icon={<EyeOutlined />}
                                      onClick={() => window.open(getClientWorkspacePath(row.slug), "_blank", "noopener,noreferrer")}
                                    >
                                      Open Dashboard
                                    </Button>
                                    <Button type="text" icon={<EditOutlined />} onClick={() => openEditClientProjectModal(row)}>
                                      Edit
                                    </Button>
                                  </Space>
                                )
                              }
                            ]}
                            locale={{ emptyText: "No client projects created yet." }}
                          />
                        </Card>
                      </Col>
                      <Col xs={24} xl={10}>
                        <Card
                          size="small"
                          title="Client Users"
                          extra={(
                            <Button type="primary" icon={<PlusOutlined />} onClick={openCreateClientUserModal}>
                              Add Client User
                            </Button>
                          )}
                        >
                          <Table
                            className="admin-table"
                            rowKey="id"
                            pagination={{ pageSize: 5, showSizeChanger: true }}
                            scroll={{ x: 760 }}
                            dataSource={clientWorkspaceUsers}
                            columns={[
                              { title: "Full Name", dataIndex: "fullName", key: "fullName" },
                              { title: "Email", dataIndex: "email", key: "email" },
                              {
                                title: "Status",
                                dataIndex: "isActive",
                                key: "isActive",
                                render: (value) => (value ? "Active" : "Inactive")
                              },
                              {
                                title: "Assigned Projects",
                                dataIndex: "assignedProjects",
                                key: "assignedProjects",
                                render: (items) => (items || []).length
                                  ? (items || []).map((item) => item.name).join(", ")
                                  : "-"
                              },
                              {
                                title: "Action",
                                key: "action",
                                render: (_, row) => (
                                  <Button type="text" icon={<EditOutlined />} onClick={() => openEditClientUserModal(row)}>
                                    Edit
                                  </Button>
                                )
                              }
                            ]}
                            locale={{ emptyText: "No client users created yet." }}
                          />
                        </Card>
                      </Col>
                    </Row>
                    <Modal
                      title={editingClientProjectId ? "Edit Client Project" : "Add Client Project"}
                      open={clientProjectModalOpen}
                      onCancel={() => {
                        setClientProjectModalOpen(false);
                        setEditingClientProjectId(null);
                        clientProjectForm.resetFields();
                      }}
                      footer={null}
                      width={760}
                    >
                      <Form
                        layout="vertical"
                        form={clientProjectForm}
                        onFinish={saveClientProject}
                      >
                        <Row gutter={[16, 0]}>
                          <Col xs={24} md={12}>
                            <Form.Item name="name" label="Project Name" rules={[{ required: true }]}>
                              <Input placeholder="Phoenix Wellness Portal" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="slug" label="Project Slug" rules={[{ required: true }]}>
                              <Input placeholder="Auto-generated from project name" readOnly />
                            </Form.Item>
                          </Col>
                          <Col xs={24}>
                            <Form.Item name="description" label="Description">
                              <Input.TextArea rows={3} placeholder="What this client workspace covers." />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                              <Select
                                options={[
                                  { label: "Active", value: "active" },
                                  { label: "Paused", value: "paused" },
                                  { label: "Completed", value: "completed" },
                                  { label: "Archived", value: "archived" }
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="clientUserIds" label="Assigned Client Users">
                              <Select mode="multiple" options={clientWorkspaceUserOptions} placeholder="Assign client users" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Card size="small" style={{ marginBottom: 16 }}>
                          <Typography.Text strong>Workspace Link Preview</Typography.Text>
                          <Typography.Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
                            {clientProjectSlugValue
                              ? getClientWorkspacePath(clientProjectSlugValue)
                              : "Enter a project name to generate the workspace link."}
                          </Typography.Paragraph>
                        </Card>
                        <Space>
                          <Button type="primary" icon={editingClientProjectId ? <SaveOutlined /> : <PlusOutlined />} htmlType="submit">
                            {editingClientProjectId ? "Update Project" : "Create Project"}
                          </Button>
                          <Button
                            onClick={() => {
                              setClientProjectModalOpen(false);
                              setEditingClientProjectId(null);
                              clientProjectForm.resetFields();
                            }}
                          >
                            Cancel
                          </Button>
                        </Space>
                      </Form>
                    </Modal>
                    <Modal
                      title={editingClientUserId ? "Edit Client User" : "Add Client User"}
                      open={clientUserModalOpen}
                      onCancel={() => {
                        setClientUserModalOpen(false);
                        setEditingClientUserId(null);
                        clientUserForm.resetFields();
                      }}
                      footer={null}
                      width={760}
                    >
                      <Form layout="vertical" form={clientUserForm} onFinish={saveClientUser} initialValues={{ isActive: true }}>
                        <Row gutter={[16, 0]}>
                          <Col xs={24} md={12}>
                            <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                              <Input placeholder="Client Contact" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                              <Input placeholder="client@example.com" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              name="password"
                              label={editingClientUserId ? "Password Reset" : "Temporary Password"}
                              rules={editingClientUserId ? [] : [{ required: true, min: 8 }]}
                              extra={editingClientUserId ? "Leave blank to keep the current password." : "Share this with the client securely."}
                            >
                              <Input.Password placeholder="Minimum 8 characters" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="isActive" label="Active" valuePropName="checked">
                              <Switch />
                            </Form.Item>
                          </Col>
                          <Col xs={24}>
                            <Form.Item name="projectIds" label="Assigned Projects">
                              <Select mode="multiple" options={clientWorkspaceProjectOptions} placeholder="Assign accessible projects" />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Space>
                          <Button type="primary" icon={editingClientUserId ? <SaveOutlined /> : <PlusOutlined />} htmlType="submit">
                            {editingClientUserId ? "Update Client User" : "Create Client User"}
                          </Button>
                          <Button
                            onClick={() => {
                              setClientUserModalOpen(false);
                              setEditingClientUserId(null);
                              clientUserForm.resetFields();
                            }}
                          >
                            Cancel
                          </Button>
                        </Space>
                      </Form>
                    </Modal>
                  </Card>
                )
              },
              {
                key: "users",
                label: "User Management",
                children: (
                  <Card className="admin-card" loading={userLoading}>
                    <Space style={{ marginBottom: 12 }} wrap>
                      <Input.Search
                        className="admin-search"
                        allowClear
                        placeholder="Search users by name, email, role, product..."
                        value={userTable.search}
                        onChange={(event) => setUserTable((prev) => ({ ...prev, search: event.target.value }))}
                        onSearch={(value) => fetchUsers({ page: 1, search: value })}
                        style={{ width: 360 }}
                      />
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="hero-btn hero-btn-primary"
                        onClick={openCreateUserModal}
                      >
                        Add User
                      </Button>
                    </Space>
                    <Table
                      className="admin-table"
                      rowKey="id"
                      columns={userColumns}
                      dataSource={users}
                      pagination={{
                        current: userTable.page,
                        pageSize: userTable.pageSize,
                        total: userTable.total,
                        showSizeChanger: true
                      }}
                      onChange={(pagination) => {
                        fetchUsers({ page: pagination.current, pageSize: pagination.pageSize });
                      }}
                    />
                    <Modal
                      title={editingUserId ? "Edit User" : "Add User"}
                      open={userModalOpen}
                      onCancel={() => {
                        setUserModalOpen(false);
                        setEditingUserId(null);
                        userForm.resetFields();
                      }}
                      footer={null}
                      width={720}
                    >
                      <Form
                        layout="vertical"
                        form={userForm}
                        onFinish={saveUser}
                        initialValues={{ role: activeRoleOptions[0]?.value || "manager", isActive: true }}
                      >
                        <Row gutter={[16, 0]}>
                          <Col xs={24} md={12}>
                            <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={[16, 0]}>
                          <Col xs={24} md={12}>
                            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                              <Select options={activeRoleOptions} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="isActive" label="Active" valuePropName="checked">
                              <Switch />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item name="products" label="Assigned Products">
                          <Select
                            mode="multiple"
                            options={activeProductOptions}
                          />
                        </Form.Item>
                        <Space>
                          <Button type="primary" icon={editingUserId ? <SaveOutlined /> : <PlusOutlined />} htmlType="submit">
                            {editingUserId ? "Update User" : "Save User"}
                          </Button>
                          <Button
                            onClick={() => {
                              setUserModalOpen(false);
                              setEditingUserId(null);
                              userForm.resetFields();
                            }}
                          >
                            Cancel
                          </Button>
                        </Space>
                      </Form>
                    </Modal>
                  </Card>
                )
              },
              {
                key: "configuration",
                label: "Configuration",
                children: (
                  <Card className="admin-card" loading={configurationLoading}>
                    <Typography.Title level={4}>Role and Access Management</Typography.Title>
                    <Typography.Paragraph>
                      Manage the roles available to admin users and define which products each role can access.
                    </Typography.Paragraph>
                    <Form layout="vertical" form={configurationForm} onFinish={saveConfiguration} initialValues={adminConfiguration}>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                          <Card size="small" bordered={false}>
                            <Space size={8} align="center">
                              <TeamOutlined />
                              <Typography.Text type="secondary">Active Roles</Typography.Text>
                            </Space>
                            <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 0 }}>
                              {(adminConfiguration.roles || []).filter((role) => role.isActive !== false).length}
                            </Typography.Title>
                          </Card>
                        </Col>
                        <Col xs={24} md={8}>
                          <Card size="small" bordered={false}>
                            <Space size={8} align="center">
                              <AppstoreOutlined />
                              <Typography.Text type="secondary">Active Products</Typography.Text>
                            </Space>
                            <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 0 }}>
                              {(adminConfiguration.products || []).filter((product) => product.isActive !== false).length}
                            </Typography.Title>
                          </Card>
                        </Col>
                        <Col xs={24} md={8}>
                          <Card size="small" bordered={false}>
                            <Space size={8} align="center">
                              <LinkOutlined />
                              <Typography.Text type="secondary">Access Links</Typography.Text>
                            </Space>
                            <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 0 }}>
                              {(adminConfiguration.roles || []).reduce((total, role) => total + (role.productKeys?.length || 0), 0)}
                            </Typography.Title>
                          </Card>
                        </Col>
                      </Row>
                      <Divider />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                          Product Catalog
                        </Typography.Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateProductModal}>
                          Add Product
                        </Button>
                      </div>
                      <Table
                        className="admin-table"
                        rowKey="id"
                        pagination={{
                          pageSize: 5,
                          showSizeChanger: true,
                          pageSizeOptions: [5, 10, 20]
                        }}
                        scroll={{ x: 720 }}
                        dataSource={configurationProductsTableData}
                        columns={[
                          { title: "Label", dataIndex: "label", key: "label" },
                          { title: "Key", dataIndex: "key", key: "key", render: (value) => value || "-" },
                          {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            render: (value) => value || "-"
                          },
                          {
                            title: "Status",
                            dataIndex: "isActive",
                            key: "isActive",
                            render: (value) => (value ? "Active" : "Inactive")
                          },
                          {
                            title: "Action",
                            key: "action",
                            render: (_, row) => (
                              <Space>
                                <Button type="text" icon={<EditOutlined />} onClick={() => openEditProductModal(row.index)}>
                                  Edit
                                </Button>
                                <Button danger type="text" icon={<DeleteOutlined />} onClick={() => deleteProduct(row.index)}>
                                  Delete
                                </Button>
                              </Space>
                            )
                          }
                        ]}
                        locale={{ emptyText: "No products configured." }}
                      />
                      <Modal
                        title={editingProductIndex === null ? "Add Product" : "Edit Product"}
                        open={productModalOpen}
                        onCancel={() => {
                          setProductModalOpen(false);
                          setEditingProductIndex(null);
                          productForm.resetFields();
                        }}
                        footer={null}
                        width={680}
                      >
                        <Form layout="vertical" form={productForm} onFinish={saveProductDraft} initialValues={{ isActive: true }}>
                          <Row gutter={[16, 0]}>
                            <Col xs={24} md={12}>
                              <Form.Item name="label" label="Label" rules={[{ required: true, message: "Product label is required" }]}>
                                <Input placeholder="Website" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item name="key" label="Key" rules={[{ required: true, message: "Product key is required" }]}>
                                <Input placeholder="website" />
                              </Form.Item>
                            </Col>
                            <Col xs={24}>
                              <Form.Item name="description" label="Description">
                                <Input placeholder="What this product access covers." />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item name="isActive" label="Active" valuePropName="checked">
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Space>
                            <Button type="primary" icon={editingProductIndex === null ? <PlusOutlined /> : <SaveOutlined />} htmlType="submit">
                              {editingProductIndex === null ? "Add Product" : "Update Product"}
                            </Button>
                            <Button
                              onClick={() => {
                                setProductModalOpen(false);
                                setEditingProductIndex(null);
                                productForm.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                          </Space>
                        </Form>
                      </Modal>
                      <Divider />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                          Role Management
                        </Typography.Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateRoleModal}>
                          Add Role
                        </Button>
                      </div>
                      <Table
                        className="admin-table"
                        rowKey="id"
                        pagination={{
                          pageSize: 5,
                          showSizeChanger: true,
                          pageSizeOptions: [5, 10, 20]
                        }}
                        scroll={{ x: 760 }}
                        dataSource={configurationRolesTableData}
                        columns={[
                          { title: "Role Name", dataIndex: "name", key: "name" },
                          { title: "Key", dataIndex: "key", key: "key", render: (value) => value || "-" },
                          {
                            title: "Accessible Products",
                            dataIndex: "productKeys",
                            key: "productKeys",
                            render: (values) =>
                              (values || []).map((productKey) => productLabelMap[productKey] || productKey).join(", ") || "-"
                          },
                          {
                            title: "Status",
                            dataIndex: "isActive",
                            key: "isActive",
                            render: (value) => (value ? "Active" : "Inactive")
                          },
                          {
                            title: "Action",
                            key: "action",
                            render: (_, row) => (
                              <Space>
                                <Button type="text" icon={<EditOutlined />} onClick={() => openEditRoleModal(row.index)}>
                                  Edit
                                </Button>
                                <Button danger type="text" icon={<DeleteOutlined />} onClick={() => deleteRole(row.index)}>
                                  Delete
                                </Button>
                              </Space>
                            )
                          }
                        ]}
                        locale={{ emptyText: "No roles configured." }}
                      />
                      <Modal
                        title={editingRoleIndex === null ? "Add Role" : "Edit Role"}
                        open={roleModalOpen}
                        onCancel={() => {
                          setRoleModalOpen(false);
                          setEditingRoleIndex(null);
                          roleForm.resetFields();
                        }}
                        footer={null}
                        width={760}
                      >
                        <Form layout="vertical" form={roleForm} onFinish={saveRoleDraft} initialValues={{ isActive: true }}>
                          <Row gutter={[16, 0]}>
                            <Col xs={24} md={12}>
                              <Form.Item name="name" label="Role Name" rules={[{ required: true, message: "Role name is required" }]}>
                                <Input placeholder="Manager" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item name="key" label="Role Key" rules={[{ required: true, message: "Role key is required" }]}>
                                <Input placeholder="manager" />
                              </Form.Item>
                            </Col>
                            <Col xs={24}>
                              <Form.Item name="description" label="Description">
                                <Input placeholder="What this role is responsible for." />
                              </Form.Item>
                            </Col>
                            <Col xs={24}>
                              <Form.Item name="productKeys" label="Accessible Products">
                                <Select mode="multiple" options={configurationProductOptions.filter((option) => option.value)} />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item name="isActive" label="Active" valuePropName="checked">
                                <Switch />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Space>
                            <Button type="primary" icon={editingRoleIndex === null ? <PlusOutlined /> : <SaveOutlined />} htmlType="submit">
                              {editingRoleIndex === null ? "Add Role" : "Update Role"}
                            </Button>
                            <Button
                              onClick={() => {
                                setRoleModalOpen(false);
                                setEditingRoleIndex(null);
                                roleForm.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                          </Space>
                        </Form>
                      </Modal>
                      <Divider />
                      <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                        Save Configuration
                      </Button>
                    </Form>
                  </Card>
                )
              },
              {
                key: "settings",
                label: "Company Settings",
                children: (
                  <Card className="admin-card" loading={settingsLoading}>
                    <Typography.Title level={4}>Contact and Snapshot Settings</Typography.Title>
                    <Form layout="vertical" form={settingsForm} onFinish={saveSettings} initialValues={settings || {}}>
                      <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="linkedin" label="LinkedIn URL" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="instagram" label="Instagram URL">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="facebook" label="Facebook URL">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="workingHours" label="Working Hours" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Divider />
                      <Typography.Title level={5}>Social Visibility Toggles</Typography.Title>
                      <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item name="showLinkedin" label="Show LinkedIn" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="showEmail" label="Show Email" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="showInstagram" label="Show Instagram" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="showFacebook" label="Show Facebook" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Divider />
                      <Typography.Title level={5}>Homepage Snapshot Numbers</Typography.Title>
                      <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item name="projectsDelivered" label="Projects Delivered" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="mvpKickoffSpeed" label="MVP Kickoff Speed" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="reliabilityFocus" label="Reliability Focus" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="performanceBuild" label="Performance Build" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="industriesServed" label="Industries Served" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Divider />
                      <Typography.Title level={5}>About Snapshot Numbers</Typography.Title>
                      <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item name="aboutYearsExperience" label="Years Experience" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="aboutProductsDelivered" label="About Products Delivered" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="aboutCoreTeamSize" label="Core Team Size" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="aboutReliabilityFocus" label="About Reliability Focus" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Divider />
                      <Typography.Title level={5}>Product & Trust Snapshot Numbers</Typography.Title>
                      <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item name="quadrailearnTracks" label="QuadraiLearn Tracks" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item name="mvpWindow" label="Typical MVP Window" rules={[{ required: true }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                        Save Settings
                      </Button>
                    </Form>
                  </Card>
                )
              },
              {
                key: "leads",
                label: "Consultation Requests",
                children: (
                  <Card className="admin-card" loading={leadLoading}>
                    <Space style={{ marginBottom: 12 }} wrap>
                      <Input.Search
                        className="admin-search"
                        allowClear
                        placeholder="Search requests by name, email, company, project..."
                        value={leadTable.search}
                        onChange={(event) => setLeadTable((prev) => ({ ...prev, search: event.target.value }))}
                        onSearch={(value) => fetchLeads({ page: 1, search: value })}
                        style={{ width: 360 }}
                      />
                    </Space>
                    <Table
                      className="admin-table"
                      rowKey="id"
                      columns={leadColumns}
                      dataSource={leads}
                      pagination={{
                        current: leadTable.page,
                        pageSize: leadTable.pageSize,
                        total: leadTable.total,
                        showSizeChanger: true
                      }}
                      onChange={(pagination) => {
                        fetchLeads({ page: pagination.current, pageSize: pagination.pageSize });
                      }}
                    />
                  </Card>
                )
              }
                ]}
          />
        </div>
      </section>
    </>
  );
}

export default AdminDashboardPage;

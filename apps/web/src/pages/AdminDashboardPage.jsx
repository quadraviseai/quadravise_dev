import { DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
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

function toDateTimeInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (item) => String(item).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
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

function AdminDashboardPage({ section = "dashboard" }) {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();

  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [settings, setSettings] = useState(null);
  const [blogCategories, setBlogCategories] = useState([]);
  const [socialAccounts, setSocialAccounts] = useState([]);

  const [blogTable, setBlogTable] = useState({ page: 1, pageSize: 6, total: 0, search: "" });
  const [portfolioTable, setPortfolioTable] = useState({ page: 1, pageSize: 6, total: 0, search: "" });
  const [userTable, setUserTable] = useState({ page: 1, pageSize: 6, total: 0, search: "" });
  const [leadTable, setLeadTable] = useState({ page: 1, pageSize: 8, total: 0, search: "" });

  const [blogLoading, setBlogLoading] = useState(true);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [leadLoading, setLeadLoading] = useState(true);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState(section);
  const isDashboardSection = activeAdminTab === "dashboard";

  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [blogEditorMode, setBlogEditorMode] = useState("rich");

  const [blogForm] = Form.useForm();
  const [portfolioForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const [settingsForm] = Form.useForm();
  const blogPreviewValues = Form.useWatch([], blogForm) || {};
  const blogJsonInputRef = useRef(null);
  const portfolioJsonInputRef = useRef(null);

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
    portfolioForm.resetFields();
    portfolioForm.setFieldValue("category", ["General"]);
    portfolioForm.setFieldValue("featuredImage", "");
    portfolioForm.setFieldValue("isPublished", true);
    setPortfolioModalOpen(true);
  }

  function openCreateUserModal() {
    navigate(ROUTES.ADMIN_USERS);
    setEditingUserId(null);
    userForm.resetFields();
    userForm.setFieldValue("role", "manager");
    userForm.setFieldValue("products", []);
    userForm.setFieldValue("isActive", true);
    setUserModalOpen(true);
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
      category: "SaaS",
      description: "A portfolio-ready summary of the project scope, delivery, and business outcome.",
      timeline: "8 weeks",
      client_satisfaction: "95% satisfied",
      tech_stack: ["React", "Node.js", "PostgreSQL"],
      outcome: "Launched an MVP with admin workflows and scalable architecture.",
      featured_image: "https://example.com/portfolio-cover.jpg",
      is_published: true
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
        search: next.search || undefined
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

  useEffect(() => {
    loadSettings();
    loadBlogCategories();
    loadSocialAccounts();
    fetchBlogs();
    fetchPortfolio();
    fetchUsers();
    fetchLeads();
  }, []);

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
      { title: "Timeline", dataIndex: "timeline", key: "timeline" },
      { title: "Slug", dataIndex: "slug", key: "slug" },
      {
        title: "Action",
        key: "action",
        render: (_, row) => (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingProjectId(row.id);
                portfolioForm.setFieldsValue({
                  title: row.title,
                  category: row.category ? [row.category] : [],
                  description: row.description,
                  timeline: row.timeline || "",
                  clientSatisfaction: row.clientSatisfaction || "",
                  techStack: (row.techStack || []).join(", "),
                  outcome: row.outcome || "",
                  featuredImage: row.featuredImage || "",
                  isPublished: Boolean(row.isPublished)
                });
                setPortfolioModalOpen(true);
              }}
            >
              Edit
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
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={async () => {
                try {
                  await adminService.deletePortfolio(row.id);
                  api.success("Project deleted.");
                  fetchPortfolio();
                } catch (_error) {
                  api.error("Failed to delete project.");
                }
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
      { title: "Role", dataIndex: "role", key: "role" },
      {
        title: "Products",
        key: "products",
        render: (_, row) => (row.products || []).join(", ")
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
    [api, userForm]
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
        timeline: values.timeline || "",
        clientSatisfaction: values.clientSatisfaction || "",
        techStack: values.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        outcome: values.outcome || "",
        featuredImage: values.featuredImage || "",
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
      portfolioForm.resetFields();
      portfolioForm.setFieldValue("isPublished", true);
      setPortfolioModalOpen(false);
      fetchPortfolio({ page: 1 });
    } catch (_error) {
      api.error("Failed to save project.");
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
      api.error(error?.response?.data?.message || "Failed to import portfolio JSON.");
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
      blogs: ROUTES.ADMIN_BLOGS,
      portfolio: ROUTES.ADMIN_PORTFOLIO,
      users: ROUTES.ADMIN_USERS,
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
                    <Space style={{ marginBottom: 12 }} wrap>
                      <Input.Search
                        className="admin-search"
                        allowClear
                        placeholder="Search projects by title, category, stack..."
                        value={portfolioTable.search}
                        onChange={(event) => setPortfolioTable((prev) => ({ ...prev, search: event.target.value }))}
                        onSearch={(value) => fetchPortfolio({ page: 1, search: value })}
                        style={{ width: 360 }}
                      />
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="hero-btn hero-btn-primary"
                        onClick={openCreatePortfolioModal}
                      >
                        Add Portfolio
                      </Button>
                      <Button className="hero-btn hero-btn-secondary" onClick={() => portfolioJsonInputRef.current?.click()}>
                        Upload Portfolio JSON
                      </Button>
                      <Button className="hero-btn hero-btn-secondary" onClick={downloadPortfolioJsonTemplate}>
                        Download JSON Template
                      </Button>
                    </Space>
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
                    <Table
                      className="admin-table"
                      rowKey="id"
                      columns={portfolioColumns}
                      dataSource={projects}
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
                    <Modal
                      title={editingProjectId ? "Edit Project" : "Add Project"}
                      open={portfolioModalOpen}
                      onCancel={() => {
                        setPortfolioModalOpen(false);
                        setEditingProjectId(null);
                        portfolioForm.resetFields();
                      }}
                      footer={null}
                      width={760}
                    >
                      <Form
                        layout="vertical"
                        form={portfolioForm}
                        onFinish={saveProject}
                        initialValues={{ category: ["General"], isPublished: true }}
                      >
                        <Row gutter={[16, 0]}>
                          <Col xs={24} md={12}>
                            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
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
                        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                          <Input.TextArea rows={3} />
                        </Form.Item>
                        <Row gutter={[16, 0]}>
                          <Col xs={24} md={12}>
                            <Form.Item name="timeline" label="Timeline">
                              <Input placeholder="6 weeks" />
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
                            <Form.Item name="techStack" label="Tech Stack (comma separated)" rules={[{ required: true }]}>
                              <Input placeholder="React, Node.js, PostgreSQL" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item name="outcome" label="Outcome">
                              <Input.TextArea rows={3} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item name="featuredImage" label="Featured Image URL">
                          <Input
                            placeholder="https://..."
                            addonAfter={
                              <Upload
                                showUploadList={false}
                                accept="image/*"
                                customRequest={async ({ file, onSuccess, onError }) => {
                                  try {
                                    const result = await adminService.uploadImage(file);
                                    const uploadedUrl = result?.data?.url;
                                    if (uploadedUrl) {
                                      portfolioForm.setFieldValue("featuredImage", uploadedUrl);
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
                            }
                          />
                        </Form.Item>
                        <Form.Item noStyle shouldUpdate>
                          {({ getFieldValue }) =>
                            getFieldValue("featuredImage") ? (
                              <div className="admin-blog-image-preview">
                                <img src={getFieldValue("featuredImage")} alt="Project preview" />
                              </div>
                            ) : null
                          }
                        </Form.Item>
                        <Row gutter={[16, 0]}>
                          <Col xs={24} md={12}>
                            <Form.Item name="isPublished" label="Published" valuePropName="checked">
                              <Switch />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Space>
                          <Button type="primary" icon={editingProjectId ? <SaveOutlined /> : <PlusOutlined />} htmlType="submit">
                            {editingProjectId ? "Update Project" : "Save Project"}
                          </Button>
                          <Button
                            onClick={() => {
                              setPortfolioModalOpen(false);
                              setEditingProjectId(null);
                              portfolioForm.resetFields();
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
                      <Form layout="vertical" form={userForm} onFinish={saveUser} initialValues={{ role: "manager", isActive: true }}>
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
                              <Select
                                options={[
                                  { label: "Admin", value: "admin" },
                                  { label: "Manager", value: "manager" },
                                  { label: "Editor", value: "editor" }
                                ]}
                              />
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
                            options={[
                              { label: "Website", value: "website" },
                              { label: "Blog", value: "blog" },
                              { label: "Portfolio", value: "portfolio" },
                              { label: "Services", value: "services" },
                              { label: "QuadraiLearn", value: "quadrailearn" },
                              { label: "Finance", value: "finance" },
                              { label: "CRM", value: "crm" }
                            ]}
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

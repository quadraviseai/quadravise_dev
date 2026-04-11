import { AppstoreOutlined, ArrowRightOutlined, ClockCircleOutlined, FileSearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Modal, Row, Select, Space, Spin, Tag, Typography, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { clientService } from "../services/clientService";

function formatEta(value) {
  if (!value) return "NA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "NA";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getErrorMessage(error, fallback) {
  const responseMessage = error?.response?.data?.message;
  if (responseMessage) return responseMessage;
  if (error?.code === "ECONNABORTED") return "The server took too long to respond. Please try again.";
  if (error?.response?.status === 429) return "Too many requests. Please wait a moment and try again.";
  if (error?.message) return error.message;
  return fallback;
}

const summaryCardConfig = [
  {
    key: "total",
    label: "Total Bugs",
    helper: "All reported issues in this workspace",
    icon: <AppstoreOutlined />,
    route: ""
  },
  {
    key: "resolved",
    label: "Resolved Bugs",
    helper: "Items that have been completed or closed",
    icon: <FileSearchOutlined />,
    route: "?status=resolved,closed"
  },
  {
    key: "pending",
    label: "Pending Bugs",
    helper: "Open items currently being reviewed",
    icon: <ClockCircleOutlined />,
    route: "?status=new,in_progress,need_clarification,reopened"
  }
];

function ClientDashboardPage() {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(searchParams.get("create") === "1");
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [uploadedAttachments, setUploadedAttachments] = useState([]);
  const [ticketForm] = Form.useForm();

  useEffect(() => {
    let active = true;

    clientService
      .getProjectDashboard(projectSlug)
      .then((response) => {
        if (!active) return;
        setDashboard(response.data || null);
        setError("");
      })
      .catch((requestError) => {
        if (!active) return;
        setError(getErrorMessage(requestError, "Unable to load project dashboard."));
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [projectSlug]);

  useEffect(() => {
    setCreateModalOpen(searchParams.get("create") === "1");
  }, [searchParams]);

  function openCreateModal() {
    const next = new URLSearchParams(searchParams);
    next.set("create", "1");
    setSearchParams(next);
  }

  function closeCreateModal() {
    const next = new URLSearchParams(searchParams);
    next.delete("create");
    setSearchParams(next);
    ticketForm.resetFields();
    setUploadedAttachments([]);
  }

  async function reloadDashboard() {
    const response = await clientService.getProjectDashboard(projectSlug);
    setDashboard(response.data || null);
  }

  async function createTicket(values) {
    try {
      setCreateSubmitting(true);
      const response = await clientService.createProjectTicket(projectSlug, {
        ...values,
        attachments: uploadedAttachments
      });
      api.success(response?.data?.reference ? `Ticket created: ${response.data.reference}` : "Bug ticket created successfully.");
      closeCreateModal();
      await reloadDashboard();
      navigate(`/client/projects/${projectSlug}/bugs`);
    } catch (requestError) {
      const details = requestError?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || getErrorMessage(requestError, "Unable to create bug ticket."));
    } finally {
      setCreateSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <Spin />
      </div>
    );
  }

  const summary = dashboard?.summary || {};
  const pendingCount = summary.pending ?? 0;
  const totalCount = summary.total ?? 0;
  const resolvedCount = summary.resolved ?? 0;
  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;
  const projectName = dashboard?.project?.name || "Client Dashboard";
  const projectDescription = dashboard?.project?.description || "Project-scoped bug tracking workspace foundation.";

  return (
    <>
      {contextHolder}
      <SEOHead title={`Quadravise | ${projectName}`} robots="noindex, nofollow" />
      <section className="section client-dashboard-section">
        <div className="section-inner">
          <div className="client-dashboard-shell">
            <div className="client-dashboard-hero">
              <div className="client-dashboard-hero-copy">
                <Tag className="client-dashboard-status-tag" bordered={false}>
                  Client Workspace
                </Tag>
                <Typography.Title level={1} className="client-dashboard-title">
                  {projectName}
                </Typography.Title>
                <Typography.Paragraph className="client-dashboard-description">
                  {projectDescription}
                </Typography.Paragraph>
                <Space size={[12, 12]} wrap className="client-dashboard-meta">
                  <span className="client-dashboard-meta-chip">
                    <ClockCircleOutlined />
                    Pending review: {pendingCount}
                  </span>
                  <span className="client-dashboard-meta-chip">
                    <FileSearchOutlined />
                    Resolution rate: {resolutionRate}%
                  </span>
                </Space>
              </div>
              <div className="client-dashboard-hero-actions">
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={openCreateModal}>
                  Create Bug
                </Button>
                <Button size="large" onClick={() => navigate(`/client/projects/${projectSlug}/bugs`)}>
                  View All Bugs
                </Button>
                <Button
                  size="large"
                  onClick={async () => {
                    await clientService.logout();
                    navigate(ROUTES.CLIENT_LOGIN, { replace: true });
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>

            {error ? <Alert style={{ marginBottom: 16 }} type="error" message={error} showIcon /> : null}

            <Row gutter={[18, 18]} className="client-dashboard-summary-row">
              {summaryCardConfig.map((item) => (
                <Col xs={24} md={8} key={item.key}>
                  <Card
                    hoverable
                    className="client-dashboard-summary-card"
                    onClick={() => navigate(`/client/projects/${projectSlug}/bugs${item.route}`)}
                  >
                    <div className="client-dashboard-summary-top">
                      <span className="client-dashboard-summary-icon">{item.icon}</span>
                      <span className="client-dashboard-summary-label">{item.label}</span>
                    </div>
                    <Typography.Title level={2} className="client-dashboard-summary-value">
                      {summary[item.key] ?? 0}
                    </Typography.Title>
                    <div className="client-dashboard-summary-bottom">
                      <Typography.Text type="secondary">{item.helper}</Typography.Text>
                      <span className="client-dashboard-summary-link">
                        Open queue
                        <ArrowRightOutlined />
                      </span>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={[18, 18]}>
              <Col xs={24} lg={10}>
                <Card className="client-dashboard-panel client-dashboard-panel-accent" bordered={false}>
                  <Typography.Text className="client-dashboard-panel-eyebrow">Delivery Outlook</Typography.Text>
                  <Typography.Title level={4} className="client-dashboard-panel-title">
                    Pending ETA
                  </Typography.Title>
                  <Typography.Paragraph className="client-dashboard-panel-highlight">
                    {formatEta(dashboard?.pendingEta)}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="client-dashboard-panel-copy">
                    This date reflects the current estimate for outstanding issues that still need attention.
                  </Typography.Paragraph>
                </Card>
              </Col>
              <Col xs={24} lg={14}>
                <Card className="client-dashboard-panel" bordered={false}>
                  <Typography.Text className="client-dashboard-panel-eyebrow">Team Update</Typography.Text>
                  <Typography.Title level={4} className="client-dashboard-panel-title">
                    Developer Quick Note
                  </Typography.Title>
                  <Typography.Paragraph className="client-dashboard-panel-copy client-dashboard-panel-note">
                    {dashboard?.quickNote || "No quick note has been published yet."}
                  </Typography.Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
          <Modal title="Create Bug" open={createModalOpen} onCancel={closeCreateModal} footer={null} width={720}>
            <Form
              layout="vertical"
              form={ticketForm}
              onFinish={createTicket}
              initialValues={{ severity: "medium", category: "UI" }}
            >
              <Form.Item name="title" label="Title" rules={[{ required: true, min: 5, max: 150 }]}>
                <Input placeholder="Describe the issue clearly" />
              </Form.Item>
              <Form.Item name="description" label="Description" rules={[{ required: true, min: 20, max: 5000 }]}>
                <Input.TextArea rows={5} placeholder="Explain the issue, expected behavior, and steps to reproduce." />
              </Form.Item>
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item name="pageUrl" label="Page URL" rules={[{ type: "url", warningOnly: true }]}>
                    <Input placeholder="https://example.com/path" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item name="severity" label="Severity" rules={[{ required: true }]}>
                    <Select
                      options={[
                        { label: "Low", value: "low" },
                        { label: "Medium", value: "medium" },
                        { label: "High", value: "high" },
                        { label: "Critical", value: "critical" }
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select
                      showSearch
                      options={[
                        { label: "UI", value: "UI" },
                        { label: "Authentication", value: "Authentication" },
                        { label: "Booking", value: "Booking" },
                        { label: "Performance", value: "Performance" },
                        { label: "Email", value: "Email" },
                        { label: "Validation", value: "Validation" }
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Attachments">
                <Upload
                  multiple
                  maxCount={5}
                  fileList={uploadedAttachments.map((file, index) => ({
                    uid: `${index}-${file.relativeUrl}`,
                    name: file.fileName,
                    status: "done",
                    url: file.url
                  }))}
                  customRequest={async ({ file, onSuccess, onError }) => {
                    try {
                      const response = await clientService.uploadTicketAttachment(projectSlug, file);
                      const uploaded = response?.data;
                      setUploadedAttachments((current) => [...current, uploaded].slice(0, 5));
                      onSuccess?.(uploaded);
                    } catch (uploadError) {
                      onError?.(uploadError);
                    }
                  }}
                  onRemove={(file) => {
                    setUploadedAttachments((current) => current.filter((item) => item.relativeUrl !== file.url && item.fileName !== file.name));
                  }}
                >
                  <Button>Upload Attachment</Button>
                </Upload>
                <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
                  Allowed: JPG, PNG, WEBP, PDF, DOC, DOCX. Max 10 MB each, up to 5 files.
                </Typography.Paragraph>
              </Form.Item>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} htmlType="submit" loading={createSubmitting}>
                  Submit Bug
                </Button>
                <Button onClick={closeCreateModal}>Cancel</Button>
              </Space>
            </Form>
          </Modal>
        </div>
      </section>
    </>
  );
}

export default ClientDashboardPage;

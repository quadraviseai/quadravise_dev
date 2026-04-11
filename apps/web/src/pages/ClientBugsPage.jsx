import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, DatePicker, Descriptions, Form, Input, Modal, Popconfirm, Row, Select, Space, Spin, Table, Typography, Upload, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { clientService } from "../services/clientService";

const statusLabelMap = {
  new: "New",
  in_progress: "In Progress",
  need_clarification: "Need Clarification",
  resolved: "Resolved",
  closed: "Closed",
  reopened: "Reopened"
};

const statusColorMap = {
  new: "#1677ff",
  in_progress: "#0f6ad9",
  need_clarification: "#fa8c16",
  resolved: "#52c41a",
  closed: "#6b7280",
  reopened: "#d4380d"
};

const severityColorMap = {
  low: "#2563eb",
  medium: "#7c3aed",
  high: "#d97706",
  critical: "#dc2626"
};

const statusOptions = Object.entries(statusLabelMap).map(([value, label]) => ({ value, label }));
const severityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
];
const etaOptions = [
  { value: "available", label: "Available" },
  { value: "na", label: "NA" }
];
const severityTableFilters = severityOptions.map((option) => ({ text: option.label, value: option.value }));
const statusTableFilters = statusOptions.map((option) => ({ text: option.label, value: option.value }));
const etaTableFilters = etaOptions.map((option) => ({ text: option.label, value: option.value }));

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatEta(value) {
  if (!value) return "NA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "NA";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getErrorMessage(error, fallback) {
  const responseMessage = error?.response?.data?.message;
  if (responseMessage) return responseMessage;
  if (error?.code === "ECONNABORTED") return "The server took too long to respond. Please try again.";
  if (error?.response?.status === 429) return "Too many requests. Please wait a moment and try again.";
  if (error?.message) return error.message;
  return fallback;
}

function ClientBugsPage() {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [createModalOpen, setCreateModalOpen] = useState(searchParams.get("create") === "1");
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [uploadedAttachments, setUploadedAttachments] = useState([]);
  const [ticketForm] = Form.useForm();
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false);
  const [ticketDetailMode, setTicketDetailMode] = useState("view");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketDetailLoading, setTicketDetailLoading] = useState(false);
  const [ticketActionSubmitting, setTicketActionSubmitting] = useState(false);
  const [editUploadedAttachments, setEditUploadedAttachments] = useState([]);
  const [editTicketForm] = Form.useForm();
  const ticketIdParam = searchParams.get("ticketId") || "";
  const titleParam = searchParams.get("title") || "";
  const severityParam = searchParams.get("severity") || "";
  const statusParam = searchParams.get("status") || "";
  const etaParam = searchParams.get("eta") || "";
  const updatedOnParam = searchParams.get("updatedOn") || "";
  const createdOnParam = searchParams.get("createdOn") || "";
  const rawSortByParam = searchParams.get("sortBy");
  const rawSortOrderParam = searchParams.get("sortOrder");
  const sortByParam = rawSortByParam || "updatedAt";
  const sortOrderParam = rawSortOrderParam || "desc";
  const pageParam = searchParams.get("page") || "1";
  const pageSizeParam = searchParams.get("pageSize") || "10";

  const selectedSeverities = useMemo(
    () => (severityParam
      ? severityParam
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
      : []),
    [severityParam]
  );

  const selectedStatuses = useMemo(
    () => (statusParam
      ? statusParam
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
      : []),
    [statusParam]
  );

  useEffect(() => {
    let active = true;
    const page = Number.parseInt(pageParam, 10) || 1;
    const pageSize = Number.parseInt(pageSizeParam, 10) || 10;

    setLoading(true);
    clientService
      .getProjectTickets(projectSlug, {
        page,
        pageSize,
        ticketId: ticketIdParam || undefined,
        title: titleParam || undefined,
        severity: selectedSeverities.join(",") || undefined,
        status: selectedStatuses.join(",") || undefined,
        eta: etaParam || undefined,
        updatedOn: updatedOnParam || undefined,
        createdOn: createdOnParam || undefined,
        sortBy: sortByParam || undefined,
        sortOrder: sortOrderParam || undefined
      })
      .then((response) => {
        if (!active) return;
        const payload = response.data || {};
        setProject(payload.project || null);
        setTickets(payload.items || []);
        setPagination(payload.pagination || { page, pageSize, total: 0 });
        setError("");
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError?.response?.data?.message || "Unable to load bug list.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [projectSlug, pageParam, pageSizeParam, ticketIdParam, titleParam, severityParam, statusParam, etaParam, updatedOnParam, createdOnParam, sortByParam, sortOrderParam]);

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

  async function loadTickets() {
    const response = await clientService.getProjectTickets(projectSlug, {
      page: Number.parseInt(pageParam, 10) || 1,
      pageSize: Number.parseInt(pageSizeParam, 10) || 10,
      ticketId: ticketIdParam || undefined,
      title: titleParam || undefined,
      severity: severityParam || undefined,
      status: statusParam || undefined,
      eta: etaParam || undefined,
      updatedOn: updatedOnParam || undefined,
      createdOn: createdOnParam || undefined,
      sortBy: sortByParam || undefined,
      sortOrder: sortOrderParam || undefined
    });
    const payload = response.data || {};
    setProject(payload.project || null);
    setTickets(payload.items || []);
    setPagination(payload.pagination || { page: 1, pageSize: 10, total: 0 });
    setError("");
    return payload;
  }

  function closeTicketDetail() {
    setTicketDetailOpen(false);
    setTicketDetailMode("view");
    setSelectedTicket(null);
    setEditUploadedAttachments([]);
    editTicketForm.resetFields();
  }

  function updateListFilters(nextFilters) {
    const next = new URLSearchParams(searchParams);
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    });
    next.set("page", "1");
    setSearchParams(next);
  }

  function renderTextFilterDropdown(paramKey, placeholder) {
    return ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, width: 240 }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Input
            allowClear
            placeholder={placeholder}
            value={selectedKeys[0] || ""}
            onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
            onPressEnter={() => {
              confirm();
              updateListFilters({ [paramKey]: selectedKeys[0] || "" });
            }}
          />
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="small"
              onClick={() => {
                confirm();
                updateListFilters({ [paramKey]: selectedKeys[0] || "" });
              }}
            >
              Apply
            </Button>
            <Button
              size="small"
              onClick={() => {
                clearFilters?.();
                confirm();
                updateListFilters({ [paramKey]: "" });
              }}
            >
              Reset
            </Button>
          </Space>
        </Space>
      </div>
    );
  }

  function renderDateFilterDropdown(paramKey) {
    return ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, width: 240 }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <DatePicker
            allowClear
            style={{ width: "100%" }}
            value={selectedKeys[0] ? dayjs(selectedKeys[0], "YYYY-MM-DD") : null}
            onChange={(_, dateString) => setSelectedKeys(dateString ? [dateString] : [])}
          />
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="small"
              onClick={() => {
                confirm();
                updateListFilters({ [paramKey]: selectedKeys[0] || "" });
              }}
            >
              Apply
            </Button>
            <Button
              size="small"
              onClick={() => {
                clearFilters?.();
                confirm();
                updateListFilters({ [paramKey]: "" });
              }}
            >
              Reset
            </Button>
          </Space>
        </Space>
      </div>
    );
  }

  function getSortOrder(columnKey) {
    if (sortByParam !== columnKey) return null;
    return sortOrderParam === "asc" ? "ascend" : "descend";
  }

  const columns = [
    {
      title: "Ticket ID",
      key: "ticketNumber",
      sorter: true,
      sortOrder: getSortOrder("ticketNumber"),
      filteredValue: ticketIdParam ? [ticketIdParam] : null,
      filterDropdown: renderTextFilterDropdown("ticketId", "Search by BUG number or ID"),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
      render: (_, row) => row.ticketNumber ? `BUG-${row.ticketNumber}` : row.id.slice(0, 8)
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortOrder: getSortOrder("title"),
      filteredValue: titleParam ? [titleParam] : null,
      filterDropdown: renderTextFilterDropdown("title", "Search by title"),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      sorter: true,
      sortOrder: getSortOrder("severity"),
      filters: severityTableFilters,
      filterMultiple: true,
      filteredValue: selectedSeverities.length ? selectedSeverities : null,
      render: (value) => (
        <Typography.Text
          className="client-bug-text-chip"
          style={{ color: severityColorMap[value] || "#31516f" }}
        >
          {String(value || "").toUpperCase()}
        </Typography.Text>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      sortOrder: getSortOrder("status"),
      filters: statusTableFilters,
      filterMultiple: true,
      filteredValue: selectedStatuses.length ? selectedStatuses : null,
      render: (value) => (
        <Typography.Text
          className="client-bug-text-chip"
          style={{ color: statusColorMap[value] || "#31516f" }}
        >
          {statusLabelMap[value] || value}
        </Typography.Text>
      )
    },
    {
      title: "ETA",
      dataIndex: "etaAt",
      key: "etaAt",
      sorter: true,
      sortOrder: getSortOrder("etaAt"),
      filters: etaTableFilters,
      filterMultiple: false,
      filteredValue: etaParam ? [etaParam] : null,
      render: formatEta
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: true,
      sortOrder: getSortOrder("updatedAt"),
      filteredValue: updatedOnParam ? [updatedOnParam] : null,
      filterDropdown: renderDateFilterDropdown("updatedOn"),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
      render: formatDate
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      sortOrder: getSortOrder("createdAt"),
      filteredValue: createdOnParam ? [createdOnParam] : null,
      filterDropdown: renderDateFilterDropdown("createdOn"),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
      render: formatDate
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space size={4} wrap={false}>
          <Button type="text" icon={<EyeOutlined />} aria-label="View bug" onClick={() => openTicketDetail(row.id, "view")} />
          <Button type="text" icon={<EditOutlined />} aria-label="Edit bug" onClick={() => openTicketDetail(row.id, "edit")} />
          <Popconfirm
            title="Delete bug ticket?"
            description="This will remove the ticket from the client view."
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => deleteTicket(row.id)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} aria-label="Delete bug" />
          </Popconfirm>
        </Space>
      )
    }
  ];

  async function openTicketDetail(ticketId, mode) {
    try {
      setTicketDetailLoading(true);
      setTicketDetailMode(mode);
      setTicketDetailOpen(true);
      const response = await clientService.getProjectTicket(projectSlug, ticketId);
      const ticket = response?.data?.ticket || null;
      setSelectedTicket(ticket);
      setEditUploadedAttachments(ticket?.attachments || []);

      editTicketForm.setFieldsValue({
        title: ticket?.title || "",
        description: ticket?.description || "",
        pageUrl: ticket?.pageUrl || "",
        severity: ticket?.severity || "medium",
        category: ticket?.category || "UI",
        status: ticket?.status || "new"
      });
    } catch (requestError) {
      api.error(getErrorMessage(requestError, "Unable to load ticket details."));
      closeTicketDetail();
    } finally {
      setTicketDetailLoading(false);
    }
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
      await loadTickets();
    } catch (requestError) {
      const details = requestError?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || getErrorMessage(requestError, "Unable to create bug ticket."));
    } finally {
      setCreateSubmitting(false);
    }
  }

  async function updateTicket(values) {
    if (!selectedTicket?.id) return;

    try {
      setTicketActionSubmitting(true);
      await clientService.updateProjectTicket(projectSlug, selectedTicket.id, {
        ...values,
        attachments: editUploadedAttachments
      });
      api.success("Bug ticket updated successfully.");
      closeTicketDetail();
      await loadTickets();
    } catch (requestError) {
      const details = requestError?.response?.data?.errors?.map((item) => `${item.field}: ${item.message}`).join(" | ");
      api.error(details || getErrorMessage(requestError, "Unable to update bug ticket."));
    } finally {
      setTicketActionSubmitting(false);
    }
  }

  async function deleteTicket(ticketId) {
    try {
      await clientService.deleteProjectTicket(projectSlug, ticketId);
      api.success("Bug ticket deleted successfully.");
      if (selectedTicket?.id === ticketId) {
        closeTicketDetail();
      }
      await loadTickets();
    } catch (requestError) {
      api.error(getErrorMessage(requestError, "Unable to delete bug ticket."));
    }
  }

  return (
    <>
      {contextHolder}
      <SEOHead title={`Quadravise | ${project?.name || "Project Bugs"}`} robots="noindex, nofollow" />
      <section className="section client-bugs-section">
        <div className="section-inner">
          <Space style={{ width: "100%", justifyContent: "space-between", marginBottom: 24 }} wrap>
            <div>
              <Typography.Title level={2} style={{ marginBottom: 8 }}>
                {project?.name || "Project Bugs"}
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                Filter and review tickets scoped to your authorized project only.
              </Typography.Paragraph>
            </div>
            <Space wrap>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(`/client/projects/${projectSlug}/dashboard`)}>
                Back to Dashboard
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                Create Bug
              </Button>
            </Space>
          </Space>

          {error ? <Alert style={{ marginBottom: 16 }} type="error" message={error} showIcon /> : null}

          <Card>
            <Space style={{ width: "100%", justifyContent: "flex-end", marginBottom: 16 }} wrap>
              <Link to={`/client/projects/${projectSlug}/dashboard`}>Return to summary</Link>
            </Space>

            {loading ? (
              <div style={{ minHeight: 240, display: "grid", placeItems: "center" }}>
                <Spin />
              </div>
            ) : (
              <Table
                className="admin-table"
                rowKey="id"
                dataSource={tickets}
                scroll={{ x: 920 }}
                pagination={{
                  current: pagination.page,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  showSizeChanger: true
                }}
                onChange={(nextPagination, filters, sorter) => {
                  const next = new URLSearchParams(searchParams);
                  next.set("page", String(nextPagination.current || 1));
                  next.set("pageSize", String(nextPagination.pageSize || 10));

                  const severityValues = Array.isArray(filters.severity) ? filters.severity.filter(Boolean) : [];
                  const statusValues = Array.isArray(filters.status) ? filters.status.filter(Boolean) : [];
                  const etaValue = Array.isArray(filters.etaAt) ? filters.etaAt[0] : undefined;

                  if (severityValues.length) next.set("severity", severityValues.join(","));
                  else next.delete("severity");

                  if (statusValues.length) next.set("status", statusValues.join(","));
                  else next.delete("status");

                  if (etaValue) next.set("eta", etaValue);
                  else next.delete("eta");

                  const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter;
                  if (activeSorter?.field && activeSorter?.order) {
                    next.set("sortBy", String(activeSorter.field));
                    next.set("sortOrder", activeSorter.order === "ascend" ? "asc" : "desc");
                  } else {
                    next.delete("sortBy");
                    next.delete("sortOrder");
                  }

                  setSearchParams(next);
                }}
                columns={columns}
                locale={{ emptyText: "No bugs found for the current filter." }}
              />
            )}
          </Card>
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
          <Modal
            title={ticketDetailMode === "edit" ? "Edit Bug" : "Bug Details"}
            open={ticketDetailOpen}
            onCancel={closeTicketDetail}
            footer={null}
            width={760}
          >
            {ticketDetailLoading ? (
              <div style={{ minHeight: 220, display: "grid", placeItems: "center" }}>
                <Spin />
              </div>
            ) : ticketDetailMode === "edit" ? (
              <Form layout="vertical" form={editTicketForm} onFinish={updateTicket}>
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
                  <Col xs={24} md={4}>
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
                  <Col xs={24} md={4}>
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
                  <Col xs={24} md={4}>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                      <Select options={statusOptions} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Attachments">
                  <Upload
                    multiple
                    maxCount={5}
                    fileList={editUploadedAttachments.map((file, index) => ({
                      uid: file.id || `${index}-${file.relativeUrl}`,
                      name: file.fileName,
                      status: "done",
                      url: file.url || file.relativeUrl
                    }))}
                    customRequest={async ({ file, onSuccess, onError }) => {
                      try {
                        const response = await clientService.uploadTicketAttachment(projectSlug, file);
                        const uploaded = response?.data;
                        setEditUploadedAttachments((current) => [...current, uploaded].slice(0, 5));
                        onSuccess?.(uploaded);
                      } catch (uploadError) {
                        onError?.(uploadError);
                      }
                    }}
                    onRemove={(file) => {
                      setEditUploadedAttachments((current) => current.filter((item) => item.relativeUrl !== file.url && item.fileName !== file.name));
                    }}
                  >
                    <Button>Upload Attachment</Button>
                  </Upload>
                </Form.Item>
                <Space>
                  <Button type="primary" icon={<EditOutlined />} htmlType="submit" loading={ticketActionSubmitting}>
                    Save Changes
                  </Button>
                  <Button onClick={closeTicketDetail}>Cancel</Button>
                </Space>
              </Form>
            ) : (
              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <Descriptions bordered column={1} size="middle">
                  <Descriptions.Item label="Ticket ID">
                    {selectedTicket?.ticketNumber ? `BUG-${selectedTicket.ticketNumber}` : selectedTicket?.id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Title">{selectedTicket?.title || "-"}</Descriptions.Item>
                  <Descriptions.Item label="Description">{selectedTicket?.description || "-"}</Descriptions.Item>
                  <Descriptions.Item label="Severity">
                    {selectedTicket?.severity ? String(selectedTicket.severity).toUpperCase() : "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">{selectedTicket?.category || "-"}</Descriptions.Item>
                  <Descriptions.Item label="Status">{statusLabelMap[selectedTicket?.status] || selectedTicket?.status || "-"}</Descriptions.Item>
                  <Descriptions.Item label="Page URL">
                    {selectedTicket?.pageUrl ? (
                      <a href={selectedTicket.pageUrl} target="_blank" rel="noreferrer">
                        {selectedTicket.pageUrl}
                      </a>
                    ) : (
                      "-"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="ETA">{formatEta(selectedTicket?.etaAt)}</Descriptions.Item>
                  <Descriptions.Item label="Updated">{selectedTicket?.updatedAt ? formatDate(selectedTicket.updatedAt) : "-"}</Descriptions.Item>
                </Descriptions>
                <div>
                  <Typography.Title level={5}>Attachments</Typography.Title>
                  <Space direction="vertical" size={8}>
                    {(selectedTicket?.attachments || []).length ? (
                      selectedTicket.attachments.map((attachment) => (
                        <a key={attachment.id || attachment.relativeUrl} href={attachment.url || attachment.relativeUrl} target="_blank" rel="noreferrer">
                          {attachment.fileName}
                        </a>
                      ))
                    ) : (
                      <Typography.Text type="secondary">No attachments uploaded.</Typography.Text>
                    )}
                  </Space>
                </div>
                <Space>
                  <Button type="primary" icon={<EditOutlined />} onClick={() => setTicketDetailMode("edit")}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Delete bug ticket?"
                    description="This will remove the ticket from the client view."
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => deleteTicket(selectedTicket.id)}
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              </Space>
            )}
          </Modal>
        </div>
      </section>
    </>
  );
}

export default ClientBugsPage;

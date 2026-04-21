import {
  AppstoreOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  LockOutlined,
  LoginOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Alert, Button, Form, Input, Modal, Space, Tag, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AUTH_BACKEND_URL, AUTH_MCP_SESSION_KEY, AUTH_MCP_TOKEN_KEY } from "../../constants/authDomainMcp";
import { ROUTES } from "../../constants/routes";

const modalIcons = {
  security: <SafetyCertificateOutlined />,
  automation: <AppstoreOutlined />,
  saas: <RocketOutlined />
};

const highlightedCapabilityText = "login, signup, passkeys, session management, RBAC, and audit workflows.";

function McpAccessModal({ open, onClose, mcp, initialMode = "overview" }) {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();
  const [mode, setMode] = useState(initialMode);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authResponse, setAuthResponse] = useState(null);
  const [authForm] = Form.useForm();

  useEffect(() => {
    if (!open) return;

    setMode(initialMode);
    setSubmitting(false);
    setAuthError("");
    setAuthResponse(null);
    authForm.resetFields();
  }, [authForm, initialMode, mcp?.key, open]);

  function handleClose() {
    setSubmitting(false);
    setAuthError("");
    setAuthResponse(null);
    authForm.resetFields();
    onClose();
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setAuthError("");
    setAuthResponse(null);
    authForm.resetFields();
  }

  function isExistingUserError(status, messageText) {
    if (status === 409) return true;

    const normalizedMessage = String(messageText || "").toLowerCase();
    return normalizedMessage.includes("already exists") || normalizedMessage.includes("already registered");
  }

  async function handleRegister(values) {
    setSubmitting(true);
    setAuthError("");
    setAuthResponse(null);

    try {
      const registerResponse = await fetch(`${AUTH_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password
        })
      });

      const registerData = await registerResponse.json().catch(() => ({}));

      if (!registerResponse.ok) {
        const errorMessage = registerData?.message || registerData?.error || "Registration failed.";
        const error = new Error(errorMessage);
        error.status = registerResponse.status;
        error.code = registerData?.code;
        throw error;
      }

      setAuthResponse({
        registeredUser: values.email,
        apiToken: registerData?.token || "",
        session: registerData?.session || null
      });
      api.success("Registration completed. You can log in now.");
      setMode("login");
      authForm.setFieldsValue({
        email: values.email,
        password: values.password
      });
    } catch (error) {
      if (isExistingUserError(error.status, error.message)) {
        setMode("login");
        setAuthResponse(null);
        setAuthError("Account already exists. Please log in.");
        authForm.setFieldsValue({
          email: values.email,
          password: values.password
        });
      } else {
        setAuthError(error.message || "Unable to complete registration.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogin(values) {
    setSubmitting(true);
    setAuthError("");
    setAuthResponse(null);

    try {
      const loginResponse = await fetch(`${AUTH_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      const loginData = await loginResponse.json().catch(() => ({}));

      if (!loginResponse.ok) {
        throw new Error(loginData?.message || "Login failed.");
      }

      const apiToken = loginData?.token || "";
      const session = loginData?.session || null;

      if (!apiToken) {
        throw new Error("Token not returned by login API.");
      }

      localStorage.setItem(AUTH_MCP_TOKEN_KEY, apiToken);
      localStorage.setItem(AUTH_MCP_SESSION_KEY, JSON.stringify(session || {}));
      api.success("Login completed.");
      handleClose();
      navigate(ROUTES.AUTH_DOMAIN_MCP_ACCOUNT);
    } catch (error) {
      setAuthError(error.message || "Unable to login.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopyToken() {
    if (!authResponse?.apiToken) return;

    try {
      await navigator.clipboard.writeText(authResponse.apiToken);
      api.success("API token copied.");
    } catch {
      api.error("Unable to copy API token.");
    }
  }

  const modalTitle =
    mode === "register"
      ? `Register for ${mcp?.title || "MCP"}`
      : mode === "login"
        ? `Login to ${mcp?.title || "MCP"}`
        : mcp?.title || "MCP Access";

  const descriptionText = mcp?.description || "";
  const highlightedCapabilityIndex = descriptionText.indexOf(highlightedCapabilityText);
  const descriptionPrefix =
    highlightedCapabilityIndex >= 0 ? descriptionText.slice(0, highlightedCapabilityIndex) : descriptionText;
  const descriptionHighlight =
    highlightedCapabilityIndex >= 0 ? descriptionText.slice(highlightedCapabilityIndex) : "";

  return (
    <>
      {contextHolder}
      <Modal
        title={modalTitle}
        open={open}
        onCancel={handleClose}
        footer={null}
        width="min(1160px, calc(100vw - 24px))"
        destroyOnHidden
      >
        {mcp ? (
          <div className="mcp-access-modal-shell">
            <div className="mcp-access-modal-top">
              <span className="mcp-access-modal-icon">{modalIcons[mcp.iconKey] || <LockOutlined />}</span>
              <div className="mcp-access-modal-top-content">
                <Space size={8} wrap>
                  <Tag className="mcp-access-modal-status-tag">{mcp.status}</Tag>
                  <Tag>{mcp.category}</Tag>
                </Space>
                <Typography.Paragraph className="auth-mcp-paragraph mcp-access-modal-description">
                  {descriptionPrefix}
                  {descriptionHighlight ? <strong>{descriptionHighlight}</strong> : null}
                </Typography.Paragraph>
              </div>
            </div>

            {mode === "overview" ? (
              <>
                <div className="mcp-access-modal-meta">
                  {mcp.tags?.map((tag) => (
                    <Tag key={tag} className="mcp-access-modal-chip">
                      {tag}
                    </Tag>
                  ))}
                </div>
                <div className="mcp-access-modal-audience">
                  <Typography.Text strong>Built for:</Typography.Text>
                  <div className="mcp-access-modal-audience-list">
                    {mcp.audience?.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <div className="mcp-access-modal-overview-grid">
                  {mcp.whyRequired?.length ? (
                    <div className="mcp-access-modal-info-block">
                      <Typography.Text strong>Why this is required</Typography.Text>
                      <div className="mcp-access-modal-info-list">
                        {mcp.whyRequired.map((item) => (
                          <div key={item} className="mcp-access-modal-info-item">
                            <span className="mcp-access-modal-info-dot" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                 
                </div>
                <div className="mcp-access-modal-actions">
                  <Button
                    icon={<UserAddOutlined />}
                    type="text"
                    className="mcp-access-modal-link-button"
                    onClick={() => changeMode("register")}
                  >
                    Register
                  </Button>
                  <Button
                    icon={<LoginOutlined />}
                    type="text"
                    className="mcp-access-modal-link-button"
                    onClick={() => changeMode("login")}
                  >
                    Login
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="auth-mcp-modal-mode-toggle">
                  {mode !== "register" ? (
                    <Button
                      type="text"
                      icon={<UserAddOutlined />}
                      className="mcp-access-modal-link-button"
                      onClick={() => changeMode("register")}
                    >
                      Register
                    </Button>
                  ) : null}
                  {mode !== "login" ? (
                    <Button
                      type="text"
                      icon={<LoginOutlined />}
                      className="mcp-access-modal-link-button"
                      onClick={() => changeMode("login")}
                    >
                      Login
                    </Button>
                  ) : null}
                </div>

                <Form layout="vertical" form={authForm} onFinish={mode === "register" ? handleRegister : handleLogin}>
                  {mode === "register" ? (
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true, message: "Enter your name." }]}
                    >
                      <Input placeholder="Test User" autoComplete="name" />
                    </Form.Item>
                  ) : null}
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Enter your email." },
                      { type: "email", message: "Enter a valid email." }
                    ]}
                  >
                    <Input placeholder="you@example.com" autoComplete="email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Enter your password." },
                      { min: 8, message: "Use at least 8 characters." }
                    ]}
                  >
                    <Input.Password
                      placeholder={mode === "register" ? "Create a strong password" : "Enter your password"}
                      autoComplete={mode === "register" ? "new-password" : "current-password"}
                    />
                  </Form.Item>

                  <Space size={12} wrap className="mcp-access-modal-form-actions">
                    <Button
                      type="text"
                      htmlType="submit"
                      loading={submitting}
                      icon={mode === "register" ? <ArrowRightOutlined /> : <ArrowRightOutlined />}
                      className="mcp-access-modal-link-button"
                    >
                      {mode === "register" ? "Register" : "Login"}
                    </Button>
                  </Space>
                </Form>

                {authError ? <Alert className="auth-mcp-modal-alert" type="error" message={authError} showIcon /> : null}

                {authResponse?.apiToken && mode === "login" ? (
                  <div className="mcp-access-inline-token">
                    <Typography.Text strong>Registration token created.</Typography.Text>
                    <Button icon={<CopyOutlined />} className="mcp-access-modal-button" onClick={handleCopyToken}>
                      Copy Token
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </Modal>
    </>
  );
}

export default McpAccessModal;

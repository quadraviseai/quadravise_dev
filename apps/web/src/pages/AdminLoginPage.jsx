import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Checkbox, Col, Divider, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { adminService } from "../services/adminService";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [forgotStatus, setForgotStatus] = useState("");
  const [forgotError, setForgotError] = useState("");

  const onFinish = async (values) => {
    try {
      setError("");
      await adminService.login(values);
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    } catch (_error) {
      setError("Invalid credentials.");
    }
  };

  const onForgotPassword = async () => {
    try {
      setForgotStatus("");
      setForgotError("");
      const response = await adminService.forgotPassword();
      setForgotStatus(response?.message || "Password reset link sent to support@quadravise.com.");
    } catch (_error) {
      setForgotError("Unable to send reset email. Please try again.");
    }
  };

  return (
    <>
      <SEOHead title="Quadravise | Admin Login" robots="noindex, nofollow" />
      <section className="section admin-login-section">
        <div className="section-inner admin-login-wrap">
          <Row gutter={[24, 24]} align="middle" className="admin-login-grid">
            <Col xs={24} lg={14}>
              <Card className="admin-login-card">
                <Typography.Title level={2}>Admin Login</Typography.Title>
                <Typography.Paragraph>
                  Sign in to manage blog posts, portfolio projects, and company settings.
                </Typography.Paragraph>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item name="username" label="Admin Email" rules={[{ required: true, type: "email" }]}>
                    <Input className="admin-input" prefix={<UserOutlined />} placeholder="support@quadravise.com" autoComplete="username" />
                  </Form.Item>
                  <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password className="admin-input" prefix={<LockOutlined />} autoComplete="current-password" />
                  </Form.Item>
                  <div className="admin-login-options">
                    <Checkbox>Remember me</Checkbox>
                    <button type="button" className="admin-forgot-link" onClick={onForgotPassword}>
                      Forgot password?
                    </button>
                  </div>
                  <Button type="primary" htmlType="submit" className="hero-btn hero-btn-primary admin-login-btn" block>
                    Login
                  </Button>
                </Form>
                {error ? <Alert style={{ marginTop: 12 }} type="error" message={error} showIcon /> : null}
                <Divider />
                <Typography.Paragraph className="admin-login-help">
                  Password reset emails are sent directly to <strong>support@quadravise.com</strong>.
                </Typography.Paragraph>
                {forgotError ? <Alert style={{ marginTop: 12 }} type="error" message={forgotError} showIcon /> : null}
                {forgotStatus ? <Alert style={{ marginTop: 12 }} type="success" message={forgotStatus} showIcon /> : null}
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <div className="admin-login-preview">
                <h3>Admin Snapshot</h3>
                <div className="admin-login-preview-grid">
                  <div>
                    <strong>Blogs</strong>
                    <span>Manage content pipeline</span>
                  </div>
                  <div>
                    <strong>Portfolio</strong>
                    <span>Update project outcomes</span>
                  </div>
                  <div>
                    <strong>Settings</strong>
                    <span>Edit all live metrics</span>
                  </div>
                  <div>
                    <strong>Secure</strong>
                    <span>Cookie-based admin session</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}

export default AdminLoginPage;

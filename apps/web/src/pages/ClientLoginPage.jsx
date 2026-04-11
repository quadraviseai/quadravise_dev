import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { clientService } from "../services/clientService";

function ClientLoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function onFinish(values) {
    try {
      setError("");
      const response = await clientService.login(values);
      navigate(response?.data?.redirectTo || ROUTES.CLIENT_NO_PROJECTS, { replace: true });
    } catch (_error) {
      setError("Invalid credentials.");
    }
  }

  return (
    <>
      <SEOHead title="Quadravise | Client Workspace Login" robots="noindex, nofollow" />
      <section className="section admin-login-section">
        <div className="section-inner admin-login-wrap">
          <Row gutter={[24, 24]} align="middle" className="admin-login-grid">
            <Col xs={24} lg={14}>
              <Card className="admin-login-card">
                <Typography.Title level={2}>Client Workspace</Typography.Title>
                <Typography.Paragraph>
                  Sign in to access your assigned project dashboard and track issue progress.
                </Typography.Paragraph>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input className="admin-input" prefix={<MailOutlined />} autoComplete="username" placeholder="client@example.com" />
                  </Form.Item>
                  <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password className="admin-input" prefix={<LockOutlined />} autoComplete="current-password" />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className="hero-btn hero-btn-primary admin-login-btn" block>
                    Login
                  </Button>
                </Form>
                {error ? <Alert style={{ marginTop: 12 }} type="error" message={error} showIcon /> : null}
              </Card>
            </Col>
            <Col xs={24} lg={10}>
              <div className="admin-login-preview">
                <h3>What You Can See</h3>
                <div className="admin-login-preview-grid">
                  <div>
                    <strong>Summary</strong>
                    <span>Total, resolved, and pending issue counts</span>
                  </div>
                  <div>
                    <strong>ETA</strong>
                    <span>Current expected resolution timeline</span>
                  </div>
                  <div>
                    <strong>Quick Notes</strong>
                    <span>Developer updates for your project</span>
                  </div>
                  <div>
                    <strong>Secure</strong>
                    <span>Project-scoped client access</span>
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

export default ClientLoginPage;


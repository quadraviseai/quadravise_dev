import { LockOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { adminService } from "../services/adminService";

function AdminResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const onFinish = async (values) => {
    try {
      setError("");
      setSuccess("");
      await adminService.resetPassword({
        token,
        newPassword: values.newPassword
      });
      setSuccess("Password reset successful. You can now sign in.");
      setTimeout(() => navigate(ROUTES.ADMIN_LOGIN, { replace: true }), 1200);
    } catch (_error) {
      setError("Reset link is invalid/expired or password update failed.");
    }
  };

  return (
    <>
      <SEOHead title="Quadravise | Admin Reset Password" robots="noindex, nofollow" />
      <section className="section admin-login-section">
        <div className="section-inner admin-login-wrap">
          <Card className="admin-login-card">
            <Typography.Title level={2}>Reset Admin Password</Typography.Title>
            <Typography.Paragraph>Set a new password for your admin account.</Typography.Paragraph>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true }, { min: 8, message: "Minimum 8 characters." }]}
              >
                <Input.Password prefix={<LockOutlined />} autoComplete="new-password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm the new password." },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match."));
                    }
                  })
                ]}
              >
                <Input.Password prefix={<LockOutlined />} autoComplete="new-password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="hero-btn hero-btn-primary admin-login-btn" block disabled={!token}>
                Update Password
              </Button>
            </Form>
            {!token ? <Alert style={{ marginTop: 12 }} type="error" message="Missing reset token in URL." showIcon /> : null}
            {error ? <Alert style={{ marginTop: 12 }} type="error" message={error} showIcon /> : null}
            {success ? <Alert style={{ marginTop: 12 }} type="success" message={success} showIcon /> : null}
            <div style={{ marginTop: 12 }}>
              <Link to={ROUTES.ADMIN_LOGIN}>Back to Login</Link>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default AdminResetPasswordPage;

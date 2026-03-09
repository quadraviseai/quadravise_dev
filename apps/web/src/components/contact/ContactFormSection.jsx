import { Alert, Button, Card, Col, Form, Input, Row, Select, Space, Typography } from "antd";

import { useLeads } from "../../hooks/useLeads";

const projectTypeOptions = [
  "Website Development",
  "Mobile App Development",
  "Custom Software Development",
  "SaaS Development",
  "Startup MVP Development"
].map((label) => ({ label, value: label }));

const budgetOptions = [
  "$1k - $5k",
  "$5k - $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k+",
  "Not sure yet"
].map((label) => ({ label, value: label }));

function ContactFormSection() {
  const [form] = Form.useForm();
  const { mutateAsync, isPending, isSuccess, isError } = useLeads();

  const onFinish = async (values) => {
    await mutateAsync(values);
    form.resetFields();
  };

  return (
    <section className="section contact-form-section">
      <div className="section-inner">
        <Card className="contact-form-card">
          <p className="contact-form-micro-trust">
            Share your project details and receive a practical development plan within 24 hours.
          </p>
          <Typography.Title level={3}>Project Consultation Form</Typography.Title>
          <Typography.Paragraph>
            Tell us about your business goals and we will map the right product delivery approach.
          </Typography.Paragraph>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="name" label="Name" rules={[{ required: true }, { min: 2 }, { max: 100 }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="mobile_number"
                  label="Mobile Number"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        const normalized = String(value).replace(/[^\d+]/g, "");
                        if (/^\+?\d{7,15}$/.test(normalized)) return Promise.resolve();
                        return Promise.reject(new Error("Enter a valid mobile number."));
                      }
                    }
                  ]}
                >
                  <Input placeholder="Optional" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="company" label="Company" rules={[{ max: 150 }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="project_type" label="Project Type" rules={[{ required: true }]}>
                  <Select options={projectTypeOptions} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="budget" label="Budget">
                  <Select placeholder="Select estimated budget range" options={budgetOptions} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              label="Project Description"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value || value.length >= 20) return Promise.resolve();
                    return Promise.reject(new Error("Description must be at least 20 characters if provided."));
                  }
                },
                { max: 2000 }
              ]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>
            <Space direction="vertical" size={12}>
              <Button type="primary" htmlType="submit" loading={isPending} className="hero-btn hero-btn-primary contact-submit-btn">
                Request Consultation
              </Button>
              <Typography.Text className="contact-form-privacy-note">
                Your information is private and will only be used to respond to your inquiry.
              </Typography.Text>
              {isSuccess ? <Alert type="success" message="Thank you. We will contact you shortly." showIcon /> : null}
              {isError ? <Alert type="error" message="Submission failed. Please try again." showIcon /> : null}
            </Space>
          </Form>
        </Card>
      </div>
    </section>
  );
}

export default ContactFormSection;

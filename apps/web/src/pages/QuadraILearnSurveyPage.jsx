import { CheckCircleFilled, MessageOutlined, StarFilled } from "@ant-design/icons";
import { Alert, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Typography } from "antd";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { pageSeo, seoKeywords } from "../constants/seo";
import { useSurveys } from "../hooks/useSurveys";

const featureOptions = [
  "Weak concept analysis and guidance",
  "Mock tests by subject and topic",
  "Short revision videos",
  "AI-generated lesson learning",
  "Tutor platform for tracking students and mock tests",
  "Personalized study plans",
  "Performance analytics and progress reports",
  "Daily practice questions and quizzes",
  "Live doubt-solving support",
  "Exam reminders and study scheduling",
  "Gamified learning and rewards",
  "Homework and assignment tracking",
  "Parent progress dashboard",
  "Recorded live classes",
  "Adaptive test recommendations",
  "Practice papers and previous year questions"
];

function QuadraILearnSurveyPage() {
  const [form] = Form.useForm();
  const { mutateAsync, isPending, isSuccess, isError } = useSurveys();

  const onFinish = async (values) => {
    await mutateAsync(values);
    form.resetFields();
  };

  return (
    <>
      <SEOHead
        title={pageSeo.quadraILearnSurvey.title}
        description={pageSeo.quadraILearnSurvey.description}
        keywords={seoKeywords.quadraILearnSurvey}
        canonical={pageSeo.quadraILearnSurvey.canonical}
      />
      <section className="section survey-hero-section survey-hero-section-desktop">
        <div className="section-inner">
          <Row gutter={[32, 24]} align="middle">
            <Col xs={24} lg={14}>
              <span className="survey-hero-kicker">QuadraiLearn Feedback</span>
              <Typography.Title className="survey-hero-title">
                Share Your
                <br />
                QuadraiLearn Survey
              </Typography.Title>
              <Typography.Paragraph className="survey-hero-description">
                Tell us which QuadraiLearn features matter most, whether you need multilingual support, and any specific requirements.
              </Typography.Paragraph>
              <div className="survey-hero-points">
                <span>
                  <CheckCircleFilled />
                  Stored directly in the Quadravise database
                </span>
                <span>
                  <StarFilled />
                  Feature recommendations go to the team immediately
                </span>
                <span>
                  <MessageOutlined />
                  Email acknowledgement is sent only if you provide an email address
                </span>
              </div>
            </Col>
            <Col xs={24} lg={10}>
              <Card className="survey-info-card">
                <Typography.Title level={4}>What we collect</Typography.Title>
                <div className="survey-info-grid">
                  <span>
                    <strong>Feature set</strong>
                    What should be included in QuadraiLearn
                  </span>
                  <span>
                    <strong>Language needs</strong>
                    Whether multilingual support is required
                  </span>
                  <span>
                    <strong>Specific requests</strong>
                    Any custom requirements or workflows
                  </span>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section survey-form-section">
        <div className="section-inner">
          <Card className="survey-form-card">
            <p className="contact-form-micro-trust">This form is for feedback about QuadraiLearn.</p>
            <Typography.Title level={3}>QuadraiLearn Survey Form</Typography.Title>
            <Typography.Paragraph>
              Submit your response and we will save it to our system for product review.
            </Typography.Paragraph>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                recommended_features: [],
                needs_multilingual_support: false
              }}
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} md={8}>
                  <Form.Item name="name" label="Name" rules={[{ required: true }, { min: 2 }, { max: 100 }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                    <Input placeholder="Optional" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item name="role" label="Role" rules={[{ max: 120 }]}>
                    <Input placeholder="Student, parent, teacher, admin..." />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="helpful_classes_or_exams" label="Helpful classes or exams" rules={[{ max: 255 }]}>
                    <Input placeholder="Optional" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="needs_multilingual_support"
                    label="Do you need multi langual?"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false }
                      ]}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="recommended_features"
                    label="Which features do you want in QuadraiLearn?"
                  >
                    <Checkbox.Group options={featureOptions} className="survey-feature-grid" />
                  </Form.Item>
                </Col>
              <Col xs={24}>
                <Form.Item name="specific_requirements" label="Do you need anything specific?" rules={[{ max: 1000 }]}>
                  <Input.TextArea rows={4} placeholder="Optional" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="feedback"
                  label="Detailed Feedback"
                  rules={[
                    { max: 2000 }
                  ]}
                >
                  <Input.TextArea rows={6} placeholder="Optional" />
                </Form.Item>
              </Col>
            </Row>

              <div className="survey-form-actions">
                <Button type="primary" htmlType="submit" loading={isPending} className="hero-btn hero-btn-primary contact-submit-btn">
                  Submit Survey
                </Button>
                <Typography.Text className="contact-form-privacy-note">
                  We only use this information to review product feedback and contact you if you asked us to.
                </Typography.Text>
                {isSuccess ? (
                  <Alert
                    type="success"
                    message="Survey submitted successfully. Thank you for your feedback."
                    showIcon
                  />
                ) : null}
                {isError ? <Alert type="error" message="Survey submission failed. Please try again." showIcon /> : null}
              </div>
            </Form>
          </Card>
        </div>
      </section>

      <section className="section survey-footnote-section">
        <div className="section-inner survey-footnote-shell">
          <Typography.Paragraph>
            Need to discuss QuadraiLearn directly instead? Use the{" "}
            <a href={ROUTES.CONTACT}>contact page</a> for product conversations and demos.
          </Typography.Paragraph>
        </div>
      </section>
    </>
  );
}

export default QuadraILearnSurveyPage;

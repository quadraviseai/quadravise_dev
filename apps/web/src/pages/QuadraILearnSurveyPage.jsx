import { Alert, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Typography } from "antd";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { pageSeo, seoKeywords } from "../constants/seo";
import { useSurveys } from "../hooks/useSurveys";

const respondentOptions = ["Student", "Parent/Guardian", "Teacher", "Other"];

const trackingMethodOptions = ["Marks/grades", "Practice tests", "App-based tracking", "Not tracked clearly"];

const confidenceOptions = ["Very confident", "Somewhat confident", "Not confident", "No visibility at all"];

const learningChallengeOptions = [
  "Too much content",
  "Lack of clear progress tracking",
  "Low motivation/consistency",
  "Not knowing what to study next",
  "Poor feedback from platforms"
];

const contentFocusOptions = ["Yes", "No", "Not sure"];

const studyRoutineOptions = ["Daily", "Few times a week", "Rarely", "Never"];

const valuableFeatureOptions = [
  "Concept-level weakness identification",
  "Learning consistency tracking",
  "Progress/improvement insights",
  "Streaks & gamification",
  "Parent/guardian dashboard"
];

const streakOptions = ["Yes, highly motivating", "Somewhat motivating", "Not motivating"];

const willingnessOptions = ["Yes", "Maybe", "No"];

const pricingOptions = ["Free only", "₹99 – ₹299", "₹300 – ₹600", "₹600+"];

function limitCheckboxSelection(max, message) {
  return (_, value) => {
    if (!Array.isArray(value) || value.length <= max) return Promise.resolve();
    return Promise.reject(new Error(message));
  };
}

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

      <section className="section survey-form-section">
        <div className="section-inner">
          <Card className="survey-form-card">
            <p className="contact-form-micro-trust">Research survey for QuadraiLearn product direction.</p>
            <Typography.Title level={3}>QuadraiLearn Learning Survey</Typography.Title>
            <Typography.Paragraph>
              Submit your response and we will save it to our system for product review. Email is optional and will only
              be used if you want an acknowledgement.
            </Typography.Paragraph>

            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ tracking_methods: [], learning_challenges: [], valuable_features: [] }}>
              <div className="survey-block">
                <Typography.Title level={4}>Section 1: Basic Information</Typography.Title>
                <Form.Item name="respondent_type" label="Q1. Who are you?" rules={[{ required: true }]}>
                  <Radio.Group options={respondentOptions} className="survey-radio-grid survey-radio-grid-four" />
                </Form.Item>
                <Form.Item name="email" label="Optional Email" rules={[{ type: "email" }]}>
                  <Input placeholder="name@example.com" />
                </Form.Item>
              </div>

              <div className="survey-block">
                <Typography.Title level={4}>Section 2: Current Learning Behavior</Typography.Title>
                <Form.Item name="tracking_methods" label="Q2. How do you currently track learning progress (for yourself/your child)?">
                  <Checkbox.Group options={trackingMethodOptions} className="survey-option-grid survey-option-grid-two" />
                </Form.Item>
                <Form.Item name="tracking_methods_other" label="Other (short answer)">
                  <Input placeholder="Optional" />
                </Form.Item>
                <Form.Item name="concept_confidence" label="Q3. How confident are you in identifying strong vs weak concepts?" rules={[{ required: true }]}>
                  <Radio.Group options={confidenceOptions} className="survey-radio-stack" />
                </Form.Item>
              </div>

              <div className="survey-block">
                <Typography.Title level={4}>Section 3: Challenges in Learning</Typography.Title>
                <Form.Item
                  name="learning_challenges"
                  label="Q4. What is the biggest challenge in learning today?"
                  rules={[{ validator: limitCheckboxSelection(2, "Select up to 2 challenges.") }]}
                >
                  <Checkbox.Group options={learningChallengeOptions} className="survey-option-grid survey-option-grid-two" />
                </Form.Item>
                <Form.Item
                  name="content_over_understanding"
                  label="Q5. Do you feel current learning apps focus more on content than actual understanding?"
                  rules={[{ required: true }]}
                >
                  <Radio.Group options={contentFocusOptions} className="survey-radio-grid survey-radio-grid-three" />
                </Form.Item>
                <Form.Item
                  name="study_routine"
                  label="Q6. How often do you/your child follow a consistent study routine?"
                  rules={[{ required: true }]}
                >
                  <Radio.Group options={studyRoutineOptions} className="survey-radio-grid survey-radio-grid-four" />
                </Form.Item>
              </div>

              <div className="survey-block">
                <Typography.Title level={4}>Section 4: Product Concept Feedback</Typography.Title>
                <Form.Item
                  name="learning_health_score"
                  label="Q7. How useful would a “Learning Health Score” be (like a fitness score for learning)?"
                  rules={[{ required: true }]}
                  extra="1 = Not useful, 5 = Extremely useful"
                >
                  <Radio.Group
                    options={[
                      { label: "1", value: 1 },
                      { label: "2", value: 2 },
                      { label: "3", value: 3 },
                      { label: "4", value: 4 },
                      { label: "5", value: 5 }
                    ]}
                    optionType="button"
                    buttonStyle="solid"
                    className="survey-scale-row"
                  />
                </Form.Item>
                <Form.Item
                  name="valuable_features"
                  label="Q8. Which features would you find most valuable?"
                  rules={[{ validator: limitCheckboxSelection(2, "Select up to 2 features.") }]}
                >
                  <Checkbox.Group options={valuableFeatureOptions} className="survey-option-grid survey-option-grid-two" />
                </Form.Item>
                <Form.Item
                  name="motivation_with_streaks"
                  label="Q9. Would you be motivated by features like streaks and leaderboards?"
                  rules={[{ required: true }]}
                >
                  <Radio.Group options={streakOptions} className="survey-radio-stack" />
                </Form.Item>
              </div>

              <div className="survey-block">
                <Typography.Title level={4}>Section 5: Pricing & Adoption</Typography.Title>
                <Form.Item
                  name="willingness_to_pay"
                  label="Q10. Would you pay for a platform that clearly improves learning outcomes?"
                  rules={[{ required: true }]}
                >
                  <Radio.Group options={willingnessOptions} className="survey-radio-grid survey-radio-grid-three" />
                </Form.Item>
                <Form.Item
                  name="monthly_price_range"
                  label="Q11. What monthly price range would you consider reasonable?"
                  rules={[{ required: true }]}
                >
                  <Radio.Group options={pricingOptions} className="survey-radio-grid survey-radio-grid-four" />
                </Form.Item>
              </div>

              <div className="survey-form-actions">
                <Button type="primary" htmlType="submit" loading={isPending} className="hero-btn hero-btn-primary contact-submit-btn">
                  Submit Survey
                </Button>
                <Typography.Text className="contact-form-privacy-note">
                  Your responses are used only for product research and follow-up if you provide an email.
                </Typography.Text>
                {isSuccess ? <Alert type="success" message="Survey submitted successfully. Thank you for your feedback." showIcon /> : null}
                {isError ? <Alert type="error" message="Survey submission failed. Please try again." showIcon /> : null}
              </div>
            </Form>
          </Card>
        </div>
      </section>

      <section className="section survey-footnote-section">
        <div className="section-inner survey-footnote-shell">
          <Typography.Paragraph>
            Need to discuss QuadraiLearn directly instead? Use the <a href={ROUTES.CONTACT}>contact page</a> for product
            conversations and demos.
          </Typography.Paragraph>
        </div>
      </section>
    </>
  );
}

export default QuadraILearnSurveyPage;

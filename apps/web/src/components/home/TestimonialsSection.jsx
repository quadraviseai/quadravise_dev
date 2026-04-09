import { Card, Col, Row, Tag, Typography } from "antd";

import { useSiteSettings } from "../../hooks/useSiteSettings";
import SectionHeader from "../common/SectionHeader";

function TestimonialsSection() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};

  return (
    <section className="section proof-section">
      <div className="section-inner">
        <SectionHeader title="Trust, Proof, and Delivery Confidence" subtitle="Trusted for scalable digital builds" />
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={14}>
            <Card className="proof-quote-card">
              <Typography.Paragraph>
                Quadravise helped us turn our concept into a fully functional platform with a clear, efficient process.
              </Typography.Paragraph>
              <Typography.Text strong>- Founder, SaaS Startup</Typography.Text>
            </Card>
          </Col>
          <Col xs={24} lg={10}>
            <Card className="proof-metrics-card">
              <div className="proof-metric-grid">
                <div>
                  <strong>{settings.projectsDelivered || "50+"}</strong>
                  <span>Projects Delivered</span>
                </div>
                <div>
                  <strong>{settings.industriesServed || "6"}</strong>
                  <span>Industries Served</span>
                </div>
                <div>
                  <strong>{settings.mvpWindow || "2-4 Weeks"}</strong>
                  <span>Typical MVP Window</span>
                </div>
                <div>
                  <strong>{settings.reliabilityFocus || "High"}</strong>
                  <span>Project Reliability Focus</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <div className="tech-stack-row">
          {["React", "Node.js", "PostgreSQL", "VPS Deployment", "SaaS MVPs"].map((item) => (
            <Tag key={item} color="blue">
              {item}
            </Tag>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

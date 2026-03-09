import { CheckCircleFilled } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import SEOHead from "../components/seo/SEOHead";
import ContactFormSection from "../components/contact/ContactFormSection";
import ContactInfoSection from "../components/contact/ContactInfoSection";
import { pageSeo, seoKeywords } from "../constants/seo";

function ContactPage() {
  return (
    <>
      <SEOHead
        title={pageSeo.contact.title}
        description={pageSeo.contact.description}
        keywords={seoKeywords.contact}
        canonical={pageSeo.contact.canonical}
      />
      <section className="section contact-hero-section">
        <div className="section-inner">
          <Row gutter={[32, 24]} align="middle">
            <Col xs={24} lg={14}>
              <Typography.Title className="contact-hero-title">
                Let&apos;s Discuss
                <br />
                Your Product Build
              </Typography.Title>
              <Typography.Paragraph className="contact-hero-description">
                Share your goals and project scope. We will review your requirements and send a practical development
                plan.
              </Typography.Paragraph>
              <div className="contact-hero-points">
                <span>
                  <CheckCircleFilled />
                  Free discovery consultation
                </span>
                <span>
                  <CheckCircleFilled />
                  Clear scope and timeline
                </span>
                <span>
                  <CheckCircleFilled />
                  Startup-friendly execution model
                </span>
              </div>
            </Col>
            <Col xs={24} lg={10}>
              <div className="contact-hero-metrics">
                <span>
                  <strong>24h</strong>
                  Response window
                </span>
                <span>
                  <strong>20-30 min</strong>
                  Discovery call
                </span>
                <span>
                  <strong>48h</strong>
                  Initial build outline
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <ContactFormSection />
      <ContactInfoSection />
    </>
  );
}

export default ContactPage;

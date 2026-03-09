import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import { Link, useParams } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { servicesData } from "../constants/services";
import { ROUTES } from "../constants/routes";

function ServiceDetailPage() {
  const { slug } = useParams();
  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="section notfound-page-section">
        <div className="section-inner">
          <Card className="notfound-page-card">
            <Typography.Title level={2}>Service Not Found</Typography.Title>
            <Typography.Paragraph>We could not find the service you requested.</Typography.Paragraph>
            <Button type="primary" className="hero-btn hero-btn-primary">
              <Link to={ROUTES.SERVICES}>Back to Services</Link>
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <SEOHead
        title={`Quadravise | ${service.title}`}
        description={service.description}
        canonical={`${import.meta.env.VITE_SITE_URL || "https://quadravise.com"}/services/${service.slug}`}
      />

      <section className="section service-detail-hero-section">
        <div className="section-inner">
          <Tag className="service-detail-tag">Software Development Service</Tag>
          <Typography.Title className="service-detail-hero-title">{service.title}</Typography.Title>
          <Typography.Paragraph className="service-detail-hero-description">{service.description}</Typography.Paragraph>
        </div>
      </section>

      <section className="section service-detail-main-section">
        <div className="section-inner">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={15}>
              <Card className="service-detail-capabilities-card">
                <span className="service-detail-icon">{Icon ? <Icon /> : null}</span>
                <Typography.Title level={3}>{service.title} Capabilities</Typography.Title>
                <div className="service-detail-feature-list">
                  {service.features.map((feature) => (
                    <span key={feature}>
                      <CheckCircleFilled />
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="service-detail-chip-row">
                  {service.chips.map((chip) => (
                    <Tag key={chip}>{chip}</Tag>
                  ))}
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={9}>
              <Card className="service-detail-cta-card">
                <Typography.Title level={4}>Need this service for your product?</Typography.Title>
                <Typography.Paragraph>
                  Let&apos;s discuss your scope, timeline, and launch requirements.
                </Typography.Paragraph>
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Button type="primary" className="hero-btn hero-btn-primary" block>
                    <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
                  </Button>
                  <Button className="hero-btn hero-btn-secondary" block>
                    <Link to={ROUTES.PORTFOLIO}>View Portfolio</Link>
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}

export default ServiceDetailPage;

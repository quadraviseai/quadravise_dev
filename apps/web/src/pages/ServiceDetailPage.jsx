import {
  ArrowRightOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CodeOutlined,
  DeploymentUnitOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import { Link, useParams } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { servicesData } from "../constants/services";
import { ROUTES } from "../constants/routes";
import { seoKeywords } from "../constants/seo";

const serviceDetailContent = {
  "web-development": {
    label: "Website Delivery",
    intro:
      "We design and build conversion-focused websites that load fast, communicate clearly, and fit the broader brand and product system already established across your business.",
    trustPoints: ["Responsive across devices", "SEO-ready architecture", "Clear conversion paths"],
    metrics: [
      { value: "Fast", label: "Performance-first builds" },
      { value: "SEO", label: "Structured, crawlable pages" },
      { value: "Scale", label: "Growth-ready foundations" }
    ],
    deliverables: [
      "Information architecture and page planning",
      "UI implementation aligned with your brand",
      "Reusable components and maintainable code",
      "Forms, analytics, and conversion touchpoints"
    ],
    outcomes: [
      {
        title: "Brand-aligned interface",
        description: "Page layouts, spacing, typography, and CTA patterns stay consistent with the rest of your product presence."
      },
      {
        title: "Search and speed ready",
        description: "Technical foundations support performance, metadata, and a cleaner structure for long-term organic visibility."
      },
      {
        title: "Built for iteration",
        description: "Sections and components are easier to extend as your service pages, campaigns, and case studies evolve."
      }
    ]
  }
};

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
  const detailContent = serviceDetailContent[service.slug] ?? {
    label: "Software Delivery",
    intro:
      "We shape software engagements around practical business goals, stable delivery, and user-facing experiences that align with the rest of your product ecosystem.",
    trustPoints: ["Scalable delivery", "Clear product thinking", "Maintainable implementation"],
    metrics: [
      { value: "Scope", label: "Defined around real priorities" },
      { value: "Build", label: "Structured delivery approach" },
      { value: "Launch", label: "Ready for growth and iteration" }
    ],
    deliverables: service.features,
    outcomes: [
      {
        title: "Clear implementation path",
        description: "The work is framed around architecture, delivery cadence, and practical business use."
      },
      {
        title: "Consistent user experience",
        description: "Design and interaction patterns stay aligned with the rest of your digital presence."
      },
      {
        title: "Stronger long-term maintainability",
        description: "Foundations are set up so future iterations are simpler and less fragile."
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={`Quadravise | ${service.title}`}
        description={service.description}
        keywords={seoKeywords.serviceDetail}
        canonical={`${import.meta.env.VITE_SITE_URL || "https://quadravise.com"}/services/${service.slug}`}
      />

      <section className="section service-detail-hero-section">
        <div className="section-inner">
          <Row gutter={[28, 28]} align="middle" className="service-detail-hero-layout">
            <Col xs={24} lg={14}>
              <Tag className="service-detail-tag">Software Development Service</Tag>
              <Typography.Title className="service-detail-hero-title">{service.title}</Typography.Title>
              <Typography.Paragraph className="service-detail-hero-description">
                {detailContent.intro}
              </Typography.Paragraph>
              <div className="service-detail-trust-row">
                {detailContent.trustPoints.map((point) => (
                  <span key={point}>
                    <CheckCircleFilled />
                    {point}
                  </span>
                ))}
              </div>
              <Space wrap size={14} className="service-detail-hero-actions">
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
                </Button>
                <Button className="hero-btn hero-btn-secondary">
                  <Link to={ROUTES.PORTFOLIO}>View Portfolio</Link>
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={10}>
              <div className="page-hero-preview-panel service-detail-preview-panel">
                <div className="page-hero-preview-head">
                  <span className="service-detail-preview-label">{detailContent.label}</span>
                  <span className="service-detail-preview-icon">{Icon ? <Icon /> : null}</span>
                </div>
                <div className="page-hero-preview-metrics">
                  {detailContent.metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <div className="service-detail-preview-chips">
                  {service.chips.map((chip) => (
                    <Tag key={chip}>{chip}</Tag>
                  ))}
                </div>
                <Link className="service-detail-preview-link" to={ROUTES.CONTACT}>
                  Start your project <ArrowRightOutlined />
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section service-detail-main-section">
        <div className="section-inner">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={15}>
              <Card className="service-detail-overview-card">
                <Typography.Title level={3}>What this engagement includes</Typography.Title>
                <Typography.Paragraph>
                  {service.description} The delivery approach stays practical: clear scope, modern implementation,
                  and decisions that support both usability and long-term maintainability.
                </Typography.Paragraph>
                <div className="service-detail-overview-grid">
                  <article>
                    <span className="service-detail-overview-icon">
                      <CodeOutlined />
                    </span>
                    <strong>Implementation quality</strong>
                    <p>Reusable structure, consistent UI patterns, and clean front-end execution.</p>
                  </article>
                  <article>
                    <span className="service-detail-overview-icon">
                      <SafetyCertificateOutlined />
                    </span>
                    <strong>Reliable foundations</strong>
                    <p>Architecture and page structure designed to stay stable as content and features expand.</p>
                  </article>
                  <article>
                    <span className="service-detail-overview-icon">
                      <ClockCircleOutlined />
                    </span>
                    <strong>Delivery clarity</strong>
                    <p>Focused scope, realistic sequencing, and visible progress from planning through launch.</p>
                  </article>
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
                <div className="service-detail-cta-points">
                  <span>
                    <DeploymentUnitOutlined />
                    Discovery, scope, and build plan
                  </span>
                  <span>
                    <CheckCircleFilled />
                    Practical delivery matched to your goals
                  </span>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={15}>
              <Card className="service-detail-capabilities-card">
                <span className="service-detail-icon">{Icon ? <Icon /> : null}</span>
                <Typography.Title level={3}>{service.title} Capabilities</Typography.Title>
                <div className="service-detail-feature-list">
                  {detailContent.deliverables.map((feature) => (
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
              <div className="service-detail-outcome-stack">
                {detailContent.outcomes.map((outcome) => (
                  <Card key={outcome.title} className="service-detail-outcome-card">
                    <strong>{outcome.title}</strong>
                    <p>{outcome.description}</p>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}

export default ServiceDetailPage;

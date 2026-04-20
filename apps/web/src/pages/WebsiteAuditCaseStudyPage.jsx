import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { seoKeywords, siteUrl } from "../constants/seo";

const heroMetrics = [
  { value: "Website Audit Tool", label: "Product" },
  { value: "Nexaburst", label: "Hosted On" },
  { value: "Lead Generation", label: "Business Goal" }
];

const problemPoints = [
  "Websites were slow and poorly optimized.",
  "Business owners often had no idea what was wrong.",
  "Existing tools like Ahrefs and SEMrush were too complex and too expensive.",
  "Most tools were built for experts, not for business owners."
];

const solutionPoints = [
  "Instant website analysis",
  "SEO health check",
  "Performance insights",
  "Technical issue detection",
  "Actionable recommendations",
  "Conversion-focused reporting flow"
];

const processSteps = [
  {
    step: "01",
    title: "Define the gap",
    description: "Quadravise identified that business owners needed clarity, not complex reporting dashboards."
  },
  {
    step: "02",
    title: "Simplify the product",
    description: "The tool was shaped around fast audits, beginner-friendly language, and immediate usefulness."
  },
  {
    step: "03",
    title: "Design for action",
    description: "Each insight was framed to help users understand what was wrong and what improvement was possible."
  },
  {
    step: "04",
    title: "Connect insight to conversion",
    description: "The audit experience was positioned as a natural bridge into Quadravise services."
  }
];

const resultMetrics = [
  { value: "Instant", label: "Feedback loop" },
  { value: "High", label: "User curiosity" },
  { value: "Natural", label: "Lead flow" }
];

const impactPoints = [
  "High engagement because results are immediate.",
  "Strong curiosity around website performance and SEO issues.",
  "A natural path from free value to paid service demand.",
  "Stronger brand authority for Quadravise in web performance and SEO."
];

const strengthPoints = [
  "It solves a real business pain point.",
  "It is built for non-technical users.",
  "It functions as a lead-generation engine.",
  "It positions Quadravise as a strategic problem-solver."
];

const advantageColumns = [
  { title: "Feature", dataIndex: "feature", key: "feature", width: "30%" },
  { title: "Traditional Tools", dataIndex: "traditional", key: "traditional", width: "35%" },
  { title: "Quadravise Tool", dataIndex: "quadravise", key: "quadravise", width: "35%" }
];

const advantageData = [
  { key: "complexity", feature: "Complexity", traditional: "High", quadravise: "Low" },
  { key: "cost", feature: "Cost", traditional: "Expensive", quadravise: "Accessible" },
  { key: "audience", feature: "Audience", traditional: "Experts", quadravise: "Everyone" },
  { key: "output", feature: "Output", traditional: "Data-heavy", quadravise: "Actionable" },
  { key: "ux", feature: "UX", traditional: "Complex", quadravise: "Simple" }
];

function BulletList({ items }) {
  return (
    <div className="case-study-bullet-list">
      {items.map((item) => (
        <div key={item} className="case-study-bullet-item">
          <CheckCircleFilled />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function WebsiteAuditCaseStudyPage() {
  const title = "Building a Website Audit Tool That Turns Traffic Into Leads | Quadravise";
  const description =
    "Case study: how Quadravise built a lightweight website audit tool on Nexaburst to turn traffic into qualified leads through clarity, speed, and actionable insights.";
  const canonical = `${siteUrl}${ROUTES.CASE_STUDY_WEBSITE_AUDIT}`;

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={`${seoKeywords.portfolio}, website audit tool case study, SEO audit tool, lead generation tool`}
        canonical={canonical}
      />

      <section className="section case-study-hero-section">
        <div className="section-inner case-study-shell">
          <Link to={ROUTES.PORTFOLIO} className="portfolio-detail-back-link">
            <ArrowLeftOutlined />
            Back to Portfolio
          </Link>
          <div className="case-study-kicker-row">
            <Tag className="portfolio-detail-kicker-tag">Case Study</Tag>
            <Tag className="portfolio-detail-kicker-tag portfolio-detail-kicker-tag-soft">Hosted on Nexaburst</Tag>
          </div>
          <Row gutter={[40, 32]} align="middle">
            <Col xs={24} lg={15}>
              <Typography.Title className="case-study-hero-title">
                Building a Website Audit Tool That Turns Traffic Into Leads
              </Typography.Title>
              <Typography.Paragraph className="case-study-hero-description">
                Quadravise built a lightweight website audit tool that translates technical website issues into clear,
                beginner-friendly insight and turns that value into a practical lead-generation funnel.
              </Typography.Paragraph>
              <div className="case-study-hero-points">
                <span>Built for business owners, not SEO specialists</span>
                <span>Focused on clarity, speed, and actionability</span>
                <span>Structured as both a tool and a growth asset</span>
              </div>
              <Space wrap size={14} className="portfolio-detail-hero-actions">
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.CONTACT}>Build Something Similar</Link>
                </Button>
                <Button className="hero-btn hero-btn-secondary">
                  <Link to={ROUTES.PORTFOLIO}>View More Case Studies</Link>
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={9}>
              <div className="case-study-hero-panel">
                <strong className="case-study-panel-title">Project Snapshot</strong>
                <div className="case-study-metric-stack">
                  {heroMetrics.map((item) => (
                    <div key={item.label} className="case-study-metric-item">
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section case-study-section">
        <div className="section-inner case-study-shell">
          <Row gutter={[40, 24]} align="top">
            <Col xs={24} lg={14}>
              <span className="case-study-section-label">Project Overview</span>
              <Typography.Title level={2} className="case-study-section-title">
                A free audit tool designed to create clarity and service demand
              </Typography.Title>
              <Typography.Paragraph className="case-study-copy">
                Quadravise developed a user-friendly website audit tool that instantly analyzes website performance,
                SEO health, and technical issues. The goal was simple: turn a free tool into a powerful lead
                generation engine.
              </Typography.Paragraph>
            </Col>
            <Col xs={24} lg={10}>
              <div className="case-study-side-note">
                <strong>Core objective</strong>
                <p>Help users understand what is wrong with their website and create a natural path toward expert help.</p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section case-study-section case-study-section-muted">
        <div className="section-inner case-study-shell">
          <Row gutter={[40, 24]} align="top">
            <Col xs={24} lg={14}>
              <span className="case-study-section-label">Problem</span>
              <Typography.Title level={2} className="case-study-section-title">
                The market had data-heavy tools, but no clear product for non-technical users
              </Typography.Title>
              <Typography.Paragraph className="case-study-copy">
                Most businesses today have websites, but very few actually perform. Research showed a consistent gap
                between real technical issues and a business owner&apos;s ability to understand them.
              </Typography.Paragraph>
            </Col>
            <Col xs={24} lg={10}>
              <BulletList items={problemPoints} />
            </Col>
          </Row>
        </div>
      </section>

      <section className="section case-study-section">
        <div className="section-inner case-study-shell">
          <Row gutter={[40, 24]} align="top">
            <Col xs={24} lg={14}>
              <span className="case-study-section-label">Solution</span>
              <Typography.Title level={2} className="case-study-section-title">
                A simple audit experience built around clarity, speed, and action
              </Typography.Title>
              <Typography.Paragraph className="case-study-copy">
                Instead of building another complex SEO platform, Quadravise focused on one central question: what is
                wrong with the website, and how can the user understand it immediately?
              </Typography.Paragraph>
              <div className="case-study-quote-line">"What&apos;s wrong with my website, and how do I fix it?"</div>
            </Col>
            <Col xs={24} lg={10}>
              <div className="case-study-side-note">
                <strong>Product direction</strong>
                <p>Simplicity over complexity. Speed over clutter. Actionable insights over raw data.</p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="section case-study-section case-study-section-muted">
        <div className="section-inner case-study-shell">
          <span className="case-study-section-label">Features</span>
          <Typography.Title level={2} className="case-study-section-title">
            The product experience was intentionally lightweight and easy to scan
          </Typography.Title>
          <Row gutter={[18, 18]} className="case-study-feature-grid">
            {solutionPoints.map((item) => (
              <Col key={item} xs={24} md={12} lg={8}>
                <div className="case-study-feature-tile">
                  <CheckCircleFilled />
                  <span>{item}</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="section case-study-section">
        <div className="section-inner case-study-shell">
          <span className="case-study-section-label">Process</span>
          <Typography.Title level={2} className="case-study-section-title">
            The tool was built as a growth-first system, not just a utility
          </Typography.Title>
          <div className="case-study-process-grid">
            {processSteps.map((item) => (
              <div key={item.step} className="case-study-process-card">
                <span className="case-study-process-step">{item.step}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="case-study-process-note">
            <strong>Development strategy:</strong> lightweight performance, scalable audit processing, structured
            output, and an integration-ready foundation for future features.
          </div>
        </div>
      </section>

      <section className="section case-study-section case-study-section-muted">
        <div className="section-inner case-study-shell">
          <span className="case-study-section-label">Results</span>
          <Typography.Title level={2} className="case-study-section-title">
            The biggest value came from how clearly the product moved users toward action
          </Typography.Title>
          <Row gutter={[24, 24]} align="top">
            <Col xs={24} lg={10}>
              <div className="case-study-results-metrics">
                {resultMetrics.map((item) => (
                  <div key={item.label} className="case-study-results-metric">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} lg={14}>
              <BulletList items={impactPoints} />
            </Col>
          </Row>
        </div>
      </section>

      <section className="section case-study-section">
        <div className="section-inner case-study-shell">
          <span className="case-study-section-label">Competitive Advantage</span>
          <Typography.Title level={2} className="case-study-section-title">
            Positioned between expensive expert tools and the needs of everyday businesses
          </Typography.Title>
          <Table
            columns={advantageColumns}
            dataSource={advantageData}
            pagination={false}
            className="case-study-advantage-table"
          />
        </div>
      </section>

      <section className="section case-study-section case-study-section-muted">
        <div className="section-inner case-study-shell">
          <Row gutter={[40, 24]} align="top">
            <Col xs={24} lg={14}>
              <span className="case-study-section-label">Why It Works</span>
              <Typography.Title level={2} className="case-study-section-title">
                The product solves a real business problem without overwhelming the user
              </Typography.Title>
              <div className="case-study-quote-line">"People don&apos;t want data. They want clarity."</div>
              <Typography.Paragraph className="case-study-copy" style={{ marginTop: 18 }}>
                That insight shaped the entire experience, from how audits were presented to how the tool supported
                conversion into services.
              </Typography.Paragraph>
            </Col>
            <Col xs={24} lg={10}>
              <BulletList items={strengthPoints} />
            </Col>
          </Row>
        </div>
      </section>

      <section className="section case-study-cta-section">
        <div className="section-inner case-study-shell">
          <div className="case-study-cta-card">
            <span className="case-study-section-label">Final Outcome</span>
            <Typography.Title level={2} className="case-study-section-title">
              The Website Audit Tool became a marketing asset, a conversion funnel, and an authority builder
            </Typography.Title>
            <Typography.Paragraph className="case-study-copy">
              Quadravise transformed a simple idea into a high-impact growth tool by focusing on simplicity, clarity,
              user intent, and business outcomes.
            </Typography.Paragraph>
            <Typography.Paragraph className="case-study-positioning">
              "Quadravise builds tools that don&apos;t just analyze. They drive business growth."
            </Typography.Paragraph>
            <Space wrap size={14}>
              <Button type="primary" className="hero-btn hero-btn-primary">
                <Link to={ROUTES.CONTACT}>Build Something Similar</Link>
              </Button>
              <Button className="hero-btn hero-btn-secondary">
                <Link to={ROUTES.PORTFOLIO}>Browse More Case Studies</Link>
              </Button>
            </Space>
          </div>
        </div>
      </section>
    </>
  );
}

export default WebsiteAuditCaseStudyPage;

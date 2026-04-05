import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Spin, Tag, Typography } from "antd";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import ErrorState from "../components/common/ErrorState";
import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { seoKeywords, siteUrl } from "../constants/seo";
import { usePortfolioBySlug } from "../hooks/usePortfolio";
import { portfolioService } from "../services/portfolioService";

function getVideoEmbedUrl(value = "") {
  if (!value) return "";

  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    if (host.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.pathname.replace(/\//g, "")}`;
    }

    if (host.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (host.includes("vimeo.com")) {
      const videoId = url.pathname.split("/").filter(Boolean).pop();
      return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
    }
  } catch {
    return "";
  }

  return "";
}

function formatPortfolioDate(value = "") {
  if (!value) return "";

  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function PortfolioDetailPage() {
  const { slug } = useParams();
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const isPreview = searchParams.get("preview") === "1";
  const draftKey = searchParams.get("draftKey") || "";
  const previewProject = useMemo(() => {
    if (!isPreview || !draftKey) return null;

    try {
      const rawValue = window.localStorage.getItem(draftKey);
      return rawValue ? JSON.parse(rawValue) : null;
    } catch {
      return null;
    }
  }, [draftKey, isPreview]);
  const { data, isLoading, isError, refetch } = usePortfolioBySlug(slug, {
    enabled: Boolean(slug) && !previewProject
  });
  const project = previewProject || data?.data;
  const canonical = project?.canonicalUrl || (slug ? `${siteUrl}/portfolio/${slug}` : undefined);
  const robots = isPreview || project?.noindex ? "noindex, nofollow" : undefined;
  const videoEmbedUrl = getVideoEmbedUrl(project?.videoUrl);
  const technologyGroups = [
    { title: "Frontend", items: project?.frontendTechnologies || [] },
    { title: "Backend", items: project?.backendTechnologies || [] },
    { title: "Database", items: project?.databaseTechnologies || [] },
    { title: "Tools & Integrations", items: project?.integrationsUsed || [] }
  ].filter((group) => group.items.length);
  const heroHighlights = [
    project?.projectType ? `${project.projectType} delivery` : null,
    project?.engagementType || "Product-focused implementation",
    project?.projectDuration ? `${project.projectDuration} delivery window` : null
  ].filter(Boolean);
  const heroMetrics = [
    { value: project?.projectDuration || "Structured", label: "Delivery Window" },
    { value: project?.clientSatisfaction || "Outcome-led", label: "Client Result" },
    { value: formatPortfolioDate(project?.projectLaunchDate) || "Launch Ready", label: "Launch" },
    { value: project?.teamSize ? `${project.teamSize} people` : "Full-stack", label: "Team Scope" }
  ];

  async function openTrackedLink(linkType, targetUrl) {
    if (!targetUrl) return;

    if (!isPreview && slug) {
      try {
        await portfolioService.trackProjectLinkClick(slug, { linkType, targetUrl });
      } catch {
        // Keep navigation resilient even if analytics tracking fails.
      }
    }

    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <SEOHead
        title={project?.metaTitle || (project ? `Quadravise | ${project.title}` : "Quadravise | Portfolio Project")}
        description={project?.metaDescription || project?.shortSummary || project?.description || "Portfolio project details"}
        keywords={(project?.seoKeywords || []).length ? project.seoKeywords.join(", ") : seoKeywords.portfolio}
        canonical={canonical}
        robots={robots}
        ogTitle={project?.metaTitle || project?.title}
        ogDescription={project?.metaDescription || project?.shortSummary || project?.description}
        ogImage={project?.ogImage || project?.coverImage || project?.featuredImage}
      />
      <section className="section portfolio-detail-hero-section">
        <div className="section-inner">
          <Row gutter={[28, 28]} align="middle" className="page-hero-layout">
            <Col xs={24} lg={14}>
              {isPreview ? (
                <Tag color="blue" style={{ marginBottom: 16 }}>
                  Preview Mode
                </Tag>
              ) : null}
              <Link to={ROUTES.PORTFOLIO} className="portfolio-detail-back-link">
                <ArrowLeftOutlined />
                Back to Portfolio
              </Link>
              <div className="portfolio-detail-kicker-row">
                {project?.projectBadge ? <Tag className="portfolio-detail-kicker-tag">{project.projectBadge}</Tag> : null}
                {project?.category ? (
                  <Tag className="portfolio-detail-kicker-tag portfolio-detail-kicker-tag-soft">{project.category}</Tag>
                ) : null}
              </div>
              <Typography.Title className="portfolio-detail-hero-title">
                {project?.title || "Portfolio Project"}
              </Typography.Title>
              <Typography.Paragraph className="portfolio-detail-hero-description">
                {project?.shortSummary || project?.description || "Project details and delivery overview."}
              </Typography.Paragraph>
              <div className="page-hero-points portfolio-detail-hero-points">
                {heroHighlights.map((item) => (
                  <span key={item}>
                    <CheckCircleFilled />
                    {item}
                  </span>
                ))}
              </div>
              <Space wrap size={14} className="portfolio-detail-hero-actions">
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.CONTACT}>Start a Similar Project</Link>
                </Button>
                <Button className="hero-btn hero-btn-secondary">
                  <Link to={ROUTES.PORTFOLIO}>View More Projects</Link>
                </Button>
              </Space>
            </Col>
            <Col xs={24} lg={10}>
              <div className="page-hero-preview-panel portfolio-detail-preview-panel">
                <div className="page-hero-preview-head">
                  <strong>Case Study Snapshot</strong>
                  {project?.isFeatured ? <Tag className="portfolio-detail-preview-tag">Featured</Tag> : null}
                </div>
                <div className="page-hero-preview-metrics">
                  {heroMetrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <div className="portfolio-detail-preview-copy">
                  <span>
                    {project?.clientName && !project?.isConfidential
                      ? `Client: ${project.clientName}`
                      : "Confidentiality respected where required"}
                  </span>
                  <span>{project?.outcome || "Measured delivery outcome"}</span>
                </div>
                {project?.liveUrl ? (
                  <a
                    className="portfolio-detail-preview-link"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => {
                      event.preventDefault();
                      openTrackedLink("live", project.liveUrl);
                    }}
                  >
                    Visit Live Project <ArrowRightOutlined />
                  </a>
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="section portfolio-detail-content-section">
        <div className="section-inner">
          {isLoading ? <Spin /> : null}
          {isError && !project ? <ErrorState onRetry={refetch} /> : null}
          {project ? (
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                <Card className="portfolio-detail-main-card">
                  {project.coverImage || project.featuredImage ? (
                    <img
                      className="portfolio-detail-cover"
                      src={project.coverImage || project.featuredImage}
                      alt={project.featuredImageAlt || project.title}
                    />
                  ) : null}
                  <div className="portfolio-detail-overview-strip">
                    <article>
                      <strong>{project.projectType || "Digital Product"}</strong>
                      <span>Project Type</span>
                    </article>
                    <article>
                      <strong>{project.projectDuration || "Planned delivery"}</strong>
                      <span>Duration</span>
                    </article>
                    <article>
                      <strong>{formatPortfolioDate(project.projectLaunchDate) || "Launch-ready"}</strong>
                      <span>Launch</span>
                    </article>
                  </div>
                  <div className="portfolio-detail-section">
                    <Typography.Title level={3}>Project Overview</Typography.Title>
                    {project.detailedDescription ? (
                      <div
                        className="portfolio-detail-rich-content"
                        dangerouslySetInnerHTML={{ __html: project.detailedDescription }}
                      />
                    ) : (
                      <Typography.Paragraph>{project.description}</Typography.Paragraph>
                    )}
                  </div>
                  <div className="portfolio-detail-section">
                    <Typography.Title level={3}>Project Outcome</Typography.Title>
                    <div className="portfolio-detail-outcome">
                      <strong>Outcome:</strong> {project.outcome || "Delivered with measurable business impact."}
                    </div>
                  </div>
                  {project.businessProblem ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Business Problem</Typography.Title>
                      <Typography.Paragraph>{project.businessProblem}</Typography.Paragraph>
                    </div>
                  ) : null}
                  {project.technicalChallenges ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Technical Challenges</Typography.Title>
                      <Typography.Paragraph>{project.technicalChallenges}</Typography.Paragraph>
                    </div>
                  ) : null}
                  {project.projectGoals ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Project Goals</Typography.Title>
                      <Typography.Paragraph>{project.projectGoals}</Typography.Paragraph>
                    </div>
                  ) : null}
                  {project.solutionSummary ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Solution Summary</Typography.Title>
                      <div
                        className="portfolio-detail-rich-content"
                        dangerouslySetInnerHTML={{ __html: project.solutionSummary }}
                      />
                    </div>
                  ) : null}
                  {project.architectureOverview ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Architecture Overview</Typography.Title>
                      <div
                        className="portfolio-detail-rich-content"
                        dangerouslySetInnerHTML={{ __html: project.architectureOverview }}
                      />
                    </div>
                  ) : null}
                  {project.impactSummary ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>ROI / Impact Summary</Typography.Title>
                      <Typography.Paragraph>{project.impactSummary}</Typography.Paragraph>
                    </div>
                  ) : null}
                  {project.outcomeDescription ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Outcome Description</Typography.Title>
                      <Typography.Paragraph>{project.outcomeDescription}</Typography.Paragraph>
                    </div>
                  ) : null}
                  {project.galleryImages?.length ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Project Gallery</Typography.Title>
                      <div className="portfolio-detail-gallery-grid">
                        {project.galleryImages.map((image, index) => (
                          <img
                            key={image.id || image.url || index}
                            src={image.url}
                            alt={image.altText || `${project.title} gallery image ${index + 1}`}
                            className="portfolio-detail-gallery-image"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {videoEmbedUrl ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Project Demo Video</Typography.Title>
                      <div className="portfolio-detail-video-shell">
                        <iframe
                          src={videoEmbedUrl}
                          title={`${project.title} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="portfolio-detail-video-frame"
                        />
                      </div>
                    </div>
                  ) : null}
                  {project.showTestimonial && project.testimonialContent ? (
                    <div className="portfolio-detail-section">
                      <Typography.Title level={3}>Client Testimonial</Typography.Title>
                      <Card bordered={false} className="portfolio-detail-testimonial-card">
                        <div
                          style={{
                            display: "grid",
                            gap: 16,
                            gridTemplateColumns: project.testimonialAuthorImage ? "72px 1fr" : "1fr"
                          }}
                        >
                          {project.testimonialAuthorImage ? (
                            <img
                              src={project.testimonialAuthorImage}
                              alt={project.testimonialAuthorName || "Testimonial author"}
                              style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover" }}
                            />
                          ) : null}
                          <div>
                            <div
                              className="portfolio-detail-rich-content"
                              dangerouslySetInnerHTML={{ __html: project.testimonialContent }}
                            />
                            {project.testimonialAuthorName || project.testimonialAuthorDesignation || project.testimonialRating ? (
                              <div style={{ marginTop: 16 }}>
                                {project.testimonialAuthorName ? <Typography.Text strong>{project.testimonialAuthorName}</Typography.Text> : null}
                                {project.testimonialAuthorDesignation ? (
                                  <Typography.Paragraph style={{ marginBottom: 8 }}>
                                    {project.testimonialAuthorDesignation}
                                  </Typography.Paragraph>
                                ) : null}
                                {project.testimonialRating ? (
                                  <Typography.Text>{Array.from({ length: project.testimonialRating }, () => "★").join("")}</Typography.Text>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ) : null}
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <div className="portfolio-detail-side-stack">
                  <Card className="portfolio-detail-side-card">
                    <Typography.Title level={4}>Tech Stack</Typography.Title>
                    <div className="portfolio-detail-tag-row">
                      {(project.techStack || []).map((tech) => (
                        <Tag key={tech} className="portfolio-tech-tag">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                  {technologyGroups.length ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Technology Breakdown</Typography.Title>
                      {technologyGroups.map((group) => (
                        <div key={group.title} className="portfolio-detail-group-block">
                          <Typography.Text strong>{group.title}</Typography.Text>
                          <div className="portfolio-detail-tag-row portfolio-detail-group-tags">
                            {group.items.map((item) => (
                              <Tag key={`${group.title}-${item}`} className="portfolio-tech-tag">
                                {item}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      ))}
                    </Card>
                  ) : null}
                  {project.demoUrl || project.liveUrl || project.designUrl || project.videoUrl ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Project Links</Typography.Title>
                      <div className="portfolio-detail-point-list">
                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              event.preventDefault();
                              openTrackedLink("demo", project.demoUrl);
                            }}
                          >
                            Try Demo
                          </a>
                        ) : null}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              event.preventDefault();
                              openTrackedLink("live", project.liveUrl);
                            }}
                          >
                            Visit Live Project
                          </a>
                        ) : null}
                        {project.designUrl ? (
                          <a
                            href={project.designUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              event.preventDefault();
                              openTrackedLink("design", project.designUrl);
                            }}
                          >
                            Open Design Link
                          </a>
                        ) : null}
                        {project.videoUrl ? (
                          <a
                            href={project.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              event.preventDefault();
                              openTrackedLink("video", project.videoUrl);
                            }}
                          >
                            Watch Video
                          </a>
                        ) : null}
                      </div>
                    </Card>
                  ) : null}
                  <Card className="portfolio-detail-side-card">
                    <Typography.Title level={4}>Delivery Snapshot</Typography.Title>
                    <div className="portfolio-detail-point-list">
                      {[
                        project.projectType ? `Project type: ${project.projectType}` : null,
                        project.engagementType ? `Engagement: ${project.engagementType}` : null,
                        project.teamSize ? `Team size: ${project.teamSize}` : null,
                        project.projectRole ? `Role: ${project.projectRole}` : null,
                        project.projectStartDate ? `Start date: ${formatPortfolioDate(project.projectStartDate)}` : null,
                        project.projectEndDate ? `End date: ${formatPortfolioDate(project.projectEndDate)}` : null,
                        project.projectLaunchDate ? `Launch date: ${formatPortfolioDate(project.projectLaunchDate)}` : null,
                        project.projectDuration ? `Duration: ${project.projectDuration}` : null,
                        project.timeline ? `Timeline: ${project.timeline}` : null,
                        project.clientSatisfaction ? `Client satisfaction: ${project.clientSatisfaction}` : null,
                        "Scalable product-focused implementation"
                      ]
                        .filter(Boolean)
                        .map((item) => (
                          <span key={item}>
                            <CheckCircleFilled />
                            {item}
                          </span>
                        ))}
                    </div>
                    <Space direction="vertical" size={12} style={{ width: "100%" }}>
                      <Button type="primary" className="hero-btn hero-btn-primary" block>
                        <Link to={ROUTES.CONTACT}>Start a Similar Project</Link>
                      </Button>
                      <Button className="hero-btn hero-btn-secondary" block>
                        <Link to={ROUTES.PORTFOLIO}>Browse More Case Studies</Link>
                      </Button>
                    </Space>
                  </Card>
                  {!project.isConfidential &&
                  (project.clientName || project.clientIndustry || project.clientLocation || project.clientWebsite) ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Client Context</Typography.Title>
                      <div className="portfolio-detail-point-list">
                        {[
                          project.clientName ? `Client: ${project.clientName}` : null,
                          project.clientIndustry ? `Industry: ${project.clientIndustry}` : null,
                          project.clientLocation ? `Location: ${project.clientLocation}` : null
                        ]
                          .filter(Boolean)
                          .map((item) => (
                            <span key={item}>
                              <CheckCircleFilled />
                              {item}
                            </span>
                          ))}
                      </div>
                      {project.clientWebsite ? (
                        <a
                          className="portfolio-detail-client-link"
                          href={project.clientWebsite}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => {
                            event.preventDefault();
                            openTrackedLink("clientWebsite", project.clientWebsite);
                          }}
                        >
                          Visit Client Website
                        </a>
                      ) : null}
                    </Card>
                  ) : null}
                  {project.servicesProvided?.length ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Services Provided</Typography.Title>
                      <div className="portfolio-detail-tag-row">
                        {project.servicesProvided.map((service) => (
                          <Tag key={service} className="portfolio-tech-tag">
                            {service}
                          </Tag>
                        ))}
                      </div>
                    </Card>
                  ) : null}
                  {project.featuresDelivered?.length ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Features Delivered</Typography.Title>
                      <div className="portfolio-detail-point-list">
                        {project.featuresDelivered.map((item) => (
                          <span key={item}>
                            <CheckCircleFilled />
                            {item}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ) : null}
                  {project.modulesImplemented?.length ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Modules Implemented</Typography.Title>
                      <div className="portfolio-detail-tag-row">
                        {project.modulesImplemented.map((item) => (
                          <Tag key={item} className="portfolio-tech-tag">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </Card>
                  ) : null}
                  {project.integrationsUsed?.length ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Integrations Used</Typography.Title>
                      <div className="portfolio-detail-tag-row">
                        {project.integrationsUsed.map((item) => (
                          <Tag key={item} className="portfolio-tech-tag">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </Card>
                  ) : null}
                  {project.documentAttachments?.length ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Attachments</Typography.Title>
                      <div className="portfolio-detail-point-list">
                        {project.documentAttachments.map((item, index) => (
                          <a
                            key={item.id || item.url || index}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                              event.preventDefault();
                              openTrackedLink("document", item.url);
                            }}
                          >
                            {item.title || item.fileName || `Attachment ${index + 1}`}
                          </a>
                        ))}
                      </div>
                    </Card>
                  ) : null}
                  {project.kpiMetrics?.length ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>KPI Metrics</Typography.Title>
                      <div className="portfolio-detail-kpi-list">
                        {project.kpiMetrics.map((metric, index) => (
                          <div key={`${metric.label}-${index}`} className="portfolio-detail-kpi-item">
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ) : null}
                  {project.beforeValue || project.afterValue ? (
                    <Card className="portfolio-detail-side-card">
                      <Typography.Title level={4}>Before vs After</Typography.Title>
                      <div className="portfolio-detail-point-list">
                        {project.beforeValue ? (
                          <span>
                            <CheckCircleFilled />
                            Before: {project.beforeValue}
                          </span>
                        ) : null}
                        {project.afterValue ? (
                          <span>
                            <CheckCircleFilled />
                            After: {project.afterValue}
                          </span>
                        ) : null}
                      </div>
                    </Card>
                  ) : null}
                </div>
              </Col>
            </Row>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default PortfolioDetailPage;

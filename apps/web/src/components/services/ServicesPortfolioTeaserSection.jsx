import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";

const teaserProjects = [
  {
    category: "SaaS Platform",
    title: "Startup SaaS Platform",
    description: "Subscription workflow product built for automation and smooth client onboarding.",
    stack: ["React", "Node.js", "PostgreSQL"],
    result: "Reduced operational turnaround time by 60%"
  },
  {
    category: "Business Website",
    title: "Corporate Business Website",
    description: "SEO-focused website designed to improve service discovery and lead conversion flow.",
    stack: ["React", "Ant Design", "Express"],
    result: "Improved qualified lead conversion by 38%"
  },
  {
    category: "Education Platform",
    title: "Education Platform",
    description: "Learning system with modules, assessments, and analytics for student performance.",
    stack: ["React", "Node.js", "PostgreSQL"],
    result: "Increased learner engagement by 42%"
  }
];

function ServicesPortfolioTeaserSection() {
  return (
    <section className="section services-portfolio-teaser-section">
      <div className="section-inner">
        <div className="portfolio-section-top">
          <SectionHeader
            align="left"
            title="Projects Built with These Services"
            subtitle="Real outcomes delivered across SaaS products, business websites, and education platforms."
          />
          <Button className="portfolio-top-cta">
            <Link to={ROUTES.PORTFOLIO}>View All Projects</Link>
          </Button>
        </div>
        <Row gutter={[20, 20]} className="services-teaser-carousel">
          {teaserProjects.map((project) => (
            <Col key={project.title} xs={24} md={12} lg={8} className="services-teaser-slide">
              <Card className="services-teaser-card">
                <Tag className="case-study-badge case-study-badge-blue">{project.category}</Tag>
                <Typography.Title level={4} className="services-teaser-title">
                  {project.title}
                </Typography.Title>
                <Typography.Paragraph className="services-teaser-description">{project.description}</Typography.Paragraph>
                <div className="services-teaser-stack">
                  {project.stack.map((item) => (
                    <Tag key={item} className="services-teaser-chip">
                      {item}
                    </Tag>
                  ))}
                </div>
                <div className="services-teaser-result">
                  <span>Outcome</span>
                  <p>{project.result}</p>
                </div>
                <Space>
                  <Link className="case-study-cta" to={ROUTES.PORTFOLIO}>
                    View Case Study <ArrowRightOutlined />
                  </Link>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default ServicesPortfolioTeaserSection;

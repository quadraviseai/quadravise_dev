import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Tag, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import irfImage from "../../assets/img/irf.png";
import irfLogo from "../../assets/img/irf-logo.png";
import nexabImage from "../../assets/img/nexab01.png";
import nexabRustLogo from "../../assets/img/nexabrust-logo.png";
import phoenixInnerBalanceImage from "../../assets/img/phoenixinnerbalance.png";
import phoenixInnerBalanceLogo from "../../assets/img/phoenixinnerbalance-logo.png";
import protactorLogo from "../../assets/img/protactor-logo.png";
import protectorServicesImage from "../../assets/img/protectorservices.png";
import vtrustImage from "../../assets/img/vtrust.png";
import vtrustLogo from "../../assets/img/vtrust-logo.png";
import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";

const portfolioSnapshots = [
  {
    id: "protector-services",
    title: "Protector Services",
    category: "Service Website",
    image: protectorServicesImage,
    shortSummary: "Professional security services website with a cleaner offer structure and stronger service credibility.",
    techStack: ["Service Positioning", "Trust UI", "Responsive Pages"],
    outcome: "Presented core services more clearly for faster trust-building with business clients.",
    route: ROUTES.PORTFOLIO,
    projectBadge: "Security Services"
  },
  {
    id: "nexaburst",
    title: "NexaBurst",
    category: "Digital Agency Website",
    image: nexabImage,
    shortSummary: "Growth-focused agency website built to communicate strategy, AI-led services, and lead generation value.",
    techStack: ["Agency Branding", "Lead Messaging", "Growth Website"],
    outcome: "Sharpened the agency's digital positioning and improved how service value is communicated.",
    route: ROUTES.PORTFOLIO,
    projectBadge: "Agency Build"
  },
  {
    id: "vtrustcarz",
    title: "VTrustCarz",
    category: "Automotive Marketplace",
    image: vtrustImage,
    shortSummary: "Used-car marketplace experience designed around transparent listings, inspection confidence, and buyer trust.",
    techStack: ["Marketplace UX", "Trust Signals", "Automotive Platform"],
    outcome: "Improved how the platform communicates verified inventory and customer confidence.",
    route: ROUTES.PORTFOLIO,
    projectBadge: "Marketplace"
  },
  {
    id: "irf-geometry",
    title: "IRF Geometry",
    category: "Engineering Website",
    image: irfImage,
    shortSummary: "Business website for an engineering-focused brand with a clearer structure and more credible digital presentation.",
    techStack: ["Corporate Website", "Structured Content", "Brand Credibility"],
    outcome: "Gave the company a cleaner, more professional web presence for technical audiences.",
    route: ROUTES.PORTFOLIO,
    projectBadge: "Engineering Brand"
  },
  {
    id: "phoenix-inner-balance",
    title: "Phoenix Inner Balance",
    category: "Wellness Website",
    image: phoenixInnerBalanceImage,
    shortSummary: "Holistic wellness website shaped to feel calm, trustworthy, and aligned with the practice's voice.",
    techStack: ["Wellness Brand", "Responsive Design", "Content Clarity"],
    outcome: "Created a more reassuring digital experience for therapy and consultation enquiries.",
    route: ROUTES.PORTFOLIO,
    projectBadge: "Wellness Practice"
  }
];

const clientLogos = [
  { name: "IRF Geometry", logo: irfLogo },
  { name: "NexaBurst", logo: nexabRustLogo },
  { name: "Phoenix Inner Balance", logo: phoenixInnerBalanceLogo },
  { name: "Protactor", logo: protactorLogo },
  { name: "VTrustCarz", logo: vtrustLogo }
];

function getCategory(project) {
  if (project.category) return project.category;
  if (project.title?.toLowerCase().includes("saas")) return "SaaS Platform";
  if (project.title?.toLowerCase().includes("education")) return "Education Platform";
  return "Business Website";
}

function getCategoryTone(category) {
  if (category.includes("SaaS")) return "blue";
  if (category.includes("Education")) return "green";
  return "orange";
}

function getOutcomeMetric(outcome = "") {
  const match = outcome.match(/\d+%/);
  return match ? match[0] : "";
}

function PortfolioPreviewSection() {
  const projects = portfolioSnapshots;
  const marqueeLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="section portfolio-preview-section">
      <div className="section-inner">
        <div className="portfolio-section-top">
          <SectionHeader title="Our Sucesses in Services" subtitle="Real outcomes across startup SaaS, business platforms, and education products." />
        </div>
        <Row gutter={[20, 20]} className="portfolio-preview-carousel">
          {projects.map((project, index) => {
            const category = getCategory(project);
            const tone = getCategoryTone(category);
            return (
              <Col key={project.slug || project.id} xs={24} md={12} lg={8} className="portfolio-preview-slide">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <article className="case-study-card">
                    <Tag className={`case-study-badge case-study-badge-${tone}`}>{project.projectBadge || category}</Tag>
                    <div className="case-study-image-wrap">
                      <img src={project.image} alt={`${project.title} snapshot`} className="case-study-image" />
                    </div>
                    <h3 className="case-study-title">{project.title}</h3>
                    <Typography.Paragraph className="case-study-description">
                      {project.shortSummary || project.description}
                    </Typography.Paragraph>
                    <div className="case-study-stack">
                      {project.techStack?.map((tech) => (
                        <Tag key={tech} className="case-study-chip">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                    <div className={`case-study-outcome case-study-outcome-${tone}`}>
                      <span className="case-study-outcome-label">Outcome</span>
                      <p>
                        {project.outcome}{" "}
                        {getOutcomeMetric(project.outcome) ? (
                          <strong className="case-study-metric">{getOutcomeMetric(project.outcome)}</strong>
                        ) : null}
                      </p>
                    </div>
                    <Link
                      className="case-study-cta"
                      to={project.route || ROUTES.PORTFOLIO}
                    >
                      View Case Study <ArrowRightOutlined />
                    </Link>
                  </article>
                </motion.div>
              </Col>
            );
          })}
        </Row>
        
      </div>
    </section>
  );
}

export default PortfolioPreviewSection;

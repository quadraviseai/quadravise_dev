import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Tag, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import irfImage from "../../assets/img/irf.png";
import nexabImage from "../../assets/img/nexab01.png";
import phoenixInnerBalanceImage from "../../assets/img/phoenixinnerbalance.png";
import protectorServicesImage from "../../assets/img/protectorservices.png";
import vtrustImage from "../../assets/img/vtrust.png";
import { ROUTES } from "../../constants/routes";
import SectionHeader from "../common/SectionHeader";

const teaserProjects = [
  {
    id: "protector-services",
    category: "Service Website",
    title: "Protector Services",
    image: protectorServicesImage,
    description: "Professional security services website with a cleaner offer structure and stronger service credibility.",
    stack: ["Service Positioning", "Trust UI", "Responsive Pages"],
    result: "Presented core services more clearly for faster trust-building with business clients.",
    projectBadge: "Security Services"
  },
  {
    id: "nexaburst",
    category: "Digital Agency Website",
    title: "NexaBurst",
    image: nexabImage,
    description: "Growth-focused agency website built to communicate strategy, AI-led services, and lead generation value.",
    stack: ["Agency Branding", "Lead Messaging", "Growth Website"],
    result: "Sharpened the agency's digital positioning and improved how service value is communicated.",
    projectBadge: "Agency Build"
  },
  {
    id: "vtrustcarz",
    category: "Automotive Marketplace",
    title: "VTrustCarz",
    image: vtrustImage,
    description: "Used-car marketplace experience designed around transparent listings, inspection confidence, and buyer trust.",
    stack: ["Marketplace UX", "Trust Signals", "Automotive Platform"],
    result: "Improved how the platform communicates verified inventory and customer confidence.",
    projectBadge: "Marketplace"
  },
  {
    id: "irf-geometry",
    category: "Engineering Website",
    title: "IRF Geometry",
    image: irfImage,
    description: "Business website for an engineering-focused brand with a clearer structure and more credible digital presentation.",
    stack: ["Corporate Website", "Structured Content", "Brand Credibility"],
    result: "Gave the company a cleaner, more professional web presence for technical audiences.",
    projectBadge: "Engineering Brand"
  },
  {
    id: "phoenix-inner-balance",
    category: "Wellness Website",
    title: "Phoenix Inner Balance",
    image: phoenixInnerBalanceImage,
    description: "Holistic wellness website shaped to feel calm, trustworthy, and aligned with the practice's voice.",
    stack: ["Wellness Brand", "Responsive Design", "Content Clarity"],
    result: "Created a more reassuring digital experience for therapy and consultation enquiries.",
    projectBadge: "Wellness Practice"
  }
];

function getCategoryTone(category) {
  if (category.includes("SaaS")) return "blue";
  if (category.includes("Education") || category.includes("Wellness")) return "green";
  return "orange";
}

function ServicesPortfolioTeaserSection() {
  return (
    <section className="section services-portfolio-teaser-section">
      <div className="section-inner">
        <div className="portfolio-section-top">
          <SectionHeader
            align="left"
            title="Projects Built with These Services"
            subtitle="Real outcomes delivered across startup SaaS, business websites, marketplaces, and wellness brands."
          />
        </div>
        <Row gutter={[20, 20]} className="services-teaser-carousel">
          {teaserProjects.map((project, index) => {
            const tone = getCategoryTone(project.category);

            return (
              <Col key={project.id} xs={24} md={12} lg={8} className="services-teaser-slide">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <article className="case-study-card">
                    <Tag className={`case-study-badge case-study-badge-${tone}`}>{project.projectBadge || project.category}</Tag>
                    <div className="case-study-image-wrap">
                      <img src={project.image} alt={`${project.title} snapshot`} className="case-study-image" />
                    </div>
                    <h3 className="case-study-title">{project.title}</h3>
                    <Typography.Paragraph className="case-study-description">{project.description}</Typography.Paragraph>
                    <div className="case-study-stack">
                      {project.stack.map((item) => (
                        <Tag key={item} className="case-study-chip">
                          {item}
                        </Tag>
                      ))}
                    </div>
                    <div className={`case-study-outcome case-study-outcome-${tone}`}>
                      <span className="case-study-outcome-label">Outcome</span>
                      <p>{project.result}</p>
                    </div>
                    <Link className="case-study-cta" to={ROUTES.PORTFOLIO}>
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

export default ServicesPortfolioTeaserSection;

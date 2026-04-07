import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Tag, Typography } from "antd";
import { Link, Navigate, useParams } from "react-router-dom";

import irfImage from "../assets/img/irf.png";
import nexabImage from "../assets/img/nexab.png";
import phoenixInnerBalanceImage from "../assets/img/phoenixinnerbalance.png";
import vtrustImage from "../assets/img/vtrust.png";
import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { seoKeywords, siteUrl } from "../constants/seo";

const workPages = {
  ecommerce: {
    label: "Ecommerce",
    title: "Ecommerce Websites",
    work: [
      {
        title: "VTrustCarz",
        summary: "Trusted marketplace for buying and selling pre-owned vehicles in India, with verified used cars, 150+ point inspections, transparent listings, and hassle-free documentation support.",
        stack: ["Used Car Marketplace", "Vehicle Verification", "Documentation Support"],
        outcome: "Supports financing, RTO documentation, insurance, maintenance, warranty, detailing, and pan-India transfer to make used car buying seamless, transparent, and risk-free.",
        url: "https://www.vtrustcarz.com/",
        image: vtrustImage
      }
    ]
  },
  "static-website": {
    label: "Static Website",
    title: "Static Websites",
    work: [
      {
        title: "IRF Geometry",
        summary: "Static business website for industrial geometry and engineering-focused presentation with a clear service structure.",
        stack: ["Static Pages", "Engineering Website", "SEO"],
        outcome: "Built a cleaner and faster company presence for showcasing technical capabilities and business credibility.",
        url: "https://irfgeometry.com/",
        image: irfImage
      },
      {
        title: "Phoenix Inner Balance",
        summary: "Holistic mental health and wellness practice in Bengaluru offering integrative therapy that combines evidence-based psychology with Ayurvedic gut-health consultation.",
        stack: ["Mental Wellness", "Integrative Therapy", "Responsive Website"],
        outcome: "Provides compassionate in-person and online care in an LGBTQIA+ affirming, culturally sensitive space that helps clients build resilience, clarity, and lasting well-being.",
        url: "https://phoenixinnerbalance.com/",
        image: phoenixInnerBalanceImage
      },
      {
        title: "NexaBurst",
        summary: "Digital agency website based in Bangalore, built to support growth through data-driven strategy, AI-powered tools, and professional web, app, and marketing services.",
        stack: ["AI-Powered Tools", "Digital Agency", "Growth Website"],
        outcome: "Helps businesses improve visibility, generate better leads, and scale revenue by combining self-service analysis with custom digital solutions.",
        url: "https://nexaburst.com/",
        image: nexabImage
      }
    ]
  },
  "gated-website": {
    label: "Gated Website",
    title: "Gated Websites",
    work: [
      {
        title: "IRF Geometry",
        summary: "Gated web experience for controlled access to company resources, protected materials, and restricted internal visibility.",
        stack: ["Authentication", "Protected Content", "Role Logic"],
        outcome: "Created a secure access layer so private information could be shared without exposing it on the public website.",
        url: "https://irfgeometry.com/",
        image: irfImage
      }
    ]
  },
  "portfolio-website": {
    label: "Portfolio Website",
    title: "Portfolio Websites",
    work: [
      {
        title: "IRF Geometry",
        summary: "Portfolio-style business presentation website showcasing engineering capability, company trust, and a structured project-facing identity.",
        stack: ["Portfolio Layout", "Brand UI", "Responsive Build"],
        outcome: "Improved how the business presented its expertise, technical credibility, and visual identity online.",
        url: "https://irfgeometry.com/",
        image: irfImage
      },
      {
        title: "Phoenix Inner Balance",
        summary: "Holistic mental health and wellness practice in Bengaluru offering integrative therapy that combines evidence-based psychology with Ayurvedic gut-health consultation.",
        stack: ["Mental Wellness", "Integrative Therapy", "Responsive Website"],
        outcome: "Provides compassionate in-person and online care in an LGBTQIA+ affirming, culturally sensitive space that helps clients build resilience, clarity, and lasting well-being.",
        url: "https://phoenixinnerbalance.com/",
        image: phoenixInnerBalanceImage
      }
    ]
  },
  "business-website": {
    label: "Business Website",
    title: "Business Websites",
    work: [
      {
        title: "NexaBurst",
        summary: "Digital agency website based in Bangalore, built to support growth through data-driven strategy, AI-powered tools, and professional web, app, and marketing services.",
        stack: ["AI-Powered Tools", "Digital Agency", "Growth Website"],
        outcome: "Helps businesses improve visibility, generate better leads, and scale revenue by combining self-service analysis with custom digital solutions.",
        url: "https://nexaburst.com/",
        image: nexabImage
      }
    ]
  },
  "wordpress-website": {
    label: "WordPress Website",
    title: "WordPress Websites",
    work: [
      
    ]
  },
  "booking-portal": {
    label: "Booking Portal",
    title: "Booking Portals",
    work: [
      {
        title: "Hotel Reservation Portal",
        summary: "Customer-facing booking workflow with room discovery, date selection, and reservation management.",
        stack: ["Booking Flow", "Availability UI", "Admin Controls"],
        outcome: "Streamlined the reservation journey and improved operational visibility for the business."
      },
      {
        title: "Rental Scheduling Platform",
        summary: "Booking portal for rental availability, service timing, and operational follow-up.",
        stack: ["Schedule UI", "Inquiry Logic", "Portal UX"],
        outcome: "Reduced manual scheduling effort and improved booking coordination."
      },
      {
        title: "Consultation Booking System",
        summary: "Appointment-led booking interface for consultations and session management.",
        stack: ["Date Selection", "Lead Capture", "Backend Workflow"],
        outcome: "Created a simpler path for prospects to move from interest to confirmed time slots."
      }
    ]
  },
  "custom-web-app": {
    label: "Custom Web App",
    title: "Custom Web Applications",
    work: [
      {
        title: "Operations Management Web App",
        summary: "Custom internal workflow system for task coordination, records, and role-aware visibility.",
        stack: ["React", "Admin UI", "Workflow Logic"],
        outcome: "Replaced fragmented manual steps with a cleaner digital workflow."
      },
      {
        title: "Business Process Platform",
        summary: "Tailored application for managing internal operations, status tracking, and team activity.",
        stack: ["Custom Modules", "Dashboard", "Automation Support"],
        outcome: "Improved control and visibility across recurring business processes."
      },
      {
        title: "Client Service Management Tool",
        summary: "Web app supporting client records, updates, and operational handling in a single interface.",
        stack: ["Role Access", "Data Views", "Internal Operations"],
        outcome: "Centralized client workflow handling into a more manageable system."
      }
    ]
  },
  "admin-panel": {
    label: "Admin Panel",
    title: "Admin Panels",
    work: [
      {
        title: "Content Operations Admin",
        summary: "Admin interface for managing website content, publishing activity, and operational workflows.",
        stack: ["Admin Panel", "Content Control", "Permissions"],
        outcome: "Reduced editorial friction and gave internal teams cleaner control over updates."
      },
      {
        title: "Business Reporting Dashboard",
        summary: "Internal admin dashboard for operational reporting, user management, and business oversight.",
        stack: ["Metrics UI", "User Control", "Dashboard Views"],
        outcome: "Improved visibility for managers handling day-to-day business performance."
      },
      {
        title: "Platform Backoffice System",
        summary: "Back-office panel for managing transactions, records, status updates, and workflow approvals.",
        stack: ["Backoffice UI", "Workflow Actions", "Role Logic"],
        outcome: "Created a more reliable internal control layer for platform operations."
      }
    ]
  }
};

function toTitleCase(value = "") {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function OurWorkPage() {
  const { slug = "" } = useParams();
  const page = workPages[slug];

  if (!page) {
    return <Navigate to={`${ROUTES.OUR_WORK}/ecommerce`} replace />;
  }

  const seoTitle = `${page.title} | Quadravise`;
  const seoDescription = `Explore Quadravise work in ${page.label.toLowerCase()} delivery, including practical software execution, case studies, and scalable product foundations.`;
  const canonical = `${siteUrl}${ROUTES.OUR_WORK}/${slug}`;

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription} keywords={seoKeywords.ourWork} canonical={canonical} />

      <section className="section our-work-projects-section" id="our-work-projects">
        <div className="section-inner">
          <Row gutter={[20, 20]}>
            {page.work.map((project) => (
              <Col key={project.title} xs={24} md={12} lg={8}>
                <div className="our-work-delivered-card">
                  <div className="our-work-delivered-media">
                    {project.image ? (
                      <img src={project.image} alt={`${project.title} project preview`} className="our-work-delivered-image" />
                    ) : null}
                    <div className="our-work-delivered-overlay" />
                  </div>
                  <strong className="our-work-delivered-title">{project.title}</strong>
                  <p className="our-work-delivered-summary">{project.summary}</p>
                  <div className="our-work-delivered-stack">
                    {project.stack.map((item) => (
                      <Tag key={item} className="portfolio-tech-tag">
                        {item}
                      </Tag>
                    ))}
                  </div>
                  <div className="our-work-delivered-outcome">
                    <strong>Outcome:</strong> {project.outcome}
                  </div>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="our-work-delivered-link"
                    >
                      Visit Website <ArrowRightOutlined />
                    </a>
                  ) : null}
                </div>
              </Col>
            ))}
          </Row>
          <div className="our-work-projects-footer">
            <Link to={ROUTES.CONTACT} className="our-work-inline-link">
              Discuss your project <ArrowRightOutlined />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurWorkPage;

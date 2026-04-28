import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";

import irfLogo from "../../assets/img/irf-logo.png";
import nexabRustLogo from "../../assets/img/nexabrust-logo.png";
import phoenixInnerBalanceLogo from "../../assets/img/phoenixinnerbalance-logo.png";
import protactorLogo from "../../assets/img/protactor-logo.png";
import vtrustLogo from "../../assets/img/vtrust-logo.png";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { ROUTES } from "../../constants/routes";

const clientLogos = [
  { name: "IRF Geometry", logo: irfLogo },
  { name: "NexaBurst", logo: nexabRustLogo, className: "hero-client-logo-item-nexaburst" },
  { name: "Phoenix Inner Balance", logo: phoenixInnerBalanceLogo },
  { name: "Protactor", logo: protactorLogo },
  { name: "VTrustCarz", logo: vtrustLogo }
];

function HeroSection() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};
  const marqueeLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="section hero-section">
      <div className="section-inner">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={13}>
            <h1 className="hero-title">
              Build Powerful
              <br />
              Websites, Mobile Apps,
              <br />
              and SaaS Products
              <br />
              <span className="hero-title-subline">with Quadravise</span>
            </h1>
            <div>
              <Typography.Paragraph className="hero-description">
                We help startups and businesses transform ideas into scalable digital products through expert website
                development, mobile app development, and custom software solutions.
              </Typography.Paragraph>
            </div>
            <div>
              <Space size={14} wrap className="hero-cta-group">
                <Button type="primary" size="large" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
                </Button>
                <Button size="large" className="hero-btn hero-btn-secondary">
                  <Link to={ROUTES.PORTFOLIO}>View Our Work</Link>
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={24} lg={11}>
            <div className="hero-visual">
              <div className="hero-glass-panel">
                <h3>Delivery Snapshot</h3>
                <div className="hero-metric-grid">
                  <div>
                    <strong>{settings.projectsDelivered || "24/7"}</strong>
                    <span>Support</span>
                  </div>
                  <div>
                    <strong>{settings.mvpKickoffSpeed || "7 Days"}</strong>
                    <span>MVP Kickoff Speed</span>
                  </div>
                  <div>
                    <strong>{settings.reliabilityFocus || "99.9%"}</strong>
                    <span>Platform Reliability Focus</span>
                  </div>
                  <div>
                    <strong>{settings.performanceBuild || "SEO+"}</strong>
                    <span>Performance-first Build</span>
                  </div>
                </div>
              </div>
              <div className="hero-layer-card hero-layer-main">
                <span>Websites</span>
                <span>Mobile Apps</span>
                <span>SaaS Platforms</span>
                <span>MCP Solutions</span>
                <Link to={ROUTES.SERVICES}>
                  Explore Capabilities <ArrowRightOutlined />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="hero-clients-strip">
          <div className="hero-clients-head">Our Happy Clients</div>
          <div className="hero-clients-marquee">
            <div className="hero-clients-track">
              {marqueeLogos.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className={`hero-client-logo-item ${client.className || ""}`.trim()}
                  aria-hidden={index >= clientLogos.length}
                >
                  <img src={client.logo} alt={`${client.name} logo`} className="hero-client-logo" />
                  <span className="hero-client-name">{client.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

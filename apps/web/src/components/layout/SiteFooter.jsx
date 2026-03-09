import { FacebookFilled, InstagramOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const { Footer } = Layout;

function SiteFooter() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};

  const linkedinUrl = settings.linkedin || "https://linkedin.com/company/quadravise";
  const email = settings.email || "support@quadravise.com";
  const instagramUrl = settings.instagram || "https://instagram.com/quadravise";
  const facebookUrl = settings.facebook || "https://facebook.com/quadravise";

  const showLinkedin = settings.showLinkedin !== false;
  const showEmail = settings.showEmail !== false;
  const showInstagram = settings.showInstagram !== false;
  const showFacebook = settings.showFacebook !== false;

  return (
    <Footer className="site-footer">
      <div className="section-inner footer-inner">
        <Row gutter={[48, { xs: 14, md: 32 }]} className="footer-grid">
          <Col xs={24} md={10} lg={7}>
            <Typography.Title level={3} className="footer-brand-title">
              Quadravise
            </Typography.Title>
            <Typography.Paragraph className="footer-brand-description">
              Quadravise builds websites, mobile apps, and SaaS platforms for startups and growing businesses.
            </Typography.Paragraph>
            <div className="footer-socials">
              {showLinkedin ? (
                <a className="footer-social-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <LinkedinOutlined />
                </a>
              ) : null}
              {showEmail ? (
                <a className="footer-social-link" href={`mailto:${email}`} aria-label="Email">
                  <MailOutlined />
                </a>
              ) : null}
              {showInstagram ? (
                <a className="footer-social-link" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <InstagramOutlined />
                </a>
              ) : null}
              {showFacebook ? (
                <a className="footer-social-link" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FacebookFilled />
                </a>
              ) : null}
            </div>
          </Col>

          <Col xs={24} sm={8} md={7} lg={5}>
            <div className="footer-column">
              <Typography.Text className="footer-heading">Services</Typography.Text>
              <Space direction="vertical" size={10} className="footer-link-list">
                <Link to={ROUTES.SERVICES}>Website Development</Link>
                <Link to={ROUTES.SERVICES}>Mobile App Development</Link>
                <Link to={ROUTES.SERVICES}>SaaS Development</Link>
                <Link to={ROUTES.SERVICES}>Startup MVP Development</Link>
              </Space>
            </div>
          </Col>

          <Col xs={24} sm={8} md={7} lg={5}>
            <div className="footer-column">
              <Typography.Text className="footer-heading">Products</Typography.Text>
              <Space direction="vertical" size={10} className="footer-link-list">
                <Link to={ROUTES.QUADRA_ILEARN}>QuadraiLearn</Link>
                <Link to={ROUTES.PORTFOLIO}>Portfolio</Link>
                <Link to={ROUTES.BLOG}>Blog</Link>
              </Space>
            </div>
          </Col>

          <Col xs={24} sm={8} md={7} lg={5}>
            <div className="footer-column">
              <Typography.Text className="footer-heading">Company</Typography.Text>
              <Space direction="vertical" size={10} className="footer-link-list">
                <Link to={ROUTES.ABOUT}>About</Link>
                <Link to={ROUTES.CONTACT}>Contact</Link>
                <Link to={ROUTES.BLOG}>Blog</Link>
              </Space>
            </div>
          </Col>
        </Row>

        <div className="footer-divider" />
        <div className="footer-bottom-row">
          <span>© 2026 Quadravise. All rights reserved.</span>
          <span>Built for scalable digital products.</span>
        </div>
      </div>
    </Footer>
  );
}

export default SiteFooter;

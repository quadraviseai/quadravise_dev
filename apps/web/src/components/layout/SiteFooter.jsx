import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { useSiteSettings } from "../../hooks/useSiteSettings";

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
    <footer className="site-footer">
      <div className="section-inner footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <h3 className="footer-brand-title">Quadravise</h3>
            <p className="footer-brand-description">
              Quadravise builds websites, mobile apps, and SaaS platforms for startups and growing businesses.
            </p>
            <div className="footer-socials">
              {showLinkedin ? (
                <a className="footer-social-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  in
                </a>
              ) : null}
              {showEmail ? (
                <a className="footer-social-link" href={`mailto:${email}`} aria-label="Email">
                  @
                </a>
              ) : null}
              {showInstagram ? (
                <a className="footer-social-link" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                  ig
                </a>
              ) : null}
              {showFacebook ? (
                <a className="footer-social-link" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                  f
                </a>
              ) : null}
            </div>
          </div>

          <div className="footer-column">
            <span className="footer-heading">Services</span>
            <div className="footer-link-list">
              <Link to={ROUTES.SERVICES}>Website Development</Link>
              <Link to={ROUTES.SERVICES}>Mobile App Development</Link>
              <Link to={ROUTES.SERVICES}>SaaS Development</Link>
              <Link to={ROUTES.SERVICES}>Startup MVP Development</Link>
            </div>
          </div>

          <div className="footer-column">
            <span className="footer-heading">Products</span>
            <div className="footer-link-list">
              <Link to={ROUTES.QUADRA_ILEARN}>QuadraiLearn</Link>
              <Link to={ROUTES.PORTFOLIO}>Portfolio</Link>
              <Link to={ROUTES.BLOG}>Blog</Link>
            </div>
          </div>

          <div className="footer-column">
            <span className="footer-heading">Company</span>
            <div className="footer-link-list">
              <Link to={ROUTES.ABOUT}>About</Link>
              <Link to={ROUTES.CONTACT}>Contact</Link>
              <Link to={ROUTES.BLOG}>Blog</Link>
            </div>
          </div>
        </div>

        <div className="footer-divider" />
        <div className="footer-bottom-row">
          <span>© 2026 Quadravise. All rights reserved.</span>
          <span>Built for scalable digital products.</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;

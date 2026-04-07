import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import logo from "../../assets/logos/quadravise_logo.png";
import { adminService } from "../../services/adminService";

const navItems = [
  { key: ROUTES.HOME, label: "Home" },
  { key: ROUTES.SERVICES, label: "Services" },
  { key: ROUTES.PRODUCTS, label: "Products" },
  { key: ROUTES.QUADRA_ILEARN, label: "QuadraiLearn" },
  {
    key: ROUTES.OUR_WORK,
    label: "Our Work",
    activePaths: [ROUTES.OUR_WORK, ROUTES.PORTFOLIO],
    children: [
      ["Ecommerce", "Static Website", "Gated Website", "Portfolio Website"],
      ["Business Website", "WordPress Website"]
    ]
  },
  { key: ROUTES.BLOG, label: "Blog" },
  { key: ROUTES.ABOUT, label: "About" },
  { key: ROUTES.CONTACT, label: "Contact" }
];

const mobileNavItems = [
  { key: ROUTES.HOME, label: "Home" },
  { key: ROUTES.SERVICES, label: "Services" },
  { key: ROUTES.PRODUCTS, label: "Products" },
  { key: ROUTES.QUADRA_ILEARN, label: "QuadraiLearn" },
  {
    key: ROUTES.OUR_WORK,
    label: "Our Work",
    activePaths: [ROUTES.OUR_WORK, ROUTES.PORTFOLIO],
    children: [
      ["Ecommerce", "Static Website", "Gated Website", "Portfolio Website"],
      ["Business Website", "WordPress Website"]
    ]
  },
  { key: ROUTES.BLOG, label: "Blog" },
  { key: ROUTES.ABOUT, label: "About" },
  { key: ROUTES.CONTACT, label: "Contact" }
];

const adminNavItems = [
  { key: ROUTES.ADMIN_DASHBOARD, label: "Dashboard" },
  { key: ROUTES.ADMIN_BLOGS, label: "Blog" },
  { key: ROUTES.ADMIN_PORTFOLIO, label: "Portfolio" },
  { key: ROUTES.ADMIN_USERS, label: "Add User" },
  { key: ROUTES.ADMIN_LEADS, label: "Leads Record" },
  { key: ROUTES.ADMIN_SETTINGS, label: "Settings" }
];

function SiteHeader({ isAdmin = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isNavItemActive(item) {
    const activePaths = item.activePaths || [item.key];
    return activePaths.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));
  }

  function getSubmenuHref(label) {
    return `${ROUTES.OUR_WORK}/${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
  }

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <div>
          <Link to={isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME} className="site-logo-link" aria-label="Octane Home">
            <span className="site-logo-stack">
              <img src={logo} alt="Octane Logo" className="site-logo" width="48" height="48" />
              <span className="site-logo-text">Octane</span>
            </span>
          </Link>
        </div>

        <div className="desktop-nav">
          {isAdmin ? (
            <nav className="admin-header-nav" aria-label="Admin sections">
              {adminNavItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.key}
                  className={`admin-header-nav-link ${location.pathname === item.key ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : (
            <nav className="site-nav-list" aria-label="Primary navigation">
              {navItems.map((item) => (
                item.children?.length ? (
                  <div key={item.key} className={`site-nav-item site-nav-item-has-menu ${isNavItemActive(item) ? "is-active" : ""}`}>
                    <span className={`site-nav-link site-nav-link-trigger ${isNavItemActive(item) ? "is-active" : ""}`}>
                      <span>{item.label}</span>
                      <DownOutlined className="site-nav-caret" />
                    </span>
                    <div className="site-nav-submenu" role="menu" aria-label={`${item.label} submenu`}>
                      <div className="site-nav-submenu-grid">
                        {item.children.map((group, groupIndex) => (
                          <div key={`${item.key}-group-${groupIndex}`} className="site-nav-submenu-column">
                            {group.map((childLabel) => (
                              <Link
                                key={childLabel}
                                to={getSubmenuHref(childLabel)}
                                className="site-nav-submenu-link"
                              >
                                {childLabel}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    to={item.key}
                    className={`site-nav-link ${isNavItemActive(item) ? "is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          )}
        </div>

        <div className="site-header-actions">
          {isAdmin ? (
            <button
              type="button"
              className="hero-btn hero-btn-secondary admin-header-logout-btn"
              onClick={async () => {
                await adminService.logout();
                navigate(ROUTES.ADMIN_LOGIN, { replace: true });
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to={ROUTES.CONTACT} className="hero-btn header-cta header-cta-link">
                Book Free Consultation
              </Link>
              <button
                type="button"
                className="mobile-nav-trigger"
                aria-label="Open navigation menu"
                aria-expanded={open}
                onClick={() => setOpen((currentOpen) => !currentOpen)}
              >
                <span className="mobile-nav-trigger-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {!isAdmin && open ? (
        <div className="site-mobile-panel" role="dialog" aria-label="Menu">
          <div className="site-mobile-panel-inner">
            {mobileNavItems.map((item) => (
              item.children?.length ? (
                <div key={item.key} className="site-mobile-group">
                  <Link
                    to={item.key}
                    className={`site-mobile-link ${isNavItemActive(item) ? "is-active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                  <div className="site-mobile-sublinks">
                    {item.children.flat().map((childLabel) => (
                      <Link
                        key={childLabel}
                        to={getSubmenuHref(childLabel)}
                        className="site-mobile-sublink"
                        onClick={() => setOpen(false)}
                      >
                        {childLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  to={item.key}
                  className={`site-mobile-link ${isNavItemActive(item) ? "is-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default SiteHeader;

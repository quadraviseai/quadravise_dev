import { useEffect, useState } from "react";
import { Button, Drawer, Layout, Menu, Space } from "antd";
import {
  AppstoreOutlined,
  BookOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  MenuOutlined,
  ReadOutlined,
  RocketOutlined,
  ToolOutlined
} from "@ant-design/icons";
import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import logo from "../../assets/logos/quadravise_logo.png";
import { adminService } from "../../services/adminService";

const { Header } = Layout;

const navItems = [
  { key: ROUTES.HOME, label: <Link to={ROUTES.HOME}>Home</Link> },
  { key: ROUTES.SERVICES, label: <Link to={ROUTES.SERVICES}>Services</Link> },
  { key: ROUTES.PRODUCTS, label: <Link to={ROUTES.PRODUCTS}>Products</Link> },
  { key: ROUTES.QUADRA_ILEARN, label: <Link to={ROUTES.QUADRA_ILEARN}>QuadraiLearn</Link> },
  { key: ROUTES.PORTFOLIO, label: <Link to={ROUTES.PORTFOLIO}>Portfolio</Link> },
  { key: ROUTES.BLOG, label: <Link to={ROUTES.BLOG}>Blog</Link> },
  { key: ROUTES.ABOUT, label: <Link to={ROUTES.ABOUT}>About</Link> },
  { key: ROUTES.CONTACT, label: <Link to={ROUTES.CONTACT}>Contact</Link> }
];

const mobileNavItems = [
  { key: ROUTES.HOME, icon: <HomeOutlined />, label: <Link to={ROUTES.HOME}>Home</Link> },
  { key: ROUTES.SERVICES, icon: <ToolOutlined />, label: <Link to={ROUTES.SERVICES}>Services</Link> },
  { key: ROUTES.PRODUCTS, icon: <AppstoreOutlined />, label: <Link to={ROUTES.PRODUCTS}>Products</Link> },
  { key: ROUTES.QUADRA_ILEARN, icon: <RocketOutlined />, label: <Link to={ROUTES.QUADRA_ILEARN}>QuadraiLearn</Link> },
  { key: ROUTES.PORTFOLIO, icon: <BookOutlined />, label: <Link to={ROUTES.PORTFOLIO}>Portfolio</Link> },
  { key: ROUTES.BLOG, icon: <ReadOutlined />, label: <Link to={ROUTES.BLOG}>Blog</Link> },
  { key: ROUTES.ABOUT, icon: <InfoCircleOutlined />, label: <Link to={ROUTES.ABOUT}>About</Link> },
  { key: ROUTES.CONTACT, icon: <MailOutlined />, label: <Link to={ROUTES.CONTACT}>Contact</Link> }
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

  return (
    <Header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to={isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME} className="site-logo-link" aria-label="Quadravise Home">
            <span className="site-logo-stack">
              <img src={logo} alt="Quadravise Logo" className="site-logo" />
              <span className="site-logo-text">Quadravise</span>
            </span>
          </Link>
        </motion.div>
        {isAdmin ? (
          <div className="desktop-nav">
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
          </div>
        ) : (
          <div className="desktop-nav">
            <Menu mode="horizontal" selectedKeys={[location.pathname]} items={navItems} className="site-menu" />
          </div>
        )}
        <Space className="site-header-actions" size={12}>
          {isAdmin ? (
            <Button
              className="hero-btn hero-btn-secondary admin-header-logout-btn"
              onClick={async () => {
                await adminService.logout();
                navigate(ROUTES.ADMIN_LOGIN, { replace: true });
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button type="primary" className="header-cta">
                <Link to={ROUTES.CONTACT}>Book Free Consultation</Link>
              </Button>
              <Button
                className="mobile-nav-trigger"
                icon={<MenuOutlined />}
                aria-label="Open navigation menu"
                aria-expanded={open}
                onClick={() => setOpen((currentOpen) => !currentOpen)}
              />
            </>
          )}
        </Space>
      </div>
      {!isAdmin ? (
        <Drawer title="Menu" open={open} onClose={() => setOpen(false)}>
          <Menu mode="inline" selectedKeys={[location.pathname]} items={mobileNavItems} onClick={() => setOpen(false)} />
        </Drawer>
      ) : null}
    </Header>
  );
}

export default SiteHeader;

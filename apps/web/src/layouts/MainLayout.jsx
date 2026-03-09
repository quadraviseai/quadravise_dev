import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";

const { Content } = Layout;

function MainLayout() {
  return (
    <Layout className="app-shell" style={{ minHeight: "100vh" }}>
      <SiteHeader />
      <Content className="app-content">
        <Outlet />
      </Content>
      <SiteFooter />
    </Layout>
  );
}

export default MainLayout;

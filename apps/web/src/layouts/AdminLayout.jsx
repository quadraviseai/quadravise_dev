import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import SiteHeader from "../components/layout/SiteHeader";

const { Content } = Layout;

function AdminLayout() {
  return (
    <Layout className="app-shell" style={{ minHeight: "100vh" }}>
      <SiteHeader isAdmin />
      <Content className="app-content">
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AdminLayout;

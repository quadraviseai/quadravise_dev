import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function ClientLayout() {
  return (
    <Layout className="app-shell" style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Content className="app-content client-app-content">
        <Outlet />
      </Content>
    </Layout>
  );
}

export default ClientLayout;

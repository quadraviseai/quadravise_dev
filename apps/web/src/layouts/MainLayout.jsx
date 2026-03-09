import { Outlet } from "react-router-dom";

import SiteHeader from "../components/layout/SiteHeader";
import SiteFooter from "../components/layout/SiteFooter";

function MainLayout() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="app-content">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export default MainLayout;

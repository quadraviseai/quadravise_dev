import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { adminService } from "../../services/adminService";

function AdminRouteGuard({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    adminService
      .me()
      .then(() => setStatus("authenticated"))
      .catch(() => setStatus("unauthenticated"));
  }, []);

  if (status === "loading") {
    return (
      <div style={{ minHeight: "40vh", display: "grid", placeItems: "center" }}>
        <Spin />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return children;
}

export default AdminRouteGuard;

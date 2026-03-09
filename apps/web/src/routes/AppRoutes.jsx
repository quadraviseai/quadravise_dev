import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import ProductsPage from "../pages/ProductsPage";
import QuadraILearnPage from "../pages/QuadraILearnPage";
import PortfolioPage from "../pages/PortfolioPage";
import BlogPage from "../pages/BlogPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import BlogPreviewPage from "../pages/BlogPreviewPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminResetPasswordPage from "../pages/AdminResetPasswordPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminRouteGuard from "../components/admin/AdminRouteGuard";
import { ROUTES } from "../constants/routes";
import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
      <Route path={ROUTES.ADMIN_RESET_PASSWORD} element={<AdminResetPasswordPage />} />
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
        <Route path={ROUTES.QUADRA_ILEARN} element={<QuadraILearnPage />} />
        <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route
          path={`${ROUTES.BLOG_PREVIEW}/:slug`}
          element={
            <AdminRouteGuard>
              <BlogPreviewPage />
            </AdminRouteGuard>
          }
        />
        <Route path={`${ROUTES.BLOG}/:slug`} element={<BlogDetailPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path="/home" element={<Navigate to={ROUTES.HOME} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />} />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <AdminRouteGuard>
              <AdminDashboardPage section="dashboard" />
            </AdminRouteGuard>
          }
        />
        <Route
          path={ROUTES.ADMIN_BLOGS}
          element={
            <AdminRouteGuard>
              <AdminDashboardPage section="blogs" />
            </AdminRouteGuard>
          }
        />
        <Route
          path={ROUTES.ADMIN_PORTFOLIO}
          element={
            <AdminRouteGuard>
              <AdminDashboardPage section="portfolio" />
            </AdminRouteGuard>
          }
        />
        <Route
          path={ROUTES.ADMIN_USERS}
          element={
            <AdminRouteGuard>
              <AdminDashboardPage section="users" />
            </AdminRouteGuard>
          }
        />
        <Route
          path={ROUTES.ADMIN_LEADS}
          element={
            <AdminRouteGuard>
              <AdminDashboardPage section="leads" />
            </AdminRouteGuard>
          }
        />
        <Route
          path={ROUTES.ADMIN_SETTINGS}
          element={
            <AdminRouteGuard>
              <AdminDashboardPage section="settings" />
            </AdminRouteGuard>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

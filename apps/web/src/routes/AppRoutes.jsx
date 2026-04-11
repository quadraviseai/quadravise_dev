import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const ClientLayout = lazy(() => import("../layouts/ClientLayout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("../pages/ServiceDetailPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const QuadraILearnPage = lazy(() => import("../pages/QuadraILearnPage"));
const QuadraILearnSurveyPage = lazy(() => import("../pages/QuadraILearnSurveyPage"));
const OurWorkPage = lazy(() => import("../pages/OurWorkPage"));
const PortfolioPage = lazy(() => import("../pages/PortfolioPage"));
const PortfolioDetailPage = lazy(() => import("../pages/PortfolioDetailPage"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const BlogDetailPage = lazy(() => import("../pages/BlogDetailPage"));
const BlogPreviewPage = lazy(() => import("../pages/BlogPreviewPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicyPage"));
const CookiePolicyPage = lazy(() => import("../pages/CookiePolicyPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const AdminLoginPage = lazy(() => import("../pages/AdminLoginPage"));
const AdminResetPasswordPage = lazy(() => import("../pages/AdminResetPasswordPage"));
const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));
const ClientLoginPage = lazy(() => import("../pages/ClientLoginPage"));
const ClientNoProjectsPage = lazy(() => import("../pages/ClientNoProjectsPage"));
const ClientDashboardPage = lazy(() => import("../pages/ClientDashboardPage"));
const ClientBugsPage = lazy(() => import("../pages/ClientBugsPage"));
import AdminRouteGuard from "../components/admin/AdminRouteGuard";
import ClientRouteGuard from "../components/client/ClientRouteGuard";
import { ROUTES } from "../constants/routes";

const routeFallback = (
  <div className="route-loading-shell">
    <div className="route-loading-indicator" aria-label="Loading page" />
  </div>
);

function AppRoutes() {
  return (
    <Suspense fallback={routeFallback}>
      <Routes>
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
        <Route path={ROUTES.ADMIN_RESET_PASSWORD} element={<AdminResetPasswordPage />} />
        <Route path={ROUTES.CLIENT_LOGIN} element={<ClientLoginPage />} />
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path={ROUTES.QUADRA_ILEARN} element={<QuadraILearnPage />} />
          <Route path={ROUTES.QUADRA_ILEARN_SURVEY} element={<QuadraILearnSurveyPage />} />
          <Route path={ROUTES.OUR_WORK} element={<Navigate to={`${ROUTES.OUR_WORK}/ecommerce`} replace />} />
          <Route path={`${ROUTES.OUR_WORK}/:slug`} element={<OurWorkPage />} />
          <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          <Route path={`${ROUTES.PORTFOLIO}/:slug`} element={<PortfolioDetailPage />} />
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
          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.COOKIE_POLICY} element={<CookiePolicyPage />} />
          <Route path="/home" element={<Navigate to={ROUTES.HOME} replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<ClientLayout />}>
          <Route
            path={ROUTES.CLIENT_NO_PROJECTS}
            element={
              <ClientRouteGuard>
                <ClientNoProjectsPage />
              </ClientRouteGuard>
            }
          />
          <Route
            path={ROUTES.CLIENT_PROJECT_DASHBOARD}
            element={
              <ClientRouteGuard>
                <ClientDashboardPage />
              </ClientRouteGuard>
            }
          />
          <Route
            path={ROUTES.CLIENT_PROJECT_BUGS}
            element={
              <ClientRouteGuard>
                <ClientBugsPage />
              </ClientRouteGuard>
            }
          />
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
            path={ROUTES.ADMIN_CLIENT_ACCESS}
            element={
              <AdminRouteGuard>
                <AdminDashboardPage section="client-access" />
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
            path={ROUTES.ADMIN_CONFIGURATION}
            element={
              <AdminRouteGuard>
                <AdminDashboardPage section="configuration" />
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
    </Suspense>
  );
}

export default AppRoutes;

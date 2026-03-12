import ScrollToTop from "./components/common/ScrollToTop";
import CookieConsentManager from "./components/consent/CookieConsentManager";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <CookieConsentProvider>
      <ScrollToTop />
      <AppRoutes />
      <CookieConsentManager />
    </CookieConsentProvider>
  );
}

export default App;

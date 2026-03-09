import CookieConsentManager from "./components/consent/CookieConsentManager";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <CookieConsentProvider>
      <AppRoutes />
      <CookieConsentManager />
    </CookieConsentProvider>
  );
}

export default App;

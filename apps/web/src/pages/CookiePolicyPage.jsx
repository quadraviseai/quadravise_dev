import SEOHead from "../components/seo/SEOHead";
import { pageSeo, seoKeywords } from "../constants/seo";

const cookieRows = [
  {
    name: "quadravise-cookie-consent",
    purpose: "Stores your cookie preference selection for returning visits.",
    duration: "12 months"
  },
  {
    name: "Necessary site storage",
    purpose: "Supports routing, security, and essential application behavior.",
    duration: "Session or as required"
  },
  {
    name: "Google analytics cookies",
    purpose: "Measures site usage and traffic only when analytics consent is granted.",
    duration: "Varies by Google configuration"
  }
];

function CookiePolicyPage() {
  return (
    <>
      <SEOHead
        title={pageSeo.cookiePolicy.title}
        description={pageSeo.cookiePolicy.description}
        keywords={seoKeywords.default}
        canonical={pageSeo.cookiePolicy.canonical}
      />
      <section className="section policy-page-section">
        <div className="section-inner policy-page-shell">
          <div className="policy-page-header">
            <span className="policy-kicker">Cookie Policy</span>
            <h1>Cookie Policy</h1>
            <p>
              This page explains what cookies are used on the Quadravise website, why they are used, and how long they
              remain active.
            </p>
          </div>

          <div className="policy-card">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small files stored on your device to remember preferences, support essential website
              features, and measure performance.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              Quadravise uses necessary cookies for core functionality and optional analytics cookies for performance
              measurement. Optional cookies are disabled until you consent.
            </p>

            <h2>Cookies in Use</h2>
            <div className="policy-table">
              <div className="policy-table-row policy-table-head">
                <span>Cookie</span>
                <span>Purpose</span>
                <span>Expiration</span>
              </div>
              {cookieRows.map((row) => (
                <div key={row.name} className="policy-table-row">
                  <span>{row.name}</span>
                  <span>{row.purpose}</span>
                  <span>{row.duration}</span>
                </div>
              ))}
            </div>

            <h2>Managing Cookie Preferences</h2>
            <p>
              You can accept, reject, or update analytics cookies at any time through the Cookie Settings link in the
              website footer.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default CookiePolicyPage;

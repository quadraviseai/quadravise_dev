import SEOHead from "../components/seo/SEOHead";
import { pageSeo, seoKeywords } from "../constants/seo";

function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title={pageSeo.privacyPolicy.title}
        description={pageSeo.privacyPolicy.description}
        keywords={seoKeywords.default}
        canonical={pageSeo.privacyPolicy.canonical}
      />
      <section className="section policy-page-section">
        <div className="section-inner policy-page-shell">
          <div className="policy-page-header">
            <span className="policy-kicker">Privacy Policy</span>
            <h1>Privacy Policy</h1>
            <p>
              This policy explains what data Quadravise collects, how it is used, and how analytics and tracking
              technologies are handled on this website.
            </p>
          </div>

          <div className="policy-card">
            <h2>Information We Collect</h2>
            <p>
              We may collect contact details, project inquiry details, and technical usage information when you submit
              forms or permit analytics cookies.
            </p>

            <h2>How We Use Information</h2>
            <p>
              Quadravise uses this information to respond to inquiries, discuss projects, improve customer support,
              maintain security, and understand website performance.
            </p>

            <h2>Analytics Cookies</h2>
            <p>
              Google Tag Manager and analytics measurement are only activated after you accept analytics cookies. If
              you reject them, analytics tracking remains disabled.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              The website may rely on third-party providers for hosting, analytics, and communications. These services
              process data only as needed to support website delivery and business operations.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can update cookie preferences at any time using the Cookie Settings link in the footer of the site.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy-related questions, contact <a href="mailto:support@quadravise.com">support@quadravise.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicyPage;

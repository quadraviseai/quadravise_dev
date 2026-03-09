import { useEffect, useState } from "react";

import { useCookieConsent } from "../../context/CookieConsentContext";

function CookieConsentManager() {
  const {
    consent,
    isReady,
    isPreferencesOpen,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences
  } = useCookieConsent();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    setAnalyticsEnabled(consent.analytics);
  }, [consent.analytics]);

  if (!isReady) return null;

  return (
    <>
      {!consent.hasInteracted ? (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent banner">
          <div className="cookie-banner-copy">
            <strong>Cookie Notice</strong>
            <p>
              Quadravise uses necessary cookies for core website functionality and optional analytics cookies to
              understand traffic and improve performance after consent.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button type="button" className="cookie-btn cookie-btn-primary" onClick={acceptAll}>
              Accept All
            </button>
            <button type="button" className="cookie-btn cookie-btn-secondary" onClick={rejectNonEssential}>
              Reject Non-Essential
            </button>
            <button type="button" className="cookie-btn cookie-btn-tertiary" onClick={openPreferences}>
              Manage Preferences
            </button>
          </div>
        </div>
      ) : null}

      {isPreferencesOpen ? (
        <div className="cookie-modal-backdrop" role="presentation" onClick={closePreferences}>
          <div
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cookie-modal-head">
              <div>
                <strong>Cookie Preferences</strong>
                <p>Choose which categories Quadravise can use while you browse.</p>
              </div>
              <button type="button" className="cookie-modal-close" onClick={closePreferences} aria-label="Close">
                x
              </button>
            </div>

            <div className="cookie-category-card">
              <div>
                <strong>Necessary Cookies</strong>
                <p>Required for security, routing, and essential website operation.</p>
              </div>
              <span className="cookie-status-pill">Always Active</span>
            </div>

            <label className="cookie-category-card cookie-category-toggle">
              <div>
                <strong>Analytics Cookies</strong>
                <p>Enables Google Tag Manager and analytics measurement only after your approval.</p>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
              />
            </label>

            <div className="cookie-modal-actions">
              <button type="button" className="cookie-btn cookie-btn-secondary" onClick={rejectNonEssential}>
                Reject Non-Essential
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={() => savePreferences({ analytics: analyticsEnabled })}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CookieConsentManager;

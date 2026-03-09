import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_VERSION,
  defaultCookieConsent,
  GA_MEASUREMENT_ID,
  GTM_CONTAINER_ID
} from "../constants/consent";

const CookieConsentContext = createContext(null);

let gtmLoaded = false;

function readStoredConsent() {
  if (typeof window === "undefined") return defaultCookieConsent;

  try {
    const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!rawValue) return defaultCookieConsent;

    const parsedValue = JSON.parse(rawValue);
    if (parsedValue?.version !== COOKIE_CONSENT_VERSION) return defaultCookieConsent;

    return {
      ...defaultCookieConsent,
      ...parsedValue,
      necessary: true
    };
  } catch {
    return defaultCookieConsent;
  }
}

function writeStoredConsent(consent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

function syncAnalyticsFlags(analyticsEnabled) {
  if (typeof window === "undefined") return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = !analyticsEnabled;
}

function loadGoogleTagManager() {
  if (typeof window === "undefined" || typeof document === "undefined" || gtmLoaded) return;

  gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  script.dataset.quadraviseGtm = "true";
  document.head.appendChild(script);
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(defaultCookieConsent);
  const [isReady, setIsReady] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();
    setConsent(storedConsent);
    syncAnalyticsFlags(storedConsent.analytics);
    if (storedConsent.analytics) {
      loadGoogleTagManager();
    }
    setIsReady(true);
  }, []);

  const saveConsent = (nextConsent) => {
    const normalizedConsent = {
      ...defaultCookieConsent,
      ...nextConsent,
      necessary: true,
      hasInteracted: true,
      version: COOKIE_CONSENT_VERSION,
      updatedAt: new Date().toISOString()
    };

    setConsent(normalizedConsent);
    writeStoredConsent(normalizedConsent);
    syncAnalyticsFlags(normalizedConsent.analytics);

    if (normalizedConsent.analytics) {
      loadGoogleTagManager();
    }
  };

  const value = useMemo(
    () => ({
      consent,
      isReady,
      isPreferencesOpen,
      acceptAll() {
        saveConsent({ analytics: true });
        setIsPreferencesOpen(false);
      },
      rejectNonEssential() {
        saveConsent({ analytics: false });
        setIsPreferencesOpen(false);
      },
      savePreferences(preferences) {
        saveConsent({ analytics: Boolean(preferences.analytics) });
        setIsPreferencesOpen(false);
      },
      openPreferences() {
        setIsPreferencesOpen(true);
      },
      closePreferences() {
        setIsPreferencesOpen(false);
      }
    }),
    [consent, isPreferencesOpen, isReady]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}

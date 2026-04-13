import { useEffect } from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your GA4 Measurement ID

const GoogleAnalytics = () => {
  const { preferences, consentGiven } = useCookieConsent();

  useEffect(() => {
    if (!consentGiven || !preferences.analytics) return;
    if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return; // Skip placeholder

    // Don't load twice
    if (document.getElementById("ga4-script")) return;

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.id = "ga4-inline";
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(inlineScript);

    return () => {
      document.getElementById("ga4-script")?.remove();
      document.getElementById("ga4-inline")?.remove();
    };
  }, [consentGiven, preferences.analytics]);

  return null;
};

export default GoogleAnalytics;

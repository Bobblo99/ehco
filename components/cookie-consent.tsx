"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [consentSettings, setConsentSettings] = useState({
    maps: false,
    analytics: false,
    media: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-settings");
    if (!consent) {
      setVisible(true);
    }

    const onOpenSettings = () => setVisible(true);
    window.addEventListener("open-cookie-settings", onOpenSettings);
    return () =>
      window.removeEventListener("open-cookie-settings", onOpenSettings);
  }, []);

  const hideWithAnimation = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setVisible(false);
      setAnimateOut(false);
    }, 400);
  };

  const handleSave = () => {
    localStorage.setItem("cookie-consent", "custom");
    localStorage.setItem(
      "cookie-consent-settings",
      JSON.stringify(consentSettings)
    );
    document.cookie = `cookie-consent=custom; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
    hideWithAnimation();
    window.dispatchEvent(new Event("cookie-accepted"));
  };

  const handleAcceptAll = () => {
    const fullConsent = {
      maps: true,
      analytics: true,
      media: true,
    };
    setConsentSettings(fullConsent);
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem(
      "cookie-consent-settings",
      JSON.stringify(fullConsent)
    );
    document.cookie = `cookie-consent=accepted; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
    hideWithAnimation();
    window.dispatchEvent(new Event("cookie-accepted"));
  };

  const handleDeclineAll = () => {
    const noConsent = {
      maps: false,
      analytics: false,
      media: false,
    };
    setConsentSettings(noConsent);
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-settings", JSON.stringify(noConsent));
    document.cookie = `cookie-consent=declined; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
    hideWithAnimation();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-6 shadow-md bg-gray-900 text-white transform transition-all duration-300 ${
        animateOut ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {/* Hauptbereich */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-sm">
            Wir verwenden Cookies, um dein Nutzererlebnis zu verbessern.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleDeclineAll}
              variant="outline"
              className="bg-white text-black hover:bg-gray-200"
            >
              Ablehnen
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="bg-yellow-400 text-black hover:bg-yellow-500"
            >
              Alle akzeptieren
            </Button>
          </div>
        </div>

        <div>
          <button
            className="text-xs underline text-yellow-400"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Details ausblenden" : "Cookie-Einstellungen anzeigen"}
          </button>

          {expanded && (
            <div className="mt-3 text-xs text-gray-300 space-y-3">
              <p>
                Diese Website nutzt Dienste wie Google Maps oder YouTube, die
                externe Inhalte laden. Erst nach Zustimmung werden diese Inhalte
                angezeigt.
              </p>

              <form className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={consentSettings.maps}
                    onChange={(e) =>
                      setConsentSettings({
                        ...consentSettings,
                        maps: e.target.checked,
                      })
                    }
                  />
                  Google Maps erlauben
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={consentSettings.analytics}
                    onChange={(e) =>
                      setConsentSettings({
                        ...consentSettings,
                        analytics: e.target.checked,
                      })
                    }
                  />
                  Google Analytics erlauben
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={consentSettings.media}
                    onChange={(e) =>
                      setConsentSettings({
                        ...consentSettings,
                        media: e.target.checked,
                      })
                    }
                  />
                  YouTube/Videos erlauben
                </label>
              </form>

              <div className="pt-2">
                <Button
                  onClick={handleSave}
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Auswahl speichern
                </Button>
              </div>

              <p>
                Du kannst deine Auswahl jederzeit in der{" "}
                <a href="/datenschutz" className="underline text-yellow-400">
                  Datenschutzerklärung
                </a>{" "}
                ändern.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", choice);
    document.cookie = `cookie-consent=${choice}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
    setVisible(false);
    if (choice === "accepted") {
      window.dispatchEvent(new Event("cookie-accepted"));
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-6 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-sm">
            Wir verwenden Cookies, um dein Nutzererlebnis zu verbessern.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => handleConsent("declined")}
              variant="outline"
              className="bg-white text-black hover:bg-gray-200"
            >
              Ablehnen
            </Button>
            <Button
              onClick={() => handleConsent("accepted")}
              className="bg-yellow-400 text-black hover:bg-yellow-500"
            >
              Akzeptieren
            </Button>
          </div>
        </div>

        <div>
          <button
            className="text-xs underline text-yellow-400"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Details ausblenden" : "Details anzeigen"}
          </button>

          {expanded && (
            <div className="mt-3 text-xs text-gray-300 space-y-2">
              <p>
                Diese Website nutzt Dienste wie Google Maps oder YouTube, die
                externe Inhalte laden. Erst nach Zustimmung werden diese Inhalte
                angezeigt.
              </p>
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

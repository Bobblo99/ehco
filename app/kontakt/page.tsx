// app/kontakt/page.tsx

import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – EHCO Kältetherapie in Hardthausen | Alpha Cooling®",
  description:
    "Nehmen Sie Kontakt zu EHCO auf – Ihre Praxis für moderne Kältetherapie in Hardthausen am Kocher (Landkreis Heilbronn). Jetzt Termin anfragen oder Beratung erhalten.",
  robots: "index, follow",
  metadataBase: new URL("https://eh-co.com"),
  openGraph: {
    title: "Kontakt – EHCO Kältetherapie in Hardthausen | Alpha Cooling®",
    description:
      "Jetzt Kontakt aufnehmen mit EHCO – professionelle Schmerzbehandlung durch Alpha Cooling® im Raum Heilbronn. Wir beraten Sie gerne.",
    url: "https://eh-co.com/kontakt",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EHCO Kontaktseite",
      },
    ],
  },
  icons: {
    icon: "/icon/ehco-logo.ico",
  },
  other: {
    "geo.region": "DE-BW",
    "geo.placename": "Hardthausen am Kocher",
    "geo.position": "49.2361;9.3976",
    ICBM: "49.2361, 9.3976",
  },
};

// Dynamisch importieren, damit "use client" erhalten bleibt
const ContactPage = dynamic(() => import("./contact-page"), {
  ssr: false,
});

export default function Page() {
  return <ContactPage />;
}

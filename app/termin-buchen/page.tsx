import { BookingForm } from "@/components/booking-form";

export const metadata = {
  title: "Termin buchen – EHCO Kältetherapie in Hardthausen am Kocher",
  description:
    "Jetzt Termin für Ihre persönliche Kältetherapie buchen – kostenfreier Beratungstermin in Hardthausen am Kocher. Weniger Schmerzen, mehr Lebensqualität.",
  robots: "index, follow",
  metadataBase: new URL("https://eh-co.com"),
  openGraph: {
    title: "Termin buchen – EHCO Kältetherapie",
    description:
      "Buchen Sie Ihren Alpha Cooling® Termin in Hardthausen – individuell, medikamentenfrei, effektiv gegen Schmerzen.",
    url: "https://eh-co.com/termin-buchen",
    type: "website",
    images: [
      {
        url: "/ehco-logo.svg",
        width: 1200,
        height: 630,
        alt: "EHCO – Alpha Cooling® Termin buchen",
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

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Termin vereinbaren</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Buchen Sie Ihre erste Alpha Cooling® Anwendung – kostenlos und
              unverbindlich.
            </p>
          </div>
          <BookingForm />

          <div className="mt-12 bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">So funktioniert’s</h2>
            <ul className="space-y-3 text-gray-800 text-sm leading-relaxed">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  1
                </span>
                Wählen Sie Ihren Wunschtermin sowie eine passende Uhrzeit.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  2
                </span>
                Füllen Sie Ihre Kontaktdaten aus und geben Sie uns optional
                Hinweise (z. B. Beschwerden).
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  3
                </span>
                Nach Absenden erhalten Sie eine Bestätigung per E-Mail.
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center mr-3 mt-0.5 font-bold text-sm">
                  4
                </span>
                Beim ersten Besuch erhalten Sie eine kurze Beratung und Ihre
                erste Anwendung – komplett kostenfrei.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

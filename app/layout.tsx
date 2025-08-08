import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import CookieBanner from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EHCO – Kältetherapie in Hardthausen",
  description:
    "EHCO - Moderne Kältetherapie mit Alpha Cooling® im Raum Heilbronn – schnell, wirksam & medikamentenfrei. Jetzt kostenfrei beraten lassen!",

  keywords: [
    "Kältetherapie",
    "Kälteanwendung",
    "Alpha Cooling",
    "Heilbronn",
    "Hardthausen",
    "chronische Schmerzen",
    "akute Schmerzen",
    "Regeneration",
    "Schmerzbehandlung ohne Medikamente",
  ],

  authors: [{ name: "EHCO", url: "https://eh-co.com" }],
  creator: "EHCO",
  publisher: "EHCO",

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon/ehco-logo.ico",
  },
  openGraph: {
    title: "EHCO – Alpha Cooling® Kältetherapie in Hardthausen bei Heilbronn",
    description:
      "EHCO bietet moderne Schmerztherapie durch Alpha Cooling® im Raum Heilbronn. Jetzt kostenfrei Termin vereinbaren.",
    url: "https://eh-co.com",
    siteName: "EHCO",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/icon/ehco-logo.ico",
        width: 1200,
        height: 630,
        alt: "EHCO Alpha Cooling Kältetherapie",
      },
    ],
  },

  alternates: {
    canonical: "https://eh-co.com",
  },

  other: {
    "geo.region": "DE-BW",
    "geo.placename": "Hardthausen am Kocher",
    "geo.position": "49.2486;9.3664",
    ICBM: "49.2486,9.3664",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <CookieBanner />
      </body>
    </html>
  );
}

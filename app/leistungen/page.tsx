import { Activity, Clock, ThermometerSnowflake, Brain } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

export const metadata = {
  title: "Leistungen – Kältetherapie Heilbronn | EHCO",
  description:
    "Unsere Leistungen: gezielte Kältetherapie mit Alpha Cooling® im Raum Heilbronn – individuell, wirksam, modern.",
  robots: "index, follow",
  metadataBase: new URL("https://eh-co.com"),
  openGraph: {
    title: "Leistungen – Kältetherapie Heilbronn | EHCO",
    description:
      "Unsere Leistungen: gezielte Kältetherapie mit Alpha Cooling® im Raum Heilbronn – individuell, wirksam, modern.",
    url: "https://eh-co.com/leistungen",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EHCO Kältetherapie Leistungen",
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

export default function ServicesPage() {
  const services: ServiceProps[] = [
    {
      id: "kaelte-akut",
      title: "Akute Schmerztherapie",
      description:
        "Gezielte Kältebehandlung zur schnellen Linderung von akuten Schmerzen und Entzündungen.",
      features: [
        "Schmerzlinderung innerhalb von 2 Minuten",
        "Reduktion von Entzündungen und Schwellungen",
        "Ideal bei akuten Verletzungen und Überlastung",
        "Unterstützt die Heilung unmittelbar nach dem Ereignis",
        "Sanfte Alternative zu Schmerzmitteln",
      ],
      icon: <ThermometerSnowflake className="h-8 w-8" />,
      image:
        "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "kaelte-chronisch",
      title: "Chronische Schmerzbehandlung",
      description:
        "Nachhaltige Kühltherapie zur Linderung langfristiger Beschwerden und zur Verbesserung des Alltags.",
      features: [
        "Sanfte Behandlung chronischer Schmerzen",
        "Reduktion von Medikamenteneinsatz",
        "Hilfreich bei Rheuma, Arthrose & Co.",
        "Mehr Lebensqualität im Alltag",
        "Individuell anpassbare Anwendungen",
      ],
      icon: <Clock className="h-8 w-8" />,
      image:
        "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "kaelte-sport",
      title: "Sporttherapie",
      description:
        "Regeneration und Prävention für Sportler – leistungssteigernd und muskelentspannend.",
      features: [
        "Fördert schnellere Erholung nach Training",
        "Beugt Sportverletzungen vor",
        "Lindert Muskelkater & Überbelastung",
        "Stärkt die Leistungsfähigkeit",
        "Optimal für ambitionierte Hobbysportler & Profis",
      ],
      icon: <Activity className="h-8 w-8" />,
      image:
        "https://images.pexels.com/photos/4162584/pexels-photo-4162584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "kaelte-neuro",
      title: "Neurologische Therapie",
      description:
        "Kälteanwendungen zur Unterstützung bei Migräne, Nervenschmerzen und neurologischen Erkrankungen.",
      features: [
        "Lindert Kopfschmerzen & Migräne",
        "Beruhigt überreizte Nerven",
        "Hilfreich bei MS & Fibromyalgie",
        "Unterstützt die Nervenfunktion",
        "Für mehr mentale Balance & Ruhe",
      ],
      icon: <Brain className="h-8 w-8" />,
      image:
        "https://images.pexels.com/photos/4226766/pexels-photo-4226766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  return (
    <>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              Einsatzbereiche von Alpha Cooling®
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Die Kältetherapie mit Alpha Cooling® eignet sich für
              unterschiedlichste Bedürfnisse – von akuten Beschwerden über
              chronische Schmerzen bis hin zur Regeneration nach körperlicher
              Belastung.
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service) => (
              <section
                key={service.id}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div
                    className="relative h-64 lg:h-full rounded-lg overflow-hidden"
                    style={{ minHeight: "300px" }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center p-6">
                        <div className="inline-block p-3 bg-yellow-500 rounded-full mb-4">
                          {service.icon}
                        </div>
                        <h2 className="text-2xl font-bold">{service.title}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">
                      {service.description}
                    </h3>

                    <Separator />

                    <div>
                      <h4 className="text-lg font-medium mb-4">
                        Dabei kann Alpha Cooling® unterstützen:
                      </h4>

                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-1 text-yellow-500">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Link href="/termin-buchen" passHref>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                          Termin vereinbaren
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

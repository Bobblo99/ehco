import { Activity, Clock, ThermometerSnowflake, Brain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const services: ServiceProps[] = [
  {
    id: "acute",
    title: "Akute Schmerztherapie",
    description:
      "Schnelle und effektive Schmerzlinderung durch innovative Kältetechnologie bei akuten Beschwerden.",
    features: [
      "Sofortige Schmerzreduktion innerhalb von 2 Minuten",
      "Gezielte Behandlung von Entzündungen",
      "Ideal bei Sportverletzungen und Unfällen",
      "Schwellungsreduktion durch kontrollierte Kühlung",
      "Minimierung der Heilungszeit",
    ],
    icon: <ThermometerSnowflake className="h-8 w-8" />,
    image:
      "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "chronic",
    title: "Chronische Schmerzbehandlung",
    description:
      "Nachhaltige Therapie für chronische Schmerzzustände durch systematische Kältebehandlung.",
    features: [
      "Langfristige Schmerzreduktion",
      "Behandlung von Arthrose und Rheuma",
      "Verbesserung der Lebensqualität",
      "Reduzierung von Medikamenten",
      "Individueller Therapieplan",
    ],
    icon: <Clock className="h-8 w-8" />,
    image:
      "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "sports",
    title: "Sporttherapie",
    description:
      "Professionelle Kältetherapie für Athleten zur Leistungssteigerung und schnellen Regeneration.",
    features: [
      "Beschleunigte Regeneration nach dem Training",
      "Prävention von Sportverletzungen",
      "Verbesserung der Muskelregeneration",
      "Optimierung der Leistungsfähigkeit",
      "Schnelle Behandlung von Sportverletzungen",
    ],
    icon: <Activity className="h-8 w-8" />,
    image:
      "https://images.pexels.com/photos/4162584/pexels-photo-4162584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "neurological",
    title: "Neurologische Therapie",
    description:
      "Spezialisierte Kältetherapie für neurologische Beschwerden und Nervenschmerzen.",
    features: [
      "Behandlung von Migräne und Kopfschmerzen",
      "Therapie bei Nervenschmerzen",
      "Linderung von MS-Symptomen",
      "Unterstützung bei Fibromyalgie",
      "Verbesserung der Nervenfunktion",
    ],
    icon: <Brain className="h-8 w-8" />,
    image:
      "https://images.pexels.com/photos/4226766/pexels-photo-4226766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Unsere Therapieangebote</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie unsere innovativen Kältetherapie-Behandlungen für
            verschiedene Schmerzarten. Von akuten Verletzungen bis zu
            chronischen Beschwerden - wir haben die passende Lösung für Sie.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service) => (
            <section key={service.id} id={service.id} className="scroll-mt-24">
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
                      Das bieten wir:
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
  );
}

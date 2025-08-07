import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { ServiceCard } from "@/components/service-card";
import { WhyChooseUs } from "@/components/why-choose-us";
import ProSiebenLogo from "@/public/prosieben.webp";
import Sat1Logo from "@/public/sat1.webp";
import ArdMediaLogo from "@/public/ardmedia.webp";
import ZdfLogo from "@/public/zdf.webp";
import GalileoLogo from "@/public/galileo.webp";
import RtlLogo from "@/public/rtl.webp";
import Image from "next/image";
import {
  Brain,
  CalendarCheck,
  Gift,
  Hand,
  HandCoins,
  HeartPulse,
  Smile,
  SmilePlus,
  Snowflake,
  Users,
} from "lucide-react";

export const metadata = {
  title:
    "EHCO – Kältetherapie & Schmerzbehandlung in Hardthausen am Kocher | Alpha Cooling®",
  description:
    "Moderne Kältetherapie im Landkreis Heilbronn. EHCO hilft Ihnen mit Alpha Cooling® effektiv bei akuten und chronischen Schmerzen – natürlich & medikamentenfrei.",
  robots: "index, follow",
  icons: {
    icon: "/icon/ehco-logo.ico",
  },
  openGraph: {
    title: "EHCO – Schmerztherapie in Heilbronn",
    description:
      "Innovative Alpha Cooling® Kältetherapie bei Schmerzen. Jetzt kostenlos beraten lassen in Heilbronn – für mehr Lebensqualität ganz ohne Medikamente.",
    url: "https://eh-co.com",
    type: "website",
    images: [
      {
        url: "/ehco-logo.svg",
        width: 1200,
        height: 630,
        alt: "EHCO – Schmerztherapie",
      },
    ],
  },
  metadataBase: new URL("https://eh-co.com"),
};

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <HeroSection />

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Wofür Alpha Cooling® geeignet ist
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Die Kältetherapie kann in verschiedenen Bereichen helfen – von
                akuten Beschwerden über chronische Schmerzen bis hin zur
                Regeneration nach dem Sport.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="Akute Beschwerden"
                description="Zielgerichtete Kühlung zur schnellen Linderung von Schmerzen bei akuten Reizungen oder Überlastung."
                icon="Zap"
                href="/leistungen#acute"
              />
              <ServiceCard
                title="Chronische Schmerzfelder"
                description="Langfristige Unterstützung bei chronischen Beschwerden wie Rheuma, Migräne oder Entzündungen."
                icon="Clock"
                href="/leistungen#chronic"
              />
              <ServiceCard
                title="Sport & Regeneration"
                description="Optimale Regeneration nach Belastung – unterstützt Heilung und beugt Übertraining vor."
                icon="Activity"
                href="/leistungen#sports"
              />
            </div>

            <div className="text-center mt-12">
              <Link href="/leistungen" passHref>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  Mehr zur Anwendung
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <MediaSection />

        <InfoSection />

        <BenefitSection />
        <ProcessSection />
        <BookingInfoBox />
        <WhyChooseUs />

        <section className="py-16 bg-yellow-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-black">
              Der erste Schritt zu mehr Wohlbefinden
            </h2>
            <p className="text-black/80 max-w-2xl mx-auto mb-8">
              Vereinbaren Sie jetzt einen Termin und erfahren Sie, wie gezielte
              Kühlung Ihre Lebensqualität positiv beeinflussen kann.
            </p>
            <Link href="/termin-buchen" passHref>
              <Button className="bg-black text-white hover:bg-gray-800">
                Termin vereinbaren
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
function MediaSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Bekannt aus Medien
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8">
          <Image
            src={ProSiebenLogo}
            alt="Logo des TV-Senders ProSieben"
            width={100}
            height={40}
          />
          <Image
            src={Sat1Logo}
            alt="Logo des TV-Senders Sat.1"
            width={100}
            height={40}
          />
          <Image
            src={ArdMediaLogo}
            alt="Logo der ARD Media GmbH"
            width={100}
            height={40}
          />
          <Image
            src={ZdfLogo}
            alt="Logo des Zweiten Deutschen Fernsehens (ZDF)"
            width={100}
            height={40}
          />
          <Image
            src={GalileoLogo}
            alt="Logo der Wissenssendung Galileo (ProSieben)"
            width={100}
            height={40}
          />
          <Image
            src={RtlLogo}
            alt="Logo des privaten Fernsehsenders RTL"
            width={100}
            height={40}
          />
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Mit Alpha Cooling® gezielt zur Ruhe finden
        </h2>
        <p className="text-gray-700 text-lg mb-4">
          Alpha Cooling® steht für eine neuartige Methode zur Förderung von
          Regeneration, Leistungsfähigkeit und mentaler Balance. Während der
          Anwendung werden die Hände in eine abgeschlossene Kammer gelegt, in
          der eine konstante Temperatur von etwa 4 °C herrscht. Durch diesen
          gezielten Kältereiz wird die Körperkerntemperatur leicht gesenkt – was
          eine natürliche Reaktion im Organismus auslöst.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Diese körpereigene Reaktion aktiviert unter anderem die Ausschüttung
          von Endorphinen sowie weiteren schmerzlindernden Botenstoffen. Dadurch
          können Symptome bei Migräne, rheumatischen Erkrankungen, chronischen
          Entzündungen oder allgemeiner Erschöpfung spürbar gelindert werden.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Erste wissenschaftliche Erkenntnisse zeigen, dass gezielte
          Kälteanwendungen helfen können, Stress zu reduzieren und das
          allgemeine Wohlbefinden zu verbessern. Alpha Cooling® eröffnet somit
          neue Perspektiven für eine natürliche und effektive
          Gesundheitsförderung.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Eine Anwendung dauert nur wenige Minuten und erfordert keinerlei
          Umkleiden – anders als klassische Kältekammern. Das macht sie
          besonders komfortabel, zeitsparend und leicht in den Alltag
          integrierbar.
        </p>
        <p className="text-gray-700 text-lg">
          Entdecken Sie mit Alpha Cooling® eine moderne, einfach anwendbare
          Lösung zur Unterstützung Ihrer Gesundheit – unkompliziert,
          wirkungsvoll und ganz ohne Nebenwirkungen.
        </p>
      </div>
    </section>
  );
}

function BenefitSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ganzheitliche Wirkung der Kälte
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-base">
          Alpha Cooling® unterstützt den gesamten Organismus – physisch wie
          mental. Erleben Sie, wie gezielte Kälte neue Energie und innere Ruhe
          spenden kann.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Card 1 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Mentale Entlastung
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Gezielte Kältereize können das Nervensystem beruhigen und helfen,
              Stress abzubauen – für mehr Gelassenheit und innere
              Ausgeglichenheit.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <HeartPulse className="w-8 h-8 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Körperliche Erholung
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Die lokale Anwendung von Kälte kann Entzündungen beeinflussen, die
              Regeneration fördern und körperliche Beschwerden spürbar lindern.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-4">
              <Smile className="w-8 h-8 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                Neue Lebensqualität
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Viele Anwender berichten von besserer Konzentration, mehr Energie
              und einem allgemeinen Wohlbefinden nach regelmäßiger Anwendung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      title: "1. Termin vereinbaren",
      icon: <CalendarCheck className="w-8 h-8 text-yellow-600" />,
      description:
        "Wähle bequem online oder telefonisch einen passenden Termin für deine erste Sitzung.",
    },
    {
      title: "2. Ankommen & Beratung",
      icon: <Hand className="w-8 h-8 text-blue-600" />,
      description:
        "Vor Ort erklären wir dir den Ablauf und klären offene Fragen – ganz ohne Hektik.",
    },
    {
      title: "3. Anwendung starten",
      icon: <Snowflake className="w-8 h-8 text-cyan-600" />,
      description:
        "Du legst deine Hände in das gekühlte System – entspannt, bekleidet und hygienisch.",
    },
    {
      title: "4. Wirkung spüren",
      icon: <SmilePlus className="w-8 h-8 text-green-600" />,
      description:
        "Viele spüren schon nach wenigen Minuten eine spürbare Erleichterung & Entspannung.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          So läuft deine erste Anwendung ab
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative"
            >
              <div className="bg-white rounded-full p-4 shadow-md z-10">
                {step.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 max-w-xs">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-[-50%] w-full h-px bg-gray-300 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingInfoBox() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Alles auf einen Blick: Termin, Preise & Ablauf
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Gift className="w-8 h-8 text-yellow-500" />
              <h3 className="text-lg font-semibold text-yellow-700">
                1. Termin kostenlos
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              Beim ersten Besuch erhältst du eine kostenlose Beratung inkl.
              Analyse (ca. 30 Minuten) sowie deine erste Anwendung –
              unverbindlich & kostenfrei.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <HandCoins className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Preise</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                ✅ Einzelsitzung: <strong>25 €</strong>
              </li>
              <li>
                ✅ 10er-Paket: <strong>210 €</strong>
              </li>
              <li>
                ✅ 20er-Paket: <strong>380 €</strong>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Für bestehende Kunden
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              Normale Sitzungen dauern ca. 30 Minuten und können flexibel
              gebucht werden – direkt vor Ort oder online.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <CalendarCheck className="w-8 h-8 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Termin vereinbaren
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              Du kannst jederzeit online oder telefonisch einen Termin
              vereinbaren. Wir bestätigen schnellstmöglich.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

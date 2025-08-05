import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { ServiceCard } from "@/components/service-card";
import { TestimonialSection } from "@/components/testimonial-section";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unsere Therapieangebote</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie die innovative Schmerztherapie durch professionelle
              Kühlung. Effektiv, schnell und nachhaltig.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Akute Schmerztherapie"
              description="Sofortige Schmerzlinderung durch gezielte Kühlung bei akuten Beschwerden."
              icon="Zap"
              href="/services#acute"
            />
            <ServiceCard
              title="Chronische Schmerzbehandlung"
              description="Langfristige Therapie für chronische Schmerzzustände mit nachhaltigem Effekt."
              icon="Clock"
              href="/services#chronic"
            />
            <ServiceCard
              title="Sporttherapie"
              description="Spezielle Kühlungstherapie für Sportverletzungen und Regeneration."
              icon="Activity"
              href="/services#sports"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/services" passHref>
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                Alle Therapieangebote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      {/* <TestimonialSection /> */}

      <section className="py-16 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Bereit für ein schmerzfreies Leben?
          </h2>
          <p className="text-black/80 max-w-2xl mx-auto mb-8">
            Vereinbaren Sie jetzt einen Termin und erleben Sie die innovative
            Schmerztherapie.
          </p>
          <Link href="/termin-buchen" passHref>
            <Button className="bg-black text-white hover:bg-gray-800">
              Termin vereinbaren
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

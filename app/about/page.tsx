import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Award, Clock, Users, ThumbsUp, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* <div className="container mx-auto px-4">
   
        <div className="relative rounded-xl overflow-hidden mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/236731/pexels-photo-236731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
              height: "100%",
              width: "100%",
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 py-20 px-6 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Über Alpha  
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Wir sind darauf spezialisiert, herausragende Kühllösungen für
              Unternehmen und Industrie bereitzustellen.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Unsere Geschichte</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Gegründet im Jahr 2005, begann Alpha   mit
                  einer einfachen Mission: Zuverlässige und energieeffiziente
                  Kühllösungen für Unternehmen bereitzustellen. Was als kleines
                  Team engagierter Techniker begann, hat sich zu einem führenden
                  Anbieter in der Region entwickelt.
                </p>
                <p>
                  Unser Engagement für Qualität und Kundenzufriedenheit ist der
                  Motor unseres Wachstums. Wir glauben, dass jedes Unternehmen
                  eine komfortable Umgebung mit zuverlässigen, effizienten und
                  umweltfreundlichen Kühlsystemen verdient.
                </p>
                <p>
                  Heute bedienen wir Kunden aus verschiedensten Branchen und
                  bringen unser Fachwissen und unsere Hingabe in jedes Projekt
                  ein.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/8850593/pexels-photo-8850593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                }}
              />
            </div>
          </div>
        </section>

        <section className="mb-16 py-16 px-6 bg-muted rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unsere Mission & Werte</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unsere Arbeit wird von einer klaren Mission und starken Werten
              geleitet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 mb-4">
                <ThumbsUp className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unsere Mission</h3>
              <p>
                Herausragende Kühllösungen zu liefern, die Komfort, Effizienz
                und Produktivität fördern und gleichzeitig die Umweltbelastung
                minimieren.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 mb-4">
                <Star className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unsere Vision</h3>
              <p>
                Der vertrauenswürdigste und innovativste Anbieter von
                Kühllösungen zu sein – bekannt für Exzellenz, Zuverlässigkeit
                und Nachhaltigkeit.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="text-yellow-500 mb-4">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unsere Werte</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Exzellenz in jeder Dienstleistung</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Integrität und Transparenz</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Innovation und stetige Verbesserung</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-yellow-500">•</div>
                  <span>Verantwortung für die Umwelt</span>
                </li>
              </ul>
            </div>
          </div>
        </section> */}

      {/* Unser Team
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unser Führungsteam</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lerne die erfahrenen Fachkräfte kennen, die unser Unternehmen zum
              Erfolg führen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Richards",
                position: "CEO & Gründer",
                bio: "Mit über 20 Jahren Erfahrung in der Kühltechnik führt Michael unser Unternehmen mit Weitblick und Fachwissen.",
                image:
                  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "Sarah Johnson",
                position: "Technische Direktorin",
                bio: "Sarah leitet alle technischen Abläufe und sorgt dafür, dass unsere Dienstleistungen höchsten Qualitätsstandards entsprechen.",
                image:
                  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                name: "David Chen",
                position: "Leiter Kundenservice",
                bio: "David engagiert sich dafür, außergewöhnliche Kundenerlebnisse zu schaffen und langfristige Beziehungen aufzubauen.",
                image:
                  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
            ].map((person, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-t-lg h-64">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${person.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                </div>
                <div className="bg-card p-6 rounded-b-lg shadow-sm">
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-yellow-500 mb-3">{person.position}</p>
                  <p className="text-muted-foreground">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

      {/* Statistiken
        <section className="mb-16 py-12 px-6 bg-yellow-500 rounded-xl text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-black/80 font-medium">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-black/80 font-medium">
                Abgeschlossene Projekte
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-black/80 font-medium">Teammitglieder</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-black/80 font-medium">
                Kundenzufriedenheit
              </div>
            </div>
          </div>
        </section> */}

      {/* CTA */}
      {/* <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Bereit, mit uns zu arbeiten?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Kontaktiere uns noch heute, um über deine Kühlbedürfnisse zu
            sprechen oder ein Beratungsgespräch zu vereinbaren.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" passHref>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Kontaktiere uns
              </Button>
            </Link>
            <Link href="/booking" passHref>
              <Button variant="outline">Beratung buchen</Button>
            </Link>
          </div>
        </section> */}
    </div>
  );
}

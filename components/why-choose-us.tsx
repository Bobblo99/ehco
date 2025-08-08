import { ThermometerSnowflake, Clock, Award, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass?: string;
}

function FeatureCard({
  icon,
  title,
  description,
  colorClass,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4",
          colorClass || "bg-yellow-100 text-yellow-600"
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-16  bg-gray-50">
      <div className="text-center mb-12">
        <Image
          src="/ehco-logo.svg"
          alt="EHCO Logo"
          width={20}
          height={20}
          className="mx-auto mb-4 w-16 drop-shadow-lg "
        />
        <h2 className="text-3xl font-bold mb-4">
          Warum Alpha Cooling® Kältetherapie?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mit innovativer Kühltechnologie möchten wir Menschen helfen,
          Beschwerden gezielt zu lindern und die Regeneration zu fördern.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<ThermometerSnowflake className="h-8 w-8" />}
            title="Sofortiger Effekt"
            description="Spürbare Schmerzlinderung innerhalb von 2 Minuten durch gezielte Kühlung."
            colorClass="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-500"
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8" />}
            title="Nachhaltige Wirkung"
            description="Langanhaltende Schmerzreduktion durch innovative Kältetechnologie."
            colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-500"
          />
          <FeatureCard
            icon={<Award className="h-8 w-8" />}
            title="Wissenschaftlich belegt"
            description="Klinisch getestete Methode mit nachgewiesener Wirksamkeit."
            colorClass="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-500"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Vielseitig einsetzbar"
            description="Geeignet für akute und chronische Schmerzzustände aller Art."
            colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-500"
          />
        </div>
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-center text-gray-600 mb-4">
            Weitere Vorteile auf einen Blick
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
            <span className="px-3 py-1 bg-gray-100 rounded-full shadow-sm">
              Modernste Technologie
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full shadow-sm">
              Effiziente Regeneration
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full shadow-sm">
              Schnelle Anwendung
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full shadow-sm">
              Kosteneffizient
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full shadow-sm">
              Hygienisch und sicher
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full shadow-sm">
              Made in Germany
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

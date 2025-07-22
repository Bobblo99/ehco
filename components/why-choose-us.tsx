import { ThermometerSnowflake, Clock, Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass?: string;
}

function FeatureCard({ icon, title, description, colorClass }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center mb-4",
        colorClass || "bg-yellow-100 text-yellow-600"
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Warum ACP Schmerztherapie?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unsere innovative Kühlungstherapie bietet schnelle und effektive Schmerzlinderung mit nachgewiesener Wirkung.
          </p>
        </div>
        
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
      </div>
    </section>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Settings,
  PenTool as Tool,
  Wrench,
  BarChart,
  Clock,
  Users,
  Zap,
  Activity,
} from "lucide-react";

type IconName =
  | "Settings"
  | "Tool"
  | "Wrench"
  | "BarChart"
  | "Clock"
  | "Users"
  | "Zap"
  | "Activity";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconName;
  href: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  href,
}: ServiceCardProps) {
  const IconComponent = {
    Settings: Settings,
    Tool: Tool,
    Wrench: Wrench,
    BarChart: BarChart,
    Clock: Clock,
    Users: Users,
    Zap: Zap,
    Activity: Activity,
  }[icon];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:border-yellow-500 overflow-hidden group">
      <CardHeader className="relative p-6">
        <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-yellow-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="text-yellow-500 mb-2">
          <IconComponent className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={href} passHref>
          <Button
            variant="ghost"
            className="text-yellow-500 hover:text-yellow-600 p-0 hover:bg-transparent"
          >
            Erfahren Sie mehr <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

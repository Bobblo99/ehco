"use client";

import { useState } from "react";
import { X, Wrench, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MaintenanceBannerProps {
  type?: "warning" | "info" | "maintenance";
  dismissible?: boolean;
  className?: string;
}

export function MaintenanceBanner({
  type = "maintenance",
  dismissible = true,
  className,
}: MaintenanceBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const config = {
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-500",
      textColor: "text-black",
      title: "⚠️ Wartungsarbeiten",
      message:
        "Diese Seite befindet sich noch in der Entwicklung. Einige Funktionen sind möglicherweise noch nicht vollständig verfügbar.",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-500",
      textColor: "text-white",
      title: "ℹ️ Beta-Version",
      message:
        "Sie nutzen eine Vorabversion unserer Plattform. Feedback ist willkommen!",
    },
    maintenance: {
      icon: Wrench,
      bgColor: "bg-orange-500",
      textColor: "text-white",
      title: "🔧 System in Entwicklung",
      message:
        "Alpha Cooling Professional wird gerade optimiert. Terminbuchungen sind verfügbar, aber einige Features befinden sich noch im Aufbau.",
    },
  };

  const currentConfig = config[type];
  const IconComponent = currentConfig.icon;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 w-full py-3 px-4 shadow-lg border-t",
        currentConfig.bgColor,
        currentConfig.textColor,
        "animate-in slide-in-from-bottom-2 duration-500",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <IconComponent className="h-5 w-5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-sm md:text-base">
              {currentConfig.title}
            </div>
            <div className="text-xs md:text-sm opacity-90 mt-1">
              {currentConfig.message}
            </div>
          </div>
        </div>

        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className={cn(
              "flex-shrink-0 hover:bg-black/10 p-1 h-auto",
              currentConfig.textColor
            )}
            aria-label="Banner schließen"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Animierter Fortschrittsbalken */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black/20 overflow-hidden">
        <div className="h-full bg-white/30 animate-pulse"></div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div
          className={cn(
            "transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Die neue Art der{" "}
            <span className="text-yellow-500">Schmerztherapie</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            ALPHA COOLING PROFESSIONAL senkt die Körperkerntemperatur innerhalb
            von 2 Minuten. Effektive Schmerzbehandlung mit Soforteffekt bei
            chronischen und akuten Schmerzen.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/booking" passHref>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-6 py-6 h-auto">
                Jetzt Termin vereinbaren
              </Button>
            </Link>
            <Link href="/services" passHref>
              <Button
                variant="outline"
                className=" hover:bg-white/10 text-lg px-6 py-6 h-auto hover:text-white"
              >
                Therapieangebote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

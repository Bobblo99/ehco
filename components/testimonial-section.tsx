"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "EHCO hat unsere Büroatmosphäre komplett verändert. Ihre Kühlungslösungen sind energieeffizient und äußerst effektiv.",
    author: "Sarah Johnson",
    title: "Büroleiterin, TechCorp",
  },
  {
    id: 2,
    quote:
      "Wir nutzen die Wartungsdienste von ACP für unsere industriellen Kühlsysteme seit über 5 Jahren. Ihr Team ist professionell, pünktlich und gründlich.",
    author: "Michael Chen",
    title: "Leiter Betrieb, Manufacturing Inc.",
  },
  {
    id: 3,
    quote:
      "Als unser Kühlsystem während einer Hitzewelle ausfiel, reagierte ACP sofort. Sie haben das Problem schnell behoben und einen Geschäftsausfall verhindert.",
    author: "Jessica Miller",
    title: "Restaurantbesitzerin, Cuisine Delight",
  },
];

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Was unsere Kunden sagen</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vertrauen Sie nicht nur auf unser Wort. Hier sind einige Meinungen
            unserer Kunden zu unseren Kühlungslösungen.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-8 md:p-12 relative">
              <Quote className="absolute top-6 left-6 h-12 w-12 text-yellow-200 dark:text-yellow-900/20 opacity-40" />

              <div className="relative z-10">
                <div
                  className={cn(
                    "transition-all duration-500",
                    isAnimating
                      ? "opacity-0 transform -translate-y-4"
                      : "opacity-100 transform translate-y-0"
                  )}
                >
                  <p className="text-xl md:text-2xl mb-6 italic">
                    "{testimonials[activeIndex].quote}"
                  </p>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                    <p className="font-semibold text-lg">
                      {testimonials[activeIndex].author}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonials[activeIndex].title}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setActiveIndex(index);
                    setIsAnimating(false);
                  }, 500);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "bg-yellow-500 w-6"
                    : "bg-gray-300 dark:bg-gray-700"
                )}
                aria-label={`Zeige Kundenmeinung ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

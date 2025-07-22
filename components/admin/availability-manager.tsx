"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getAvailability,
  setAvailability,
  setBulkAvailability,
  clearAllAvailability,
} from "@/lib/db/database";

const weekDays = [
  { id: 1, name: "Montag", short: "Mo" },
  { id: 2, name: "Dienstag", short: "Di" },
  { id: 3, name: "Mittwoch", short: "Mi" },
  { id: 4, name: "Donnerstag", short: "Do" },
  { id: 5, name: "Freitag", short: "Fr" },
  { id: 6, name: "Samstag", short: "Sa" },
];

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export function AvailabilityManager() {
  const [availability, setAvailabilityMap] = useState<Record<string, boolean>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    setIsLoading(true);
    try {
      const data = await getAvailability();
      const availabilityMap: Record<string, boolean> = {};

      data.forEach((item) => {
        const key = `${item.day_of_week}-${item.time_slot}`;
        availabilityMap[key] = item.is_available;
      });

      setAvailabilityMap(availabilityMap);
    } catch (error) {
      console.error("Fehler beim Laden der Verfügbarkeit:", error);
      toast({
        title: "Fehler",
        description: "Verfügbarkeit konnte nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAvailability = async (day: number, time: string) => {
    const key = `${day}-${time}`;
    const newValue = !availability[key];

    // Optimistisches Update
    setAvailabilityMap((prev) => ({
      ...prev,
      [key]: newValue,
    }));

    try {
      await setAvailability(day, time, newValue);
      toast({
        title: "Gespeichert",
        description: `Verfügbarkeit für ${
          weekDays.find((d) => d.id === day)?.name
        } ${time} wurde aktualisiert.`,
      });
    } catch (error) {
      // Rollback bei Fehler
      setAvailabilityMap((prev) => ({
        ...prev,
        [key]: !newValue,
      }));

      console.error("Fehler beim Speichern der Verfügbarkeit:", error);
      toast({
        title: "Fehler",
        description: "Verfügbarkeit konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  const isAvailable = (day: number, time: string) => {
    const key = `${day}-${time}`;
    return availability[key] || false;
  };

  const setStandardHours = async () => {
    setIsSaving(true);
    try {
      const standardSlots: Array<{
        dayOfWeek: number;
        timeSlot: string;
        isAvailable: boolean;
      }> = [];

      // Dann Standardzeiten auf true setzen
      weekDays.forEach((day) => {
        if (day.id <= 5) {
          // Montag bis Freitag
          [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
          ].forEach((time) => {
            standardSlots.push({
              dayOfWeek: day.id,
              timeSlot: time,
              isAvailable: true,
            });
          });
        }
      });

      await setBulkAvailability(standardSlots);
      await loadAvailability();

      toast({
        title: "Gespeichert",
        description: "Standardarbeitszeiten wurden gesetzt.",
      });
    } catch (error) {
      console.error("Fehler beim Setzen der Standardzeiten:", error);
      toast({
        title: "Fehler",
        description: "Standardzeiten konnten nicht gesetzt werden.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const setAllAvailable = async () => {
    setIsSaving(true);
    try {
      const allSlots: Array<{
        dayOfWeek: number;
        timeSlot: string;
        isAvailable: boolean;
      }> = [];

      weekDays.forEach((day) => {
        timeSlots.forEach((time) => {
          allSlots.push({
            dayOfWeek: day.id,
            timeSlot: time,
            isAvailable: true,
          });
        });
      });

      await setBulkAvailability(allSlots);
      await loadAvailability();

      toast({
        title: "Gespeichert",
        description: "Alle Zeitslots wurden freigegeben.",
      });
    } catch (error) {
      console.error("Fehler beim Freigeben aller Slots:", error);
      toast({
        title: "Fehler",
        description: "Zeitslots konnten nicht freigegeben werden.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const clearAll = async () => {
    setIsSaving(true);
    try {
      await clearAllAvailability();
      await loadAvailability();

      toast({
        title: "Gespeichert",
        description: "Alle Zeitslots wurden blockiert.",
      });
    } catch (error) {
      console.error("Fehler beim Blockieren aller Slots:", error);
      toast({
        title: "Fehler",
        description: "Zeitslots konnten nicht blockiert werden.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Verfügbarkeitskalender */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Wochenverfügbarkeit
          </CardTitle>
          <CardDescription>
            Klicken Sie auf die Zeitslots, um die Verfügbarkeit zu ändern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header mit Wochentagen */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div
                    key={day.id}
                    className="p-3 text-center font-medium bg-muted rounded-lg"
                  >
                    <div className="font-semibold">{day.short}</div>
                    <div className="text-xs text-muted-foreground">
                      {day.name}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              {/* Zeitslots */}
              <div className="space-y-2">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="grid grid-cols-8 gap-2 items-center"
                  >
                    <div className="p-2 text-sm font-medium flex items-center justify-center bg-muted rounded">
                      <Clock className="h-4 w-4 mr-1" />
                      {time}
                    </div>
                    {weekDays.map((day) => (
                      <div key={`${day.id}-${time}`} className="p-1">
                        <Button
                          variant={
                            isAvailable(day.id, time) ? "default" : "outline"
                          }
                          size="sm"
                          className={`w-full h-8 text-xs transition-all ${
                            isAvailable(day.id, time)
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => toggleAvailability(day.id, time)}
                          disabled={isSaving}
                        >
                          {isAvailable(day.id, time) ? "Frei" : "Belegt"}
                        </Button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Verfügbar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-gray-300 rounded"></div>
                <span className="text-sm">Nicht verfügbar</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schnellaktionen */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Schnellaktionen
          </CardTitle>
          <CardDescription>
            Häufig verwendete Verfügbarkeitseinstellungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={setStandardHours}
              disabled={isSaving}
            >
              <span className="font-medium">Standardarbeitszeiten</span>
              <span className="text-xs text-muted-foreground">
                Mo-Fr 9:00-17:00
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={setAllAvailable}
              disabled={isSaving}
            >
              <span className="font-medium">Alle freigeben</span>
              <span className="text-xs text-muted-foreground">
                Alle Slots verfügbar
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={clearAll}
              disabled={isSaving}
            >
              <span className="font-medium">Alle blockieren</span>
              <span className="text-xs text-muted-foreground">
                Alle Slots belegt
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Öffnungszeiten Info */}
      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Öffnungszeiten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Reguläre Zeiten</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Montag - Freitag:</span>
                  <span>08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag:</span>
                  <span>09:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag:</span>
                  <span>Geschlossen</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Mittagspause</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Täglich:</span>
                  <span>12:30 - 14:00</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

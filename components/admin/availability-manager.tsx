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
import {
  Clock,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Save,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getAvailability,
  setBulkAvailability,
  getAppointments,
  getWeeklyAvailability,
  setWeeklyAvailability,
} from "@/lib/db/database";
import { format, addWeeks, startOfWeek, addDays } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";

const weekDays = [
  { id: 1, name: "Montag", short: "Mo" },
  { id: 2, name: "Dienstag", short: "Di" },
  { id: 3, name: "Mittwoch", short: "Mi" },
  { id: 4, name: "Donnerstag", short: "Do" },
  { id: 5, name: "Freitag", short: "Fr" },
  { id: 6, name: "Samstag", short: "Sa" },
  { id: 0, name: "Sonntag", short: "So" },
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
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [originalAvailability, setOriginalAvailability] = useState<
    Record<string, boolean>
  >({});
  const [localAvailability, setLocalAvailability] = useState<
    Record<string, boolean>
  >({});
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  // Aktuelle Woche berechnen
  const currentWeekStart = startOfWeek(
    addWeeks(new Date(), currentWeekOffset),
    { weekStartsOn: 1 }
  );
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  useEffect(() => {
    loadAvailability();
  }, [currentWeekOffset]);

  useEffect(() => {
    const hasLocalChanges =
      JSON.stringify(originalAvailability) !==
      JSON.stringify(localAvailability);
    setHasChanges(hasLocalChanges);
  }, [originalAvailability, localAvailability]);

  const loadAvailability = async () => {
    setIsLoading(true);
    try {
      // Wochenspezifische Verfügbarkeiten aus neuer Tabelle laden
      const availabilityMap = await getWeeklyAvailability(currentWeekStart);

      // Termine für diese Woche laden
      const weekAppointments = await getAppointments("all");
      const weekStart = format(currentWeekStart, "yyyy-MM-dd");
      const weekEnd = format(addDays(currentWeekStart, 6), "yyyy-MM-dd");

      const filteredAppointments = weekAppointments.filter(
        (apt) =>
          apt.date >= weekStart &&
          apt.date <= weekEnd &&
          apt.status !== "cancelled"
      );

      setAppointments(filteredAppointments);

      setOriginalAvailability(availabilityMap);
      setLocalAvailability(availabilityMap);
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

  const toggleAvailability = (day: number, time: string) => {
    const key = `${day}-${time}`;
    const newValue = !localAvailability[key];

    setLocalAvailability((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const isAvailable = (day: number, time: string) => {
    const key = `${day}-${time}`;

    // Prüfen ob Termin gebucht ist
    const dayDate = weekDates.find((d) => d.getDay() === day);
    if (dayDate) {
      const dateString = format(dayDate, "yyyy-MM-dd");
      const isBooked = appointments.some(
        (apt) => apt.date === dateString && apt.time_slot === time
      );
      if (isBooked) return false; // Gebuchte Slots sind nicht verfügbar
    }

    return localAvailability[key] || false;
  };

  const getSlotInfo = (day: number, time: string) => {
    const dayDate = weekDates.find((d) => d.getDay() === day);
    if (dayDate) {
      const dateString = format(dayDate, "yyyy-MM-dd");
      const appointment = appointments.find(
        (apt) => apt.date === dateString && apt.time_slot === time
      );
      if (appointment) {
        return { isBooked: true, patientName: appointment.patient_name };
      }
    }
    return { isBooked: false, patientName: null };
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const allSlots: Array<{
        dayOfWeek: number;
        timeSlot: string;
        isAvailable: boolean;
      }> = [];

      Object.entries(localAvailability).forEach(([key, isAvailable]) => {
        const [dayOfWeek, timeSlot] = key.split("-");
        allSlots.push({
          dayOfWeek: parseInt(dayOfWeek),
          timeSlot,
          isAvailable,
        });
      });

      // In weekly_availability Tabelle speichern
      await setWeeklyAvailability(currentWeekStart, allSlots);
      setOriginalAvailability(localAvailability);

      toast({
        title: "Gespeichert",
        description: `Verfügbarkeiten für KW ${format(currentWeekStart, "I", {
          locale: de,
        })} gespeichert.`,
      });
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      toast({
        title: "Fehler",
        description: "Änderungen konnten nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetChanges = () => {
    setLocalAvailability(originalAvailability);
    toast({
      title: "Zurückgesetzt",
      description: "Alle Änderungen wurden verworfen.",
    });
  };

  const setStandardHours = () => {
    const newAvailability = { ...localAvailability };

    weekDays.forEach((day) => {
      if (day.id !== 0) {
        timeSlots.forEach((time) => {
          const key = `${day.id}-${time}`;
          delete newAvailability[key];
        });
      }
    });

    weekDays.forEach((day) => {
      if (day.id >= 1 && day.id <= 5) {
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
          const key = `${day.id}-${time}`;
          newAvailability[key] = true;
        });
      }
    });

    setLocalAvailability(newAvailability);
    toast({
      title: "Standardzeiten gesetzt",
      description: "Mo-Fr 9:00-17:00 (ohne Mittagspause 12:30-14:00)",
    });
  };

  const setAllAvailable = () => {
    const newAvailability: Record<string, boolean> = {};

    weekDays.forEach((day) => {
      if (day.id !== 0) {
        timeSlots.forEach((time) => {
          const key = `${day.id}-${time}`;
          newAvailability[key] = true;
        });
      }
    });

    setLocalAvailability(newAvailability);
    toast({
      title: "Alle Zeiten freigegeben",
      description: "Alle Zeitslots (außer Sonntag) sind jetzt verfügbar.",
    });
  };

  const clearAll = () => {
    setLocalAvailability({});
    toast({
      title: "Alle Zeiten blockiert",
      description: "Alle Zeitslots wurden blockiert.",
    });
  };

  const nextWeek = () => {
    setCurrentWeekOffset((prev) => prev + 1);
  };

  const prevWeek = () => {
    setCurrentWeekOffset((prev) => prev - 1);
  };

  const goToCurrentWeek = () => {
    setCurrentWeekOffset(0);
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
      {/* Änderungen-Banner */}
      {hasChanges && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-sm md:text-base">
                  Sie haben ungespeicherte Änderungen
                </span>
              </div>
              <div className="flex gap-1 md:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetChanges}
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-100 text-xs md:text-sm px-2 md:px-3"
                >
                  <RotateCcw className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  <span className="hidden sm:inline">Verwerfen</span>
                </Button>
                <Button
                  size="sm"
                  onClick={saveChanges}
                  disabled={isSaving}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs md:text-sm px-2 md:px-3"
                >
                  <Save className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {isSaving ? "Speichern..." : "Speichern"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wochennavigation */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Wochenverfügbarkeit
              </CardTitle>
              <CardDescription className="text-sm">
                Verfügbare Zeitslots für die gesamte Woche verwalten
              </CardDescription>
            </div>
            <div className="flex items-center gap-1 md:gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={prevWeek}
                className="px-2 md:px-3"
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <div className="flex-1 md:min-w-[200px] text-center px-2">
                <div className="font-semibold text-sm md:text-base">
                  {format(currentWeekStart, "dd.MM.yyyy", { locale: de })} -{" "}
                  {format(addDays(currentWeekStart, 6), "dd.MM.yyyy", {
                    locale: de,
                  })}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  KW {format(currentWeekStart, "I", { locale: de })} •{" "}
                  {format(currentWeekStart, "yyyy", { locale: de })}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={nextWeek}
                className="px-2 md:px-3"
              >
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={goToCurrentWeek}
                className="text-xs md:text-sm px-2 md:px-3"
              >
                <span className="hidden sm:inline">Heute</span>
                <span className="sm:hidden">•</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Wochenübersicht */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px] md:min-w-[800px]">
              {/* Header mit Wochentagen */}
              <div className="grid grid-cols-8 gap-1 md:gap-2 mb-4">
                <div className="text-xs md:text-sm font-medium text-muted-foreground p-1 md:p-2">
                  Zeit
                </div>
                {weekDays.map((day, index) => {
                  const dayDate = weekDates[index];
                  const availableCount =
                    day.id === 0
                      ? 0
                      : timeSlots.filter((time) => isAvailable(day.id, time))
                          .length;

                  return (
                    <div key={day.id} className="text-center p-1 md:p-2">
                      <div className={`font-medium text-xs md:text-sm`}>
                        {day.short}
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {format(dayDate, "dd.MM", { locale: de })}
                      </div>
                      <Badge
                        variant={"secondary"}
                        className="text-xs mt-1 px-1"
                      >
                        {availableCount}/{timeSlots.length}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              {/* Zeitslots Grid */}
              <div className="space-y-1 md:space-y-2">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 gap-1 md:gap-2">
                    <div className="flex items-center justify-center p-1 md:p-2 text-xs md:text-sm font-medium bg-muted rounded">
                      <Clock className="h-3 w-3 mr-1 hidden sm:inline" />
                      <span className="text-xs md:text-sm">{time}</span>
                    </div>
                    {weekDays.map((day) => {
                      const slotInfo = getSlotInfo(day.id, time);
                      const available = isAvailable(day.id, time);

                      if (slotInfo.isBooked) {
                        return (
                          <div
                            key={`${day.id}-${time}`}
                            className="flex justify-center"
                          >
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-full h-8 md:h-10 text-xs md:text-sm bg-red-600 hover:bg-red-700 cursor-not-allowed"
                              disabled
                              title={`Gebucht: ${slotInfo.patientName}`}
                            >
                              {slotInfo.patientName?.split(" ")[0] || "Gebucht"}
                            </Button>
                          </div>
                        );
                      }

                      if (day.id === 0) {
                        return (
                          <div
                            key={`${day.id}-${time}`}
                            className="flex justify-center"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full h-8 md:h-10 text-xs md:text-sm bg-red-100 text-red-600 cursor-not-allowed"
                              disabled
                            >
                              —
                            </Button>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${day.id}-${time}`}
                          className="flex justify-center"
                        >
                          <Button
                            variant={available ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "w-full h-8 md:h-10 text-xs md:text-sm transition-all",
                              available
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "hover:bg-gray-600 bg-gray-400"
                            )}
                            onClick={() => toggleAvailability(day.id, time)}
                          >
                            {available ? "✓" : "—"}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legende */}
              <div className="flex items-center justify-center gap-3 md:gap-6 mt-4 md:mt-6 pt-4 border-t flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded"></div>
                  <span className="text-xs md:text-sm">Verfügbar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-400 rounded"></div>
                  <span className="text-xs md:text-sm">Nicht verfügbar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded"></div>
                  <span className="text-xs md:text-sm">Gebucht</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-red-100 border border-red-300 rounded"></div>
                  <span className="text-xs md:text-sm">
                    Sonntag (geschlossen)
                  </span>
                </div>
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
          <CardDescription className="text-sm">
            Häufig verwendete Verfügbarkeitseinstellungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <Button
              variant="outline"
              className="h-auto p-3 md:p-4 flex flex-col items-center gap-1 md:gap-2"
              onClick={setStandardHours}
            >
              <span className="font-medium text-sm md:text-base">
                Standardarbeitszeiten
              </span>
              <span className="text-xs text-muted-foreground text-center">
                Mo-Fr 9:00-17:00
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-3 md:p-4 flex flex-col items-center gap-1 md:gap-2"
              onClick={setAllAvailable}
            >
              <span className="font-medium text-sm md:text-base">
                Alle freigeben
              </span>
              <span className="text-xs text-muted-foreground text-center">
                Alle Slots verfügbar
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-3 md:p-4 flex flex-col items-center gap-1 md:gap-2"
              onClick={clearAll}
            >
              <span className="font-medium text-sm md:text-base">
                Alle blockieren
              </span>
              <span className="text-xs text-muted-foreground text-center">
                Alle Slots belegt
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { supabase } from "./supabase";
import { format, isToday, isFuture, startOfWeek } from "date-fns";
import { sendBookingNotification } from "../email-service";

export interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service_id: string;
  service_name: string;
  duration: number;
  price: number;
  date: string;
  time_slot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string | null;
  emergency_contact?: string | null;
  emergency_phone?: string | null;
  insurance_provider?: string | null;
  first_visit: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  description: string;
  price: number;
  category: "cooling" | "consultation";
}

export const services: Service[] = [
  {
    id: "consultation-free",
    name: "Erstberatung & Testanwendung",
    duration: 30,
    description:
      "Kostenloser Einstieg: Persönliche Beratung und erste Anwendung. Dauer: ca. 30 Minuten.",
    price: 0,
    category: "consultation",
  },
  {
    id: "cooling-single",
    name: "Kälteanwendung – Einzelsitzung",
    duration: 30,
    description: "30 Minuten gezielte Kältetherapie für bestehende Kunden.",
    price: 25,
    category: "cooling",
  },
];

// Termine abrufen
export async function getAppointments(
  filter: "all" | "today" | "upcoming" | "pending" = "all"
): Promise<Appointment[]> {
  let query = supabase
    .from("appointments")
    .select("*")
    .order("date", { ascending: true })
    .order("time_slot", { ascending: true });

  if (filter === "today") {
    const today = format(new Date(), "yyyy-MM-dd");
    query = query.eq("date", today);
  } else if (filter === "upcoming") {
    const today = format(new Date(), "yyyy-MM-dd");
    query = query.gte("date", today);
  } else if (filter === "pending") {
    query = query.eq("status", "pending");
  }

  const { data, error } = await query;

  if (error) {
    console.error("Fehler beim Laden der Termine:", error);
    throw new Error("Termine konnten nicht geladen werden");
  }

  return data || [];
}

// Neuen Termin erstellen
export async function createAppointment(
  appointmentData: Omit<Appointment, "id" | "created_at" | "updated_at">
): Promise<Appointment> {
  console.log("🔍 createAppointment aufgerufen mit:", appointmentData);

  // Prüfen ob der Zeitslot bereits belegt ist
  const { data: existingAppointment } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", appointmentData.date)
    .eq("time_slot", appointmentData.time_slot)
    .single();

  if (existingAppointment) {
    console.log("❌ Zeitslot bereits belegt:", existingAppointment);
    throw new Error("Dieser Zeitslot ist bereits belegt");
  }

  console.log("✅ Zeitslot ist frei, erstelle Termin...");

  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        ...appointmentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Fehler beim Erstellen des Termins:", error);
    throw new Error("Termin konnte nicht erstellt werden");
  }

  console.log("✅ Termin in DB erstellt:", data);

  // E-Mail-Benachrichtigung senden
  const service = getServiceById(appointmentData.service_id);
  if (service) {
    console.log("📧 Sende E-Mail-Benachrichtigung...");
    const emailData = {
      patientName: appointmentData.patient_name,
      patientEmail: appointmentData.patient_email,
      patientPhone: appointmentData.patient_phone,
      serviceName: service.name,
      duration: service.duration,
      price: service.price,
      date: format(new Date(appointmentData.date), "dd.MM.yyyy"),
      timeSlot: appointmentData.time_slot,
      insuranceProvider: appointmentData.insurance_provider ?? undefined,
      firstVisit: appointmentData.first_visit,
    };

    try {
      await sendBookingNotification(emailData);
      console.log("✅ E-Mail-Benachrichtigung gesendet");
    } catch (emailError) {
      console.error("⚠️ E-Mail-Versand fehlgeschlagen:", emailError);
      // Termin trotzdem erfolgreich, nur E-Mail fehlgeschlagen
    }
  }

  return data;
}

// Termin löschen
export async function deleteAppointment(id: string): Promise<void> {
  const { error } = await supabase.from("appointments").delete().eq("id", id);

  if (error) {
    console.error("Fehler beim Löschen des Termins:", error);
    throw new Error("Termin konnte nicht gelöscht werden");
  }
}

// Termin aktualisieren
export async function updateAppointment(
  id: string,
  updates: Partial<Appointment>
): Promise<Appointment> {
  const { data, error } = await supabase
    .from("appointments")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Fehler beim Aktualisieren des Termins:", error);
    throw new Error("Termin konnte nicht aktualisiert werden");
  }

  return data;
}

// Verfügbare Zeitslots für ein Datum abrufen
export async function getAvailableTimeSlots(
  date: Date
): Promise<Array<{ time: string; available: boolean }>> {
  const dateString = format(date, "yyyy-MM-dd");
  const dayOfWeek = date.getDay();

  console.log(
    "🔍 Lade verfügbare Zeitslots für:",
    dateString,
    "Wochentag:",
    dayOfWeek
  );

  // Alle gebuchten Termine für das Datum abrufen
  const { data: bookedAppointments } = await supabase
    .from("appointments")
    .select("time_slot")
    .eq("date", dateString)
    .in("status", ["pending", "confirmed", "completed"]);

  const bookedSlots = bookedAppointments?.map((apt) => apt.time_slot) || [];
  console.log("📅 Gebuchte Slots:", bookedSlots);

  // Wochenspezifische oder Standard-Verfügbarkeiten laden
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const availabilityMap = await getWeeklyAvailability(weekStart);
  console.log("⚙️ Verfügbarkeitseinstellungen:", availabilityMap);

  // Alle möglichen Zeitslots generieren
  const allSlots: Array<{ time: string; available: boolean }> = [];

  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Mittagspause überspringen (12:30-13:30)
      if (hour === 12 && minute === 30) continue;
      if (hour === 13 && minute === 0) continue;
      if (hour === 13 && minute === 30) continue;

      // Letzten Slot um 18:30 überspringen
      if (hour === 18 && minute === 30) continue;

      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      // Slot ist verfügbar wenn:
      // 1. NICHT gebucht UND
      // 2. In Verfügbarkeitseinstellungen als verfügbar markiert
      const isBooked = bookedSlots.includes(time);
      const isAvailableInSettings =
        availabilityMap[`${dayOfWeek}-${time}`] === true;
      const available = !isBooked && isAvailableInSettings;

      console.log(
        `⏰ ${time}: gebucht=${isBooked}, verfügbar_in_settings=${isAvailableInSettings}, final=${available}`
      );

      allSlots.push({ time, available });
    }
  }

  console.log(
    "✅ Generierte Slots:",
    allSlots.filter((s) => s.available).map((s) => s.time)
  );
  console.log(
    "❌ Nicht verfügbare Slots:",
    allSlots.filter((s) => !s.available).map((s) => s.time)
  );
  console.log(
    "🚫 Gebuchte Slots:",
    allSlots.filter((s) => bookedSlots.includes(s.time)).map((s) => s.time)
  );

  return allSlots;
}

// Admin-Statistiken abrufen
export async function getAdminStats() {
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(
    new Date(Date.now() - 24 * 60 * 60 * 1000),
    "yyyy-MM-dd"
  );

  // Heutige Termine
  const { data: todayAppointments } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", today);

  // Gestrige Termine
  const { data: yesterdayAppointments } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", yesterday);

  // Alle Termine
  const { data: allAppointments } = await supabase
    .from("appointments")
    .select("id");

  // Ausstehende Termine
  const { data: pendingAppointments } = await supabase
    .from("appointments")
    .select("id")
    .eq("status", "pending");

  // Monatlicher Umsatz (vereinfacht)
  const { data: monthlyAppointments } = await supabase
    .from("appointments")
    .select("price")
    .in("status", ["confirmed", "completed"]);

  const monthlyRevenue =
    monthlyAppointments?.reduce((sum, apt) => sum + apt.price, 0) || 0;

  return {
    todayAppointments: todayAppointments?.length || 0,
    yesterdayAppointments: yesterdayAppointments?.length || 0,
    totalAppointments: allAppointments?.length || 0,
    pendingAppointments: pendingAppointments?.length || 0,
    monthlyRevenue,
    revenueGrowth: 15.3, // Beispielwert
  };
}

// Service nach ID finden
export function getServiceById(serviceId: string): Service | undefined {
  return services.find((service) => service.id === serviceId);
}

// Services nach Kategorie gruppieren
export function getServicesByCategory() {
  const consultations = services.filter((s) => s.category === "consultation");
  const coolingTreatments = services.filter((s) => s.category === "cooling");

  return {
    consultations,
    coolingTreatments,
  };
}

// Verfügbarkeit verwalten
export async function getAvailability(): Promise<
  Array<{ day_of_week: number; time_slot: string; is_available: boolean }>
> {
  const { data, error } = await supabase
    .from("availability")
    .select("*")
    .order("day_of_week", { ascending: true })
    .order("time_slot", { ascending: true });

  if (error) {
    console.error("Fehler beim Laden der Verfügbarkeit:", error);
    throw new Error("Verfügbarkeit konnte nicht geladen werden");
  }

  return data || [];
}

// Verfügbarkeit für einen bestimmten Tag und Zeitslot setzen
export async function setAvailability(
  dayOfWeek: number,
  timeSlot: string,
  isAvailable: boolean
): Promise<void> {
  // Prüfen ob bereits ein Eintrag existiert
  const { data: existing } = await supabase
    .from("availability")
    .select("id")
    .eq("day_of_week", dayOfWeek)
    .eq("time_slot", timeSlot)
    .single();

  if (existing) {
    // Aktualisieren
    const { error } = await supabase
      .from("availability")
      .update({
        is_available: isAvailable,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) {
      console.error("Fehler beim Aktualisieren der Verfügbarkeit:", error);
      throw new Error("Verfügbarkeit konnte nicht aktualisiert werden");
    }
  } else {
    // Neu erstellen
    const { error } = await supabase.from("availability").insert([
      {
        day_of_week: dayOfWeek,
        time_slot: timeSlot,
        is_available: isAvailable,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Fehler beim Erstellen der Verfügbarkeit:", error);
      throw new Error("Verfügbarkeit konnte nicht erstellt werden");
    }
  }
}

// Mehrere Verfügbarkeiten auf einmal setzen
export async function setBulkAvailability(
  availabilityData: Array<{
    dayOfWeek: number;
    timeSlot: string;
    isAvailable: boolean;
  }>,
  weekStartDate?: Date
): Promise<void> {
  if (!weekStartDate) {
    // Fallback: Allgemeine Verfügbarkeiten in alter Tabelle speichern
    console.log(
      "🔄 Bulk-Update für allgemeine Verfügbarkeiten:",
      availabilityData.length,
      "Einträge"
    );

    try {
      // Erst alle bestehenden Einträge für die betroffenen Tage löschen
      const affectedDays = Array.from(
        new Set(availabilityData.map((item) => item.dayOfWeek))
      );

      for (let i = 0; i < affectedDays.length; i++) {
        const day = affectedDays[i];
        const { error: deleteError } = await supabase
          .from("availability")
          .delete()
          .eq("day_of_week", day);

        if (deleteError) {
          console.error(
            "Fehler beim Löschen bestehender Verfügbarkeiten:",
            deleteError
          );
        }
      }

      // Dann neue Einträge einfügen
      const insertData = availabilityData.map((item) => ({
        day_of_week: item.dayOfWeek,
        time_slot: item.timeSlot,
        is_available: item.isAvailable,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { error: insertError } = await supabase
        .from("availability")
        .insert(insertData);

      if (insertError) {
        console.error(
          "Fehler beim Einfügen neuer Verfügbarkeiten:",
          insertError
        );
        throw insertError;
      }

      console.log("✅ Bulk-Update für allgemeine Verfügbarkeiten erfolgreich");
    } catch (error) {
      console.error(
        "❌ Fehler beim Bulk-Update der allgemeinen Verfügbarkeit:",
        error
      );
      throw new Error(
        "Allgemeine Verfügbarkeiten konnten nicht gespeichert werden"
      );
    }
    return;
  }

  // Wochenspezifische Verfügbarkeit in weekly_availability speichern
  const weekStart = format(weekStartDate, "yyyy-MM-dd");
  console.log(
    "💾 Speichere in weekly_availability für Woche:",
    weekStart,
    "- Anzahl Einträge:",
    availabilityData.length
  );
  console.log(
    "🔄 Bulk-Update für wochenspezifische Verfügbarkeiten:",
    availabilityData.length,
    "Einträge für Woche",
    weekStart
  );

  try {
    // Erst alle bestehenden Einträge für diese Woche löschen
    const { error: deleteError } = await supabase
      .from("weekly_availability")
      .delete()
      .eq("week_start_date", weekStart);

    if (deleteError) {
      console.error(
        "Fehler beim Löschen bestehender wochenspezifischer Verfügbarkeiten:",
        deleteError
      );
    }
    console.log("🗑️ Bestehende weekly_availability Einträge gelöscht");

    // Neue wochenspezifische Einträge einfügen
    const insertData = availabilityData.map((item) => ({
      week_start_date: weekStart,
      day_of_week: item.dayOfWeek,
      time_slot: item.timeSlot,
      is_available: item.isAvailable,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    console.log(
      "📝 Füge neue weekly_availability Einträge ein:",
      insertData.length
    );
    console.log(
      "📝 Füge ein:",
      insertData.length,
      "wochenspezifische Einträge"
    );
    console.log("📋 Beispiel-Eintrag:", insertData[0]);
    const { error: insertError } = await supabase
      .from("weekly_availability")
      .insert(insertData);

    if (insertError) {
      console.error(
        "Fehler beim Einfügen neuer weekly_availability Einträge:",
        insertError
      );
      throw insertError;
    }

    console.log("✅ Weekly_availability erfolgreich gespeichert");
  } catch (error) {
    console.error("❌ Fehler beim Speichern der weekly_availability:", error);
    throw new Error("Weekly_availability konnte nicht gespeichert werden");
  }
}

// Wochenspezifische Verfügbarkeit setzen
export async function setWeeklyAvailability(
  weekStartDate: Date,
  availabilityData: Array<{
    dayOfWeek: number;
    timeSlot: string;
    isAvailable: boolean;
  }>
): Promise<void> {
  const weekStart = format(weekStartDate, "yyyy-MM-dd");
  console.log(
    "💾 setWeeklyAvailability für Woche:",
    weekStart,
    "- Anzahl Einträge:",
    availabilityData.length
  );

  try {
    // Erst alle bestehenden Einträge für diese Woche löschen
    const { error: deleteError } = await supabase
      .from("weekly_availability")
      .delete()
      .eq("week_start_date", weekStart);

    if (deleteError) {
      console.error(
        "❌ Fehler beim Löschen bestehender weekly_availability:",
        deleteError
      );
      throw deleteError;
    }
    console.log(
      "🗑️ Bestehende weekly_availability Einträge gelöscht für Woche:",
      weekStart
    );

    // Neue wochenspezifische Einträge einfügen
    const insertData = availabilityData.map((item) => ({
      week_start_date: weekStart,
      day_of_week: item.dayOfWeek,
      time_slot: item.timeSlot,
      is_available: item.isAvailable,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    console.log(
      "📝 Füge neue weekly_availability Einträge ein:",
      insertData.length
    );
    console.log("📋 Beispiel-Eintrag:", insertData[0]);

    const { error: insertError } = await supabase
      .from("weekly_availability")
      .insert(insertData);

    if (insertError) {
      console.error(
        "❌ Fehler beim Einfügen neuer weekly_availability:",
        insertError
      );
      throw insertError;
    }

    console.log("✅ setWeeklyAvailability erfolgreich für Woche:", weekStart);
  } catch (error) {
    console.error("❌ Fehler in setWeeklyAvailability:", error);
    throw new Error(
      "Wochenspezifische Verfügbarkeit konnte nicht gespeichert werden"
    );
  }
}

export async function getWeeklyAvailability(
  weekStartDate: Date
): Promise<Record<string, boolean>> {
  const weekStart = format(weekStartDate, "yyyy-MM-dd");
  console.log("🔍 Lade aus weekly_availability für Woche:", weekStart);

  try {
    // Erst versuchen, wochenspezifische Verfügbarkeiten zu laden
    const { data: weeklyData, error } = await supabase
      .from("weekly_availability")
      .select("day_of_week, time_slot, is_available")
      .eq("week_start_date", weekStart);

    if (error) {
      console.error("❌ Fehler beim Laden der weekly_availability:", error);
    }

    console.log(
      "📊 Weekly_availability Daten gefunden:",
      weeklyData?.length || 0,
      "Einträge"
    );

    if (weeklyData && weeklyData.length > 0) {
      // Wochenspezifische Daten gefunden
      const availabilityMap: Record<string, boolean> = {};
      weeklyData.forEach((item) => {
        const key = `${item.day_of_week}-${item.time_slot}`;
        availabilityMap[key] = item.is_available;
      });
      console.log("✅ Verwende weekly_availability Daten");
      return availabilityMap;
    }

    // Fallback: Standard-Verfügbarkeiten laden
    console.log(
      "📋 Keine weekly_availability Daten, lade Standard-Verfügbarkeiten..."
    );
    const { data: standardData } = await supabase
      .from("availability")
      .select("day_of_week, time_slot, is_available");

    const availabilityMap: Record<string, boolean> = {};
    standardData?.forEach((item) => {
      const key = `${item.day_of_week}-${item.time_slot}`;
      availabilityMap[key] = item.is_available;
    });
    console.log(
      "✅ Verwende Standard-Verfügbarkeiten als Fallback:",
      Object.keys(availabilityMap).length,
      "Einträge"
    );
    return availabilityMap;
  } catch (error) {
    console.error("❌ Fehler beim Laden der Verfügbarkeiten:", error);
    return {};
  }
}

// Alle Verfügbarkeiten löschen
export async function clearAllAvailability(): Promise<void> {
  const { error } = await supabase
    .from("availability")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Alle löschen

  if (error) {
    console.error("Fehler beim Löschen der Verfügbarkeiten:", error);
    throw new Error("Verfügbarkeiten konnten nicht gelöscht werden");
  }
}

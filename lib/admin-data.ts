import {
  addDays,
  setHours,
  setMinutes,
  startOfDay,
  format,
  isToday,
  isFuture,
} from "date-fns";
import { sendBookingNotification } from "./email-service";

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  serviceName: string;
  duration: number;
  date: string;
  timeSlot: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
}

export interface AdminStats {
  todayAppointments: number;
  yesterdayAppointments: number;
  totalAppointments: number;
  pendingAppointments: number;
  monthlyRevenue: number;
  revenueGrowth: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
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
    id: "consultation-30",
    name: "Beratung Kälteanwendung",
    duration: 30,
    description:
      "Umfassende Beratung zu Kälteanwendungen und Behandlungsmöglichkeiten",
    price: 60,
    category: "consultation",
  },
  {
    id: "consultation-45",
    name: "Ausführliche Beratung",
    duration: 45,
    description: "Detaillierte Beratung mit Behandlungsplan",
    price: 80,
    category: "consultation",
  },
  {
    id: "cooling-30",
    name: "Kälteanwendung 30 Min",
    duration: 30,
    description: "Gezielte Kältetherapie für 30 Minuten",
    price: 90,
    category: "cooling",
  },
  {
    id: "cooling-45",
    name: "Kälteanwendung 45 Min",
    duration: 45,
    description: "Intensive Kältetherapie für 45 Minuten",
    price: 120,
    category: "cooling",
  },
  {
    id: "cooling-60",
    name: "Kälteanwendung 60 Min",
    duration: 60,
    description: "Umfassende Kältetherapie für 60 Minuten",
    price: 150,
    category: "cooling",
  },
  {
    id: "cooling-90",
    name: "Kälteanwendung 90 Min",
    duration: 90,
    description: "Intensive Langzeit-Kältetherapie für 90 Minuten",
    price: 200,
    category: "cooling",
  },
];

// Mock-Daten für Termine
let mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Max Mustermann",
    patientEmail: "max@beispiel.de",
    patientPhone: "+49 123 456789",
    serviceId: "cooling-60",
    serviceName: "Kälteanwendung 60 Min",
    duration: 60,
    date: format(new Date(), "yyyy-MM-dd"),
    timeSlot: "10:00",
    status: "confirmed",
    notes: "Rückenschmerzen nach Sportverletzung",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    patientName: "Anna Schmidt",
    patientEmail: "anna@beispiel.de",
    patientPhone: "+49 987 654321",
    serviceId: "consultation-45",
    serviceName: "Ausführliche Beratung",
    duration: 45,
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    timeSlot: "14:00",
    status: "pending",
    notes: "Interesse an Kältetherapie für chronische Schmerzen",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    patientName: "Peter Müller",
    patientEmail: "peter@beispiel.de",
    patientPhone: "+49 555 123456",
    serviceId: "cooling-90",
    serviceName: "Kälteanwendung 90 Min",
    duration: 90,
    date: format(new Date(), "yyyy-MM-dd"),
    timeSlot: "16:00",
    status: "confirmed",
    notes: "Intensive Behandlung für chronische Schmerzen",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    patientName: "Lisa Weber",
    patientEmail: "lisa@beispiel.de",
    patientPhone: "+49 444 555666",
    serviceId: "consultation-30",
    serviceName: "Beratung Kälteanwendung",
    duration: 30,
    date: format(new Date(), "yyyy-MM-dd"),
    timeSlot: "09:00",
    status: "confirmed",
    notes: "Erstberatung",
    createdAt: new Date().toISOString(),
  },
];

// Zeitslots generieren
export function generateTimeSlots(date: Date): TimeSlot[] {
  const baseSlots: TimeSlot[] = [];

  // Slots von 8:00 bis 18:00 generieren (alle 30 Minuten)
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

      // Prüfen ob bereits ein Termin zu dieser Zeit existiert
      const isBooked = mockAppointments.some(
        (apt) =>
          apt.date === format(date, "yyyy-MM-dd") && apt.timeSlot === time
      );

      baseSlots.push({ time, available: !isBooked });
    }
  }

  return baseSlots;
}

// Termine abrufen
export async function getAppointments(
  filter: "all" | "today" | "upcoming"
): Promise<Appointment[]> {
  // Simuliere API-Aufruf
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredAppointments = [...mockAppointments];

  switch (filter) {
    case "today":
      filteredAppointments = mockAppointments.filter((apt) =>
        isToday(new Date(apt.date))
      );
      break;
    case "upcoming":
      filteredAppointments = mockAppointments.filter((apt) =>
        isFuture(new Date(apt.date))
      );
      break;
    default:
      // 'all' - alle Termine zurückgeben
      break;
  }

  return filteredAppointments.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

// Termin erstellen
export async function createAppointment(
  appointmentData: Omit<Appointment, "id" | "createdAt">
): Promise<Appointment> {
  // Simuliere API-Aufruf
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const service = services.find((s) => s.id === appointmentData.serviceId);

  const newAppointment: Appointment = {
    ...appointmentData,
    id: Date.now().toString(),
    serviceName: service?.name || "",
    duration: service?.duration || 30,
    createdAt: new Date().toISOString(),
  };

  mockAppointments.push(newAppointment);

  // E-Mail-Benachrichtigung senden (nur bei Buchungen über die öffentliche Seite)
  // Admin-Buchungen werden separat behandelt

  return newAppointment;
}

// Termin löschen
export async function deleteAppointment(id: string): Promise<void> {
  // Simuliere API-Aufruf
  await new Promise((resolve) => setTimeout(resolve, 500));

  mockAppointments = mockAppointments.filter((apt) => apt.id !== id);
}

// Admin-Statistiken abrufen
export async function getAdminStats(): Promise<AdminStats> {
  // Simuliere API-Aufruf
  await new Promise((resolve) => setTimeout(resolve, 300));

  const today = new Date();
  const yesterday = addDays(today, -1);

  const todayAppointments = mockAppointments.filter((apt) =>
    isToday(new Date(apt.date))
  ).length;

  const yesterdayAppointments = mockAppointments.filter(
    (apt) =>
      format(new Date(apt.date), "yyyy-MM-dd") ===
      format(yesterday, "yyyy-MM-dd")
  ).length;

  const pendingAppointments = mockAppointments.filter(
    (apt) => apt.status === "pending"
  ).length;

  // Monatlichen Umsatz berechnen
  const monthlyRevenue = mockAppointments
    .filter((apt) => apt.status === "completed" || apt.status === "confirmed")
    .reduce((total, apt) => {
      const service = services.find((s) => s.id === apt.serviceId);
      return total + (service?.price || 0);
    }, 0);

  return {
    todayAppointments,
    yesterdayAppointments,
    totalAppointments: mockAppointments.length,
    pendingAppointments,
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

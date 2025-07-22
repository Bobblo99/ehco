import { addDays, setHours, setMinutes, startOfDay } from "date-fns";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string;
  availableDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  image: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  description: string;
  price: number;
}

export const therapists: Therapist[] = [
  {
    id: "t1",
    name: "Dr. Sarah Weber",
    specialization: "Acute Pain Therapy",
    availableDays: [1, 2, 3, 4, 5], // Monday to Friday
    image:
      "https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "t2",
    name: "Dr. Michael Schmidt",
    specialization: "Chronic Pain Treatment",
    availableDays: [1, 3, 5], // Monday, Wednesday, Friday
    image:
      "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "t3",
    name: "Dr. Lisa Müller",
    specialization: "Sports Therapy",
    availableDays: [2, 4, 6], // Tuesday, Thursday, Saturday
    image:
      "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export const services: Service[] = [
  {
    id: "acute",
    name: "Acute Pain Therapy",
    duration: 60,
    description: "Immediate pain relief through targeted cooling therapy",
    price: 120,
  },
  {
    id: "chronic",
    name: "Chronic Pain Treatment",
    duration: 90,
    description: "Long-term therapy for chronic pain conditions",
    price: 160,
  },
  {
    id: "sports",
    name: "Sports Therapy",
    duration: 60,
    description: "Specialized cooling therapy for sports injuries and recovery",
    price: 120,
  },
  {
    id: "consultation",
    name: "Initial Consultation",
    duration: 45,
    description: "Comprehensive assessment and treatment planning",
    price: 80,
  },
];

// Generate time slots for a given date
export function generateTimeSlots(date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay();
  const baseSlots: TimeSlot[] = [];

  // Generate slots from 9:00 to 17:00
  for (let hour = 9; hour <= 17; hour++) {
    // Skip lunch break
    if (hour === 13) continue;

    const time = `${hour.toString().padStart(2, "0")}:00`;

    // Find available therapists for this day
    const availableTherapists = therapists.filter((t) =>
      t.availableDays.includes(dayOfWeek)
    );

    // Slot is available if there are therapists working that day
    const available = availableTherapists.length > 0;

    baseSlots.push({ time, available });
  }

  return baseSlots;
}

// Get available dates (next 14 days, excluding Sundays)
export function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  let currentDate = startOfDay(new Date());

  for (let i = 0; i < 14; i++) {
    const date = addDays(currentDate, i);
    if (date.getDay() !== 0) {
      // Skip Sundays
      dates.push(date);
    }
  }

  return dates;
}

// Get therapist availability for a specific date and time
export function getAvailableTherapists(
  date: Date,
  timeSlot: string
): Therapist[] {
  const dayOfWeek = date.getDay();

  return therapists.filter((therapist) => {
    // Check if therapist works on this day
    if (!therapist.availableDays.includes(dayOfWeek)) {
      return false;
    }

    // In a real application, you would check the therapist's schedule here
    // For now, we'll use a random availability
    return Math.random() > 0.3;
  });
}

// Get service details by ID
export function getServiceById(serviceId: string): Service | undefined {
  return services.find((service) => service.id === serviceId);
}

// Get therapist details by ID
export function getTherapistById(therapistId: string): Therapist | undefined {
  return therapists.find((therapist) => therapist.id === therapistId);
}

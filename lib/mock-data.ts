// import { addDays, setHours, setMinutes, startOfDay } from "date-fns";

// export interface TimeSlot {
//   time: string;
//   available: boolean;
// }

// export interface Therapist {
//   id: string;
//   name: string;
//   specialization: string;
//   availableDays: number[]; // 0 = Sunday, 1 = Monday, etc.
//   image: string;
// }

// export interface Service {
//   id: string;
//   name: string;
//   duration: number; // in minutes
//   description: string;
//   price: number;
// }

// // Generate time slots for a given date
// export function generateTimeSlots(date: Date): TimeSlot[] {
//   const dayOfWeek = date.getDay();
//   const baseSlots: TimeSlot[] = [];

//   // Generate slots from 9:00 to 17:00
//   for (let hour = 9; hour <= 17; hour++) {
//     // Skip lunch break
//     if (hour === 13) continue;

//     const time = `${hour.toString().padStart(2, "0")}:00`;

//     // Find available therapists for this day
//     const availableTherapists = therapists.filter((t) =>
//       t.availableDays.includes(dayOfWeek)
//     );

//     // Slot is available if there are therapists working that day
//     const available = availableTherapists.length > 0;

//     baseSlots.push({ time, available });
//   }

//   return baseSlots;
// }

// // Get available dates (next 14 days, excluding Sundays)
// export function getAvailableDates(): Date[] {
//   const dates: Date[] = [];
//   let currentDate = startOfDay(new Date());

//   for (let i = 0; i < 14; i++) {
//     const date = addDays(currentDate, i);
//     if (date.getDay() !== 0) {
//       // Skip Sundays
//       dates.push(date);
//     }
//   }

//   return dates;
// }

// // Get therapist availability for a specific date and time
// export function getAvailableTherapists(
//   date: Date,
//   timeSlot: string
// ): Therapist[] {
//   const dayOfWeek = date.getDay();

//   return therapists.filter((therapist) => {
//     // Check if therapist works on this day
//     if (!therapist.availableDays.includes(dayOfWeek)) {
//       return false;
//     }

//     // In a real application, you would check the therapist's schedule here
//     // For now, we'll use a random availability
//     return Math.random() > 0.3;
//   });
// }

// // Get service details by ID
// export function getServiceById(serviceId: string): Service | undefined {
//   return services.find((service) => service.id === serviceId);
// }

// // Get therapist details by ID
// export function getTherapistById(therapistId: string): Therapist | undefined {
//   return therapists.find((therapist) => therapist.id === therapistId);
// }

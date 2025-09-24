import { sendBookingNotification } from "../lib/email-service";
import { EmailData } from "../types/email";

const testBooking: EmailData = {
  patientName: "Max Mustermann",
  patientEmail: "deine_testmail@domain.de",
  patientPhone: "01234 567890",
  serviceName: "Kältetherapie",
  duration: 45,
  price: 89,
  date: "2025-09-30",
  timeSlot: "15:00 - 15:45",
  notes: "Bitte warm anziehen",
  firstVisit: true,
};

sendBookingNotification(testBooking).then((ok) => {
  if (ok) console.log("🚀 Test-Mail wurde gesendet!");
  else console.log("⚠️ Test-Mail fehlgeschlagen!");
});

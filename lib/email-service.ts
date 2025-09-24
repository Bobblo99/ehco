import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailData } from "@/types/email";

dotenv.config();

const EMAIL_CONFIG = {
  adminEmail: "sabine.ehmann@eh-co.com",
  fromEmail: process.env.IONOS_USER || "sabine.ehmannn@eh-co.com",
  companyName: "EHCO",
};

const user = process.env.IONOS_USER;
const pass = process.env.IONOS_PASS;

if (!user || !pass) {
  throw new Error("IONOS_USER und IONOS_PASS müssen gesetzt sein!");
}
console.log(user, pass);
const transporter = nodemailer.createTransport({
  host: "smtp.ionos.de",
  port: 587,
  secure: false,
  auth: {
    user: process.env.IONOS_USER,
    pass: process.env.IONOS_PASS,
  },
});

function generateAdminEmailTemplate(data: EmailData): string {
  return `
    <h1>Neue Terminbuchung - ${EMAIL_CONFIG.companyName}</h1>
    <p><strong>Patient:</strong> ${data.patientName} (${data.patientEmail})</p>
    <p><strong>Telefon:</strong> ${data.patientPhone}</p>
    <p><strong>Behandlung:</strong> ${data.serviceName}</p>
    <p><strong>Dauer:</strong> ${data.duration} Minuten</p>
    <p><strong>Preis:</strong> €${data.price}</p>
    <p><strong>Datum:</strong> ${data.date} um ${data.timeSlot}</p>
    ${data.notes ? `<p><strong>Notizen:</strong> ${data.notes}</p>` : ""}
  `;
}

function generateCustomerEmailTemplate(data: EmailData): string {
  return `
    <h1>✅ Terminbestätigung - ${EMAIL_CONFIG.companyName}</h1>
    <p>Liebe/r ${data.patientName},</p>
    <p>vielen Dank für Ihre Buchung. Hier die Details:</p>
    <ul>
      <li><strong>Behandlung:</strong> ${data.serviceName}</li>
      <li><strong>Datum:</strong> ${data.date}</li>
      <li><strong>Uhrzeit:</strong> ${data.timeSlot}</li>
      <li><strong>Dauer:</strong> ${data.duration} Minuten</li>
      <li><strong>Preis:</strong> €${data.price}</li>
    </ul>
    <p>Wir freuen uns auf Ihren Besuch!<br>Ihr Team von ${EMAIL_CONFIG.companyName}</p>
  `;
}

export async function sendBookingNotification(
  data: EmailData
): Promise<boolean> {
  try {
    // Admin-Mail
    await transporter.sendMail({
      from: EMAIL_CONFIG.fromEmail,
      to: EMAIL_CONFIG.adminEmail,
      subject: `Neue Terminbuchung - ${data.patientName}`,
      html: generateAdminEmailTemplate(data),
    });

    // Kunden-Mail
    await transporter.sendMail({
      from: EMAIL_CONFIG.fromEmail,
      to: data.patientEmail,
      subject: `Terminbestätigung - ${data.serviceName} am ${data.date}`,
      html: generateCustomerEmailTemplate(data),
    });

    console.log("✅ E-Mails erfolgreich gesendet!");
    return true;
  } catch (error) {
    console.error("❌ Fehler beim E-Mail-Versand:", error);
    return false;
  }
}

export async function sendConfirmationEmail({
  patientName,
  patientEmail,
  serviceName,
  date,
  timeSlot,
}: {
  patientName: string;
  patientEmail: string;
  serviceName: string;
  date: string;
  timeSlot: string;
}) {
  const html = `
    <h1>✅ Terminbestätigung</h1>
    <p>Hallo ${patientName},</p>
    <p>Ihr Termin für <strong>${serviceName}</strong> am <strong>${date}</strong> um <strong>${timeSlot}</strong> wurde bestätigt.</p>
    <p>Wir freuen uns auf Ihren Besuch!</p>
  `;

  await transporter.sendMail({
    from: process.env.IONOS_USER,
    to: patientEmail,
    subject: `Bestätigung Ihres Termins am ${date}`,
    html,
  });
}

export interface EmailData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceName: string;
  duration: number;
  price: number;
  date: string;
  timeSlot: string;
  notes?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  firstVisit?: boolean;
}

// E-Mail-Konfiguration
const EMAIL_CONFIG = {
  adminEmail: "admin@alphacooling.de", // Hier die gewünschte Admin-E-Mail eintragen
  fromEmail: "noreply@alphacooling.de",
  companyName: "EHCO",
};

// E-Mail-Template für Admin-Benachrichtigung
function generateAdminEmailTemplate(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Neue Terminbuchung - ${EMAIL_CONFIG.companyName}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-section { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #f59e0b; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .highlight { background: #fef3c7; padding: 10px; border-radius: 6px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🗓️ Neue Terminbuchung</h1>
            <p>${EMAIL_CONFIG.companyName}</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <h2 style="margin: 0; color: #92400e;">📋 Termindetails</h2>
            </div>
            
            <div class="info-section">
                <h3>🏥 Behandlung</h3>
                <div class="info-row">
                    <span class="label">Service:</span>
                    <span class="value">${data.serviceName}</span>
                </div>
                <div class="info-row">
                    <span class="label">Dauer:</span>
                    <span class="value">${data.duration} Minuten</span>
                </div>
                <div class="info-row">
                    <span class="label">Preis:</span>
                    <span class="value">€${data.price}</span>
                </div>
            </div>

            <div class="info-section">
                <h3>📅 Termin</h3>
                <div class="info-row">
                    <span class="label">Datum:</span>
                    <span class="value">${data.date}</span>
                </div>
                <div class="info-row">
                    <span class="label">Uhrzeit:</span>
                    <span class="value">${data.timeSlot}</span>
                </div>
            </div>

            <div class="info-section">
                <h3>👤 Patienteninformationen</h3>
                <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">${data.patientName}</span>
                </div>
                <div class="info-row">
                    <span class="label">E-Mail:</span>
                    <span class="value">${data.patientEmail}</span>
                </div>
                <div class="info-row">
                    <span class="label">Telefon:</span>
                    <span class="value">${data.patientPhone}</span>
                </div>
                ${
                  data.insuranceProvider
                    ? `
                <div class="info-row">
                    <span class="label">Krankenkasse:</span>
                    <span class="value">${data.insuranceProvider}</span>
                </div>
                `
                    : ""
                }
                <div class="info-row">
                    <span class="label">Erstbesuch:</span>
                    <span class="value">${
                      data.firstVisit ? "Ja" : "Nein"
                    }</span>
                </div>
            </div>

            ${
              data.emergencyContact
                ? `
            <div class="info-section">
                <h3>🚨 Notfallkontakt</h3>
                <div class="info-row">
                    <span class="label">Name:</span>
                    <span class="value">${data.emergencyContact}</span>
                </div>
                <div class="info-row">
                    <span class="label">Telefon:</span>
                    <span class="value">${data.emergencyPhone}</span>
                </div>
            </div>
            `
                : ""
            }

            ${
              data.notes
                ? `
            <div class="info-section">
                <h3>📝 Zusätzliche Informationen</h3>
                <p style="margin: 0; padding: 10px; background: #f3f4f6; border-radius: 4px;">${data.notes}</p>
            </div>
            `
                : ""
            }

            <div class="highlight">
                <p style="margin: 0; text-align: center;">
                    <strong>⏰ Bitte bestätigen Sie den Termin so schnell wie möglich!</strong>
                </p>
            </div>
        </div>

        <div class="footer">
            <p>Diese E-Mail wurde automatisch generiert von ${
              EMAIL_CONFIG.companyName
            }</p>
            <p>Buchungszeit: ${new Date().toLocaleString("de-DE")}</p>
        </div>
    </div>
</body>
</html>
  `;
}

// E-Mail-Template für Kunden-Bestätigung
function generateCustomerEmailTemplate(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Terminbestätigung - ${EMAIL_CONFIG.companyName}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .info-section { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #f59e0b; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .highlight { background: #dcfce7; padding: 15px; border-radius: 6px; margin: 15px 0; border: 1px solid #16a34a; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .contact-info { background: #eff6ff; padding: 15px; border-radius: 6px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Terminbestätigung</h1>
            <p>${EMAIL_CONFIG.companyName}</p>
        </div>
        
        <div class="content">
            <div class="highlight">
                <h2 style="margin: 0; color: #166534;">Liebe/r ${data.patientName},</h2>
                <p style="margin: 10px 0 0 0;">vielen Dank für Ihre Terminbuchung! Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.</p>
            </div>
            
            <div class="info-section">
                <h3>📋 Ihre Termindetails</h3>
                <div class="info-row">
                    <span class="label">Behandlung:</span>
                    <span class="value">${data.serviceName}</span>
                </div>
                <div class="info-row">
                    <span class="label">Datum:</span>
                    <span class="value">${data.date}</span>
                </div>
                <div class="info-row">
                    <span class="label">Uhrzeit:</span>
                    <span class="value">${data.timeSlot}</span>
                </div>
                <div class="info-row">
                    <span class="label">Dauer:</span>
                    <span class="value">${data.duration} Minuten</span>
                </div>
                <div class="info-row">
                    <span class="label">Preis:</span>
                    <span class="value">€${data.price}</span>
                </div>
            </div>

            <div class="contact-info">
                <h3>📞 Kontaktinformationen</h3>
                <p><strong>Adresse:</strong> 123 Cooling Street, Frostville, FZ 12345</p>
                <p><strong>Telefon:</strong> +49 (555) 123-4567</p>
                <p><strong>E-Mail:</strong>info@eh-co.com</p>
                <p><strong>Notfall:</strong> +49 (555) 911-COOL</p>
            </div>

            <div class="info-section">
                <h3>ℹ️ Wichtige Hinweise</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Bitte erscheinen Sie 10 Minuten vor Ihrem Termin</li>
                    <li>Bringen Sie bequeme Kleidung mit</li>
                    <li>Bei Fragen oder Änderungen kontaktieren Sie uns bitte</li>
                    <li>Absagen sind bis 24h vor dem Termin kostenfrei möglich</li>
                </ul>
            </div>

            <div class="highlight">
                <p style="margin: 0; text-align: center;">
                    <strong>Wir freuen uns auf Ihren Besuch!</strong><br>
                    Ihr Team von ${EMAIL_CONFIG.companyName}
                </p>
            </div>
        </div>

        <div class="footer">
            <p>${EMAIL_CONFIG.companyName} - Die neue Art der Kältetherapie</p>
            <p>Diese E-Mail wurde automatisch generiert.</p>
        </div>
    </div>
</body>
</html>
  `;
}

// E-Mail senden (Simulation)
export async function sendBookingNotification(
  emailData: EmailData
): Promise<boolean> {
  try {
    console.log("📧 Sende E-Mail-Benachrichtigungen...");

    // Admin-E-Mail
    const adminEmailContent = generateAdminEmailTemplate(emailData);
    console.log("📨 Admin-E-Mail:", {
      to: EMAIL_CONFIG.adminEmail,
      subject: `Neue Terminbuchung - ${emailData.patientName} - ${emailData.date} ${emailData.timeSlot}`,
      html: adminEmailContent,
    });

    // Kunden-E-Mail
    const customerEmailContent = generateCustomerEmailTemplate(emailData);
    console.log("📨 Kunden-E-Mail:", {
      to: emailData.patientEmail,
      subject: `Terminbestätigung - ${emailData.serviceName} am ${emailData.date}`,
      html: customerEmailContent,
    });

    // Simuliere E-Mail-Versand (in Produktion würde hier ein echter E-Mail-Service verwendet)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("✅ E-Mails erfolgreich versendet!");
    return true;
  } catch (error) {
    console.error("❌ Fehler beim E-Mail-Versand:", error);
    return false;
  }
}

// E-Mail-Konfiguration für Produktion
export const emailConfig = {
  // Hier können Sie Ihre echten E-Mail-Einstellungen konfigurieren
  adminEmail: EMAIL_CONFIG.adminEmail,
  fromEmail: EMAIL_CONFIG.fromEmail,

  // Für echten E-Mail-Versand (z.B. mit Nodemailer, SendGrid, etc.)
  smtp: {
    host: "smtp.gmail.com", // Ihr SMTP-Server
    port: 587,
    secure: false,
    auth: {
      user: "your-email@gmail.com", // Ihre E-Mail
      pass: "your-app-password", // Ihr App-Passwort
    },
  },
};

// Funktion für echten E-Mail-Versand (für Produktion)
export async function sendRealEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  // Hier würden Sie einen echten E-Mail-Service integrieren
  // Beispiel mit Nodemailer:
  /*
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter(emailConfig.smtp);
  
  try {
    await transporter.sendMail({
      from: emailConfig.fromEmail,
      to: to,
      subject: subject,
      html: html
    });
    return true;
  } catch (error) {
    console.error('E-Mail-Versand fehlgeschlagen:', error);
    return false;
  }
  */

  // Für Demo-Zwecke
  console.log(`📧 E-Mail würde gesendet werden an: ${to}`);
  console.log(`📋 Betreff: ${subject}`);
  return true;
}

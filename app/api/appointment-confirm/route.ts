import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { patientName, patientEmail, serviceName, date, timeSlot } =
      await req.json();

    if (!patientName || !patientEmail || !serviceName || !date || !timeSlot) {
      return new Response(JSON.stringify({ message: "❌ Ungültige Anfrage" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 587,
      secure: false,
      auth: {
        user: process.env.IONOS_USER,
        pass: process.env.IONOS_PASS,
      },
    });

    const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Terminbestätigung - EHCO</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(90deg, #1d4ed8, #facc15);
      padding: 20px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      color: #1d4ed8;
      margin-bottom: 10px;
    }
    .details {
      background: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .details p {
      margin: 6px 0;
    }
    .footer {
      background: #facc15;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #1d1d1d;
    }
    .footer strong {
      color: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Terminbestätigung</h1>
      <p>EHCO - Ihre Kältetherapie</p>
    </div>
    <div class="content">
      <h2>Hallo ${patientName},</h2>
      <p>wir freuen uns, Ihnen mitzuteilen, dass Ihr Termin erfolgreich bestätigt wurde:</p>
      <div class="details">
        <p><strong>Behandlung:</strong> ${serviceName}</p>
        <p><strong>Datum:</strong> ${date}</p>
        <p><strong>Uhrzeit:</strong> ${timeSlot}</p>
      </div>
      <p>Bitte erscheinen Sie etwa 10 Minuten vor Ihrem Termin.  
      Bei Fragen oder Änderungen stehen wir Ihnen jederzeit gerne zur Verfügung.</p>
    </div>
    <div class="footer">
      <p><strong>EHCO</strong> – Die neue Art der Kältetherapie</p>
      <p>Dies ist eine automatische Nachricht – bitte nicht direkt darauf antworten.</p>
    </div>
  </div>
</body>
</html>
`;

    await transporter.sendMail({
      from: process.env.IONOS_USER,
      to: patientEmail,
      subject: `Bestätigung Ihres Termins am ${date}`,
      html,
    });

    return new Response(
      JSON.stringify({ message: "✅ Termin bestätigt & Mail gesendet" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ Fehler beim Bestätigen:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

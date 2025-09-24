import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "env/.env.local" });

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 587,
      secure: false,
      auth: {
        user: process.env.IONOS_USER,
        pass: process.env.IONOS_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.IONOS_USER,
      to: process.env.CONTACT_RECEIVER || "sabine.ehmann@eh-co.com",
      replyTo: email,
      subject: `Kontaktformular: ${subject}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ message: "✅ Email sent" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Fehler beim Kontakt-Mailversand:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

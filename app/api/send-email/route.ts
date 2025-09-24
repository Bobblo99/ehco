import { sendBookingNotification } from "@/lib/email-service";
import { EmailData } from "@/types/email";

export async function POST(req: Request) {
  try {
    const emailData: EmailData = await req.json();

    const ok = await sendBookingNotification(emailData);

    if (ok) {
      return new Response(JSON.stringify({ message: "✅ Email sent" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "⚠️ Email sending failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ API error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log("Resend API Key:", process.env.RESEND_API_KEY); // debug

    const result = await resend.emails.send({
      from: "Gilbert Test <onboarding@resend.dev>",
      to: "gilbertnshimyimana11@gmail.com", // replace with your Gmail
      subject: "Test Email from Resend",
      html: "<p>This is a test email from your Next.js API using Resend.</p>",
    });

    console.log("Resend test email result:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Resend test error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

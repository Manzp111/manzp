import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

// ----------------------------
// Initialize services using .env.local
// ----------------------------
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // use the anon key from .env.local
);

// ----------------------------
// GET: Fetch all contacts
// ----------------------------
export async function GET() {
  console.log("GET /api/contact called");

  try {
    const { data, error, status } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("Supabase response:", { data, error, status });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json(
        { error: "Database fetch failed", details: error },
        { status: 500 }
      );
    }

    console.log("Data fetched successfully:", data);
    return NextResponse.json({ contacts: data });
  } catch (err) {
    console.error("Unexpected GET error:", err);
    return NextResponse.json({ error: "Unexpected error", details: String(err) }, { status: 500 });
  }
}

// ----------------------------
// POST: Add new contact + send emails
// ----------------------------
export async function POST(req: Request) {
  console.log("POST /api/contact called");

  try {
    let body;
    try {
      body = await req.json();
      console.log("Request body:", body);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { fullName, email, message } = body;
    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 1️⃣ Save to Supabase
    let contactRow;
    try {
      const { data, error: dbError, status } = await supabase
        .from("contacts")
        .insert([{ full_name: fullName, email, message }])
        .select();

      console.log("Supabase insert response:", { data, dbError, status });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        return NextResponse.json({ error: "Database error", details: dbError }, { status: 500 });
      }

      contactRow = data?.[0];
      console.log("Inserted contact:", contactRow);
    } catch (err) {
      console.error("Unexpected Supabase error:", err);
      return NextResponse.json({ error: "Supabase operation failed", details: String(err) }, { status: 500 });
    }

    // 2️⃣ Send admin email
    const adminMsg = {
      to: process.env.FROM_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: `New Contact From ${fullName}`,
      html: `
        <h2>New contact request</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
      const adminResult = await sgMail.send(adminMsg);
      console.log("Admin email sent:", adminResult);
    } catch (err) {
      console.error("SendGrid admin email error:", err);
    }

    // 3️⃣ Auto-reply to user
    const userMsg = {
      to: email,
      from: process.env.FROM_EMAIL!,
      subject: "Thank you for contacting Gilbert",
      html: `
        <p>Hello ${fullName},</p>
        <p>Thank you for contacting Gilbert. He has received your message and will reply soon.</p>
        <p>Best regards,<br>Gilbert's Portfolio</p>
      `,
    };

    try {
      const userResult = await sgMail.send(userMsg);
      console.log("User email sent:", userResult);
    } catch (err) {
      console.error("SendGrid user email error:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for contacting Gilbert. He will reply as soon as possible.",
     
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("POST /api/contact unexpected error:", message);
    return NextResponse.json({ error: message || "Something went wrong" }, { status: 500 });
  }
}

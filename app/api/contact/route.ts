import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// ----------------------------
// GET: Return all contacts
// ----------------------------
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false }); // newest first

    if (error) {
      console.log("Supabase GET error:", error);
      return NextResponse.json({ error: "Database fetch error" }, { status: 500 });
    }

    return NextResponse.json({ contacts: data });
  } catch (err) {
    console.log("Unexpected GET error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

// ----------------------------
// POST: Add a new contact + send emails
// ----------------------------
export async function POST(req: Request) {
  try {
    const { fullName, email, message } = await req.json();

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 1️⃣ Save to Supabase
    const { data, error: dbError } = await supabase
      .from("contacts")
      .insert([{ full_name: fullName, email, message }])
      .select(); // return inserted row

    if (dbError) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const contactRow = data?.[0];

    // 2️⃣ Email to YOU (admin)
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
    const adminResult = await sgMail.send(adminMsg);

    // 3️⃣ Auto-reply to sender
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
    const userResult = await sgMail.send(userMsg);

    return NextResponse.json({
      success: true,
      message:"email sent wait for answer",
      contact: contactRow,
  
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

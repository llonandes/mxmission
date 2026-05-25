import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

type Payload = {
  participantType: "youth" | "adult";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade?: string;
  emergencyName: string;
  emergencyPhone: string;
  medicalNotes?: string;
  needsScholarship?: boolean;
  speaksSpanish?: boolean;
  agree?: boolean;
};

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  // Server-side validation — never trust the client.
  if (!["youth", "adult"].includes(body.participantType)) return bad("Please choose teen or adult.");
  if (!body.firstName?.trim() || !body.lastName?.trim()) return bad("Name is required.");
  if (!/^\S+@\S+\.\S+$/.test(body.email || "")) return bad("A valid email is required.");
  if (!body.phone?.trim()) return bad("Phone is required.");
  if (body.participantType === "youth" && !body.grade?.trim()) return bad("Grade is required for teens.");
  if (!body.emergencyName?.trim() || !body.emergencyPhone?.trim())
    return bad("Emergency contact is required.");
  if (!body.agree) return bad("Please confirm to submit.");

  const row = {
    participant_type: body.participantType,
    first_name: body.firstName.trim(),
    last_name: body.lastName.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    grade: body.participantType === "youth" ? body.grade?.trim() ?? null : null,
    emergency_name: body.emergencyName.trim(),
    emergency_phone: body.emergencyPhone.trim(),
    medical_notes: body.medicalNotes?.trim() || null,
    needs_scholarship: !!body.needsScholarship,
    speaks_spanish: !!body.speaksSpanish,
    trip_year: 2026,
  };

  const supabase = getServiceClient();

  if (!supabase) {
    // Dev fallback: no backend configured yet.
    console.log("[register] (no Supabase configured) registration:", row);
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("registrations").insert(row);
  if (error) {
    console.error("[register] insert failed:", error.message);
    return bad("We couldn't save your registration. Please try again or call us.", 500);
  }

  return NextResponse.json({ ok: true, persisted: true });
}

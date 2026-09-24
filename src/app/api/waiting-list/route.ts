import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { allCountries } from "country-telephone-data";
import { syncLeadToGoogleSheet } from "@/lib/googleSheets";
import { sendSlackLeadNotification } from "@/lib/slack";

function formatCountryAndPhone(countryInput?: string, phoneInput?: string) {
  let formattedCountry = countryInput?.trim() || "";
  let formattedPhone = phoneInput?.trim() || "";

  const match = allCountries.find(
    c => c.iso2.toUpperCase() === (countryInput || "").toUpperCase().trim() ||
         c.name.toLowerCase() === (countryInput || "").toLowerCase().trim() ||
         c.name.replace(/\s*\([^)]*\)/g, '').trim().toLowerCase() === (countryInput || "").toLowerCase().trim()
  );

  if (match) {
    const cleanName = match.name.replace(/\s*\([^)]*\)/g, '').trim();
    formattedCountry = `${cleanName} (+${match.dialCode})`;

    if (formattedPhone && !formattedPhone.startsWith("+")) {
      formattedPhone = `+${match.dialCode} ${formattedPhone}`;
    }
  }

  return { formattedCountry, formattedPhone };
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      title, 
      name, 
      country, 
      phone, 
      email, 
      company, 
      profession, 
      plan,
      fingerprint,
      device_info,
      businessRegistrationNumber,
      dateOfIncorporation,
      collegeInstitute,
      studentId,
      seats
    } = data;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const { formattedCountry, formattedPhone } = formatCountryAndPhone(country, phone);

    // Extract client IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfIp = req.headers.get("cf-connecting-ip");
    const ipAddress = (forwardedFor ? forwardedFor.split(",")[0].trim() : "") || realIp || cfIp || "Unknown";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const leadPayload = {
      title,
      name,
      country: formattedCountry || country,
      phone: formattedPhone || phone,
      email,
      company,
      profession,
      plan: plan || null,
      fingerprint: fingerprint || null,
      ip_address: ipAddress,
      device_info: device_info || null,
      business_registration_number: businessRegistrationNumber || null,
      date_of_incorporation: dateOfIncorporation || null,
      college_institute: collegeInstitute || null,
      student_id: studentId || null,
      seats: seats || null,
    };

    const { data: insertedData, error } = await supabase
      .from("waiting_list")
      .insert([leadPayload])
      .select("id, name, email, plan, created_at");

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message || "Failed to save waiting list lead" },
        { status: 500 }
      );
    }

    const lead = insertedData && insertedData[0];

    // Mark matching pricing unlock lead as converted to waiting list
    try {
      await supabase
        .from("pricing_unlock_leads")
        .update({
          has_joined_waiting_list: true,
          waiting_list_plan: plan || null,
          updated_at: new Date().toISOString()
        })
        .eq("email", email.trim().toLowerCase());
    } catch (err) {
      console.error("Error updating pricing_unlock_leads status:", err);
    }

    // Synchronize to Google Sheet & Slack (awaited with Promise.allSettled so Vercel Serverless Function does not terminate before completion)
    try {
      await Promise.allSettled([
        syncLeadToGoogleSheet({
          id: lead?.id,
          created_at: lead?.created_at,
          ...leadPayload
        }),
        sendSlackLeadNotification({
          title,
          name,
          email,
          phone: formattedPhone || phone,
          country: formattedCountry || country,
          company,
          profession,
          plan: plan || null,
          seats,
          businessRegistrationNumber,
          dateOfIncorporation,
          collegeInstitute,
          studentId,
          createdAt: lead?.created_at,
          source: "waiting_list"
        })
      ]);
    } catch (notifyErr) {
      console.error("[WaitingList] Notification dispatch error:", notifyErr);
    }

    return NextResponse.json({ 
      success: true, 
      id: lead?.id,
      name: lead?.name || name,
      email: lead?.email || email,
      plan: lead?.plan || null
    });
  } catch (err: any) {
    console.error("Waiting list API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

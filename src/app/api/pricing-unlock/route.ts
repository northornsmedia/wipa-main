import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { allCountries } from "country-telephone-data";

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
      fingerprint,
      device_info
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
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const leadPayload = {
      title: title || null,
      name: name.trim(),
      country: formattedCountry || country || "Unknown",
      phone: formattedPhone || phone || "Unknown",
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : null,
      profession: profession ? profession.trim() : null,
      fingerprint: fingerprint || null,
      ip_address: ipAddress,
      device_info: device_info || null,
      has_joined_waiting_list: false
    };

    const { data: insertedData, error } = await supabase
      .from("pricing_unlock_leads")
      .insert([leadPayload])
      .select("id, name, email, created_at");

    if (error) {
      console.error("Supabase pricing_unlock_leads insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message || "Failed to record pricing unlock lead" },
        { status: 500 }
      );
    }

    const lead = insertedData && insertedData[0];

    return NextResponse.json({ 
      success: true, 
      id: lead?.id,
      name: lead?.name,
      email: lead?.email,
      message: "Pricing unlocked successfully" 
    });

  } catch (error: any) {
    console.error("Pricing unlock lead error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

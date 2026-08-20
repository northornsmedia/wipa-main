import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { allCountries } from "country-telephone-data";

function formatCountryAndPhone(countryInput?: string, phoneInput?: string) {
  let formattedCountry = countryInput?.trim() || "";
  let formattedPhone = phoneInput?.trim() || "";

  // Check if countryInput matches an iso2 code or country name
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from("waiting_list")
      .insert([
        {
          title,
          name,
          country: formattedCountry || country,
          phone: formattedPhone || phone,
          email,
          company,
          profession,
          plan,
          business_registration_number: businessRegistrationNumber,
          date_of_incorporation: dateOfIncorporation,
          college_institute: collegeInstitute,
          student_id: studentId,
          seats: seats,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to save waiting list lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Waiting list API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

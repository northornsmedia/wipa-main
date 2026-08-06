import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
      studentId 
    } = data;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from("waiting_list")
      .insert([
        {
          title,
          name,
          country,
          phone,
          email,
          company,
          profession,
          plan,
          business_registration_number: businessRegistrationNumber,
          date_of_incorporation: dateOfIncorporation,
          college_institute: collegeInstitute,
          student_id: studentId,
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

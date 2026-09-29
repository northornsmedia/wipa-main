import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { syncLeadToGoogleSheet } from "@/lib/googleSheets";
import { sendSlackLeadNotification } from "@/lib/slack";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      id, 
      email, 
      fingerprint, 
      plan,
      businessRegistrationNumber,
      dateOfIncorporation,
      collegeInstitute,
      studentId,
      seats,
      workEmail,
      startupName,
      startupCountry,
      universityName,
      course
    } = data;

    if (!plan) {
      return NextResponse.json(
        { success: false, error: "Plan is required" },
        { status: 400 }
      );
    }

    if (!id && !email && !fingerprint) {
      return NextResponse.json(
        { success: false, error: "User identity (id, email, or fingerprint) is required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const updatePayload: Record<string, any> = {
      plan,
      ...(businessRegistrationNumber ? { business_registration_number: businessRegistrationNumber } : {}),
      ...(startupName ? { startup_name: startupName } : {}),
      ...(startupCountry ? { startup_country: startupCountry } : {}),
      ...(universityName ? { university_name: universityName, college_institute: universityName } : {}),
      ...(collegeInstitute ? { college_institute: collegeInstitute, university_name: collegeInstitute } : {}),
      ...(course ? { course } : {}),
      ...(dateOfIncorporation ? { date_of_incorporation: dateOfIncorporation } : {}),
      ...(studentId ? { student_id: studentId } : {}),
      ...(seats ? { seats } : {}),
      ...(workEmail ? { email: workEmail } : {})
    };

    let query = supabase.from("waiting_list").update(updatePayload);

    if (id) {
      query = query.eq("id", id);
    } else if (email) {
      query = query.eq("email", email);
    } else if (fingerprint) {
      query = query.eq("fingerprint", fingerprint);
    }

    const { data: updatedRows, error } = await query.select("id, name, email, plan, country, phone, company, profession, created_at, business_registration_number, date_of_incorporation, college_institute, university_name, student_id, course, startup_name, startup_country, seats, ip_address");

    if (error) {
      console.error("Supabase select-plan update error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update plan selection" },
        { status: 500 }
      );
    }

    const updatedUser = updatedRows && updatedRows[0];

    // Synchronize updated plan to Google Sheet & Slack (awaited so Vercel Serverless Function does not terminate early)
    if (updatedUser) {
      try {
        await Promise.allSettled([
          syncLeadToGoogleSheet({
            action: 'update_plan',
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            plan: updatedUser.plan,
            country: updatedUser.country,
            phone: updatedUser.phone,
            company: updatedUser.company,
            profession: updatedUser.profession,
            created_at: updatedUser.created_at,
            business_registration_number: updatedUser.business_registration_number,
            date_of_incorporation: updatedUser.date_of_incorporation,
            college_institute: updatedUser.college_institute,
            student_id: updatedUser.student_id,
            seats: updatedUser.seats,
            ip_address: updatedUser.ip_address
          }),
          sendSlackLeadNotification({
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            country: updatedUser.country,
            company: updatedUser.company,
            profession: updatedUser.profession,
            plan: updatedUser.plan,
            seats: updatedUser.seats,
            businessRegistrationNumber: updatedUser.business_registration_number,
            dateOfIncorporation: updatedUser.date_of_incorporation,
            collegeInstitute: updatedUser.college_institute || updatedUser.university_name,
            universityName: updatedUser.university_name || updatedUser.college_institute,
            studentId: updatedUser.student_id,
            course: updatedUser.course,
            startupName: updatedUser.startup_name,
            startupCountry: updatedUser.startup_country,
            createdAt: updatedUser.created_at,
            source: "plan_selection"
          })
        ]);
      } catch (notifyErr) {
        console.error("[SelectPlan] Notification dispatch error:", notifyErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      lead: updatedUser,
      plan 
    });
  } catch (err: any) {
    console.error("Select plan API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

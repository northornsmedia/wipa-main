import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { session_id, page_url, referrer, device_type, browser, country, network, os, city, region } = await req.json();

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    
    // We don't await the insertion directly to not block the request for long.
    // Actually, in serverless environments, fire-and-forget can sometimes be killed early,
    // but Next.js app router generally allows small promises to finish. 
    // To be safe and compliant, we await it. It's fast enough.
    const { error } = await supabaseAdmin
      .from('analytics_events')
      .insert([
        { session_id, page_url, referrer, device_type, browser, country, network, os, city, region }
      ]);

    if (error) {
      console.error('Analytics tracking error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

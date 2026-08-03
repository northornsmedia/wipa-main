import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { name, email, country, phone } = await req.json();

    const supabase = await createClient();
    
    // Insert new lead
    const { data, error } = await supabase
      .from('onboarding_leads')
      .insert([
        { name, email, country, phone }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving onboarding lead:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ id: data.id });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, journey_stage } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Update existing lead with their journey stage
    const { error } = await supabase
      .from('onboarding_leads')
      .update({ journey_stage })
      .eq('id', id);

    if (error) {
      console.error('Error updating onboarding lead:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

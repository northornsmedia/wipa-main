import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, seats, needs } = await req.json();

    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('enterprise_leads')
      .insert([
        { name, email, phone, company, seats, needs }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving enterprise lead:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ id: data.id });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

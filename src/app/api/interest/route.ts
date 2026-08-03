import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { name, email, country, phone, profession, plan } = await req.json();

    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('interests')
      .insert([
        { name, email, country, phone, profession, plan }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving interest lead:', error);
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
    const { id, payment_status } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { error } = await supabase
      .from('interests')
      .update({ payment_status })
      .eq('id', id);

    if (error) {
      console.error('Error updating interest lead:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

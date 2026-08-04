import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';
import { createClient as createClientRaw } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { plan, name, email, phone, profession, isYearly, interestId } = body;

    // We expect the frontend to pass the base plan name and whether it's yearly
    const planKey = `${plan.trim()} (${isYearly ? 'yearly' : 'monthly'})`;

    // Securely fetch the current price from the database
    const supabase = await createClient();
    const { data: planData, error } = await supabase
      .from('plans')
      .select('price_pence')
      .eq('plan_name', planKey)
      .single();

    if (error || !planData) {
      console.error('Plan fetch error:', error || 'Plan not found');
      return NextResponse.json({ error: 'Invalid plan selected or plan not found in database' }, { status: 400 });
    }
    
    const priceInPence = planData.price_pence;
    const planNameDisplay = plan ? plan.trim() : 'WIPA Membership';

    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('STRIPE_SECRET_KEY is missing. Add it to .env.local');
      return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-07-29.dahlia', // using expected SDK version
    });

    // Determine base URL dynamically
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: planNameDisplay,
              description: `Member: ${name} (${profession})`,
            },
            unit_amount: priceInPence,
            recurring: {
              interval: isYearly ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: email,
      metadata: {
        name,
        email,
        phone,
        profession,
        planKey,
        interestId: interestId || ''
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}${interestId ? '&interestId=' + interestId : ''}&amount=${priceInPence}`,
      cancel_url: `${baseUrl}/cancel${interestId ? '?interestId=' + interestId : ''}`,
    });

    if (interestId) {
      const supabaseAdmin = createClientRaw(
        process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || ''
      );

      const { error: updateError } = await supabaseAdmin
        .from('interests')
        .update({ checkout_session_id: session.id })
        .eq('id', interestId);
      
      if (updateError) {
        console.error('Error saving session ID to database:', updateError);
      }
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const lines = envContent.split('\n');
for (const line of lines) {
  if (line.includes('=')) {
    const parts = line.split('=');
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    process.env[key] = val;
  }
}

const Stripe = require('stripe');
const { Client } = require('pg');

async function backfill() {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.POSTGRES_URL) {
    console.log("Missing STRIPE_SECRET_KEY or POSTGRES_URL");
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-07-29.dahlia' });
  const client = new Client({ 
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to DB.");

    console.log("Fetching recent Stripe sessions...");
    const sessions = await stripe.checkout.sessions.list({ limit: 100 });
    
    let updated = 0;
    for (const session of sessions.data) {
      const email = session.customer_email || (session.customer_details && session.customer_details.email);
      if (email) {
        const res = await client.query('UPDATE public.interests SET checkout_session_id = $1 WHERE email = $2 AND checkout_session_id IS NULL RETURNING id', [session.id, email]);
        if (res.rowCount > 0) {
          console.log(`Updated ${res.rowCount} record(s) for email ${email} with session ${session.id}`);
          updated += res.rowCount;
        }
      }
    }
    console.log(`Done. Updated ${updated} records.`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}
backfill();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
let dbUrl = '';
const lines = envContent.split('\n');
for (const line of lines) {
  if (line.startsWith('POSTGRES_URL=')) {
    dbUrl = line.split('=')[1].trim().replace(/['"]/g, '');
    break;
  }
}

async function main() {
  const client = new Client({
    connectionString: dbUrl
  });

  try {
    await client.connect();
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.analytics_events (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        session_id TEXT NOT NULL,
        page_url TEXT NOT NULL,
        referrer TEXT,
        device_type TEXT,
        browser TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);
    
    console.log("Successfully created analytics_events table.");
    
    await client.query(`
      ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
    `);
    
    await client.query(`
      DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.analytics_events;
      
      CREATE POLICY "Enable insert for anonymous users" 
      ON public.analytics_events 
      FOR INSERT 
      WITH CHECK (true);
    `);
    
    console.log("Successfully configured RLS and policies.");

  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await client.end();
  }
}

main();

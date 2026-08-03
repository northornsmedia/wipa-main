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
      CREATE TABLE IF NOT EXISTS public.enterprise_leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        seats TEXT,
        needs TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);
    
    console.log("Successfully created enterprise_leads table.");
    
    await client.query(`
      ALTER TABLE public.enterprise_leads ENABLE ROW LEVEL SECURITY;
    `);
    
    await client.query(`
      DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.enterprise_leads;
      DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.enterprise_leads;
      
      CREATE POLICY "Enable insert for anonymous users" 
      ON public.enterprise_leads 
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

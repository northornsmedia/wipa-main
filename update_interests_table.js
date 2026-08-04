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
      ALTER TABLE public.interests
      ADD COLUMN IF NOT EXISTS amount_paid NUMERIC(10, 2),
      ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE;
    `);
    
    console.log("Successfully added amount_paid and paid_at columns to interests table.");
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await client.end();
  }
}

main();

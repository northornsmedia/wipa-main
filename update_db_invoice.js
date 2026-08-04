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
      ADD COLUMN IF NOT EXISTS checkout_session_id TEXT;
    `);
    
    console.log("Successfully added checkout_session_id to interests table");
  } catch (err) {
    console.error("Error updating database:", err);
  } finally {
    await client.end();
  }
}

main();

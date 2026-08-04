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
      CREATE OR REPLACE FUNCTION get_pg_stat_activity()
      RETURNS TABLE (
          pid integer,
          usename name,
          application_name text,
          client_addr inet,
          state text,
          query text
      )
      LANGUAGE sql
      SECURITY DEFINER
      AS $$
          SELECT pid, usename, application_name, client_addr, state, query 
          FROM pg_stat_activity 
          WHERE state IS NOT NULL
          LIMIT 30;
      $$;
    `);
    
    console.log("Successfully created get_pg_stat_activity RPC.");
  } catch (err) {
    console.error("Error setting up RPC:", err);
  } finally {
    await client.end();
  }
}

main();

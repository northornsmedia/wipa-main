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
    
    // Check if onboarding or onboarding_leads or onbording exists
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND (table_name LIKE '%onboard%' OR table_name LIKE '%onbord%');
    `);
    
    console.log("Matching tables:", res.rows.map(r => r.table_name));

    if (res.rows.length > 0) {
      const tableName = res.rows[0].table_name;
      const colRes = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1;
      `, [tableName]);
      console.log(`Columns for ${tableName}:`, colRes.rows.map(r => r.column_name));
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();

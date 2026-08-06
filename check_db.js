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
  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'waiting_list'");
  console.log("Columns:", res.rows.map(r => r.column_name).join(", "));
  await client.end();
}
main();

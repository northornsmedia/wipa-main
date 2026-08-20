const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://postgres.zivmqsfppdmfnqpmpglm:0IPhmrtvYFfnt1Ie@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  console.log("Connected to Postgres directly!");

  const countRes = await client.query("SELECT COUNT(*) FROM analytics_events WHERE page_url ILIKE '%localhost%' OR page_url ILIKE '%127.0.0.1%'");
  console.log(`Found ${countRes.rows[0].count} localhost / 127.0.0.1 logs.`);

  const deleteRes = await client.query("DELETE FROM analytics_events WHERE page_url ILIKE '%localhost%' OR page_url ILIKE '%127.0.0.1%'");
  console.log(`Successfully deleted ${deleteRes.rowCount} localhost events!`);

  const remaining = await client.query("SELECT COUNT(*) FROM analytics_events");
  console.log(`Total clean analytics events remaining: ${remaining.rows[0].count}`);

  await client.end();
}

main().catch(console.error);

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read environment variables
let webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || '';
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
let supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf8');
  content.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length > 1) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      if (key === 'GOOGLE_SHEET_WEBHOOK_URL') webhookUrl = val;
      if (key === 'NEXT_PUBLIC_SUPABASE_URL' || key === 'SUPABASE_URL') supabaseUrl = supabaseUrl || val;
      if (key === 'SUPABASE_SERVICE_ROLE_KEY' || key === 'SUPABASE_SECRET_KEY') supabaseKey = supabaseKey || val;
    }
  });
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

async function main() {
  console.log("=================================================");
  console.log("WIPA - Sync Waiting List Leads to Google Sheets");
  console.log("=================================================");

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("\n1. Fetching all waiting list leads from Supabase database...");
  const { data: leads, error } = await supabase
    .from('waiting_list')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Failed to fetch leads from Supabase:", error);
    process.exit(1);
  }

  console.log(`Found ${leads.length} leads in database.`);

  if (!webhookUrl) {
    console.log("\n⚠️  GOOGLE_SHEET_WEBHOOK_URL is not set in .env.local.");
    return;
  }

  console.log(`\n2. Syncing and reformatting Google Sheet via Webhook: ${webhookUrl.substring(0, 45)}...`);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: 'reformat_and_sync',
        leads: leads
      }),
      redirect: "follow"
    });

    const result = await response.json();
    console.log("Webhook Response:", result);

    if (result.success) {
      console.log(`\n✅ SUCCESS! Google Sheet cleanly realigned and populated with ${leads.length} leads.`);
    } else {
      console.error("Webhook reported error:", result.error);
    }
  } catch (err) {
    console.error("Failed to send request to Google Sheet webhook:", err.message);
  }
}

main();

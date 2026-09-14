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
    console.log("\nPlease complete these 3 quick steps to connect Google Sheets:");
    console.log("1. Open: https://docs.google.com/spreadsheets/d/174cg1j5JKWj6w4pfIC8YSe-TuaZduUU3n-uUWKGoJ1I/edit");
    console.log("2. Click Extensions > Apps Script and paste the code from: google_apps_script.js");
    console.log("3. Click Deploy > New deployment > Web app (Who has access: Anyone) > Deploy.");
    console.log("4. Copy the Web App URL and set in .env.local: GOOGLE_SHEET_WEBHOOK_URL=\"your_url\"");
    console.log("5. Re-run this script: node sync_waiting_list_to_sheets.js\n");
    return;
  }

  console.log(`\n2. Syncing ${leads.length} leads to Google Sheets via Webhook: ${webhookUrl}...`);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leads),
      redirect: "follow"
    });

    const result = await response.json();
    console.log("Webhook Response:", result);

    if (result.success) {
      console.log(`\n✅ SUCCESS! All ${leads.length} leads successfully written to Google Sheet.`);
    } else {
      console.error("Webhook reported error:", result.error);
    }
  } catch (err) {
    console.error("Failed to send request to Google Sheet webhook:", err.message);
  }
}

main();

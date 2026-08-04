const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length > 1) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^"|"$/g, '');
  }
});

async function main() {
  console.log("Testing ANON key INSERT...");
  const supabaseAnon = createClient(env.SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data: d1, error: e1 } = await supabaseAnon.from('analytics_events').insert([{ session_id: 'test_123', page_url: '/test' }]);
  console.log("Anon Insert Result:", e1 ? e1.message : 'Success');
}

main();

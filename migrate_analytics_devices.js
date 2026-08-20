const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://zivmqsfppdmfnqpmpglm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppdm1xc2ZwcGRtZm5xcG1wZ2xtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc1MjE5OCwiZXhwIjoyMTAxMzI4MTk4fQ.xu8BIOuvdQF3O5uzRkXoRjbdT1uthg0gJJG9PpfSWmE";

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Updating historical analytics events device_type...");

  // Update Android to Mobile
  const { data: d1, error: e1 } = await supabase
    .from('analytics_events')
    .update({ device_type: 'Mobile' })
    .eq('os', 'Android')
    .select('id');
  
  if (e1) console.error("Error updating Android events:", e1);
  else console.log(`Updated ${d1 ? d1.length : 0} Android events to Mobile.`);

  // Update iOS to Mobile
  const { data: d2, error: e2 } = await supabase
    .from('analytics_events')
    .update({ device_type: 'Mobile' })
    .eq('os', 'iOS')
    .select('id');

  if (e2) console.error("Error updating iOS events:", e2);
  else console.log(`Updated ${d2 ? d2.length : 0} iOS events to Mobile.`);

  console.log("Done!");
}

main().catch(console.error);

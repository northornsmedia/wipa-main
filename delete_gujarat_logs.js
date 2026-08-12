const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://zivmqsfppdmfnqpmpglm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppdm1xc2ZwcGRtZm5xcG1wZ2xtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTc1MjE5OCwiZXhwIjoyMTAxMzI4MTk4fQ.xu8BIOuvdQF3O5uzRkXoRjbdT1uthg0gJJG9PpfSWmE";

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteLogs() {
  console.log("Deleting logs where region is Unknown or Gujarat...");
  
  const { data: dataUnknown, error: errorUnknown } = await supabase
    .from('analytics_events')
    .delete()
    .eq('region', 'Unknown');
    
  if (errorUnknown) {
    console.error("Error deleting Unknown:", errorUnknown);
  } else {
    console.log("Successfully deleted logs with Unknown region");
  }

  const { data: dataGujarat, error: errorGujarat } = await supabase
    .from('analytics_events')
    .delete()
    .eq('region', 'Gujarat');
    
  if (errorGujarat) {
    console.error("Error deleting Gujarat:", errorGujarat);
  } else {
    console.log("Successfully deleted logs with Gujarat region");
  }
}
deleteLogs();

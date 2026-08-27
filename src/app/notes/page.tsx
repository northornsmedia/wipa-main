import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div style={{ padding: '50px', backgroundColor: '#07090e', minHeight: '100vh', color: '#ffffff' }}>
      <h1 className="heading-md" style={{ marginBottom: '20px', color: '#ffffff' }}>Supabase Notes Connection Test</h1>
      
      <div style={{ backgroundColor: '#0d111c', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#ffffff' }}>Raw Data:</h2>
        <pre style={{ backgroundColor: '#07090e', color: '#94a3b8', padding: '20px', borderRadius: '8px', overflowX: 'auto', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {JSON.stringify(notes, null, 2)}
        </pre>
      </div>
    </div>
  );
}

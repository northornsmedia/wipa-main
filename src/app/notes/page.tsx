import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div style={{ padding: '50px', backgroundColor: 'var(--color-pastel-blue)', minHeight: '100vh', color: 'var(--color-black)' }}>
      <h1 className="heading-md" style={{ marginBottom: '20px' }}>Supabase Notes Connection Test</h1>
      
      <div style={{ backgroundColor: 'var(--color-white)', padding: '30px', borderRadius: '16px', border: '3px solid var(--color-black)', boxShadow: '8px 8px 0px var(--color-black)' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>Raw Data:</h2>
        <pre style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', overflowX: 'auto', border: '1px solid #ddd' }}>
          {JSON.stringify(notes, null, 2)}
        </pre>
      </div>
    </div>
  );
}

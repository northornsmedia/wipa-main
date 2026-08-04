import { createClient } from '@supabase/supabase-js';
import AdminDashboardClient from './AdminDashboardClient';

// Ensure this page is not statically cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  // Fetch all leads
  const { data: onboardingLeads } = await supabase
    .from('onboarding_leads')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: interestLeads } = await supabase
    .from('interests')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: enterpriseLeads } = await supabase
    .from('enterprise_leads')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: analyticsEvents } = await supabase
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <AdminDashboardClient 
      onboardingLeads={onboardingLeads || []}
      interestLeads={interestLeads || []}
      enterpriseLeads={enterpriseLeads || []}
      analyticsEvents={analyticsEvents || []}
    />
  );
}

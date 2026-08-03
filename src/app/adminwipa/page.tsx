import { createClient } from '@/utils/supabase/server';
import AdminDashboardClient from './AdminDashboardClient';

// Ensure this page is not statically cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  const supabase = await createClient();

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

import { createClient } from '@supabase/supabase-js';
import AdminDashboardClient from './AdminDashboardClient';
import { cookies } from 'next/headers';

// Ensure this page is not statically cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_auth_token');
  const step1 = cookieStore.get('admin_auth_step_1');
  
  const isFullyAuthenticated = token && token.value === 'fully_authenticated_secret_token';
  const isPartiallyAuthenticated = step1 && step1.value === 'true';

  let analyticsEvents: any[] = [];
  let onboardingLeads: any[] = [];
  let interestLeads: any[] = [];
  let enterpriseLeads: any[] = [];
  let waitingListLeads: any[] = [];

  // ONLY fetch sensitive data if fully authenticated
  if (isFullyAuthenticated) {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    const [
      { data: analytics },
      { data: onboarding },
      { data: interest },
      { data: enterprise },
      { data: waitingList }
    ] = await Promise.all([
      supabaseAdmin.from('analytics_events').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('onboarding_leads').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('interests').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('enterprise_leads').select('*').order('created_at', { ascending: false }),
      supabaseAdmin.from('waiting_list').select('*').order('created_at', { ascending: false })
    ]);

    analyticsEvents = analytics || [];
    onboardingLeads = onboarding || [];
    interestLeads = interest || [];
    enterpriseLeads = enterprise || [];
    waitingListLeads = waitingList || [];
  }

  return (
    <AdminDashboardClient 
      onboardingLeads={onboardingLeads}
      interestLeads={interestLeads}
      enterpriseLeads={enterpriseLeads}
      waitingListLeads={waitingListLeads}
      analyticsEvents={analyticsEvents}
      initialAuthStep={isFullyAuthenticated ? 2 : (isPartiallyAuthenticated ? 1 : 0)}
    />
  );
}

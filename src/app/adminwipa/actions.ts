"use server";
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function verifyPrimaryPassword(password: string) {
  const correct = process.env.ADMIN_PASS_1 || "wipa2026";
  if (password === correct) {
    (await cookies()).set('admin_auth_step_1', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    return { success: true };
  }
  return { success: false };
}

export async function verifySecondaryPassword(password: string) {
  const correct = process.env.ADMIN_PASS_2 || "northon1";
  const cookieStore = await cookies();
  const step1 = cookieStore.get('admin_auth_step_1');
  if (step1 && step1.value === 'true' && password === correct) {
    cookieStore.set('admin_auth_token', 'fully_authenticated_secret_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    return { success: true };
  }
  return { success: false };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth_step_1');
  cookieStore.delete('admin_auth_token');
}

export async function getLiveDatabaseLogs() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_auth_token');
  
  if (!token || token.value !== 'fully_authenticated_secret_token') {
    return { success: false, data: [] };
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const { data, error } = await supabaseAdmin.rpc('get_pg_stat_activity');
  
  if (error) {
    console.error("Error fetching pg_stat_activity:", error);
    return { success: false, data: [] };
  }

  return { success: true, data: data || [] };
}

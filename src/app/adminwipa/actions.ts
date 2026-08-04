"use server";
import { cookies } from 'next/headers';

export async function verifyPrimaryPassword(password: string) {
  const correct = process.env.ADMIN_PASS_1 || "wipa2026";
  if (password === correct) {
    cookies().set('admin_auth_step_1', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    return { success: true };
  }
  return { success: false };
}

export async function verifySecondaryPassword(password: string) {
  const correct = process.env.ADMIN_PASS_2 || "northon1";
  const step1 = cookies().get('admin_auth_step_1');
  if (step1 && step1.value === 'true' && password === correct) {
    cookies().set('admin_auth_token', 'fully_authenticated_secret_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
    return { success: true };
  }
  return { success: false };
}

export async function logoutAdmin() {
  cookies().delete('admin_auth_step_1');
  cookies().delete('admin_auth_token');
}

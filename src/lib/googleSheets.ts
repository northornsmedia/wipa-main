/**
 * Google Sheets synchronization utility for WIPA Waiting List leads.
 * Connects via Google Apps Script Webhook URL configured in GOOGLE_SHEET_WEBHOOK_URL.
 */

export interface WaitingListLead {
  id?: string;
  title?: string | null;
  name: string;
  country?: string | null;
  phone?: string | null;
  email: string;
  company?: string | null;
  profession?: string | null;
  plan?: string | null;
  created_at?: string;
  business_registration_number?: string | null;
  date_of_incorporation?: string | null;
  college_institute?: string | null;
  student_id?: string | null;
  seats?: string | null;
  fingerprint?: string | null;
  ip_address?: string | null;
  action?: 'insert' | 'update_plan';
}

export async function syncLeadToGoogleSheet(lead: WaitingListLead): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim().replace(/^["']|["']$/g, '');

  if (!webhookUrl) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL is not configured in environment variables. Skipping Google Sheet sync.");
    return { success: false, error: "GOOGLE_SHEET_WEBHOOK_URL missing" };
  }

  console.log(`[GoogleSheetSync] Sending lead to webhook: ${webhookUrl.substring(0, 45)}...`);

  try {
    const payload = {
      action: lead.action || 'insert',
      id: lead.id || '',
      created_at: lead.created_at || new Date().toISOString(),
      title: lead.title || '',
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone ? (String(lead.phone).trim().startsWith('+') ? `'${String(lead.phone).trim()}` : String(lead.phone).trim()) : '',
      country: lead.country || '',
      company: lead.company || '',
      profession: lead.profession || '',
      plan: lead.plan || '',
      business_registration_number: lead.business_registration_number || '',
      date_of_incorporation: lead.date_of_incorporation || '',
      college_institute: lead.college_institute || '',
      student_id: lead.student_id || '',
      seats: lead.seats || '',
      ip_address: lead.ip_address || ''
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Sheet sync failed (${response.status}):`, errorText);
      return { success: false, error: errorText };
    }

    const result = await response.json().catch(() => ({ success: true }));
    return { success: true };
  } catch (err: any) {
    console.error("Error syncing lead to Google Sheet:", err);
    return { success: false, error: err.message || "Network error" };
  }
}

/**
 * Slack Notification Integration for WIPA Leads
 * Sends formatted Slack messages to a designated channel via Incoming Webhook.
 */

export interface LeadNotificationData {
  title?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  company?: string | null;
  profession?: string | null;
  plan?: string | null;
  seats?: string | number | null;
  businessRegistrationNumber?: string | null;
  dateOfIncorporation?: string | null;
  collegeInstitute?: string | null;
  studentId?: string | null;
  createdAt?: string;
  source?: "waiting_list" | "plan_selection" | "pricing_unlock";
}

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/174cg1j5JKWj6w4pfIC8YSe-TuaZduUU3n-uUWKGoJ1I/edit";

export async function sendSlackLeadNotification(lead: LeadNotificationData): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    // Slack notifications not configured yet
    return false;
  }

  try {
    const fullName = [lead.title, lead.name].filter(Boolean).join(" ");
    const planDisplay = lead.plan ? `⭐ *${lead.plan}*` : "_Plan pending / Not selected yet_";
    const companyDisplay = lead.company || "_Not provided_";
    const professionDisplay = lead.profession || "_Not provided_";
    const phoneDisplay = lead.phone || "_Not provided_";
    const countryDisplay = lead.country || "_Not provided_";
    const timeDisplay = lead.createdAt 
      ? new Date(lead.createdAt).toLocaleString("en-GB", { timeZone: "UTC", dateStyle: "medium", timeStyle: "short" }) + " UTC"
      : new Date().toLocaleString("en-GB", { timeZone: "UTC", dateStyle: "medium", timeStyle: "short" }) + " UTC";

    let titleText = "🎯 *New Lead Alert — WIPA Waiting List*";
    if (lead.source === "plan_selection") {
      titleText = "⚡ *Lead Plan Selected / Updated — WIPA*";
    } else if (lead.source === "pricing_unlock") {
      titleText = "🔓 *New Pricing Unlock Lead — WIPA*";
    }

    const blocks: any[] = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: lead.source === "plan_selection" ? "⚡ Lead Updated Plan" : "🎯 New Lead Received!",
          emoji: true
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${titleText}\nA new lead has just registered on WIPA:`
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*👤 Name:*\n${fullName}`
          },
          {
            type: "mrkdwn",
            text: `*📧 Email:*\n${lead.email}`
          },
          {
            type: "mrkdwn",
            text: `*📞 Phone:*\n${phoneDisplay}`
          },
          {
            type: "mrkdwn",
            text: `*🌍 Country:*\n${countryDisplay}`
          },
          {
            type: "mrkdwn",
            text: `*🏢 Company:*\n${companyDisplay}`
          },
          {
            type: "mrkdwn",
            text: `*💼 Profession:*\n${professionDisplay}`
          },
          {
            type: "mrkdwn",
            text: `*🏷️ Plan:*\n${planDisplay}`
          },
          {
            type: "mrkdwn",
            text: `*🕒 Time:*\n${timeDisplay}`
          }
        ]
      }
    ];

    // Optional fields if provided
    const extraDetails: string[] = [];
    if (lead.seats) extraDetails.push(`• *Seats:* ${lead.seats}`);
    if (lead.businessRegistrationNumber) extraDetails.push(`• *Business Reg No:* ${lead.businessRegistrationNumber}`);
    if (lead.dateOfIncorporation) extraDetails.push(`• *Date of Incorporation:* ${lead.dateOfIncorporation}`);
    if (lead.collegeInstitute) extraDetails.push(`• *College / Institute:* ${lead.collegeInstitute}`);
    if (lead.studentId) extraDetails.push(`• *Student ID:* ${lead.studentId}`);

    if (extraDetails.length > 0) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Additional Information:*\n${extraDetails.join("\n")}`
        }
      });
    }

    // Action buttons
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "📊 Open Google Sheet",
            emoji: true
          },
          url: GOOGLE_SHEET_URL,
          style: "primary"
        }
      ]
    });

    blocks.push({
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `WIPA Real-Time Lead Notification • <${GOOGLE_SHEET_URL}|View Spreadsheet>`
        }
      ]
    });

    const payload = {
      text: `🎯 New WIPA Lead: ${fullName} (${lead.email})`,
      blocks: blocks
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to send Slack notification:", res.status, errText);
      return false;
    }

    return true;
  } catch (err: any) {
    console.error("Slack notification error:", err?.message || err);
    return false;
  }
}

const fs = require('fs');

let webhookUrl = process.env.SLACK_WEBHOOK_URL || '';

if (fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf8');
  content.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length > 1 && parts[0].trim() === 'SLACK_WEBHOOK_URL') {
      webhookUrl = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

if (!webhookUrl) {
  console.log("=================================================");
  console.log("⚠️  SLACK_WEBHOOK_URL is not set in .env.local");
  console.log("=================================================");
  console.log("\nQuick setup in 3 easy steps:");
  console.log("1. Go to: https://api.slack.com/apps (or Slack App Directory > Incoming Webhooks)");
  console.log("2. Click 'Create New App' > 'From scratch' > Give it a name (e.g. 'WIPA Leads Alert') and pick your Workspace.");
  console.log("3. Click 'Incoming Webhooks' > Turn toggle ON > Click 'Add New Webhook to Workspace' > Pick your manager's channel.");
  console.log("4. Copy the Webhook URL and add to .env.local:");
  console.log("   SLACK_WEBHOOK_URL=\"https://hooks.slack.com/services/...\"");
  console.log("5. Re-run: node test_slack_notification.js\n");
  process.exit(1);
}

console.log("Sending test lead notification to Slack...");

const payload = {
  text: "🎯 Test Lead Notification: John Doe (john.doe@example.com)",
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🎯 New Lead Received! (Test Notification)",
        emoji: true
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*🎯 New Lead Alert — WIPA Waiting List*\nThis is a test notification confirming Slack integration is active:"
      }
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: "*👤 Name:*\nMr. John Doe" },
        { type: "mrkdwn", text: "*📧 Email:*\njohn.doe@example.com" },
        { type: "mrkdwn", text: "*📞 Phone:*\n+44 7123456789" },
        { type: "mrkdwn", text: "*🌍 Country:*\nUnited Kingdom (+44)" },
        { type: "mrkdwn", text: "*🏢 Company:*\nAcme Legal Partners" },
        { type: "mrkdwn", text: "*💼 Profession:*\nPatent Attorney" },
        { type: "mrkdwn", text: "*🏷️ Plan:*\n⭐ *Enterprise Membership*" },
        { type: "mrkdwn", text: `*🕒 Time:*\n${new Date().toISOString()}` }
      ]
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "📊 Open Google Sheet",
            emoji: true
          },
          url: "https://docs.google.com/spreadsheets/d/174cg1j5JKWj6w4pfIC8YSe-TuaZduUU3n-uUWKGoJ1I/edit",
          style: "primary"
        }
      ]
    }
  ]
};

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
  .then(res => {
    if (res.ok) {
      console.log("✅ SUCCESS! Test lead alert received in Slack.");
    } else {
      res.text().then(text => console.error("❌ Slack returned error:", res.status, text));
    }
  })
  .catch(err => console.error("❌ Failed to reach Slack:", err.message));

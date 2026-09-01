"use client";

// Generates a robust client-side device fingerprint
export async function getDeviceFingerprint(): Promise<{
  fingerprint: string;
  deviceInfo: {
    deviceType: string;
    browser: string;
    os: string;
    screenResolution: string;
    colorDepth: number;
    timezone: string;
    language: string;
    hardwareConcurrency?: number;
    deviceMemory?: number;
    platform: string;
    touchSupport: boolean;
  };
}> {
  if (typeof window === "undefined") {
    return {
      fingerprint: "server",
      deviceInfo: {
        deviceType: "Unknown",
        browser: "Unknown",
        os: "Unknown",
        screenResolution: "0x0",
        colorDepth: 0,
        timezone: "UTC",
        language: "en",
        platform: "server",
        touchSupport: false,
      }
    };
  }

  const nav = window.navigator;
  const screen = window.screen;
  const userAgent = nav.userAgent;

  // OS detection
  let os = "Unknown";
  const ua = userAgent.toLowerCase();
  if (ua.includes("win")) os = "Windows";
  else if (ua.includes("mac")) os = (nav.maxTouchPoints && nav.maxTouchPoints > 1) ? "iOS" : "macOS";
  else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) os = "iOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("linux")) os = "Linux";

  // Browser detection
  let browser = "Unknown";
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("chrome") || ua.includes("crios")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("opera") || ua.includes("opr")) browser = "Opera";

  // Device Type
  let deviceType = "Desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceType = "Tablet";
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    deviceType = "Mobile";
  }

  // Timezone & Language
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
  const language = nav.language || "en";
  const screenResolution = `${screen.width}x${screen.height}`;
  const colorDepth = screen.colorDepth || 24;
  const hardwareConcurrency = nav.hardwareConcurrency;
  const deviceMemory = (nav as any).deviceMemory;
  const platform = nav.platform || "Unknown";
  const touchSupport = Boolean(nav.maxTouchPoints && nav.maxTouchPoints > 0);

  // Canvas Fingerprint
  let canvasHash = "";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText("WIPA-Identity-2026", 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText("WIPA-Identity-2026", 4, 17);
      canvasHash = canvas.toDataURL();
    }
  } catch (e) {
    canvasHash = "canvas-disabled";
  }

  // Persistent ID in localStorage / Cookie
  let persistentId = localStorage.getItem("wipa_device_fingerprint");
  if (!persistentId) {
    persistentId = "fp_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem("wipa_device_fingerprint", persistentId);
  }

  // Combine components into a hash string
  const rawString = `${persistentId}|${screenResolution}|${colorDepth}|${timezone}|${language}|${os}|${browser}|${hardwareConcurrency}|${deviceMemory}|${platform}|${touchSupport}|${canvasHash.substring(0, 100)}`;
  
  // Simple fast string hash
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const uniqueFingerprint = `${persistentId}_${Math.abs(hash).toString(36)}`;

  return {
    fingerprint: uniqueFingerprint,
    deviceInfo: {
      deviceType,
      browser,
      os,
      screenResolution,
      colorDepth,
      timezone,
      language,
      hardwareConcurrency,
      deviceMemory,
      platform,
      touchSupport,
    }
  };
}

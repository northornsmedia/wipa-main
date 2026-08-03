"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getBrowser(userAgent: string) {
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("SamsungBrowser")) return "Samsung Internet";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  if (userAgent.includes("Trident")) return "Internet Explorer";
  if (userAgent.includes("Edge")) return "Edge (Legacy)";
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  return "Unknown";
}

function getDeviceType(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
  return "Desktop";
}

function generateSessionId() {
  const existing = sessionStorage.getItem("wipa_session_id");
  if (existing) return existing;
  const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem("wipa_session_id", newId);
  return newId;
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = generateSessionId();
        const userAgent = window.navigator.userAgent;
        
        // Don't track if they are on the admin page
        if (pathname?.startsWith('/adminwipa')) return;

        const payload = {
          session_id: sessionId,
          page_url: window.location.href,
          referrer: document.referrer || "Direct",
          device_type: getDeviceType(userAgent),
          browser: getBrowser(userAgent),
        };

        // Use fetch with keepalive if possible so it doesn't block navigation,
        // or just a normal fetch.
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          keepalive: true
        });
      } catch (err) {
        // Silently fail for analytics to not disturb user experience
        console.error("Analytics error", err);
      }
    };

    trackPageView();
  }, [pathname, searchParams]);

  return null; // Invisible component
}

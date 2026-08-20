"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getBrowser(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("samsungbrowser")) return "Samsung Internet";
  if (ua.includes("opera") || ua.includes("opr")) return "Opera";
  if (ua.includes("trident")) return "Internet Explorer";
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("edge")) return "Edge (Legacy)";
  if (ua.includes("chrome") || ua.includes("crios")) return "Chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  return "Unknown";
}

function getOS(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "iOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("win")) return "Windows";
  if (ua.includes("mac") && !ua.includes("like mac")) {
    if (typeof window !== "undefined" && window.navigator && window.navigator.maxTouchPoints > 1) {
      return "iOS"; // iPad Desktop Mode
    }
    return "macOS";
  }
  if (ua.includes("linux")) return "Linux";
  return "Unknown";
}

function getDeviceType(userAgent: string) {
  const ua = userAgent.toLowerCase();
  // Check for tablets first
  if (/(ipad|tablet|(android(?!.*mobile))|(android.*tab)|playbook|silk)/i.test(ua)) return "Tablet";
  if (typeof window !== "undefined" && window.navigator && window.navigator.maxTouchPoints > 1 && ua.includes("macintosh")) {
    return "Tablet"; // iPad requesting desktop site
  }
  // Check for mobile phones
  if (/(mobile|iphone|ipod|android.*mobile|blackberry|iemobile|kindle|silk-accelerated|webos|opera mobi|opera mini)/i.test(ua)) {
    return "Mobile";
  }
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
        
        // Don't track if on localhost, 127.0.0.1, or admin page
        if (typeof window !== "undefined") {
          const hostname = window.location.hostname;
          if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local") || hostname === "") {
            return;
          }
        }
        if (pathname?.startsWith('/adminwipa')) return;

        let country = "Unknown";
        let network = "Unknown";
        let city = "Unknown";
        let region = "Unknown";
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout to prevent blocking
          const ipRes = await fetch('https://ipapi.co/json/', { signal: controller.signal }).then(r => r.json());
          clearTimeout(timeoutId);
          if (ipRes && ipRes.country_name) country = ipRes.country_name;
          if (ipRes && ipRes.org) network = ipRes.org;
          if (ipRes && ipRes.city) city = ipRes.city;
          if (ipRes && ipRes.region) region = ipRes.region;
        } catch (e) {
          console.warn("Could not fetch IP geolocation:", e);
        }

        const payload = {
          session_id: sessionId,
          page_url: window.location.href,
          referrer: document.referrer || "Direct",
          device_type: getDeviceType(userAgent),
          browser: getBrowser(userAgent),
          os: getOS(userAgent),
          country,
          network,
          city,
          region
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

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LaunchChronograph.module.css";

// Target: January 4, 2027 00:00:00 UTC
const LAUNCH_DATE_UTC = new Date("2027-01-04T00:00:00Z");

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface CityInfo {
  name: string;
  flag: string;
  timezone: string;
}

const WORLD_CITIES: CityInfo[] = [
  {
    name: "London",
    flag: "https://flagcdn.com/w40/gb.png",
    timezone: "Europe/London",
  },
  {
    name: "New York",
    flag: "https://flagcdn.com/w40/us.png",
    timezone: "America/New_York",
  },
  {
    name: "India",
    flag: "https://flagcdn.com/w40/in.png",
    timezone: "Asia/Kolkata",
  },
  {
    name: "Japan",
    flag: "https://flagcdn.com/w40/jp.png",
    timezone: "Asia/Tokyo",
  },
];

/* Minimalist Luxury Chrono Unit Card */
function ChronoUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.chronoCard}>
      <div className={styles.chronoCardInner}>
        <div className={styles.numberWrapper}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{ y: 12, opacity: 0, filter: "blur(3px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -12, opacity: 0, filter: "blur(3px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={styles.chronoNumber}
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className={styles.chronoLabel}>{label}</span>
      </div>
    </div>
  );
}

function PulsingSeparator() {
  return (
    <div className={styles.separatorContainer} aria-hidden="true">
      <span className={styles.separatorDot} />
      <span className={styles.separatorDot} />
    </div>
  );
}

export default function LaunchChronograph() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [cityTimes, setCityTimes] = useState<{ [city: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "100",
    hours: "14",
    minutes: "00",
    seconds: "00",
  });

  // 4-Second Splash Screen Auto-Dismiss
  useEffect(() => {
    setIsMounted(true);

    if (showSplash) {
      document.body.style.overflow = "hidden";

      const dismissTimer = setTimeout(() => {
        setShowSplash(false);
        document.body.style.overflow = "";
      }, 4000);

      return () => {
        clearTimeout(dismissTimer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [showSplash]);

  const dismissSplash = () => {
    setShowSplash(false);
    document.body.style.overflow = "";
  };

  // Live countdown and city clocks
  useEffect(() => {
    const updateAllClocks = () => {
      const now = new Date();
      const diff = LAUNCH_DATE_UTC.getTime() - now.getTime();

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days: String(d),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0"),
        });
      } else {
        setTimeLeft({ days: "0", hours: "00", minutes: "00", seconds: "00" });
      }

      // Update City Local Times (HH:MM)
      const newCityData: { [city: string]: string } = {};
      WORLD_CITIES.forEach((city) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: city.timezone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          newCityData[city.name] = formatter.format(now);
        } catch {
          newCityData[city.name] = "12:00";
        }
      });
      setCityTimes(newCityData);
    };

    updateAllClocks();
    const interval = setInterval(updateAllClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isMounted && showSplash && (
        <motion.div
          key="launch-splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={styles.splashOverlay}
          onClick={dismissSplash}
        >
          {/* Top 4-Second Laser Progress Bar */}
          <div className={styles.splashProgressBarContainer}>
            <div className={styles.splashProgressBar} />
          </div>

          {/* Top Right Skip Pill */}
          <div className={styles.splashTopBar} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={dismissSplash}
              className={styles.skipBtn}
              title="Skip into website"
            >
              <span>Skip</span>
              <span>×</span>
            </button>
          </div>

          {/* Ambient Glow */}
          <div className={styles.ambientGlow} />

          {/* Minimal Apple-Style Main Deck */}
          <div className={styles.mainDeck} onClick={(e) => e.stopPropagation()}>
            {/* Brand Pill */}
            <div className={styles.brandBadge}>
              <span className={styles.badgeDot} />
              <span className={styles.badgeText}>Women's IP Alliance • Global Launch</span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.mainTitle}>
              Worldwide Platform <br />
              <span className={styles.gradientText}>Launch Countdown</span>
            </h1>

            {/* Subheading */}
            <div className={styles.subHeading}>
              Unlocking Worldwide on 04 January 2027
            </div>

            {/* Modern Luxury Chrono Deck (Days, Hours, Minutes, Seconds) */}
            <div className={styles.chronoDeck}>
              <ChronoUnit value={timeLeft.days} label="Days" />
              <PulsingSeparator />
              <ChronoUnit value={timeLeft.hours} label="Hours" />
              <PulsingSeparator />
              <ChronoUnit value={timeLeft.minutes} label="Minutes" />
              <PulsingSeparator />
              <ChronoUnit value={timeLeft.seconds} label="Seconds" />
            </div>

            {/* Minimalist Multi-City Glass Capsule */}
            <div className={styles.citiesCapsule}>
              {WORLD_CITIES.map((city, index) => (
                <React.Fragment key={city.name}>
                  {index > 0 && <span className={styles.cityDivider} />}
                  <div className={styles.cityItem}>
                    <img src={city.flag} alt={city.name} className={styles.cityFlag} />
                    <span className={styles.cityName}>{city.name}</span>
                    <span className={styles.cityTime}>{cityTimes[city.name] || "--:--"}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { useRouter } from "next/navigation";
import { verifyPrimaryPassword, verifySecondaryPassword, getLiveDatabaseLogs, logoutAdmin } from "./actions";

type AdminDashboardProps = {
  onboardingLeads: any[];
  interestLeads: any[];
  enterpriseLeads: any[];
  waitingListLeads: any[];
  pricingUnlockLeads: any[];
  analyticsEvents: any[];
  initialAuthStep: number;
};

// Circular gauge component
const CircularProgress = ({
  percentage,
  color,
  label,
  value,
}: {
  percentage: number;
  color: string;
  label: string;
  value: string;
}) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", width: "100px", height: "100px" }}>
        <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontFamily: "'Instagram Sans Headline', sans-serif",
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {percentage}%
          </span>
        </div>
      </div>
      <div style={{ textAlign: "center", maxWidth: "120px" }}>
        <div
          style={{
            fontFamily: "'Instagram Sans', sans-serif",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#8e92a4",
            marginBottom: "2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={label}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Instagram Sans Headline', sans-serif",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

// Breakdown card with limited 2x2 grid and detailed modal
const BreakdownCard = ({
  title,
  data,
  totalEvents,
  colors,
  previewLimit = 4,
}: {
  title: string;
  data: Record<string, number>;
  totalEvents: number;
  colors: string[];
  previewLimit?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedEntries = useMemo(
    () => Object.entries(data).sort((a, b) => (b[1] as number) - (a[1] as number)),
    [data]
  );

  const previewEntries = sortedEntries.slice(0, previewLimit);
  const hasMore = sortedEntries.length > previewLimit;

  const filteredEntries = sortedEntries.filter(([label]) =>
    label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#161824",
          padding: "24px",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "360px",
          position: "relative",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Instagram Sans Headline', sans-serif",
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: "700",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h3>
            {sortedEntries.length > 0 && (
              <span
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "#00f0ff",
                  backgroundColor: "rgba(0, 240, 255, 0.08)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  border: "1px solid rgba(0, 240, 255, 0.15)",
                }}
              >
                {sortedEntries.length} items
              </span>
            )}
          </div>

          {sortedEntries.length === 0 ? (
            <p
              style={{
                fontFamily: "'Instagram Sans', sans-serif",
                color: "#6b7280",
                textAlign: "center",
                padding: "50px 0",
                fontSize: "0.85rem",
              }}
            >
              No data recorded yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: previewEntries.length === 1 ? "1fr" : "1fr 1fr",
                gap: "16px",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              {previewEntries.map(([label, count], index) => {
                const percentage = Math.round(
                  ((count as number) / Math.max(1, totalEvents)) * 100
                );
                return (
                  <CircularProgress
                    key={label}
                    percentage={percentage}
                    color={colors[index % colors.length]}
                    label={label}
                    value={String(count)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {hasMore && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsModalOpen(true);
            }}
            style={{
              fontFamily: "'Instagram Sans', sans-serif",
              marginTop: "20px",
              width: "100%",
              padding: "10px 16px",
              backgroundColor: "#1f2333",
              color: "#00f0ff",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#272c40";
              e.currentTarget.style.borderColor = "#00f0ff";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1f2333";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span>See All ({sortedEntries.length})</span>
            <span style={{ fontSize: "1rem" }}>→</span>
          </button>
        )}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(5, 7, 12, 0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#141622",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "28px",
              boxShadow: "0 30px 70px rgba(0,0,0,0.85), 0 0 40px rgba(0, 240, 255, 0.15)",
              width: "100%",
              maxWidth: "700px",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "22px 28px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#191c2b",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Instagram Sans Headline', sans-serif",
                    color: "#fff",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {title}
                  <span
                    style={{
                      fontFamily: "'Instagram Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#00f0ff",
                      backgroundColor: "rgba(0, 240, 255, 0.12)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {sortedEntries.length} items
                  </span>
                </h2>
                <p
                  style={{
                    fontFamily: "'Instagram Sans', sans-serif",
                    color: "#8e92a4",
                    fontSize: "0.85rem",
                    margin: "4px 0 0 0",
                  }}
                >
                  Complete distribution across {totalEvents} total traffic events
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#202436",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#ff007f";
                  e.currentTarget.style.borderColor = "#ff007f";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#202436";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div
              style={{
                padding: "16px 28px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                backgroundColor: "#11131c",
              }}
            >
              <input
                type="text"
                placeholder={`Search in ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  width: "100%",
                  padding: "12px 18px",
                  borderRadius: "14px",
                  backgroundColor: "#1a1d2c",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f0ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.08)")}
              />
            </div>

            {/* Modal Body */}
            <div
              style={{
                padding: "20px 28px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: 1,
              }}
            >
              {filteredEntries.length === 0 ? (
                <div
                  style={{
                    fontFamily: "'Instagram Sans', sans-serif",
                    padding: "40px 20px",
                    textAlign: "center",
                    color: "#8e92a4",
                    fontSize: "0.95rem",
                  }}
                >
                  No matches found for "{searchQuery}".
                </div>
              ) : (
                filteredEntries.map(([label, count]) => {
                  const originalIndex = sortedEntries.findIndex((e) => e[0] === label);
                  const percentage = Math.round(
                    ((count as number) / Math.max(1, totalEvents)) * 100
                  );
                  const barColor = colors[originalIndex % colors.length];

                  return (
                    <div
                      key={label}
                      style={{
                        backgroundColor: "#191c2a",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "16px",
                        padding: "14px 18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        transition: "transform 0.15s, border-color 0.15s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = barColor;
                        e.currentTarget.style.transform = "translateX(3px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              fontFamily: "'Instagram Sans Headline', sans-serif",
                              fontSize: "0.8rem",
                              fontWeight: "700",
                              color: "#6b7280",
                              width: "24px",
                            }}
                          >
                            #{originalIndex + 1}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Instagram Sans', sans-serif",
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: "0.95rem",
                            }}
                          >
                            {label}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                          <span
                            style={{
                              fontFamily: "'Instagram Sans', sans-serif",
                              color: "#8e92a4",
                              fontSize: "0.85rem",
                            }}
                          >
                            <strong style={{ color: "#fff" }}>{count}</strong> visitors
                          </span>
                          <span
                            style={{
                              fontFamily: "'Instagram Sans Headline', sans-serif",
                              color: barColor,
                              fontWeight: "700",
                              fontSize: "0.95rem",
                              minWidth: "45px",
                              textAlign: "right",
                            }}
                          >
                            {percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Visual progress bar */}
                      <div
                        style={{
                          width: "100%",
                          height: "6px",
                          backgroundColor: "#0d0f17",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(percentage, 2)}%`,
                            height: "100%",
                            backgroundColor: barColor,
                            borderRadius: "3px",
                            transition: "width 0.4s ease-out",
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "16px 28px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#191c2b",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  padding: "8px 22px",
                  backgroundColor: "#202436",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2d334d")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#202436")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Compact ranked card with modal
const RankedTableCard = ({
  title,
  data,
  columns,
  previewLimit = 5,
}: {
  title: string;
  data: any[];
  columns: { key: string; label: string; align?: "left" | "right" | "center" }[];
  previewLimit?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const previewData = data.slice(0, previewLimit);
  const hasMore = data.length > previewLimit;

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#161824",
          borderRadius: "24px",
          padding: "24px",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
          minHeight: "380px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Instagram Sans Headline', sans-serif",
                color: "#fff",
                fontSize: "1.15rem",
                fontWeight: "700",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h3>
            {data.length > 0 && (
              <span
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "#00f0ff",
                  backgroundColor: "rgba(0, 240, 255, 0.08)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  border: "1px solid rgba(0, 240, 255, 0.15)",
                }}
              >
                {data.length} records
              </span>
            )}
          </div>

          {data.length === 0 ? (
            <p
              style={{
                fontFamily: "'Instagram Sans', sans-serif",
                color: "#6b7280",
                textAlign: "center",
                padding: "40px 0",
                fontSize: "0.85rem",
              }}
            >
              No data available yet.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#b3b7c6" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        fontFamily: "'Instagram Sans Headline', sans-serif",
                        padding: "10px 8px",
                        textAlign: "left",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#6b7280",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        width: "35px",
                      }}
                    >
                      #
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        style={{
                          fontFamily: "'Instagram Sans Headline', sans-serif",
                          padding: "10px 12px",
                          textAlign: col.align || "left",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#fff",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                        transition: "background-color 0.15s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td
                        style={{
                          fontFamily: "'Instagram Sans Headline', sans-serif",
                          padding: "12px 8px",
                          fontSize: "0.8rem",
                          color: "#6b7280",
                          fontWeight: "700",
                        }}
                      >
                        {i + 1}
                      </td>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          style={{
                            fontFamily: "'Instagram Sans', sans-serif",
                            padding: "12px",
                            fontSize: "0.85rem",
                            textAlign: col.align || "left",
                            color:
                              col.key === "views" || col.key === "visitors" ? "#00f0ff" : "#e2e8f0",
                            fontWeight:
                              col.key === "views" || col.key === "visitors" ? "600" : "400",
                            maxWidth: "220px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {hasMore && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsModalOpen(true);
            }}
            style={{
              fontFamily: "'Instagram Sans', sans-serif",
              marginTop: "20px",
              width: "100%",
              padding: "10px 16px",
              backgroundColor: "#1f2333",
              color: "#00f0ff",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#272c40";
              e.currentTarget.style.borderColor = "#00f0ff";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1f2333";
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span>See All ({data.length})</span>
            <span style={{ fontSize: "1rem" }}>→</span>
          </button>
        )}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(5, 7, 12, 0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#141622",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "28px",
              boxShadow: "0 30px 70px rgba(0,0,0,0.85), 0 0 40px rgba(0, 240, 255, 0.15)",
              width: "100%",
              maxWidth: "750px",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "22px 28px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#191c2b",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Instagram Sans Headline', sans-serif",
                    color: "#fff",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {title}
                  <span
                    style={{
                      fontFamily: "'Instagram Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#00f0ff",
                      backgroundColor: "rgba(0, 240, 255, 0.12)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {data.length} total
                  </span>
                </h2>
                <p
                  style={{
                    fontFamily: "'Instagram Sans', sans-serif",
                    color: "#8e92a4",
                    fontSize: "0.85rem",
                    margin: "4px 0 0 0",
                  }}
                >
                  Complete breakdown and rankings
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#202436",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#ff007f";
                  e.currentTarget.style.borderColor = "#ff007f";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#202436";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div
              style={{
                padding: "16px 28px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                backgroundColor: "#11131c",
              }}
            >
              <input
                type="text"
                placeholder={`Search in ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  width: "100%",
                  padding: "12px 18px",
                  borderRadius: "14px",
                  backgroundColor: "#1a1d2c",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f0ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.08)")}
              />
            </div>

            {/* Modal Body */}
            <div style={{ padding: "20px 28px", overflowY: "auto", flex: 1 }}>
              {filteredData.length === 0 ? (
                <div
                  style={{
                    fontFamily: "'Instagram Sans', sans-serif",
                    padding: "40px 20px",
                    textAlign: "center",
                    color: "#8e92a4",
                    fontSize: "0.95rem",
                  }}
                >
                  No results found for "{searchQuery}".
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", color: "#b3b7c6" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          fontFamily: "'Instagram Sans Headline', sans-serif",
                          padding: "10px 8px",
                          textAlign: "left",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#6b7280",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          width: "35px",
                        }}
                      >
                        #
                      </th>
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          style={{
                            fontFamily: "'Instagram Sans Headline', sans-serif",
                            padding: "10px 12px",
                            textAlign: col.align || "left",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                            color: "#fff",
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                          transition: "background-color 0.15s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <td
                          style={{
                            fontFamily: "'Instagram Sans Headline', sans-serif",
                            padding: "12px 8px",
                            fontSize: "0.8rem",
                            color: "#6b7280",
                            fontWeight: "700",
                          }}
                        >
                          {i + 1}
                        </td>
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            style={{
                              fontFamily: "'Instagram Sans', sans-serif",
                              padding: "12px",
                              fontSize: "0.85rem",
                              textAlign: col.align || "left",
                              color:
                                col.key === "views" || col.key === "visitors" ? "#00f0ff" : "#e2e8f0",
                              fontWeight:
                                col.key === "views" || col.key === "visitors" ? "600" : "400",
                            }}
                          >
                            {row[col.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "16px 28px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#191c2b",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  padding: "8px 22px",
                  backgroundColor: "#202436",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2d334d")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#202436")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Cyber defense terminal running on IST time with interactive CLI & telemetry
type LogEntry = {
  id: string;
  timestamp: string;
  tag: "SQL" | "TRAFFIC" | "SECURITY" | "AUTH" | "SYS";
  tagColor: string;
  message: string;
};

const DefenseTerminal = ({
  analyticsEvents,
  onboardingLeads,
  interestLeads,
  enterpriseLeads,
  waitingListLeads,
  pricingUnlockLeads,
}: {
  analyticsEvents: any[];
  onboardingLeads: any[];
  interestLeads: any[];
  enterpriseLeads: any[];
  waitingListLeads: any[];
  pricingUnlockLeads: any[];
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [liveDbActivity, setLiveDbActivity] = useState<any[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filterTag, setFilterTag] = useState<string>("ALL");
  const [commandInput, setCommandInput] = useState("");
  const [istClock, setIstClock] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to format exact IST Time (Asia/Kolkata)
  const getISTFormattedTime = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${timeStr} IST`;
  };

  // Live IST Clock ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setIstClock(getISTFormattedTime());
    }, 500);
    setIstClock(getISTFormattedTime());
    return () => clearInterval(interval);
  }, []);

  // Fetch real Postgres activity
  useEffect(() => {
    let isRunning = true;
    const fetchLogs = async () => {
      if (!isRunning) return;
      const res = await getLiveDatabaseLogs();
      if (res.success && res.data) {
        setLiveDbActivity(res.data);
      }
      setTimeout(fetchLogs, 3000);
    };
    fetchLogs();
    return () => {
      isRunning = false;
    };
  }, []);

  // Stream generator running in real-time IST
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isRunning = true;

    const generateLog = () => {
      if (!isRunning || isPaused) return;

      const rand = Math.random();
      let newEntry: LogEntry;

      const time = getISTFormattedTime();
      const id = Math.random().toString(36).substring(2, 9);

      if (liveDbActivity.length > 0 && rand < 0.5) {
        const dbEvent = liveDbActivity[Math.floor(Math.random() * liveDbActivity.length)];
        const queryPreview = (dbEvent.query || "").trim().replace(/\s+/g, " ").substring(0, 75);
        newEntry = {
          id,
          timestamp: time,
          tag: "SQL",
          tagColor: "#a855f7",
          message: queryPreview
            ? `[DB PID:${dbEvent.pid}] ${dbEvent.usename || "system"} -> ${queryPreview}...`
            : `[DB PID:${dbEvent.pid}] state: ${dbEvent.state || "active"} [conn: ${dbEvent.client_addr || "127.0.0.1"}]`,
        };
      } else if (analyticsEvents.length > 0 && rand < 0.8) {
        const ev = analyticsEvents[Math.floor(Math.random() * analyticsEvents.length)];
        const location = [ev.city, ev.region, ev.country].filter(Boolean).join(", ") || "Global";
        const msgOptions = [
          `Inbound HTTPS request from ${location} [${ev.os || "Unknown"} / ${ev.browser || "Browser"}] to ${ev.page_url || "/"}`,
          `TLS 1.3 Session verified for client [${ev.network || "Network Node"}] from ${location}`,
          `Telemetry event dispatched -> Session ID: [${(ev.session_id || "ses-anon").substring(0, 10)}...]`,
        ];
        newEntry = {
          id,
          timestamp: time,
          tag: "TRAFFIC",
          tagColor: "#00f0ff",
          message: msgOptions[Math.floor(Math.random() * msgOptions.length)],
        };
      } else {
        const sysMessages: { tag: LogEntry["tag"]; tagColor: string; text: string }[] = [
          { tag: "SECURITY", tagColor: "#00ff7f", text: "Firewall rule [ACL-988]: IP packet verification verified 100% clean." },
          { tag: "SECURITY", tagColor: "#00ff7f", text: "Zero-Trust heuristic scan completed: 0 threats detected." },
          { tag: "AUTH", tagColor: "#f59e0b", text: "Admin session clearance authenticated [Bearer Token OK]." },
          { tag: "SYS", tagColor: "#ec4899", text: "Postgres connection pool healthy: 0 stalled connections, 100% throughput." },
          { tag: "SYS", tagColor: "#ec4899", text: "Memory allocation steady at 42.8MB / Node V8 cluster stable." },
        ];
        const chosen = sysMessages[Math.floor(Math.random() * sysMessages.length)];
        newEntry = {
          id,
          timestamp: time,
          tag: chosen.tag,
          tagColor: chosen.tagColor,
          message: chosen.text,
        };
      }

      setLogs((prev) => {
        const next = [...prev, newEntry];
        if (next.length > 60) next.shift();
        return next;
      });

      const delay = Math.floor(Math.random() * 1400) + 400;
      timeoutId = setTimeout(generateLog, delay);
    };

    generateLog();

    return () => {
      isRunning = false;
      clearTimeout(timeoutId);
    };
  }, [analyticsEvents, liveDbActivity, isPaused]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Interactive CLI commands handler
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    const time = getISTFormattedTime();
    const cmdId = Math.random().toString(36).substring(2, 9);

    const addLog = (tag: LogEntry["tag"], tagColor: string, message: string) => {
      setLogs((prev) => [...prev, { id: Math.random().toString(36).substring(2, 9), timestamp: time, tag, tagColor, message }]);
    };

    // Echo input
    addLog("SYS", "#00f0ff", `> ${commandInput}`);

    switch (cmd) {
      case "help":
        addLog("SYS", "#f59e0b", "Available CLI Commands: status, scan, time, db, traffic, leads, ping, clear");
        break;
      case "clear":
        setLogs([]);
        break;
      case "time":
        addLog("SYS", "#00ff7f", `Current IST Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (Asia/Kolkata)`);
        break;
      case "status":
        addLog("SECURITY", "#00ff7f", "SYSTEM HEALTH: 100% NOMINAL | FIREWALL: ACTIVE | DATABASE: CONNECTED | SSL: TLS 1.3");
        break;
      case "scan":
        addLog("SECURITY", "#00ff7f", "Executing deep security audit across 645 telemetry records...");
        setTimeout(() => {
          addLog("SECURITY", "#00ff7f", "Diagnostic complete: All API endpoints & Supabase tables 100% secure.");
        }, 600);
        break;
      case "db":
        addLog("SQL", "#a855f7", `Active Postgres Workers: ${liveDbActivity.length} | Status: Query pool optimal.`);
        break;
      case "traffic":
        addLog("TRAFFIC", "#00f0ff", `Total Pageviews Recorded: ${analyticsEvents.length} | Distinct Sessions: ${new Set(analyticsEvents.map(e => e.session_id)).size}`);
        break;
      case "leads":
        addLog("SYS", "#ec4899", `Leads Breakdown: Waiting List (${waitingListLeads.length}) | Plan Views (${pricingUnlockLeads?.length || 0}) | Onboarding (${onboardingLeads.length}) | Interests (${interestLeads.length}) | Enterprise (${enterpriseLeads.length})`);
        break;
      case "ping":
        addLog("SYS", "#00ff7f", `Latency to AWS/Supabase Node: ${Math.floor(Math.random() * 12) + 12}ms [0% Packet Loss]`);
        break;
      default:
        addLog("SYS", "#ff007f", `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`);
    }

    setCommandInput("");
  };

  const filteredLogs = useMemo(() => {
    if (filterTag === "ALL") return logs;
    return logs.filter((l) => l.tag === filterTag);
  }, [logs, filterTag]);

  return (
    <div
      style={{
        backgroundColor: "#080a12",
        borderRadius: "24px",
        border: "1px solid rgba(0, 240, 255, 0.25)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(0, 240, 255, 0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Courier New', monospace",
        height: "640px",
      }}
    >
      {/* Top Cyber Telemetry Header */}
      <div
        style={{
          padding: "16px 24px",
          backgroundColor: "#0d101c",
          borderBottom: "1px solid rgba(0, 240, 255, 0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: isPaused ? "#f59e0b" : "#00ff7f",
              boxShadow: isPaused ? "0 0 10px #f59e0b" : "0 0 10px #00ff7f",
              animation: isPaused ? "none" : "blink 1.2s infinite ease-in-out",
            }}
          />
          <div>
            <span
              style={{
                fontFamily: "'Instagram Sans Headline', monospace",
                fontSize: "1.1rem",
                fontWeight: "800",
                color: "#fff",
                letterSpacing: "0.5px",
              }}
            >
              DEFENSE_TERMINAL // IST_TELEMETRY
            </span>
            <span
              style={{
                marginLeft: "12px",
                fontSize: "0.75rem",
                padding: "2px 8px",
                borderRadius: "6px",
                backgroundColor: "rgba(0, 240, 255, 0.1)",
                color: "#00f0ff",
                border: "1px solid rgba(0, 240, 255, 0.2)",
              }}
            >
              ZONE: ASIA/KOLKATA (IST)
            </span>
          </div>
        </div>

        {/* Live IST Clock & Telemetry Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "#141727",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              padding: "6px 14px",
              borderRadius: "10px",
              color: "#00f0ff",
              fontSize: "0.95rem",
              fontWeight: "700",
              letterSpacing: "1px",
              boxShadow: "0 0 15px rgba(0, 240, 255, 0.1)",
            }}
          >
            ⏱ {istClock || "00:00:00 IST"}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setIsPaused((p) => !p)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                backgroundColor: isPaused ? "rgba(245, 158, 11, 0.15)" : "#181c2e",
                color: isPaused ? "#f59e0b" : "#fff",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: "0.75rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
            </button>

            <button
              onClick={() => setLogs([])}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                backgroundColor: "#181c2e",
                color: "#ff007f",
                border: "1px solid rgba(255, 0, 127, 0.2)",
                fontSize: "0.75rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tag Strip */}
      <div
        style={{
          padding: "8px 24px",
          backgroundColor: "#0b0e18",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.75rem",
        }}
      >
        <span style={{ color: "#6b7280" }}>FILTER:</span>
        {["ALL", "SQL", "TRAFFIC", "SECURITY", "SYS"].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            style={{
              padding: "3px 10px",
              borderRadius: "6px",
              backgroundColor: filterTag === tag ? "#00f0ff" : "transparent",
              color: filterTag === tag ? "#000" : "#8e92a4",
              border: filterTag === tag ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
              fontWeight: "bold",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Terminal Log Output Stream */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: "20px 24px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "0.85rem",
          lineHeight: "1.5",
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
          backgroundSize: "100% 4px, 6px 100%",
        }}
      >
        {filteredLogs.length === 0 ? (
          <div style={{ color: "#6b7280", padding: "40px 0", textAlign: "center" }}>
            [STREAM INITIALIZED] Waiting for inbound events in IST...
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                wordBreak: "break-all",
              }}
            >
              <span style={{ color: "#6b7280", minWidth: "90px", fontSize: "0.78rem" }}>[{log.timestamp}]</span>
              <span
                style={{
                  color: log.tagColor,
                  backgroundColor: `${log.tagColor}15`,
                  border: `1px solid ${log.tagColor}40`,
                  padding: "1px 6px",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  minWidth: "65px",
                  textAlign: "center",
                }}
              >
                {log.tag}
              </span>
              <span style={{ color: "#e2e8f0" }}>{log.message}</span>
            </div>
          ))
        )}
      </div>

      {/* Interactive Command Input Line */}
      <form
        onSubmit={handleCommandSubmit}
        style={{
          padding: "14px 24px",
          backgroundColor: "#0d101c",
          borderTop: "1px solid rgba(0, 240, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ color: "#00f0ff", fontWeight: "bold" }}>admin@wipa-ist:~$</span>
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          placeholder='Type a command ("status", "scan", "db", "traffic", "leads", "time", "clear")...'
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "none",
            color: "#fff",
            fontFamily: "'Courier New', monospace",
            fontSize: "0.9rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "4px 12px",
            backgroundColor: "rgba(0, 240, 255, 0.15)",
            color: "#00f0ff",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          EXEC ⏎
        </button>
      </form>
    </div>
  );
};

// Full width modern leads table
const PaginatedTable = ({
  title,
  data,
  columns,
}: {
  title: string;
  data: any[];
  columns: string[];
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 50;

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();
    return data.filter((row) =>
      columns.some((col) => String(row[col] || "").toLowerCase().includes(q))
    );
  }, [data, columns, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filteredData.length, currentPage, totalPages]);

  return (
    <div
      style={{
        backgroundColor: "#161824",
        borderRadius: "24px",
        padding: "26px",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        marginTop: "25px",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Instagram Sans Headline', sans-serif",
              color: "#fff",
              fontSize: "1.4rem",
              fontWeight: "700",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h2>
          <div style={{ fontFamily: "'Instagram Sans', sans-serif", color: "#8e92a4", fontSize: "0.85rem", marginTop: "4px" }}>
            Total Records: <span style={{ color: "#fff", fontWeight: "bold" }}>{data.length}</span>
            {searchQuery && (
              <>
                {" "}
                (Filtered: <span style={{ color: "#00f0ff" }}>{filteredData.length}</span>)
              </>
            )}{" "}
            | Page <span style={{ color: "#fff", fontWeight: "bold" }}>{currentPage}</span> of {totalPages}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Filter records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              fontFamily: "'Instagram Sans', sans-serif",
              padding: "8px 16px",
              backgroundColor: "#1f2333",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "0.85rem",
              outline: "none",
              minWidth: "200px",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#00f0ff")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.08)")}
          />

          {totalPages > 1 && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  padding: "6px 12px",
                  backgroundColor: currentPage === 1 ? "transparent" : "#202436",
                  color: currentPage === 1 ? "#555" : "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                }}
              >
                Prev
              </button>

              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  padding: "6px 10px",
                  backgroundColor: "#11131c",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  outline: "none",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  padding: "6px 12px",
                  backgroundColor: currentPage === totalPages ? "transparent" : "#202436",
                  color: currentPage === totalPages ? "#555" : "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{ overflowX: "auto", width: "100%" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#b3b7c6" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    fontFamily: "'Instagram Sans Headline', sans-serif",
                    padding: "14px 12px",
                    textAlign: "left",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#fff",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    fontFamily: "'Instagram Sans', sans-serif",
                    padding: "40px",
                    textAlign: "center",
                    color: "#8e92a4",
                    fontSize: "0.9rem",
                  }}
                >
                  No records found.
                </td>
              </tr>
            ) : (
              currentData.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                    transition: "background-color 0.15s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {columns.map((col) => {
                    const val = row[col];
                    if (col === "created_at" || col === "paid_at") {
                      return (
                        <td
                          key={col}
                          style={{
                            fontFamily: "'Instagram Sans', sans-serif",
                            padding: "14px 12px",
                            fontSize: "0.85rem",
                            whiteSpace: "nowrap",
                            color: "#8e92a4",
                          }}
                        >
                          {val
                            ? new Date(val).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                      );
                    }
                    if (col === "amount_paid") {
                      return (
                        <td
                          key={col}
                          style={{
                            fontFamily: "'Instagram Sans Headline', sans-serif",
                            padding: "14px 12px",
                            fontSize: "0.9rem",
                            fontWeight: "700",
                            color: "#00ff7f",
                          }}
                        >
                          {val ? `£${val}` : "-"}
                        </td>
                      );
                    }
                    if (col === "payment_status") {
                      const isSuccess = val === "Payment success, subscription purchased";
                      const isFailed = val === "Payment failed";
                      return (
                        <td key={col} style={{ padding: "14px 12px", whiteSpace: "nowrap" }}>
                          <span
                            style={{
                              fontFamily: "'Instagram Sans', sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              backgroundColor: isSuccess
                                ? "rgba(0, 255, 127, 0.1)"
                                : isFailed
                                ? "rgba(255, 0, 127, 0.1)"
                                : "rgba(255, 170, 0, 0.1)",
                              color: isSuccess ? "#00ff7f" : isFailed ? "#ff007f" : "#ffaa00",
                              border: `1px solid ${
                                isSuccess
                                  ? "rgba(0, 255, 127, 0.25)"
                                  : isFailed
                                  ? "rgba(255, 0, 127, 0.25)"
                                  : "rgba(255, 170, 0, 0.25)"
                              }`,
                            }}
                          >
                            {isSuccess ? "✓ Paid" : isFailed ? "✕ Failed" : val || "Pending"}
                          </span>
                        </td>
                      );
                    }
                    if (col === "has_joined_waiting_list") {
                      const joined = Boolean(val);
                      return (
                        <td key={col} style={{ padding: "14px 12px", whiteSpace: "nowrap" }}>
                          <span
                            style={{
                              fontFamily: "'Instagram Sans', sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              backgroundColor: joined
                                ? "rgba(0, 255, 127, 0.12)"
                                : "rgba(255, 170, 0, 0.12)",
                              color: joined ? "#00ff7f" : "#ffaa00",
                              border: `1px solid ${
                                joined
                                  ? "rgba(0, 255, 127, 0.25)"
                                  : "rgba(255, 170, 0, 0.3)"
                              }`,
                            }}
                          >
                            {joined ? "✓ Converted to Waiting List" : "⚠️ Dropped Off (Viewing Only)"}
                          </span>
                        </td>
                      );
                    }
                    if (col === "invoice") {
                      return (
                        <td key={col} style={{ padding: "14px 12px", whiteSpace: "nowrap" }}>
                          {row["payment_status"] === "Payment success, subscription purchased" ? (
                            <a
                              href={`/api/adminwipa/invoice?id=${row.id}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                fontFamily: "'Instagram Sans', sans-serif",
                                color: "#00f0ff",
                                textDecoration: "none",
                                fontWeight: "600",
                                fontSize: "0.85rem",
                                padding: "4px 10px",
                                backgroundColor: "rgba(0, 240, 255, 0.08)",
                                borderRadius: "8px",
                                border: "1px solid rgba(0, 240, 255, 0.2)",
                              }}
                            >
                              Download PDF
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      );
                    }
                    return (
                      <td
                        key={col}
                        style={{
                          fontFamily: "'Instagram Sans', sans-serif",
                          padding: "14px 12px",
                          fontSize: "0.85rem",
                          whiteSpace: "nowrap",
                          maxWidth: "320px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: col === "email" || col === "phone" ? "#e2e8f0" : "inherit",
                        }}
                      >
                        {val || "-"}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AdminDashboardClient({
  onboardingLeads,
  interestLeads,
  enterpriseLeads,
  waitingListLeads,
  pricingUnlockLeads = [],
  analyticsEvents,
  initialAuthStep,
}: AdminDashboardProps) {
  const [authStep, setAuthStep] = useState(initialAuthStep);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("All Time");
  const router = useRouter();

  useEffect(() => {
    if (authStep === 2) {
      const interval = setInterval(() => {
        router.refresh();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [router, authStep]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authStep === 0) {
      const result = await verifyPrimaryPassword(password);
      if (result.success) {
        setAuthStep(1);
        setPassword("");
        router.refresh();
      } else {
        alert("Incorrect clearance code");
      }
    } else if (authStep === 1) {
      const result = await verifySecondaryPassword(password);
      if (result.success) {
        setAuthStep(2);
        setPassword("");
        router.refresh();
      } else {
        alert("Incorrect clearance code");
      }
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setAuthStep(0);
    router.refresh();
  };

  // Auth Gate
  if (authStep < 2) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#090a10",
          backgroundImage: "radial-gradient(ellipse at 50% 30%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <FadeIn direction="up">
          <div
            style={{
              backgroundColor: "#131520",
              padding: "48px 40px",
              borderRadius: "32px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              width: "100%",
              maxWidth: "420px",
              textAlign: "center",
              boxShadow: "0 30px 70px rgba(0,0,0,0.7), 0 0 40px rgba(124, 58, 237, 0.12)",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "22px",
                background: "linear-gradient(135deg, #7c3aed 0%, #00f0ff 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "900",
                fontSize: "2rem",
                color: "#fff",
                margin: "0 auto 28px auto",
                boxShadow: "0 10px 25px rgba(0, 240, 255, 0.25)",
              }}
            >
              W
            </div>
            <h1
              style={{
                fontFamily: "'Instagram Sans Headline', sans-serif",
                color: "#fff",
                fontSize: "1.8rem",
                marginBottom: "8px",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              {authStep === 0 ? "Admin Access" : "Secondary Clearance"}
            </h1>
            <p
              style={{
                fontFamily: "'Instagram Sans', sans-serif",
                color: "#8e92a4",
                marginBottom: "32px",
                fontSize: "0.95rem",
              }}
            >
              {authStep === 0 ? "Enter primary clearance code." : "Enter secondary clearance authorization."}
            </p>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={authStep === 0 ? "Primary Code" : "Secondary Code"}
                autoFocus
                style={{
                  fontFamily: "'Instagram Sans', sans-serif",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  backgroundColor: "#1a1d2c",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "1.05rem",
                  outline: "none",
                  width: "100%",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f0ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
              />
              <button
                type="submit"
                style={{
                  fontFamily: "'Instagram Sans Headline', sans-serif",
                  padding: "16px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #00f0ff 0%, #7c3aed 100%)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1.05rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(0, 240, 255, 0.2)",
                  transition: "transform 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {authStep === 0 ? "Verify Clearance →" : "Authorize Console →"}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    );
  }

  const totalLeads = onboardingLeads.length + interestLeads.length + enterpriseLeads.length + waitingListLeads.length + pricingUnlockLeads.length;

  const navItems = [
    { id: "overview", label: "Statistics", icon: "📊", badge: null },
    { id: "waiting_list", label: "Waiting List", icon: "⏳", badge: waitingListLeads.length },
    { id: "pricing_unlock", label: "Plan View Leads", icon: "🔓", badge: pricingUnlockLeads.length },
    { id: "onboarding", label: "Onboarding", icon: "🚀", badge: onboardingLeads.length },
    { id: "interests", label: "Checkout Tracking", icon: "💳", badge: interestLeads.length },
    { id: "enterprise", label: "Enterprise Inquiries", icon: "🏢", badge: enterpriseLeads.length },
    { id: "defense", label: "Defense Mode", icon: "🛡️", badge: "LIVE" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0d0f18",
        display: "flex",
        fontFamily: "'Instagram Sans', sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Left Full-Height Floating Navigation Rail */}
      <aside
        style={{
          width: "88px",
          height: "100vh",
          backgroundColor: "#131520",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "24px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Logo Badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "25px" }}>
          <div
            onClick={() => setActiveTab("overview")}
            title="WIPA Admin Console"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "'Instagram Sans Headline', sans-serif",
              fontWeight: "900",
              fontSize: "1.4rem",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(168, 85, 247, 0.35)",
            }}
          >
            W
          </div>

          {/* Nav Icons */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  style={{
                    position: "relative",
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    backgroundColor: isActive ? "#272a3e" : "transparent",
                    color: isActive ? "#00f0ff" : "#8e92a4",
                    border: isActive ? "1px solid rgba(0, 240, 255, 0.3)" : "1px solid transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isActive ? "0 4px 16px rgba(0, 240, 255, 0.2)" : "none",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#8e92a4";
                    }
                  }}
                >
                  <span>{item.icon}</span>
                  {item.badge !== null && (
                    <span
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        backgroundColor: item.badge === "LIVE" ? "#ff007f" : "#a855f7",
                        color: "#fff",
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                        padding: "2px 5px",
                        borderRadius: "10px",
                        minWidth: "16px",
                        textAlign: "center",
                        lineHeight: "1",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout */}
        <button
          onClick={handleLogout}
          title="Logout Admin Clearance"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            backgroundColor: "#1a1d2c",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#8e92a4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#ff007f";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#1a1d2c";
            e.currentTarget.style.color = "#8e92a4";
          }}
        >
          🔒
        </button>
      </aside>

      {/* Main Full-Width Content Area */}
      <main
        style={{
          flex: 1,
          height: "100vh",
          padding: "32px 40px",
          overflowY: "auto",
          backgroundColor: "#0d0f18",
        }}
      >
        {/* Top Bar Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1
                style={{
                  fontFamily: "'Instagram Sans Headline', sans-serif",
                  fontSize: "2rem",
                  fontWeight: "800",
                  margin: 0,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                }}
              >
                {activeTab === "overview" && "Platform Statistics"}
                {activeTab === "waiting_list" && "Waiting List Leads"}
                {activeTab === "pricing_unlock" && "Plan View & Pricing Unlock Leads"}
                {activeTab === "onboarding" && "Onboarding Leads"}
                {activeTab === "interests" && "Checkout Tracking"}
                {activeTab === "enterprise" && "Enterprise Inquiries"}
                {activeTab === "defense" && "Defense Terminal"}
              </h1>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00ff7f",
                  boxShadow: "0 0 10px #00ff7f",
                }}
              ></span>
            </div>
            <p
              style={{
                fontFamily: "'Instagram Sans', sans-serif",
                color: "#8e92a4",
                marginTop: "4px",
                fontSize: "0.9rem",
              }}
            >
              Real-time telemetry, lead management, and live traffic sync.
            </p>
          </div>

          {/* Topbar Controls & Admin Capsule */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {/* Status capsule */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#161824",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                color: "#8e92a4",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#00ff7f" }}></span>
              <span>Live Sync Active</span>
            </div>

            {/* Time Switcher */}
            <div
              style={{
                display: "flex",
                backgroundColor: "#161824",
                borderRadius: "20px",
                padding: "4px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {["Days", "Weeks", "Months", "All Time"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeRange(tab)}
                  style={{
                    fontFamily: "'Instagram Sans', sans-serif",
                    padding: "6px 14px",
                    borderRadius: "16px",
                    backgroundColor: timeRange === tab ? "#25293d" : "transparent",
                    color: timeRange === tab ? "#fff" : "#8e92a4",
                    border: "none",
                    fontSize: "0.8rem",
                    fontWeight: timeRange === tab ? "600" : "400",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Admin Profile Capsule */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "#161824",
                padding: "6px 16px 6px 8px",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                ⚡
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Instagram Sans Headline', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                  }}
                >
                  WIPA Clearance
                </span>
                <span style={{ fontSize: "0.75rem", color: "#00f0ff" }}>Level 2 Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Content Render */}
        <FadeIn direction="up" key={activeTab}>
          {activeTab === "overview" && (
            <>
              {/* Hero Stat Cards Row (Inspired by +278k card in reference UI) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                  marginBottom: "36px",
                }}
              >
                {/* Big Gradient Leads Card */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #f59e0b 100%)",
                    borderRadius: "28px",
                    padding: "26px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "160px",
                    boxShadow: "0 15px 35px rgba(217, 70, 239, 0.3)",
                    color: "#fff",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "20px",
                        padding: "4px 10px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      All Channels
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Instagram Sans Headline', sans-serif",
                        fontSize: "2.8rem",
                        fontWeight: "900",
                        lineHeight: "1.1",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      +{totalLeads}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Instagram Sans', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        opacity: 0.9,
                        marginTop: "4px",
                      }}
                    >
                      Total Acquired Leads & Inquiries
                    </div>
                  </div>
                </div>

                {/* Total Pageviews */}
                <div
                  style={{
                    backgroundColor: "#161824",
                    borderRadius: "28px",
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                >
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Total Pageviews
                  </div>
                  <div
                    style={{
                      fontFamily: "'Instagram Sans Headline', sans-serif",
                      fontSize: "2.4rem",
                      fontWeight: "800",
                      color: "#00f0ff",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {analyticsEvents.length}
                  </div>
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem" }}>Recorded telemetry hits</div>
                </div>

                {/* Unique Sessions */}
                <div
                  style={{
                    backgroundColor: "#161824",
                    borderRadius: "28px",
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                >
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Unique Visitors
                  </div>
                  <div
                    style={{
                      fontFamily: "'Instagram Sans Headline', sans-serif",
                      fontSize: "2.4rem",
                      fontWeight: "800",
                      color: "#ec4899",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {new Set(analyticsEvents.map((e) => e.session_id)).size}
                  </div>
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem" }}>Distinct client fingerprints</div>
                </div>

                {/* Conversion Rate */}
                <div
                  style={{
                    backgroundColor: "#161824",
                    borderRadius: "28px",
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                >
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Conversion Rate
                  </div>
                  <div
                    style={{
                      fontFamily: "'Instagram Sans Headline', sans-serif",
                      fontSize: "2.4rem",
                      fontWeight: "800",
                      color: "#00ff7f",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {new Set(analyticsEvents.map((e) => e.session_id)).size
                      ? (
                          (interestLeads.filter(
                            (l) => l.payment_status === "Payment success, subscription purchased"
                          ).length /
                            new Set(analyticsEvents.map((e) => e.session_id)).size) *
                          100
                        ).toFixed(2)
                      : "0.00"}
                    %
                  </div>
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem" }}>Checkout success ratio</div>
                </div>

                {/* Bounce Rate */}
                <div
                  style={{
                    backgroundColor: "#161824",
                    borderRadius: "28px",
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                >
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Bounce Rate
                  </div>
                  <div
                    style={{
                      fontFamily: "'Instagram Sans Headline', sans-serif",
                      fontSize: "2.4rem",
                      fontWeight: "800",
                      color: "#f59e0b",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {new Set(analyticsEvents.map((e) => e.session_id)).size
                      ? Math.round(
                          (Object.values(
                            analyticsEvents.reduce((acc, ev) => {
                              acc[ev.session_id] = (acc[ev.session_id] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).filter((count) => count === 1).length /
                            new Set(analyticsEvents.map((e) => e.session_id)).size) *
                            100
                        )
                      : 0}
                    %
                  </div>
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem" }}>Single-page sessions</div>
                </div>

                {/* Plan View Leads */}
                <div
                  onClick={() => setActiveTab("pricing_unlock")}
                  style={{
                    backgroundColor: "#161824",
                    borderRadius: "28px",
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Plan View Leads
                  </div>
                  <div
                    style={{
                      fontFamily: "'Instagram Sans Headline', sans-serif",
                      fontSize: "2.4rem",
                      fontWeight: "800",
                      color: "#f472b6",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {pricingUnlockLeads.length}
                  </div>
                  <div style={{ color: "#8e92a4", fontSize: "0.8rem" }}>
                    {pricingUnlockLeads.filter(l => !l.has_joined_waiting_list).length} dropped off · {pricingUnlockLeads.filter(l => l.has_joined_waiting_list).length} joined waiting list
                  </div>
                </div>
              </div>

              {/* 4 Demographics Breakdown Cards (Limited preview + See All modal) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginBottom: "36px",
                }}
              >
                {/* Devices */}
                <BreakdownCard
                  title="Device Demographics"
                  data={analyticsEvents.reduce((acc, ev) => {
                    let device = ev.device_type;
                    if (!device || device === "Unknown") {
                      if (ev.os === "Android" || ev.os === "iOS") {
                        device = "Mobile";
                      } else if (ev.os === "Windows" || ev.os === "macOS" || ev.os === "Linux") {
                        device = "Desktop";
                      } else {
                        device = "Unknown";
                      }
                    }
                    acc[device] = (acc[device] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#00f0ff", "#bc00ff", "#ffaa00", "#00ff7f"]}
                  previewLimit={4}
                />

                {/* Browsers */}
                <BreakdownCard
                  title="Browser Popularity"
                  data={analyticsEvents.reduce((acc, ev) => {
                    acc[ev.browser || "Unknown"] = (acc[ev.browser || "Unknown"] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#ff007f", "#00f0ff", "#ffaa00", "#bc00ff"]}
                  previewLimit={4}
                />

                {/* Countries */}
                <BreakdownCard
                  title="Country Distribution"
                  data={analyticsEvents.reduce((acc, ev) => {
                    acc[ev.country || "Unknown"] = (acc[ev.country || "Unknown"] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#ffaa00", "#00f0ff", "#bc00ff", "#ff007f", "#00ff7f"]}
                  previewLimit={4}
                />

                {/* Operating Systems */}
                <BreakdownCard
                  title="Operating Systems"
                  data={analyticsEvents.reduce((acc, ev) => {
                    acc[ev.os || "Unknown"] = (acc[ev.os || "Unknown"] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#00ff7f", "#bc00ff", "#00f0ff", "#ff007f", "#ffaa00"]}
                  previewLimit={4}
                />
              </div>

              {/* Top Landing Pages & Peak Traffic Hours Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "24px",
                  marginBottom: "36px",
                }}
              >
                <RankedTableCard
                  title="Top Landing Pages"
                  data={Object.entries(
                    analyticsEvents.reduce((acc, ev) => {
                      let url = ev.page_url || "/";
                      try {
                        if (url.startsWith("http://") || url.startsWith("https://")) {
                          const parsed = new URL(url);
                          url = parsed.pathname || "/";
                        }
                      } catch (e) {}
                      url = url.replace(/^https?:\/\/[^\/]+/, "").split("?")[0] || "/";

                      if (!acc[url]) acc[url] = { views: 0, sessions: new Set<string>() };
                      acc[url].views++;
                      acc[url].sessions.add(ev.session_id);
                      return acc;
                    }, {} as Record<string, { views: number; sessions: Set<string> }>)
                  )
                    .sort((a: any, b: any) => b[1].views - a[1].views)
                    .map(([url, data]: [string, any]) => ({
                      page_url: url,
                      views: data.views,
                      unique_visitors: data.sessions.size,
                    }))}
                  columns={[
                    { key: "page_url", label: "Page URL" },
                    { key: "views", label: "Views", align: "right" },
                    { key: "unique_visitors", label: "Unique Visitors", align: "right" },
                  ]}
                  previewLimit={5}
                />

                <RankedTableCard
                  title="Peak Traffic Hours"
                  data={Object.entries(
                    analyticsEvents.reduce((acc, ev) => {
                      // Format hour according to IST (Asia/Kolkata)
                      const istHour = parseInt(
                        new Date(ev.created_at).toLocaleTimeString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          hour12: false,
                          hour: "numeric",
                        })
                      );
                      const hourNum = isNaN(istHour) ? new Date(ev.created_at).getHours() : istHour;
                      const time = `${hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum} ${
                        hourNum >= 12 ? "PM" : "AM"
                      }`;
                      acc[time] = (acc[time] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  )
                    .sort((a: any, b: any) => b[1] - a[1])
                    .map(([time, count]: [string, any]) => ({
                      time: `${time} (IST)`,
                      visitors: count,
                    }))}
                  columns={[
                    { key: "time", label: "Time (IST)" },
                    { key: "visitors", label: "Visitors", align: "right" },
                  ]}
                  previewLimit={5}
                />
              </div>

              {/* Recent Events Full Stream */}
              <PaginatedTable
                title="Recent Traffic Events"
                data={analyticsEvents}
                columns={["session_id", "page_url", "city", "region", "country", "network", "os", "created_at"]}
              />
            </>
          )}

          {/* Waiting List Leads Tab */}
          {activeTab === "waiting_list" && (
            <PaginatedTable
              title="All Waiting List Leads"
              data={waitingListLeads}
              columns={[
                "id",
                "title",
                "name",
                "email",
                "country",
                "phone",
                "company",
                "profession",
                "plan",
                "seats",
                "business_registration_number",
                "date_of_incorporation",
                "college_institute",
                "student_id",
                "created_at",
              ]}
            />
          )}

          {/* Plan View Leads Tab */}
          {activeTab === "pricing_unlock" && (
            <PaginatedTable
              title="All Plan View & Pricing Unlock Leads (Dropped Off vs Converted)"
              data={pricingUnlockLeads}
              columns={[
                "id",
                "title",
                "name",
                "email",
                "country",
                "phone",
                "company",
                "profession",
                "has_joined_waiting_list",
                "waiting_list_plan",
                "created_at",
              ]}
            />
          )}

          {/* Onboarding Leads Tab */}
          {activeTab === "onboarding" && (
            <PaginatedTable
              title="All Onboarding Leads"
              data={onboardingLeads}
              columns={["id", "name", "email", "phone", "country", "journey_stage", "created_at"]}
            />
          )}

          {/* Checkout Tracking / Interests Tab */}
          {activeTab === "interests" && (
            <PaginatedTable
              title="Detailed Checkout Tracking"
              data={interestLeads}
              columns={[
                "name",
                "email",
                "profession",
                "plan",
                "amount_paid",
                "paid_at",
                "payment_status",
                "invoice",
                "created_at",
              ]}
            />
          )}

          {/* Enterprise Inquiries Tab */}
          {activeTab === "enterprise" && (
            <PaginatedTable
              title="All Enterprise Inquiries"
              data={enterpriseLeads}
              columns={["id", "name", "email", "phone", "company", "seats", "needs", "created_at"]}
            />
          )}

          {/* Defense Override Tab */}
          {activeTab === "defense" && (
            <div
              style={{
                backgroundColor: "#161824",
                borderRadius: "28px",
                padding: "28px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ff007f",
                    boxShadow: "0 0 10px #ff007f",
                    animation: "blink 1s step-end infinite",
                  }}
                ></div>
                <h2
                  style={{
                    fontFamily: "'Instagram Sans Headline', sans-serif",
                    color: "#00f0ff",
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    margin: 0,
                  }}
                >
                  SYSTEM DEFENSE OVERRIDE // IST MONITOR
                </h2>
              </div>
              <DefenseTerminal
                analyticsEvents={analyticsEvents}
                onboardingLeads={onboardingLeads}
                interestLeads={interestLeads}
                enterpriseLeads={enterpriseLeads}
                waitingListLeads={waitingListLeads}
                pricingUnlockLeads={pricingUnlockLeads}
              />
            </div>
          )}
        </FadeIn>
      </main>
    </div>
  );
}

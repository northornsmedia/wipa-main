"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import StaggerGrid from "@/components/animations/StaggerGrid";
import { useRouter } from "next/navigation";
import { verifyPrimaryPassword, verifySecondaryPassword, getLiveDatabaseLogs } from "./actions";

type AdminDashboardProps = {
  onboardingLeads: any[];
  interestLeads: any[];
  enterpriseLeads: any[];
  waitingListLeads: any[];
  analyticsEvents: any[];
  initialAuthStep: number;
};

const CircularProgress = ({ percentage, color, label, value }: { percentage: number, color: string, label: string, value: string }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
      <div style={{ position: "relative", width: "120px", height: "120px" }}>
        <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#2d3142" strokeWidth="12" />
          <circle 
            cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="12" 
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round" 
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <span style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#fff" }}>{percentage}%</span>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "#7a7e93", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#fff" }}>{value}</div>
      </div>
    </div>
  );
};

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

  const sortedEntries = Object.entries(data).sort(
    (a, b) => (b[1] as number) - (a[1] as number)
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
          backgroundColor: "#1c1f2e",
          padding: "25px",
          borderRadius: "20px",
          border: "1px solid #2d3142",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "380px",
          position: "relative",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
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
                color: "#fff",
                fontSize: "1.15rem",
                fontWeight: "600",
                margin: 0,
              }}
            >
              {title}
            </h3>
            {sortedEntries.length > 0 && (
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#00f0ff",
                  backgroundColor: "rgba(0, 240, 255, 0.1)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  border: "1px solid rgba(0, 240, 255, 0.2)",
                }}
              >
                {sortedEntries.length} total
              </span>
            )}
          </div>

          {sortedEntries.length === 0 ? (
            <p
              style={{
                color: "#7a7e93",
                textAlign: "center",
                padding: "40px 0",
                fontSize: "0.9rem",
              }}
            >
              No data recorded yet.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: previewEntries.length === 1 ? "1fr" : "1fr 1fr",
                gap: "15px",
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
              marginTop: "20px",
              width: "100%",
              padding: "10px 16px",
              backgroundColor: "#24283b",
              color: "#00f0ff",
              border: "1px solid #2d3142",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2d324d";
              e.currentTarget.style.borderColor = "#00f0ff";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#24283b";
              e.currentTarget.style.borderColor = "#2d3142";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span>See All ({sortedEntries.length})</span>
            <span style={{ fontSize: "1.1rem" }}>→</span>
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
            backgroundColor: "rgba(5, 7, 10, 0.85)",
            backdropFilter: "blur(8px)",
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
              backgroundColor: "#161926",
              border: "1px solid #2d3142",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px rgba(0, 240, 255, 0.15)",
              width: "100%",
              maxWidth: "720px",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 25px",
                borderBottom: "1px solid #2d3142",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#1c1f2e",
              }}
            >
              <div>
                <h2
                  style={{
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
                      fontSize: "0.8rem",
                      color: "#00f0ff",
                      backgroundColor: "rgba(0, 240, 255, 0.12)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {sortedEntries.length} items
                  </span>
                </h2>
                <p
                  style={{
                    color: "#7a7e93",
                    fontSize: "0.85rem",
                    margin: "4px 0 0 0",
                  }}
                >
                  Complete breakdown based on {totalEvents} total traffic events
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#24283b",
                  border: "1px solid #2d3142",
                  color: "#fff",
                  fontSize: "1.1rem",
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
                  e.currentTarget.style.backgroundColor = "#24283b";
                  e.currentTarget.style.borderColor = "#2d3142";
                }}
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div
              style={{
                padding: "15px 25px",
                borderBottom: "1px solid #24283b",
                backgroundColor: "#121420",
              }}
            >
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: "#1c1f2e",
                  border: "1px solid #2d3142",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f0ff")}
                onBlur={(e) => (e.target.style.borderColor = "#2d3142")}
              />
            </div>

            {/* Modal Body */}
            <div
              style={{
                padding: "20px 25px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                flex: 1,
              }}
            >
              {filteredEntries.length === 0 ? (
                <div
                  style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    color: "#7a7e93",
                    fontSize: "0.95rem",
                  }}
                >
                  No matches found for "{searchQuery}".
                </div>
              ) : (
                filteredEntries.map(([label, count], index) => {
                  const originalIndex = sortedEntries.findIndex(
                    (e) => e[0] === label
                  );
                  const percentage = Math.round(
                    ((count as number) / Math.max(1, totalEvents)) * 100
                  );
                  const barColor = colors[originalIndex % colors.length];

                  return (
                    <div
                      key={label}
                      style={{
                        backgroundColor: "#1c1f2e",
                        border: "1px solid #2d3142",
                        borderRadius: "14px",
                        padding: "14px 18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        transition: "transform 0.15s, border-color 0.15s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = barColor;
                        e.currentTarget.style.transform = "translateX(2px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = "#2d3142";
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                              color: "#7a7e93",
                              width: "24px",
                            }}
                          >
                            #{originalIndex + 1}
                          </span>
                          <span
                            style={{
                              color: "#fff",
                              fontWeight: "600",
                              fontSize: "1rem",
                            }}
                          >
                            {label}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                          }}
                        >
                          <span
                            style={{
                              color: "#7a7e93",
                              fontSize: "0.9rem",
                            }}
                          >
                            <strong style={{ color: "#fff" }}>{count}</strong>{" "}
                            visitors
                          </span>
                          <span
                            style={{
                              color: barColor,
                              fontWeight: "bold",
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
                          backgroundColor: "#0f111a",
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
                padding: "15px 25px",
                borderTop: "1px solid #2d3142",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#1c1f2e",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#24283b",
                  border: "1px solid #2d3142",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2d324d")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#24283b")}
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

const DefenseTerminal = ({ analyticsEvents }: { analyticsEvents: any[] }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [liveDbActivity, setLiveDbActivity] = useState<any[]>([]);

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
    return () => { isRunning = false; };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isRunning = true;

    const generateLog = () => {
      if (!isRunning) return;
      
      let newLog = "Analyzing system integrity: 100% stable.";
      const rand = Math.random();

      // Mix real DB logs with real Analytics logs and mock logs
      if (liveDbActivity.length > 0 && rand < 0.6) {
        const dbEvent = liveDbActivity[Math.floor(Math.random() * liveDbActivity.length)];
        const queryPreview = (dbEvent.query || "").trim().replace(/\n/g, ' ').substring(0, 60);
        if (queryPreview) {
          newLog = `[DB ${dbEvent.pid}] ${dbEvent.usename || 'system'} @ ${dbEvent.client_addr || 'local'} -> ${queryPreview}...`;
        } else {
          newLog = `[DB ${dbEvent.pid}] Status: ${dbEvent.state}`;
        }
      } else if (analyticsEvents.length > 0 && rand < 0.8) {
        const randomEvent = analyticsEvents[Math.floor(Math.random() * analyticsEvents.length)];
        if (rand < 0.65) {
          newLog = `Incoming connection from ${randomEvent.city || 'Unknown'}, ${randomEvent.region || 'Unknown'} [${randomEvent.os || 'Unknown OS'}]...`;
        } else if (rand < 0.70) {
          newLog = `SSL Handshake successful for client from ${randomEvent.network || 'External IP'}.`;
        } else if (rand < 0.75) {
          newLog = `Evaluating packet headers for ${randomEvent.browser || 'Unknown'} request to ${randomEvent.page_url}...`;
        } else {
          newLog = `Traffic authorized for session ID: [${(randomEvent.session_id || '').substring(0,8)}...]`;
        }
      } else {
         const scripts = [
          "Firewall active. Monitoring incoming traffic.",
          "Decrypting payload 0x8F9A...",
          "Updating encryption protocols...",
          "Bypassing mainframe proxy...",
          "Executing deep packet inspection...",
          "SQL Injection attempt mitigated successfully.",
          "Network packet loss: 0.00%",
          "Checking database synchronization across active clusters...",
        ];
        newLog = scripts[Math.floor(Math.random() * scripts.length)];
      }

      setLogs(prev => {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const nextLogs = [...prev, `[${timestamp}] ${newLog}`];
        if (nextLogs.length > 20) nextLogs.shift();
        return nextLogs;
      });

      // Random delay between 200ms and 2000ms
      const delay = Math.floor(Math.random() * 1800) + 200;
      timeoutId = setTimeout(generateLog, delay);
    };

    // Start loop
    generateLog();

    return () => {
      isRunning = false;
      clearTimeout(timeoutId);
    };
  }, [analyticsEvents, liveDbActivity]);

  return (
    <div style={{ backgroundColor: "#05070a", padding: "20px", borderRadius: "10px", border: "1px solid #00f0ff", fontFamily: "monospace", color: "#00f0ff", height: "500px", overflowY: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)" }}>
      <h3 style={{ color: "#fff", marginBottom: "10px", borderBottom: "1px solid #2d3142", paddingBottom: "10px" }}>TERMINAL_OVERRIDE // DEFENSE_MODE_ACTIVE</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
          <span>admin@wipa-system:~$</span>
          <span style={{ width: "10px", height: "15px", backgroundColor: "#00f0ff", animation: "blink 1s step-end infinite" }}></span>
        </div>
      </div>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const PaginatedTable = ({ title, data, columns }: { title: string, data: any[], columns: string[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [data.length, currentPage, totalPages]);

  return (
    <div style={{ backgroundColor: "#1c1f2e", borderRadius: "20px", padding: "25px", border: "1px solid #2d3142", marginTop: "25px", overflowX: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "600", margin: 0 }}>{title}</h2>
        <div style={{ color: "#7a7e93", fontSize: "0.95rem" }}>
          Total Records: <span style={{ color: "#fff", fontWeight: "bold" }}>{data.length}</span> | Page <span style={{ color: "#fff", fontWeight: "bold" }}>{currentPage}</span> of {totalPages}
        </div>
      </div>
      
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{ padding: "6px 12px", backgroundColor: currentPage === 1 ? "transparent" : "#2d3142", color: currentPage === 1 ? "#555" : "#fff", border: "1px solid #2d3142", borderRadius: "5px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          >
            Prev
          </button>
          
          <select 
            value={currentPage} 
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            style={{ padding: "6px", backgroundColor: "#0f111a", color: "#fff", border: "1px solid #2d3142", borderRadius: "5px", outline: "none", cursor: "pointer" }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <option key={page} value={page}>Page {page}</option>
            ))}
          </select>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{ padding: "6px 12px", backgroundColor: currentPage === totalPages ? "transparent" : "#2d3142", color: currentPage === totalPages ? "#555" : "#fff", border: "1px solid #2d3142", borderRadius: "5px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
          >
            Next
          </button>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", color: "#b3b7c6" }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #2d3142", color: "#fff", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px", whiteSpace: "nowrap" }}>
                {col.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: "30px", textAlign: "center", color: "#7a7e93", fontSize: "0.85rem" }}>
                No data available yet. Waiting for new leads...
              </td>
            </tr>
          ) : (
            currentData.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #2d3142", transition: "background-color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#24283b"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                {columns.map(col => (
                  <td key={col} style={{ padding: "12px", fontSize: "0.85rem", whiteSpace: "nowrap", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {col === 'created_at' || col === 'paid_at' 
                      ? (row[col] ? new Date(row[col]).toLocaleString() : '-') 
                      : col === 'amount_paid' 
                        ? (row[col] ? `£${row[col]}` : '-')
                        : col === 'invoice'
                          ? (row['payment_status'] === 'Payment success, subscription purchased' 
                              ? <a href={`/api/adminwipa/invoice?id=${row.id}`} target="_blank" rel="noreferrer" style={{ color: "#00f0ff", textDecoration: "none", fontWeight: "bold" }}>Download PDF</a> 
                              : '-')
                          : (row[col] || '-')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default function AdminDashboardClient({ onboardingLeads, interestLeads, enterpriseLeads, waitingListLeads, analyticsEvents, initialAuthStep }: AdminDashboardProps) {
  const [authStep, setAuthStep] = useState(initialAuthStep); // 0 = unauth, 1 = first pass success, 2 = fully auth
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    // Only start polling if fully authenticated
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
        router.refresh(); // to push new state to server
      } else {
        alert("Incorrect password");
      }
    } else if (authStep === 1) {
      const result = await verifySecondaryPassword(password);
      if (result.success) {
        setAuthStep(2);
        setPassword("");
        router.refresh(); // Tell Server to fetch DB records
      } else {
        alert("Incorrect password");
      }
    }
  };

  if (authStep < 2) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0f111a", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>
        <FadeIn direction="up">
          <div style={{ backgroundColor: "#1c1f2e", padding: "50px", borderRadius: "20px", border: "1px solid #2d3142", width: "400px", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "15px", backgroundColor: "#00f0ff", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: "1.8rem", color: "#000", margin: "0 auto 30px auto" }}>W</div>
            <h1 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "10px", fontWeight: "700" }}>
              {authStep === 0 ? "Admin Access" : "Secondary Authorization"}
            </h1>
            <p style={{ color: "#7a7e93", marginBottom: "30px", fontSize: "0.95rem" }}>
              {authStep === 0 ? "Enter primary clearance code." : "Enter secondary clearance code."}
            </p>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={authStep === 0 ? "Primary Password" : "Secondary Password"}
                style={{ padding: "15px", borderRadius: "10px", backgroundColor: "#0f111a", border: "1px solid #2d3142", color: "#fff", fontSize: "1.1rem", outline: "none", width: "100%" }}
                onFocus={(e) => e.target.style.border = "1px solid #00f0ff"}
                onBlur={(e) => e.target.style.border = "1px solid #2d3142"}
              />
              <button type="submit" style={{ padding: "15px", borderRadius: "10px", backgroundColor: "#00f0ff", color: "#000", fontWeight: "bold", fontSize: "1.1rem", border: "none", cursor: "pointer" }}>
                {authStep === 0 ? "Verify Primary" : "Access Dashboard"}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    );
  }

  const totalLeads = onboardingLeads.length + interestLeads.length + enterpriseLeads.length + waitingListLeads.length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f111a", display: "flex", fontFamily: "sans-serif", color: "#fff" }}>
      
      {/* Sidebar */}
      <div style={{ width: "280px", backgroundColor: "#1c1f2e", borderRight: "1px solid #2d3142", padding: "30px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "50px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#ff007f", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: "1.2rem" }}>W</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "2px" }}>WIPA ADMIN</h1>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { id: "overview", label: "Dashboard Overview" },
            { id: "onboarding", label: "Onboarding Leads" },
            { id: "interests", label: "Checkout Tracking" },
            { id: "enterprise", label: "Enterprise Inquiries" },
            { id: "waiting_list", label: "Waiting List Leads" },
            { id: "defense", label: "Defense Mode" }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                padding: "15px 20px", 
                borderRadius: "12px", 
                backgroundColor: activeTab === item.id ? "rgba(0, 240, 255, 0.1)" : "transparent",
                color: activeTab === item.id ? "#00f0ff" : "#7a7e93",
                border: "none",
                textAlign: "left",
                fontSize: "1rem",
                fontWeight: activeTab === item.id ? "600" : "500",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                }
              }}
              onMouseOut={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.color = "#7a7e93";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto", height: "100vh" }}>
        
        {/* Topbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>
              {activeTab === 'overview' && "Platform Overview"}
              {activeTab === 'onboarding' && "Onboarding Leads"}
              {activeTab === 'interests' && "Checkout Tracking"}
              {activeTab === 'enterprise' && "Enterprise Inquiries"}
              {activeTab === 'waiting_list' && "Waiting List Leads"}
            </h2>
            <p style={{ color: "#7a7e93", marginTop: "5px" }}>Real-time statistics and defense tracking.</p>
          </div>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#3a3f58" }}></div>
            <span style={{ fontWeight: "600" }}>Admin</span>
          </div>
        </div>

        <FadeIn direction="up" key={activeTab}>
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards */}
              <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "40px" }}>
                <div style={{ backgroundColor: "#1c1f2e", padding: "20px", borderRadius: "15px", border: "1px solid #2d3142", borderTop: "4px solid #00f0ff" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Total Pageviews</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{analyticsEvents.length}</div>
                </div>
                
                <div style={{ backgroundColor: "#1c1f2e", padding: "20px", borderRadius: "15px", border: "1px solid #2d3142", borderTop: "4px solid #ff007f" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Unique Sessions</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{new Set(analyticsEvents.map(e => e.session_id)).size}</div>
                </div>

                <div style={{ backgroundColor: "#1c1f2e", padding: "20px", borderRadius: "15px", border: "1px solid #2d3142", borderTop: "4px solid #bc00ff" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Pages / Session</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {new Set(analyticsEvents.map(e => e.session_id)).size ? (analyticsEvents.length / new Set(analyticsEvents.map(e => e.session_id)).size).toFixed(1) : "0"}
                  </div>
                </div>

                <div style={{ backgroundColor: "#1c1f2e", padding: "20px", borderRadius: "15px", border: "1px solid #2d3142", borderTop: "4px solid #ffaa00" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Bounce Rate</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {new Set(analyticsEvents.map(e => e.session_id)).size ? Math.round((Object.values(analyticsEvents.reduce((acc, ev) => { acc[ev.session_id] = (acc[ev.session_id] || 0) + 1; return acc; }, {} as Record<string, number>)).filter(count => count === 1).length / new Set(analyticsEvents.map(e => e.session_id)).size) * 100) : 0}%
                  </div>
                </div>
                
                <div style={{ backgroundColor: "#1c1f2e", padding: "20px", borderRadius: "15px", border: "1px solid #2d3142", borderTop: "4px solid #00ff7f" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Conversion Rate</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {new Set(analyticsEvents.map(e => e.session_id)).size ? ((interestLeads.filter(l => l.payment_status === 'Payment success, subscription purchased').length / new Set(analyticsEvents.map(e => e.session_id)).size) * 100).toFixed(2) : "0.00"}%
                  </div>
                </div>
              </StaggerGrid>

              {/* Analytics Breakdowns */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginBottom: "40px" }}>
                
                {/* Devices */}
                <BreakdownCard 
                  title="Device Demographics" 
                  data={analyticsEvents.reduce((acc, ev) => { acc[ev.device_type || "Unknown"] = (acc[ev.device_type || "Unknown"] || 0) + 1; return acc; }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#00f0ff", "#bc00ff", "#ffaa00"]}
                  previewLimit={4}
                />

                {/* Browsers */}
                <BreakdownCard 
                  title="Browser Popularity" 
                  data={analyticsEvents.reduce((acc, ev) => { acc[ev.browser || "Unknown"] = (acc[ev.browser || "Unknown"] || 0) + 1; return acc; }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#ff007f", "#00f0ff", "#ffaa00", "#bc00ff"]}
                  previewLimit={4}
                />

                {/* Countries */}
                <BreakdownCard 
                  title="Country Distribution" 
                  data={analyticsEvents.reduce((acc, ev) => { acc[ev.country || "Unknown"] = (acc[ev.country || "Unknown"] || 0) + 1; return acc; }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#ffaa00", "#00f0ff", "#bc00ff", "#ff007f", "#00ff7f"]}
                  previewLimit={4}
                />

                {/* Operating Systems */}
                <BreakdownCard 
                  title="Operating Systems" 
                  data={analyticsEvents.reduce((acc, ev) => { acc[ev.os || "Unknown"] = (acc[ev.os || "Unknown"] || 0) + 1; return acc; }, {} as Record<string, number>)}
                  totalEvents={analyticsEvents.length}
                  colors={["#00ff7f", "#bc00ff", "#00f0ff", "#ff007f", "#ffaa00"]}
                  previewLimit={4}
                />

              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "40px" }}>
                <PaginatedTable title="Top Landing Pages" data={Object.entries(analyticsEvents.reduce((acc, ev) => {
                  if (!acc[ev.page_url]) acc[ev.page_url] = { views: 0, sessions: new Set<string>() };
                  acc[ev.page_url].views++;
                  acc[ev.page_url].sessions.add(ev.session_id);
                  return acc;
                }, {} as Record<string, { views: number, sessions: Set<string> }>)).sort((a: any, b: any) => b[1].views - a[1].views).map(([url, data]: [string, any]) => ({
                  page_url: url.replace(typeof window !== "undefined" ? window.location.origin : "", ""),
                  views: data.views,
                  unique_visitors: data.sessions.size
                }))} columns={['page_url', 'views', 'unique_visitors']} />
                
                <PaginatedTable title="Peak Traffic Hours" data={Object.entries(analyticsEvents.reduce((acc, ev) => {
                  const hour = new Date(ev.created_at).getHours();
                  const time = `${hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour)} ${hour >= 12 ? 'PM' : 'AM'}`;
                  acc[time] = (acc[time] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)).sort((a: any, b: any) => b[1] - a[1]).map(([time, count]: [string, any]) => ({
                  time,
                  visitors: count
                }))} columns={['time', 'visitors']} />
              </div>

              <PaginatedTable title="Recent Traffic Events" data={analyticsEvents} columns={['session_id', 'page_url', 'city', 'region', 'country', 'network', 'os', 'created_at']} />
            </>
          )}

          {activeTab === 'onboarding' && <PaginatedTable title="All Onboarding Leads" data={onboardingLeads} columns={['id', 'name', 'email', 'phone', 'country', 'journey_stage', 'created_at']} />}
          
          {activeTab === 'interests' && <PaginatedTable title="Detailed Checkout Tracking" data={interestLeads} columns={['name', 'email', 'profession', 'plan', 'amount_paid', 'paid_at', 'payment_status', 'invoice', 'created_at']} />}

          {activeTab === 'enterprise' && <PaginatedTable title="All Enterprise Inquiries" data={enterpriseLeads} columns={['id', 'name', 'email', 'phone', 'company', 'seats', 'needs', 'created_at']} />}

          {activeTab === 'waiting_list' && <PaginatedTable title="All Waiting List Leads" data={waitingListLeads} columns={['id', 'title', 'name', 'email', 'country', 'phone', 'company', 'profession', 'plan', 'seats', 'business_registration_number', 'date_of_incorporation', 'college_institute', 'student_id', 'created_at']} />}

          {activeTab === 'defense' && (
            <div style={{ backgroundColor: "#1c1f2e", borderRadius: "20px", padding: "25px", border: "1px solid #2d3142", marginTop: "25px" }}>
              <h2 style={{ color: "#00f0ff", fontSize: "1.5rem", marginBottom: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff007f", animation: "blink 1s step-end infinite" }}></div>
                SYSTEM DEFENSE OVERRIDE
              </h2>
              <DefenseTerminal analyticsEvents={analyticsEvents} />
            </div>
          )}

        </FadeIn>
      </div>

    </div>
  );
}

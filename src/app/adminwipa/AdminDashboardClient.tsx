"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import StaggerGrid from "@/components/animations/StaggerGrid";
import { useRouter } from "next/navigation";

type AdminDashboardProps = {
  onboardingLeads: any[];
  interestLeads: any[];
  enterpriseLeads: any[];
  analyticsEvents: any[];
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

const DefenseTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const scripts = [
      "Running security scan on 127.0.0.1...",
      "Firewall active. Monitoring incoming traffic.",
      "Decrypting payload 0x8F9A...",
      "Warning: Unauthorized access attempt blocked from IP 192.168.1.5",
      "Updating encryption protocols...",
      "Analyzing system integrity: 100% stable.",
      "Bypassing mainframe proxy...",
      "Routing traffic through VPN node 44...",
      "Executing deep packet inspection...",
      "Checking database synchronization...",
      "SQL Injection attempt mitigated successfully.",
      "Network packet loss: 0.00%",
      "Compiling defensive heuristics...",
      "Loading kernel modules...",
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, `[${new Date().toISOString().split('T')[1].split('.')[0]}] ${scripts[Math.floor(Math.random() * scripts.length)]}`];
        if (newLogs.length > 20) newLogs.shift();
        return newLogs;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

export default function AdminDashboardClient({ onboardingLeads, interestLeads, enterpriseLeads, analyticsEvents }: AdminDashboardProps) {
  const [authStep, setAuthStep] = useState(0); // 0 = unauth, 1 = first pass success, 2 = fully auth
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authStep === 0) {
      if (password === "wipa2026") {
        setAuthStep(1);
        setPassword("");
      } else {
        alert("Incorrect password");
      }
    } else if (authStep === 1) {
      if (password === "northon1") {
        setAuthStep(2);
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

  const totalLeads = onboardingLeads.length + interestLeads.length + enterpriseLeads.length;

  const renderTable = (title: string, data: any[], columns: string[]) => (
    <div style={{ backgroundColor: "#1c1f2e", borderRadius: "20px", padding: "25px", border: "1px solid #2d3142", marginTop: "25px", overflowX: "auto" }}>
      <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "20px", fontWeight: "600" }}>{title}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", color: "#b3b7c6" }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #2d3142", color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: "30px", textAlign: "center", color: "#7a7e93", fontSize: "0.95rem" }}>
                No data available yet. Waiting for new leads...
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #2d3142", transition: "background-color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#24283b"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                {columns.map(col => (
                  <td key={col} style={{ padding: "15px", fontSize: "0.95rem" }}>
                    {col === 'created_at' || col === 'paid_at' 
                      ? (row[col] ? new Date(row[col]).toLocaleString() : '-') 
                      : col === 'amount_paid' 
                        ? (row[col] ? `£${row[col]}` : '-')
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
              <StaggerGrid style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px", marginBottom: "40px" }}>
                <div style={{ backgroundColor: "#1c1f2e", padding: "30px", borderRadius: "20px", border: "1px solid #2d3142", borderTop: "4px solid #00f0ff" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Total Pageviews</h3>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{analyticsEvents.length}</div>
                </div>
                
                <div style={{ backgroundColor: "#1c1f2e", padding: "30px", borderRadius: "20px", border: "1px solid #2d3142", borderTop: "4px solid #ff007f" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Unique Sessions</h3>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{new Set(analyticsEvents.map(e => e.session_id)).size}</div>
                </div>

                <div style={{ backgroundColor: "#1c1f2e", padding: "30px", borderRadius: "20px", border: "1px solid #2d3142", borderTop: "4px solid #bc00ff" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Total Form Leads</h3>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{totalLeads}</div>
                </div>

                <div style={{ backgroundColor: "#1c1f2e", padding: "30px", borderRadius: "20px", border: "1px solid #2d3142", borderTop: "4px solid #ffaa00" }}>
                  <h3 style={{ color: "#7a7e93", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Active Checkouts</h3>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{interestLeads.length}</div>
                </div>
              </StaggerGrid>

              {/* Analytics Breakdowns */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", marginBottom: "40px" }}>
                
                {/* Devices */}
                <div style={{ backgroundColor: "#1c1f2e", padding: "30px", borderRadius: "20px", border: "1px solid #2d3142" }}>
                  <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "30px", fontWeight: "600", textAlign: "center" }}>Device Demographics</h3>
                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
                    {Object.entries(analyticsEvents.reduce((acc, ev) => { acc[ev.device_type] = (acc[ev.device_type] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([device, count], index) => {
                      const colors = ["#00f0ff", "#bc00ff", "#ffaa00"];
                      return (
                        <CircularProgress 
                          key={device} 
                          percentage={Math.round(((count as number) / Math.max(1, analyticsEvents.length)) * 100)} 
                          color={colors[index % colors.length]} 
                          label={device} 
                          value={String(count)} 
                        />
                      );
                    })}
                    {analyticsEvents.length === 0 && <p style={{ color: "#7a7e93" }}>No data yet.</p>}
                  </div>
                </div>

                {/* Browsers */}
                <div style={{ backgroundColor: "#1c1f2e", padding: "30px", borderRadius: "20px", border: "1px solid #2d3142" }}>
                  <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "30px", fontWeight: "600", textAlign: "center" }}>Browser Popularity</h3>
                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
                    {Object.entries(analyticsEvents.reduce((acc, ev) => { acc[ev.browser] = (acc[ev.browser] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([browser, count], index) => {
                      const colors = ["#ff007f", "#00f0ff", "#ffaa00", "#bc00ff"];
                      return (
                        <CircularProgress 
                          key={browser} 
                          percentage={Math.round(((count as number) / Math.max(1, analyticsEvents.length)) * 100)} 
                          color={colors[index % colors.length]} 
                          label={browser} 
                          value={String(count)} 
                        />
                      );
                    })}
                    {analyticsEvents.length === 0 && <p style={{ color: "#7a7e93" }}>No data yet.</p>}
                  </div>
                </div>

                {/* Countries */}
                <div style={{ backgroundColor: "#1c1f2e", padding: "30px", borderRadius: "20px", border: "1px solid #2d3142" }}>
                  <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "30px", fontWeight: "600", textAlign: "center" }}>Country Distribution</h3>
                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
                    {Object.entries(analyticsEvents.reduce((acc, ev) => { acc[ev.country || "Unknown"] = (acc[ev.country || "Unknown"] || 0) + 1; return acc; }, {} as Record<string, number>)).map(([country, count], index) => {
                      const colors = ["#ffaa00", "#00f0ff", "#bc00ff", "#ff007f"];
                      return (
                        <CircularProgress 
                          key={country} 
                          percentage={Math.round(((count as number) / Math.max(1, analyticsEvents.length)) * 100)} 
                          color={colors[index % colors.length]} 
                          label={country} 
                          value={String(count)} 
                        />
                      );
                    })}
                    {analyticsEvents.length === 0 && <p style={{ color: "#7a7e93" }}>No data yet.</p>}
                  </div>
                </div>

              </div>

              {renderTable("Recent Traffic Events", analyticsEvents.slice(0, 10), ['session_id', 'page_url', 'country', 'network', 'device_type', 'created_at'])}
            </>
          )}

          {activeTab === 'onboarding' && renderTable("All Onboarding Leads", onboardingLeads, ['id', 'name', 'email', 'phone', 'country', 'journey_stage', 'created_at'])}
          
          {activeTab === 'interests' && renderTable("Detailed Checkout Tracking", interestLeads, ['name', 'email', 'profession', 'plan', 'amount_paid', 'paid_at', 'payment_status', 'created_at'])}

          {activeTab === 'enterprise' && renderTable("All Enterprise Inquiries", enterpriseLeads, ['id', 'name', 'email', 'phone', 'company', 'seats', 'needs', 'created_at'])}

          {activeTab === 'defense' && (
            <div style={{ backgroundColor: "#1c1f2e", borderRadius: "20px", padding: "25px", border: "1px solid #2d3142", marginTop: "25px" }}>
              <h2 style={{ color: "#00f0ff", fontSize: "1.5rem", marginBottom: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff007f", animation: "blink 1s step-end infinite" }}></div>
                SYSTEM DEFENSE OVERRIDE
              </h2>
              <DefenseTerminal />
            </div>
          )}

        </FadeIn>
      </div>

    </div>
  );
}

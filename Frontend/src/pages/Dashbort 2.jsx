import { useState, useEffect } from "react";

// ── Mock Data ──────────────────────────────────────────
const ORDERS = [
  { id: "#9420", table: "Table 12", items: "Wagyu Steak, Truffle Fries...", time: "12m ago", status: "Preparing" },
  { id: "#9418", table: "Table 05", items: "Salmon Tartare, Chardonnay",   time: "24m ago", status: "Served" },
  { id: "#9425", table: "Table 22", items: "Lobster Bisque, Garden Salad", time: "5m ago",  status: "Waiting" },
  { id: "#9415", table: "Table 08", items: "Margherita Pizza x2",          time: "45m ago", status: "Completed" },
];

const TABLES = Array.from({ length: 16 }, (_, i) => ({
  id: String(i + 1).padStart(2, "0"),
  busy: [1,2,4,6,7,9,10,11,12,14,15,16].includes(i + 1),
}));

const STAFF = [
  { name: "Marco Rossi", role: "Head Chef", online: true, initials: "MR", color: "#e8a838" },
  { name: "Sarah Chen",  role: "Floor Lead", online: true, initials: "SC", color: "#5b8af5" },
];

const STATUS_STYLE = {
  Preparing: { bg: "#fff3e0", color: "#e67e00", dot: "#e67e00" },
  Served:    { bg: "#e8f5e9", color: "#2e7d32", dot: "#43a047" },
  Waiting:   { bg: "#e3f2fd", color: "#1565c0", dot: "#2196f3" },
  Completed: { bg: "#f3e5f5", color: "#6a1b9a", dot: "#9c27b0" },
};

const NAV = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "⬜", label: "Tables" },
  { icon: "🔥", label: "Kitchen Board" },
  { icon: "🧾", label: "Billing" },
  { icon: "🍽", label: "Menu" },
];

// ── Component ──────────────────────────────────────────
export default function KitchenDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={s.root}>
      {/* ── Sidebar ── */}
      <aside style={s.sidebar}>
        <div style={s.brand}>
          <div style={s.brandIcon}>LD</div>
          <div>
            <div style={s.brandName}>Luminous<span style={{ color: "#5b8af5" }}>Dine</span></div>
            <div style={s.brandSub}>Management Suite</div>
          </div>
        </div>

        <nav style={s.nav}>
          {NAV.map(({ icon, label }) => (
            <button key={label} onClick={() => setActiveNav(label)}
              style={{ ...s.navBtn, ...(activeNav === label ? s.navActive : {}) }}>
              <span style={s.navIcon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div style={s.sidebarBottom}>
          <button style={s.navBtn}><span style={s.navIcon}>❓</span><span>Help</span></button>
          <button style={s.navBtn}><span style={s.navIcon}>↩</span><span>Sign Out</span></button>
          <div style={s.sysStatus}>
            <span style={s.sysStatusDot} />
            <span style={s.sysStatusLabel}>System Status</span>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={s.main}>
        {/* Top Bar */}
        <header style={s.topbar}>
          <div style={s.topbarTabs}>
            {["Dashboard", "Tables", "Kitchen Board"].map(t => (
              <button key={t} onClick={() => setActiveNav(t)}
                style={{ ...s.topbarTab, ...(activeNav === t ? s.topbarTabActive : {}) }}>
                {t}
              </button>
            ))}
          </div>
          <div style={s.topbarRight}>
            <input style={s.searchBox} placeholder="Search orders..." />
            <button style={s.iconBtn}>🔔</button>
            <button style={s.iconBtn}>⚙️</button>
            <div style={s.userAvatar}>JD</div>
          </div>
        </header>

        {/* Content */}
        <div style={s.content}>
          {/* Page Title */}
          <div style={s.pageHead}>
            <h1 style={s.pageTitle}>Service Overview</h1>
            <p style={s.pageSub}>Real-time operations for {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
          </div>

          {/* ── Stat Cards ── */}
          <div style={s.statsRow}>
            {[
              { icon: "🛒", label: "ACTIVE ORDERS",   value: "24",    badge: "+12%",       badgeColor: "#2e7d32", badgeBg: "#e8f5e9" },
              { icon: "⬜", label: "FREE TABLES",      value: "22",    badge: "8/30",        badgeColor: "#1565c0", badgeBg: "#e3f2fd" },
              { icon: "🔥", label: "PENDING KITCHEN",  value: "11",    badge: "High",        badgeColor: "#c62828", badgeBg: "#ffebee" },
              { icon: "💵", label: "REVENUE TODAY",    value: "$4,820", badge: null,         badgeColor: null,      badgeBg: null },
            ].map(({ icon, label, value, badge, badgeColor, badgeBg }) => (
              <div key={label} style={s.statCard}>
                <div style={s.statCardTop}>
                  <span style={s.statIcon}>{icon}</span>
                  {badge && (
                    <span style={{ ...s.statBadge, color: badgeColor, background: badgeBg }}>{badge}</span>
                  )}
                </div>
                <div style={s.statLabel}>{label}</div>
                <div style={s.statValue}>{value}</div>
              </div>
            ))}
          </div>

          {/* ── Middle Row ── */}
          <div style={s.midRow}>
            {/* Left Col */}
            <div style={s.leftCol}>
              {/* Kitchen Load */}
              <div style={s.panel}>
                <div style={s.panelHead}>
                  <span>🔥 Kitchen Load Status</span>
                  <span style={s.intenseBadge}>Intense Load</span>
                </div>
                <div style={s.loadBarTrack}>
                  <div style={{ ...s.loadBarFill, width: "80%" }} />
                </div>
                <div style={s.loadLabels}>
                  <span>Cold Prep: 15%</span>
                  <span>Main Grill: 90%</span>
                  <span>Pastry: 45%</span>
                </div>
              </div>

              {/* Orders Table */}
              <div style={s.panel}>
                <div style={s.panelHead}>
                  <span style={{ fontWeight: 600 }}>Current Orders</span>
                  <button style={s.viewAllBtn}>View All</button>
                </div>
                <table style={s.table}>
                  <thead>
                    <tr>
                      {["ORDER ID", "TABLE", "ITEMS", "TIME", "STATUS"].map(h => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map(o => {
                      const st = STATUS_STYLE[o.status];
                      return (
                        <tr key={o.id} style={s.tr}>
                          <td style={{ ...s.td, color: "#5b8af5", fontWeight: 600 }}>{o.id}</td>
                          <td style={s.td}>{o.table}</td>
                          <td style={{ ...s.td, color: "#666", maxWidth: "140px" }}>{o.items}</td>
                          <td style={{ ...s.td, color: "#999" }}>{o.time}</td>
                          <td style={s.td}>
                            <span style={{ ...s.statusPill, background: st.bg, color: st.color }}>
                              <span style={{ ...s.statusDot, background: st.dot }} />
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Col */}
            <div style={s.rightCol}>
              {/* Table Grid */}
              <div style={s.panel}>
                <div style={s.panelHead}>
                  <span style={{ fontWeight: 600 }}>Live Table Status</span>
                  <div style={s.legend}>
                    <span style={s.legendFree}>● Free</span>
                    <span style={s.legendBusy}>● Busy</span>
                  </div>
                </div>
                <div style={s.tableGrid}>
                  {TABLES.map(t => (
                    <div key={t.id}
                      style={{ ...s.tableCell, ...(t.busy ? s.tableCellBusy : s.tableCellFree) }}>
                      {t.id}
                    </div>
                  ))}
                </div>
                <button style={s.assignBtn}>+ Manual Table Assignment</button>
              </div>

              {/* Staff */}
              <div style={s.panel}>
                <div style={{ fontWeight: 600, marginBottom: "12px", fontSize: "13px" }}>Staff on Duty</div>
                {STAFF.map(p => (
                  <div key={p.name} style={s.staffRow}>
                    <div style={{ ...s.staffAvatar, background: p.color }}>{p.initials}</div>
                    <div style={s.staffInfo}>
                      <div style={s.staffName}>{p.name}</div>
                      <div style={s.staffRole}>{p.role}</div>
                    </div>
                    <span style={s.onlineDot} />
                  </div>
                ))}
              </div>

              {/* Quick Order CTA */}
              <div style={s.quickOrder}>
                <div style={s.quickOrderText}>
                  <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>Need a Quick Order?</div>
                  <div style={{ fontSize: "12px", opacity: 0.85 }}>Instantly bypass the queue for walk-ins or takeaway VIPs.</div>
                </div>
                <button style={s.quickOrderBtn}>Create Order</button>
                <span style={s.quickOrderIcon}>🍴</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────
const s = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#f0f2f7",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    fontSize: "13px",
    color: "#1a1a2e",
  },
  // Sidebar
  sidebar: {
    width: "200px",
    minHeight: "100vh",
    background: "#fff",
    borderRight: "1px solid #e8eaf0",
    display: "flex",
    flexDirection: "column",
    padding: "20px 12px",
    flexShrink: 0,
  },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px", paddingLeft: "4px" },
  brandIcon: {
    width: "34px", height: "34px", borderRadius: "8px",
    background: "linear-gradient(135deg,#5b8af5,#764ba2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: "700", fontSize: "12px",
  },
  brandName: { fontWeight: "700", fontSize: "14px", color: "#1a1a2e" },
  brandSub: { fontSize: "10px", color: "#999" },
  nav: { display: "flex", flexDirection: "column", gap: "2px", flex: 1 },
  navBtn: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "9px 12px", borderRadius: "8px",
    background: "none", border: "none",
    color: "#888", fontSize: "13px", fontWeight: "500",
    cursor: "pointer", textAlign: "left", width: "100%",
    transition: "all 0.15s",
  },
  navActive: {
    background: "#eff3ff",
    color: "#5b8af5",
    fontWeight: "600",
  },
  navIcon: { fontSize: "15px", width: "18px", textAlign: "center" },
  sidebarBottom: { display: "flex", flexDirection: "column", gap: "2px", borderTop: "1px solid #f0f0f0", paddingTop: "12px" },
  sysStatus: { display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px" },
  sysStatusDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#43a047" },
  sysStatusLabel: { fontSize: "11px", color: "#aaa" },
  // Topbar
  topbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "#fff", borderBottom: "1px solid #e8eaf0",
    padding: "0 24px", height: "52px", flexShrink: 0,
  },
  topbarTabs: { display: "flex", gap: "0px" },
  topbarTab: {
    padding: "16px 16px", background: "none", border: "none",
    borderBottom: "2px solid transparent",
    color: "#999", fontSize: "13px", fontWeight: "500", cursor: "pointer",
  },
  topbarTabActive: { color: "#5b8af5", borderBottomColor: "#5b8af5" },
  topbarRight: { display: "flex", alignItems: "center", gap: "10px" },
  searchBox: {
    padding: "6px 12px", borderRadius: "8px",
    border: "1px solid #e8eaf0", background: "#f7f8fc",
    fontSize: "13px", color: "#666", outline: "none", width: "160px",
  },
  iconBtn: {
    padding: "6px 8px", background: "none", border: "1px solid #e8eaf0",
    borderRadius: "8px", cursor: "pointer", fontSize: "15px",
  },
  userAvatar: {
    width: "32px", height: "32px", borderRadius: "50%",
    background: "linear-gradient(135deg,#5b8af5,#764ba2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: "700", fontSize: "11px",
  },
  // Main
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  content: { flex: 1, overflowY: "auto", padding: "24px" },
  pageHead: { marginBottom: "20px" },
  pageTitle: { fontSize: "20px", fontWeight: "700", margin: "0 0 4px" },
  pageSub: { color: "#999", margin: 0, fontSize: "13px" },
  // Stats
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "20px" },
  statCard: {
    background: "#fff", borderRadius: "12px",
    padding: "16px 18px", border: "1px solid #eef0f6",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  statCardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  statIcon: { fontSize: "20px" },
  statBadge: { fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "12px" },
  statLabel: { fontSize: "11px", color: "#aaa", fontWeight: "600", letterSpacing: "0.04em", marginBottom: "4px" },
  statValue: { fontSize: "24px", fontWeight: "700", color: "#1a1a2e" },
  // Mid Row
  midRow: { display: "flex", gap: "16px" },
  leftCol: { flex: 1, display: "flex", flexDirection: "column", gap: "16px" },
  rightCol: { width: "220px", display: "flex", flexDirection: "column", gap: "16px" },
  panel: {
    background: "#fff", borderRadius: "12px",
    padding: "16px", border: "1px solid #eef0f6",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  panelHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", fontSize: "13px", color: "#555" },
  intenseBadge: { background: "#fff3e0", color: "#e67e00", fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "12px" },
  loadBarTrack: { height: "8px", background: "#f0f2f7", borderRadius: "4px", marginBottom: "8px", overflow: "hidden" },
  loadBarFill: {
    height: "100%", borderRadius: "4px",
    background: "linear-gradient(90deg, #43a047 0%, #f9a825 50%, #e53935 100%)",
  },
  loadLabels: { display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#aaa" },
  // Table
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "8px 10px", textAlign: "left", color: "#bbb", fontSize: "11px", fontWeight: "600", letterSpacing: "0.05em", borderBottom: "1px solid #f0f0f0" },
  tr: { borderBottom: "1px solid #f7f8fc" },
  td: { padding: "10px 10px", color: "#333" },
  statusPill: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "3px 10px", borderRadius: "12px",
    fontSize: "11px", fontWeight: "600",
  },
  statusDot: { width: "6px", height: "6px", borderRadius: "50%" },
  viewAllBtn: {
    background: "none", border: "none", color: "#5b8af5",
    fontSize: "12px", fontWeight: "600", cursor: "pointer",
  },
  // Table Grid
  legend: { display: "flex", gap: "10px", fontSize: "11px" },
  legendFree: { color: "#43a047" },
  legendBusy: { color: "#e53935" },
  tableGrid: {
    display: "grid", gridTemplateColumns: "repeat(4,1fr)",
    gap: "6px", marginBottom: "12px",
  },
  tableCell: {
    height: "32px", borderRadius: "6px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: "600",
  },
  tableCellFree: { background: "#e8f5e9", color: "#2e7d32" },
  tableCellBusy: { background: "#5b8af5", color: "#fff" },
  assignBtn: {
    width: "100%", padding: "8px", background: "#eff3ff",
    border: "1px solid #c5d3f8", borderRadius: "8px",
    color: "#5b8af5", fontSize: "12px", fontWeight: "600", cursor: "pointer",
  },
  // Staff
  staffRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  staffAvatar: {
    width: "32px", height: "32px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: "700", fontSize: "11px", flexShrink: 0,
  },
  staffInfo: { flex: 1 },
  staffName: { fontWeight: "600", fontSize: "12px" },
  staffRole: { color: "#aaa", fontSize: "11px" },
  onlineDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#43a047" },
  // Quick Order
  quickOrder: {
    background: "linear-gradient(135deg,#4a6cf7,#764ba2)",
    borderRadius: "12px", padding: "16px",
    position: "relative", overflow: "hidden",
  },
  quickOrderText: { color: "#fff", marginBottom: "12px" },
  quickOrderBtn: {
    background: "#fff", border: "none", borderRadius: "8px",
    padding: "7px 14px", fontSize: "12px", fontWeight: "700",
    color: "#4a6cf7", cursor: "pointer",
  },
  quickOrderIcon: {
    position: "absolute", right: "12px", bottom: "8px",
    fontSize: "28px", opacity: "0.25",
  },
};

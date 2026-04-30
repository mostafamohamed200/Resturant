import { useState } from "react";

const API_URL = "https://your-api.com/api/orders"; // ← Change this URL

const INITIAL_ORDERS = [
  { id: "#ORD-001", customer: "John Smith", product: "Laptop", qty: 1, price: 1200, status: "Delivered" },
  { id: "#ORD-002", customer: "Sarah Connor", product: "Mouse", qty: 3, price: 45, status: "Pending" },
  { id: "#ORD-003", customer: "Mike Johnson", product: "Keyboard", qty: 2, price: 90, status: "Processing" },
  { id: "#ORD-004", customer: "Emily Davis", product: "Monitor", qty: 1, price: 350, status: "Cancelled" },
];

const STATUS_COLORS = {
  Delivered:  { bg: "#e8f5e9", color: "#2e7d32", border: "#c8e6c9" },
  Pending:    { bg: "#fff8e1", color: "#f57f17", border: "#ffecb3" },
  Processing: { bg: "#e3f2fd", color: "#1565c0", border: "#bbdefb" },
  Cancelled:  { bg: "#ffebee", color: "#c62828", border: "#ffcdd2" },
};

export default function Order() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [form, setForm] = useState({ customer: "", product: "", qty: "", price: "", status: "Pending" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("list"); // "list" | "add"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!form.customer || !form.product || !form.qty || !form.price) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Uncomment to connect to real API:
      // const response = await fetch(API_URL, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      //   body: JSON.stringify(form),
      // });
      // const data = await response.json();
      // if (!response.ok) { setError(data.message || "Failed to add order"); return; }

      // Simulate adding locally
      await new Promise((r) => setTimeout(r, 800));
      const newOrder = {
        id: `#ORD-00${orders.length + 1}`,
        ...form,
        qty: Number(form.qty),
        price: Number(form.price),
      };
      setOrders([newOrder, ...orders]);
      setForm({ customer: "", product: "", qty: "", price: "", status: "Pending" });
      setSuccess("Order added successfully! ✅");
      setActiveTab("list");
    } catch {
      setError("Connection error, please check your internet");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>⬡</div>
          <h1 style={styles.title}>Orders</h1>
          <p style={styles.subtitle}>Manage and track all your orders</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab("list")}
            style={{ ...styles.tab, ...(activeTab === "list" ? styles.tabActive : {}) }}
          >
            📋 Order List
          </button>
          <button
            onClick={() => setActiveTab("add")}
            style={{ ...styles.tab, ...(activeTab === "add" ? styles.tabActive : {}) }}
          >
            ➕ New Order
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}
        {success && (
          <div style={styles.successBox}>✅ {success}</div>
        )}

        {/* ── ORDER LIST ── */}
        {activeTab === "list" && (
          <div style={styles.card}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Order ID", "Customer", "Product", "Qty", "Price", "Status", "Action"].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const s = STATUS_COLORS[order.status] || STATUS_COLORS.Pending;
                    return (
                      <tr key={order.id} style={styles.tr}>
                        <td style={styles.td}><span style={styles.orderId}>{order.id}</span></td>
                        <td style={styles.td}>{order.customer}</td>
                        <td style={styles.td}>{order.product}</td>
                        <td style={styles.td}>{order.qty}</td>
                        <td style={styles.td}>${Number(order.price).toLocaleString()}</td>
                        <td style={styles.td}>
                          <span style={{ ...styles.badge, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button onClick={() => handleDelete(order.id)} style={styles.deleteBtn}>🗑</button>
                        </td>
                      </tr>
                    );
                  })}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ ...styles.td, textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "32px" }}>
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ADD ORDER FORM ── */}
        {activeTab === "add" && (
          <div style={styles.card}>
            <div style={styles.formGrid}>
              {[
                { name: "customer", label: "Customer Name", placeholder: "John Smith", type: "text" },
                { name: "product",  label: "Product",       placeholder: "e.g. Laptop",  type: "text" },
                { name: "qty",      label: "Quantity",      placeholder: "1",             type: "number" },
                { name: "price",    label: "Price ($)",     placeholder: "0.00",          type: "number" },
              ].map(({ name, label, placeholder, type }) => (
                <div key={name} style={styles.fieldGroup}>
                  <label style={styles.label}>{label}</label>
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              ))}

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} style={styles.input}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Adding Order..." : "Add Order"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// ===================== Styles =====================
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    background: "#f0f2f7",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: "40px 16px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "860px",
  },
  header: {
    textAlign: "center",
    marginBottom: "28px",
  },
  logo: { fontSize: "36px", marginBottom: "10px" },
  title: { color: "#1a1a2e", fontSize: "26px", fontWeight: "700", margin: "0 0 6px" },
  subtitle: { color: "#aaa", fontSize: "14px", margin: 0 },
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    flex: 1,
    padding: "12px",
    background: "#fff",
    border: "1px solid #eef0f6",
    borderRadius: "12px",
    color: "#999",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#eff3ff",
    border: "1px solid #c5d3f8",
    color: "#5b8af5",
  },
  card: {
    background: "#fff",
    border: "1px solid #eef0f6",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },
  errorBox: {
    background: "#ffebee",
    border: "1px solid #ffcdd2",
    color: "#c62828",
    borderRadius: "10px",
    padding: "10px 14px",
    marginBottom: "16px",
    fontSize: "13px",
  },
  successBox: {
    background: "#e8f5e9",
    border: "1px solid #c8e6c9",
    color: "#2e7d32",
    borderRadius: "10px",
    padding: "10px 14px",
    marginBottom: "16px",
    fontSize: "13px",
  },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    color: "#bbb",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #f0f0f0",
    whiteSpace: "nowrap",
  },
  tr: { borderBottom: "1px solid #f7f8fc" },
  td: { padding: "14px", color: "#333", fontSize: "14px" },
  orderId: { color: "#5b8af5", fontWeight: "600" },
  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  deleteBtn: {
    background: "#ffebee",
    border: "1px solid #ffcdd2",
    color: "#c62828",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    marginBottom: "24px",
  },
  fieldGroup: { display: "flex", flexDirection: "column" },
  label: {
    color: "#555",
    fontSize: "13px",
    marginBottom: "7px",
    fontWeight: "600",
  },
  input: {
    padding: "11px 14px",
    background: "#f7f8fc",
    border: "1px solid #e8eaf0",
    borderRadius: "10px",
    color: "#1a1a2e",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #5b8af5, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 14px rgba(91,138,245,0.35)",
  },
};

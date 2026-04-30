import { useState } from "react";

const API_URL = "https://your-api.com/api/login"; // ← Change this URL

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials, please try again");
        return;
      }

      localStorage.setItem("token", data.token);
      // navigate("/dashboard");
      alert("Logged in successfully! ✅");

    } catch (err) {
      setError("Connection error, please check your internet");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoWrap}>
            <div style={styles.logoIcon}>LD</div>
          </div>
          <h1 style={styles.title}>Login to Restaurant</h1>
          <p style={styles.subtitle}>Enter your details</p>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>⚠️ {error}</div>
        )}

        {/* Email */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
          />
        </div>

        {/* Password */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password</label>
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ ...styles.input, paddingRight: "42px" }}
            />
            <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn} type="button">
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Forgot */}
        <div style={{ textAlign: "right", marginBottom: "22px" }}>
          <a href="#" style={styles.forgotLink}>Forgot password?</a>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ ...styles.loginBtn, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f7",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  card: {
    background: "#fff",
    border: "1px solid #eef0f6",
    borderRadius: "20px",
    padding: "44px 40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },
  header: { textAlign: "center", marginBottom: "30px" },
  logoWrap: { display: "flex", justifyContent: "center", marginBottom: "14px" },
  logoIcon: {
    width: "48px", height: "48px", borderRadius: "12px",
    background: "linear-gradient(135deg, #4a6cf7, #764ba2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: "700", fontSize: "15px",
  },
  title: { color: "#1a1a2e", fontSize: "22px", fontWeight: "700", margin: "0 0 5px" },
  subtitle: { color: "#aaa", fontSize: "13px", margin: 0 },
  errorBox: {
    background: "#ffebee", border: "1px solid #ffcdd2", color: "#c62828",
    borderRadius: "10px", padding: "10px 14px", marginBottom: "18px",
    fontSize: "13px", display: "flex", gap: "8px", alignItems: "center",
  },
  fieldGroup: { marginBottom: "18px" },
  label: { display: "block", color: "#555", fontSize: "13px", marginBottom: "7px", fontWeight: "600" },
  input: {
    width: "100%", padding: "11px 14px",
    background: "#f7f8fc", border: "1px solid #e8eaf0",
    borderRadius: "10px", color: "#1a1a2e", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
  },
  passwordWrapper: { position: "relative" },
  eyeBtn: {
    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", fontSize: "16px", padding: 0,
  },
  forgotLink: { color: "#5b8af5", fontSize: "13px", textDecoration: "none", fontWeight: "500" },
  loginBtn: {
    width: "100%", padding: "13px",
    background: "linear-gradient(135deg, #5b8af5, #764ba2)",
    color: "#fff", border: "none", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600",
    boxShadow: "0 4px 14px rgba(91,138,245,0.35)",
  },
};

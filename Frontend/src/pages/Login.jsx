import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data); // 👈 مهم للتأكد

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // 🔥 routing
switch (role) {
  case "admin":
    navigate("/dashboard");
    break;
  case "waiter":
    navigate("/waiter");
    break;
  case "chef":
    navigate("/chef");
    break;
  case "cashier":
    navigate("/cashier");
    break;
  default:
    navigate("/login");
}
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Restaurant System 🍽️</h1>
      </div>

      <div className="right">
        <div className="form-box">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
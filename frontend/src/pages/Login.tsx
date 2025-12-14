import { useState } from "react";
import { loginUser } from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials");
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <h1>🍬 Sweet Shop Login</h1>

        <p style={{ textAlign: "center", marginBottom: 20, color: "#666" }}>
          Welcome back! Please login to continue
        </p>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {/* REGISTER OPTION */}
        <p style={{ textAlign: "center", marginTop: 16 }}>
          New user?{" "}
          <Link
            to="/register"
            style={{ color: "#ec4899", fontWeight: 600 }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

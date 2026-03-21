import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1"
    : "https://api.azaniashop.com/api/v1";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Updated: Read role directly from data
      if (data.role !== "admin") {
        throw new Error("Access denied. Admin only.");
      }

      // Save token and user info directly from response
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role
        })
      );

      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Azania Admin</h1>
        <p style={styles.subtitle}>Marketplace Administration</p>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ECFDF5"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "360px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center"
  },
  title: {
    color: "#0F3D2E",
    marginBottom: "5px"
  },
  subtitle: {
    color: "#145A32",
    marginBottom: "25px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #d1fae5",
    borderRadius: "6px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0F3D2E",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    marginTop: "10px"
  }
};

export default AdminLogin;
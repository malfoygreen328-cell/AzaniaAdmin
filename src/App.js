import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // Save token if needed (e.g., localStorage)
      const token = data.token;
      setUser({ email: data.email, role: data.role });
      setMessage(`Logged in as ${data.role}`);

      console.log("JWT token:", token);
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Server error during login");
    }
  };

  return (
    <div className="login-container">
      <h2>Azania Admin Login</h2>

      {!user ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="welcome-box">
          <p>Welcome, {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
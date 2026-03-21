import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { api } from "../api/api";

function RequestReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2}>Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Admin Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: "#0f5132" }}>
          Send Reset Link
        </Button>
      </form>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
}

export default RequestReset;
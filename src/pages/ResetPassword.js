import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import api from "../api/api";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2}>Set New Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: "#0f5132" }}>
          Reset Password
        </Button>
      </form>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
}

export default ResetPassword;
// src/pages/Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import { Typography, Grid, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { getVendorApplications, getUnpaidVendors, approveVendor, declineVendor, sendEmail } from "../api/vendorApi";
import StatCard from "../components/StatCard";
import PendingVendorsTable from "../components/PendingVendorsTable";
import UnpaidVendorsTable from "../components/UnpaidVendorsTable";
import EmailDialog from "../components/EmailDialog";

/* =========================================
   API BASE (FOR DOCUMENT LINKS)
========================================= */
const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://api.azaniashop.com";

function Dashboard() {
  // ================================
  // STATE
  // ================================
  const [pendingVendors, setPendingVendors] = useState([]);
  const [unpaidVendors, setUnpaidVendors] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingUnpaid, setLoadingUnpaid] = useState(true);
  const [topStats, setTopStats] = useState({ traffic: 0, revenue: 0, topVendor: null });
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailData, setEmailData] = useState({ to: "", subject: "", message: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const token = localStorage.getItem("adminToken");

  // ================================
  // FETCH DASHBOARD DATA
  // ================================
  const fetchDashboardData = useCallback(async () => {
    if (!token) {
      setSnackbar({ open: true, message: "No admin token found. Please log in.", severity: "error" });
      setLoadingPending(false);
      setLoadingUnpaid(false);
      return;
    }

    try {
      setLoadingPending(true);
      setLoadingUnpaid(true);

      const vendorsRes = await getVendorApplications(token);
      const unpaidRes = await getUnpaidVendors(token);

      const vendors = Array.isArray(vendorsRes?.data?.data) ? vendorsRes.data.data : [];
      const unpaid = Array.isArray(unpaidRes?.data) ? unpaidRes.data : Object.values(unpaidRes?.data || []);

      setPendingVendors(vendors.filter((v) => v.status === "PENDING"));
      setUnpaidVendors(unpaid);

      setTopStats({
        traffic: vendorsRes?.data?.traffic || 1200,
        revenue: vendorsRes?.data?.revenue || 45000,
        topVendor: vendors[0] || null,
      });
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to load dashboard data.", severity: "error" });
    } finally {
      setLoadingPending(false);
      setLoadingUnpaid(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ================================
  // APPROVE / DECLINE VENDOR
  // ================================
  const handleApprove = async (id) => {
    try {
      await approveVendor(id, token);
      setPendingVendors((prev) => prev.filter((v) => v._id !== id));
      setSnackbar({ open: true, message: "Vendor approved", severity: "success" });
    } catch (err) {
      console.error("Approve error:", err);
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to approve vendor", severity: "error" });
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineVendor(id, token);
      setPendingVendors((prev) => prev.filter((v) => v._id !== id));
      setSnackbar({ open: true, message: "Vendor declined", severity: "success" });
    } catch (err) {
      console.error("Decline error:", err);
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to decline vendor", severity: "error" });
    }
  };

  // ================================
  // SEND EMAIL
  // ================================
  const handleSendEmail = async () => {
    if (!emailData.to || !emailData.subject || !emailData.message) {
      setSnackbar({ open: true, message: "Please fill all email fields", severity: "error" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.to)) {
      setSnackbar({ open: true, message: "Invalid email address", severity: "error" });
      return;
    }

    try {
      await sendEmail(emailData, token);
      setEmailOpen(false);
      setEmailData({ to: "", subject: "", message: "" });
      setSnackbar({ open: true, message: "Email sent successfully", severity: "success" });
    } catch (err) {
      console.error("Email error:", err);
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to send email", severity: "error" });
    }
  };

  // ================================
  // LOADING STATE
  // ================================
  if (loadingPending && loadingUnpaid) {
    return (
      <div style={{ marginLeft: 260, padding: 40 }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ marginLeft: 260, padding: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#0F3D2E" }}>
        Azania Admin Dashboard
      </Typography>

      {/* STATS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <StatCard title="Total Traffic" value={topStats.traffic} />
        <StatCard title="Total Revenue" value={`R${topStats.revenue}`} />
        <StatCard title="Unpaid Vendors" value={unpaidVendors.length} />
        <StatCard title="Top Vendor" value={topStats.topVendor?.fullName || "N/A"} sub={`Revenue: R${topStats.topVendor?.revenue || 0}`} />
      </Grid>

      {/* PENDING VENDORS TABLE */}
      <PendingVendorsTable
        pendingVendors={pendingVendors}
        apiBase={API_BASE}
        onApprove={handleApprove}
        onDecline={handleDecline}
      />

      {/* UNPAID VENDORS TABLE */}
      <UnpaidVendorsTable unpaidVendors={unpaidVendors} />

      {/* EMAIL BUTTON */}
      <Button variant="contained" sx={{ background: "#0F3D2E" }} onClick={() => setEmailOpen(true)}>
        Send Email
      </Button>

      {/* EMAIL DIALOG */}
      <EmailDialog
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        emailData={emailData}
        setEmailData={setEmailData}
        onSend={handleSendEmail}
      />

      {/* SNACKBAR */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Dashboard;
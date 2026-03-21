// src/api/vendorApi.js
import axios from "axios";

/* =========================================
   BASE URL
========================================= */
const API_BASE =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000/api/v1/vendor";

/* =========================================
   AXIOS INSTANCE
========================================= */
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 seconds timeout
});

/* =========================================
   HELPER: AUTH HEADER
========================================= */
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

/* =========================================
   GET VENDOR APPLICATIONS
========================================= */
export const getVendorApplications = async (token) => {
  console.log("API: Fetching vendor applications...");
  if (!token) throw new Error("No admin token provided");

  try {
    const res = await api.get("/applications", getAuthHeaders(token));
    // Ensure data always has a predictable structure
    return {
      data: res.data || { data: [], traffic: 0, revenue: 0 },
    };
  } catch (err) {
    console.error("Error fetching vendor applications:", err);
    throw err;
  }
};

/* =========================================
   GET UNPAID VENDORS
========================================= */
export const getUnpaidVendors = async (token) => {
  console.log("API: Fetching unpaid vendors...");
  if (!token) throw new Error("No admin token provided");

  try {
    const res = await api.get("/unpaid", getAuthHeaders(token));
    return {
      data: Array.isArray(res.data) ? res.data : Object.values(res.data || []),
    };
  } catch (err) {
    console.error("Error fetching unpaid vendors:", err);
    throw err;
  }
};

/* =========================================
   APPROVE VENDOR
========================================= */
export const approveVendor = async (vendorId, token) => {
  console.log("API: Approving vendor:", vendorId);
  if (!vendorId) throw new Error("Vendor ID is required");
  if (!token) throw new Error("No admin token provided");

  try {
    const res = await api.put(`/approve/${vendorId}`, {}, getAuthHeaders(token));
    return res.data;
  } catch (err) {
    console.error("Error approving vendor:", err);
    throw err;
  }
};

/* =========================================
   DECLINE VENDOR
========================================= */
export const declineVendor = async (vendorId, token) => {
  console.log("API: Declining vendor:", vendorId);
  if (!vendorId) throw new Error("Vendor ID is required");
  if (!token) throw new Error("No admin token provided");

  try {
    const res = await api.put(`/decline/${vendorId}`, {}, getAuthHeaders(token));
    return res.data;
  } catch (err) {
    console.error("Error declining vendor:", err);
    throw err;
  }
};

/* =========================================
   SEND EMAIL
========================================= */
export const sendEmail = async (emailData, token) => {
  console.log("API: Sending email...");
  if (!emailData.to || !emailData.subject || !emailData.message) {
    throw new Error("Email data is incomplete");
  }
  if (!token) throw new Error("No admin token provided");

  try {
    const res = await api.post("/send-email", emailData, getAuthHeaders(token));
    return res.data;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};
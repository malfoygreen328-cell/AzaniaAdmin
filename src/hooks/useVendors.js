// src/hooks/useVendors.js
import { useState, useEffect, useCallback } from "react";
import {
  getVendorApplications,
  getUnpaidVendors,
  approveVendor,
  declineVendor,
} from "../api/vendorApi";

export default function useVendors(token) {
  const [pendingVendors, setPendingVendors] = useState([]);
  const [unpaidVendors, setUnpaidVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = useCallback(async () => {
    if (!token) {
      setError("No admin token provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const vendorsRes = await getVendorApplications(token);
      const unpaidRes = await getUnpaidVendors(token);

      const vendors = Array.isArray(vendorsRes?.data?.data)
        ? vendorsRes.data.data
        : [];
      const unpaid = Array.isArray(unpaidRes?.data)
        ? unpaidRes.data
        : Object.values(unpaidRes?.data || []);

      setPendingVendors(vendors.filter((v) => v.status === "PENDING"));
      setUnpaidVendors(unpaid);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleApprove = async (vendorId) => {
    try {
      await approveVendor(vendorId, token);
      setPendingVendors((prev) => prev.filter((v) => v._id !== vendorId));
    } catch (err) {
      console.error("Approve vendor failed:", err);
      throw err;
    }
  };

  const handleDecline = async (vendorId) => {
    try {
      await declineVendor(vendorId, token);
      setPendingVendors((prev) => prev.filter((v) => v._id !== vendorId));
    } catch (err) {
      console.error("Decline vendor failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  return {
    pendingVendors,
    unpaidVendors,
    loading,
    error,
    fetchVendors,
    handleApprove,
    handleDecline,
  };
}
// src/api/api.js
import axios from "axios";

/* -------------------- BASE URL -------------------- */
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1"
    : "https://api.azaniashop.com/api/v1");

/* -------------------- AXIOS INSTANCE -------------------- */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -------------------- REQUEST INTERCEPTOR -------------------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------- RESPONSE INTERCEPTOR -------------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Unauthorized -> clear storage and redirect to login
      if (status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        window.location.href = "/login";
      }

      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

/* ========================================================= */
/* ======================= AUTH ============================ */
/* ========================================================= */
export const adminLogin = (data) => api.post("/auth/login", data);
export const getProfile = () => api.get("/auth/me");

/* ========================================================= */
/* ====================== VENDORS ========================== */
/* ========================================================= */
export const getVendors = () => api.get("/vendor");
export const getVendorApplications = () => api.get("/vendor/applications");
export const approveVendor = (id) => api.post(`/vendor/${id}/approve`);
export const declineVendor = (id) => api.post(`/vendor/${id}/decline`);
export const getUnpaidVendors = () => api.get("/vendor/unpaid");

/* ========================================================= */
/* ======================== STATS ========================== */
/* ========================================================= */
export const getTrafficStats = () => api.get("/admin/stats/traffic");
export const getRevenueStats = () => api.get("/admin/stats/revenue");
export const getTopVendor = () => api.get("/admin/stats/top");

/* ========================================================= */
/* ======================== EMAIL ========================== */
/* ========================================================= */
export const sendEmail = (data) => api.post("/admin/send-email", data);

/* ========================================================= */
/* ======================== STORES ========================= */
/* ========================================================= */
export const getBrands = () => api.get("/stores");
export const addBrand = (data) => api.post("/stores", data);
export const updateBrand = (id, data) => api.put(`/stores/${id}`, data);
export const deleteBrand = (id) => api.delete(`/stores/${id}`);
export const deleteMultipleBrands = (ids) => api.post("/stores/delete-multiple", { ids });

/* ========================================================= */
/* ======================= PRODUCTS ======================== */
/* ========================================================= */
export const getAccessories = () => api.get("/products?category=accessories");
export const addAccessory = (data) => api.post("/products", { ...data, category: "accessories" });
export const updateAccessory = (id, data) => api.put(`/products/${id}`, data);
export const deleteAccessory = (id) => api.delete(`/products/${id}`);
export const deleteMultipleAccessories = (ids) => api.post("/products/delete-multiple", { ids });

/* ========================================================= */
/* ========================= ADS =========================== */
/* ========================================================= */
export const getAds = () => api.get("/ads");
export const createAd = (data) => api.post("/ads", data);
export const updateAd = (id, data) => api.put(`/ads/${id}`, data);
export const deleteAd = (id) => api.delete(`/ads/${id}`);

/* ========================================================= */
/* ===================== EXPORT INSTANCE =================== */
/* ========================================================= */
export default api;
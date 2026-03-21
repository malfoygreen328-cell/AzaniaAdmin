import api from "./api";

// Fetch all products
export const getProducts = () => api.get("/products");

// Fetch store traffic stats
export const getStoreTraffic = () => api.get("/admin/stats/traffic");

// Fetch recent orders
export const getRecentOrders = () => api.get("/orders/recent");
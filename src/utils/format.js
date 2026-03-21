// src/utils/format.js

/**
 * Format number as currency (South African Rand)
 * @param {number} amount
 * @returns {string} e.g., R1,234.00
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "R0.00";
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date to readable string
 * @param {string|Date} date
 * @param {Object} options Intl.DateTimeFormat options
 * @returns {string} e.g., 18 Mar 2026
 */
export const formatDate = (date, options = {}) => {
  if (!date) return "";
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(d);
};

/**
 * Format number with thousand separators
 * @param {number} number
 * @returns {string} e.g., 1,234,567
 */
export const formatNumber = (number) => {
  if (typeof number !== "number") return "0";
  return number.toLocaleString("en-ZA");
};

/**
 * Format boolean to Yes/No string
 * @param {boolean} value
 * @returns {string} "Yes" or "No"
 */
export const formatBoolean = (value) => {
  return value ? "Yes" : "No";
};
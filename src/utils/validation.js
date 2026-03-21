// src/utils/validation.js

/**
 * Check if a value is not empty
 * @param {string} value
 * @returns {boolean}
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== "";
};

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{7,15}$/; // digits only, length 7-15
  return phoneRegex.test(phone);
};

/**
 * Validate that a number is positive
 * @param {number} num
 * @returns {boolean}
 */
export const isPositiveNumber = (num) => {
  return typeof num === "number" && num > 0;
};

/**
 * Validate password strength
 * @param {string} password
 * @returns {boolean}
 */
export const isStrongPassword = (password) => {
  // Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passRegex.test(password);
};
import React, { forwardRef } from "react";
import { Snackbar, Alert } from "@mui/material";

/**
 * Notification Component
 * Props:
 * - open: boolean (whether notification is visible)
 * - onClose: function (callback when notification closes)
 * - message: string (text to show)
 * - severity: "success" | "error" | "warning" | "info" (default "info")
 * - autoHideDuration: number in ms (default 4000)
 */
const Notification = forwardRef(
  ({ open, onClose, message, severity = "info", autoHideDuration = 4000 }, ref) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ref={ref}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor:
              severity === "success"
                ? "#145A32"
                : severity === "error"
                ? "#C0392B"
                : severity === "warning"
                ? "#D68910"
                : "#0F3D2E",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }
);

export default Notification;
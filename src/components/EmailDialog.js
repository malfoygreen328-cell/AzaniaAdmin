// src/components/EmailDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EmailDialog = ({ open, onClose, emailData, setEmailData, onSend }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <TextField
          label="To"
          fullWidth
          margin="dense"
          value={emailData.to}
          onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
        />
        <TextField
          label="Subject"
          fullWidth
          margin="dense"
          value={emailData.subject}
          onChange={(e) =>
            setEmailData({ ...emailData, subject: e.target.value })
          }
        />
        <TextField
          label="Message"
          multiline
          rows={5}
          fullWidth
          margin="dense"
          value={emailData.message}
          onChange={(e) =>
            setEmailData({ ...emailData, message: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          sx={{ background: "#0F3D2E" }}
          onClick={onSend}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailDialog;
// src/components/PendingVendorsTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Link,
  Typography,
} from "@mui/material";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.azaniashop.com";

const PendingVendorsTable = ({ pendingVendors, onApprove, onDecline }) => {
  if (!Array.isArray(pendingVendors)) pendingVendors = [];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Pending Vendor Applications
      </Typography>

      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Business</TableCell>
            <TableCell>Subscription</TableCell>
            <TableCell>Documents</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingVendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>No pending vendors</TableCell>
            </TableRow>
          ) : (
            pendingVendors.map((vendor) => (
              <TableRow key={vendor._id}>
                <TableCell>{vendor.fullName}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.businessName}</TableCell>
                <TableCell>{vendor.subscriptionPlan}</TableCell>
                <TableCell>
                  {vendor.documents?.registrationCert && (
                    <Link
                      href={`${API_BASE}/${vendor.documents.registrationCert}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Registration
                    </Link>
                  )}
                  <br />
                  {vendor.documents?.directorId && (
                    <Link
                      href={`${API_BASE}/${vendor.documents.directorId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Director ID
                    </Link>
                  )}
                  <br />
                  {vendor.documents?.proofOfAddress && (
                    <Link
                      href={`${API_BASE}/${vendor.documents.proofOfAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Address Proof
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ background: "#0F3D2E", mr: 1 }}
                    onClick={() => onApprove(vendor._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDecline(vendor._id)}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default PendingVendorsTable;
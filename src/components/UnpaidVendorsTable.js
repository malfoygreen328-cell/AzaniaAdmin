// src/components/UnpaidVendorsTable.js
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const UnpaidVendorsTable = ({ unpaidVendors }) => {
  if (!Array.isArray(unpaidVendors)) unpaidVendors = [];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Vendors With Unpaid Subscriptions
      </Typography>

      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Subscription Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unpaidVendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>No unpaid vendors</TableCell>
            </TableRow>
          ) : (
            unpaidVendors.map((vendor) => (
              <TableRow key={vendor._id}>
                <TableCell>{vendor.fullName}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>R{vendor.subscriptionDue || 0}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default UnpaidVendorsTable;
// src/components/StatCard.js
import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, sub }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ background: "#0F3D2E", color: "white", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h4">{value}</Typography>
          {sub && (
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {sub}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StatCard;
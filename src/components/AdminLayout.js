import React, { useState } from "react";
import { Box, CssBaseline, Toolbar, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom"; // For nested routes

import Navbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";

// Drawer width for sidebar
const drawerWidth = 260;

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Toggle sidebar for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <Navbar onMenuClick={handleDrawerToggle} notificationCount={3} />

      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: `${drawerWidth}px` },
          marginTop: "64px", // height of AppBar
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
          transition: "margin 0.3s",
        }}
      >
        <Toolbar />
        {/* Render the nested page (Dashboard, Brands, Store Monitor, etc.) */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
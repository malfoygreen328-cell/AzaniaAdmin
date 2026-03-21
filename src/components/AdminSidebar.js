// src/components/AdminSidebar.js
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  Visibility as VisibilityIcon,
  Campaign as CampaignIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

/* ---------------- MENU ITEMS ---------------- */
const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },

  /* STORE MONITORING */
  { text: "Store Monitor", icon: <VisibilityIcon />, path: "/store-monitor" },
  { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },

  /* STORE MANAGEMENT */
  { text: "Brands", icon: <StoreIcon />, path: "/brands" },
  { text: "Accessories", icon: <CategoryIcon />, path: "/accessories" },

  /* MARKETPLACE MANAGEMENT */
  { text: "Vendors", icon: <PeopleIcon />, path: "/vendors" },
  { text: "Unpaid Vendors", icon: <PaymentIcon />, path: "/unpaid-vendors" },

  /* AD MANAGEMENT */
  { text: "Ads", icon: <CampaignIcon />, path: "/ads" },

  /* PROFILE */
  { text: "Profile", icon: <VisibilityIcon />, path: "/profile" },
];

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const openStore = () => {
    window.open("https://azaniashop.com", "_blank");
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0F3D2E",
          color: "#fff",
        },
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Azania
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Admin Panel
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

      {/* MENU */}
      <List>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={active}
                sx={{
                  px: 3,
                  py: 1.5,
                  backgroundColor: active ? "#145A32" : "transparent",
                  "&:hover": {
                    backgroundColor: "#1E8449",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: active ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* STORE PREVIEW BUTTON */}
      <Box
        sx={{
          mt: "auto",
          p: 2,
        }}
      >
        <ListItemButton
          onClick={openStore}
          sx={{
            backgroundColor: "#145A32",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#1E8449",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <VisibilityIcon />
          </ListItemIcon>

          <ListItemText primary="Open Live Store" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}

export default AdminSidebar;
import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";

const drawerWidth = 240;
const closedDrawerWidth = 72;

const dashboardNavItems = [
  { label: "Dashboard", title: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  { label: "Reports", title: "Reports", to: "/dashboard/reports", icon: AssessmentIcon },
  { label: "Users", title: "Users", to: "/dashboard/users", icon: PeopleIcon },
  { label: "Articles", title: "Articles", to: "/dashboard/articles", icon: ArticleIcon },
];

const getPageTitle = (pathname) =>
  dashboardNavItems.find((item) => item.to === pathname)?.title ?? "Dashboard";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  background: "#0f172a",
  color: "#f8fafc",
  boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
  width: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)`,
  marginLeft: open ? drawerWidth : closedDrawerWidth,
  transition: "all 0.25s ease",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  width: open ? drawerWidth : closedDrawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: "all 0.25s ease",

  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : closedDrawerWidth,
    overflowX: "hidden",
    background: "#1e293b",
    color: "#e2e8f0",
    borderRight: "none",
    boxShadow: "4px 0 20px rgba(0,0,0,0.25)",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  },
}));

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 10px",
  minHeight: "72px",
}));

const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: "rgba(255,255,255,0.08)",
  width: "260px",
}));

const SearchIconWrapper = styled("div")(() => ({
  height: "100%",
  width: "44px",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#cbd5e1",
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: "#f8fafc",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: "10px 12px 10px 44px",
    fontSize: "14px",
  },
}));

function DashLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const firstName = localStorage.getItem("firstName") || "User";
  const userType = localStorage.getItem("type") || "viewer";

  const visibleNavItems = dashboardNavItems.filter(
    (item) => item.to !== "/dashboard/users" || userType === "admin"
  );

  const handleDrawerToggle = () => setOpen((prev) => !prev);
  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#020617" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ minHeight: "72px !important", px: 3 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, fontWeight: 900 }}
          >
            Welcome, {firstName}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </Search>

          <Button
            onClick={handleLogout}
            sx={{
              ml: 2,
              color: "#0f172a",
              bgcolor: "#e6c27a",
              borderRadius: "12px",
              px: 2.5,
              py: 1,
              fontWeight: 900,
              fontSize: "12px",
              "&:hover": {
                bgcolor: "#f6d98f",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Box sx={{ pl: 1 }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  color: "#f8fafc",
                  whiteSpace: "nowrap",
                }}
              >
                Draft & Drift
              </Typography>
            </Box>
          )}

          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: "#e2e8f0",
              bgcolor: "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              mx: open ? 0 : "auto",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.16)",
              },
            }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <List sx={{ px: 1.2, py: 2 }}>
          {visibleNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <ListItem key={item.to} disablePadding sx={{ display: "block", mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  sx={{
                    minHeight: 52,
                    borderRadius: "14px",
                    px: 2,
                    justifyContent: open ? "initial" : "center",
                    color: isActive ? "#ffffff" : "#cbd5e1",
                    bgcolor: isActive ? "#3b82f6" : "transparent",
                    "&:hover": {
                      bgcolor: isActive ? "#3b82f6" : "#334155",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: isActive ? "#ffffff" : "#94a3b8",
                    }}
                  >
                    <IconComponent />
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    sx={{
                      opacity: open ? 1 : 0,
                      "& .MuiTypography-root": {
                        fontWeight: 800,
                        fontSize: "14px",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "72px",
          bgcolor: "#020617",
          minHeight: "calc(100vh - 72px)",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashLayout;
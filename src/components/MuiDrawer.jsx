import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

const drawerWidth = 240;
const icon = (name) => `/assets/navbar/${name}.svg`;
const links = [
  {
    title: "Dashboard",
    url: "",
    icon: icon("ic_analytics"),
  },
  { title: "Firms", url: "firms", icon: icon("firms") },
  {
    title: "Products",
    url: "products",
    icon: icon("ic_cart"),
  },
  {
    title: "Purchases",
    url: "purchases",
    icon: icon("purchase"),
  },
  { title: "Sales", url: "sales", icon: icon("sales") },
  { title: "Brands", url: "brands", icon: icon("brand") },
];

const MuiDrawer = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout(token)).then(() => {
      navigate("/");
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <List>
        {links.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(`${text.url}`)}
              sx={{
                color: "secondary.main",
                borderRadius: "1.2rem",
                transition: "all 0.5s ease-in-out",
                border: "2px solid white",
                "&:hover": {
                  backgroundColor: "secondary.second",
                  color: "white",
                  fontWeight: "bolder",
                  border: "2px solid black",
                },
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  mr: 2,
                  maskImage: `url(${text.icon})`,
                  backgroundColor: "currentColor",
                }}
              ></Box>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "secondary.second",
          color: "white",
          borderRadius: "15px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              "&:hover": {
                backgroundColor: "primary.main",
                color: "black",
                fontWeight: "bolder",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              gap: "1rem",
              p: "5px 15px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "black",
                fontWeight: "bolder",
                border: "2px solid white",
                borderRadius: "10px",
              },
            }}
            onClick={() => navigate("/stock")}
          >
            <Typography variant="h6" noWrap component="div">
              Stock Market Pulse App
            </Typography>
            <TroubleshootIcon sx={{ fontSize: "2rem" }} />
          </Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                color: "black",
                fontWeight: "bolder",
                border: "2px solid white",
                borderRadius: "10px",
              },
            }}
          >
            Logout
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MuiDrawer;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";
import WidgetsIcon from "@mui/icons-material/Widgets";
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  //handle menu click

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  //menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"black"}
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          fontSize: 19,
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        Precision Power Equipments
      </Typography>
      <Divider />

      <ul className="mobile-navigation-menu">
        <li>
          <NavLink to="/" activeClassName="active">
            {" "}
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about"> About Us</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products </NavLink>
        </li>
        <li>
          <NavLink to="/services"> Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact"> Contact Us</NavLink>
        </li>
      </ul>
      <Button
        sx={{ marginLeft: "auto", marginTop: "20px", fontSize: "1.0 rem" }}
        variant="contained"
      >
        Admin Login
      </Button>
      <Box>
        <Toolbar />
      </Box>
    </Box>
  );
  return (
    <>
      <Box sx={{ marginBottom: "65px" }}>
        <AppBar sx={{ background: "#FFFFFF" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <WidgetsIcon sx={{ color: "black" }} />
            </IconButton>
            <Typography
              color={"black"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Precision Power Equipments
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <Link to="/"> Home</Link>
                </li>
                <li>
                  <Link to="/about"> About Us</Link>
                </li>
                <li>
                  <Link to="/products">Products </Link>
                </li>
                <li>
                  <Link to="/services"> Services</Link>
                </li>
                <li>
                  <Link to="/contact"> Contact Us</Link>
                </li>
              </ul>
            </Box>
            <Button sx={{ marginLeft: "auto" }} variant="contained">
              Admin Login
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: "260px" },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default Header;

import { Box, Typography } from "@mui/material";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
// import Chatbot from "./chatbot/Chatbot";
const Footer = () => {
  // <Chatbot />
  return (
    <>
      <Box
        sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
      >
        <Box
          sx={{
            my: 3,
            "& svg": {
              fontSize: "40px",
              cursor: "pointer",
              mr: 2,
            },
            "& svg:hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
          <CallIcon />
          <WhatsAppIcon />
          <EmailIcon />
          <AddLocationAltIcon />
        </Box>
        <Typography
          variant="h6"
          sx={{ "@media(max-width:600px)": { fontSize: "1rem", p: 1 } }}
        >
          All rights reserved 2023 &copy; Precision Power Equipments
        </Typography>
      </Box>
    </>
  );
};

export default Footer;

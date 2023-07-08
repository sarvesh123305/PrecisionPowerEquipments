import { Typography, Divider, Box } from "@mui/material";
import React from "react";
const HeadingComponent = (props) => {
  return (
    <Box sx={{ p: 2 }}>
      <div
        className="about"
        style={{
          backgroundImage: `url(${props.image})`,
          objectFit: 1,
        }}
      ></div>
      <Box className="content" sx={{ marginLeft: "15%", marginRight: "15%" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            textDecoration: "bold",
            color: "blue",
            fontSize: "50px",
            marginTop: "20px",
          }}
        >
          {props.text}
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
      </Box>
    </Box>
  );
};

export default HeadingComponent;

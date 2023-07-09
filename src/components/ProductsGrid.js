import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Products } from "./FetchPhotos";
const ProductsGrid = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {Products.map((menu) => (
          <Card
            sx={{
              maxWidth: "390px",
              display: "flex",
              m: 2,
              "@media(max-width:600px)": { m: 2 },
            }}
          >
            <CardActionArea>
              <CardMedia
                sx={{
                  minHeight: "400px",
                  "@media(max-width:600px)": { minHeight: "250px" },
                }}
                component={"img"}
                src={menu.image}
              />
              <CardContent>
                <Typography variant="h5" gutterButtom={"div"}>
                  {menu.name}
                </Typography>
                <Typography variant="body2">{menu.Description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ProductsGrid;

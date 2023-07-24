import React from "react";
import {
  Box,
  Button,
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
            <CardActionArea disableRipple>
              <CardMedia
                sx={{
                  minHeight: "150px",
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
                <Button
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                  fullWidth
                >
                  Add to Cart
                </Button>
                <Button
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#4caf50", // Replace this with your desired shade of green
                    "&:hover": {
                      backgroundColor: "#45a049", // Replace this with the hover color, if needed
                    },
                  }}
                  variant="contained"
                  fullWidth
                >
                  Buy Now
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ProductsGrid;

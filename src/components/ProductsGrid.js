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
// import Razorpay from "razorpay";
// const apikey = "rzp_test_sSdJxzSwJ67cSd";
// const apiSecret = "vA3Xg51s79vhv2qh4G5Qb8FQ";
const ProductsGrid = () => {

  const loadScript = (src) =>{
    return new Promise((resolve) =>{
      const script = document.createElement('script');
      script.src = src;

      script.onload = () =>{
        resolve(true);
      }

      script.onerror = () =>{
        resolve(false);
      }

      document.body.appendChild(script);
    })
  }
  const displayRazorPay = async (amount) =>{
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if(!res)
    {
      alert("You are offline , failed to load");
      return ;
    }
  }
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {Products.map((menu) => (
          <Card  key={menu.id}
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
                  onClick={() => displayRazorPay(10)}
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

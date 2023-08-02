import {
  Box,
  Card,
  CardActionArea,
  Button,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import React, { useState } from "react";
import { Products } from "../../components/FetchPhotos";
import EditProduct from "./EditProduct";

const ProductsGrid = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("00-00-0000");
  const [file, setFile] = useState("");

  const handleOpenDialog = (prodName, price, description, date, file) => {
    setProductName(prodName);
    setPrice(price);
    setDescription(description);
    setDate(date);
    setFile(file);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
    <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px" }}>All Products</Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {/*ADMIN PANELLLL*/}

        {Products && Products.map((menu) => (
          <Card
          key={menu.id} 
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
                <Typography variant="h5" >
                  {menu.name}
                </Typography>
                
                <Typography variant="body2">{menu.Description}</Typography>
                <Typography variant="body1" sx={{fontWeight:"bold"}}>Rs. {menu.price}</Typography>
                <Button
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                  onClick={() =>
                    handleOpenDialog(
                      menu.name,
                      menu.price,
                      menu.Description,
                      menu.date,
                      menu.image
                    )
                  }
                  fullWidth
                >
                  Edit
                </Button>
                
                <Button
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#D11A2A ", // Replace this with your desired shade of green
                    "&:hover": {
                      backgroundColor: "red", // Replace this with the hover color, if needed
                    },
                  }}
                  variant="contained"
                  fullWidth
                >
                  Delete
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <EditProduct
        open={openDialog}
        productName={productName}
        setProductName={setProductName}
        price={price}
        description={description}
        date={date}
        file={file}
        setPrice={setPrice}
        setDescription={setDescription}
        setDate={setDate}
        setFile={setFile}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default ProductsGrid;

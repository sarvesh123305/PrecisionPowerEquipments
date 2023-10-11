import {
  Box,
  Card,
  CardActionArea,
  Button,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Database/Firebase1";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";

const ProductsGrid = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const storage = getStorage();

  const handleOpenDialog = (prodName, price, description, date, file) => {
    setProductName(prodName);
    setPrice(price);
    setDescription(description);
    setFile(file);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
      }
    );

    // The cleanup function returned by useEffect will unsubscribe the real-time listener when the component unmounts
    return () => fetchData();
  }, []);
  const getImageNameFromUrl = (imageUrl) => {
    const imagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
    const pathSegments = imagePath.split('/');
    const imageName = pathSegments[pathSegments.length - 1];
    return imageName;
  };
  const deleteItem = async (id, imgSrc,category) => {
    try {

const imageName = getImageNameFromUrl(imgSrc);
      const desertRef = ref(storage, "Products/"+category+"/"+imageName);
      deleteObject(desertRef)
        .then(() => {
        })
        .catch((error) => {
             toast.error("Error in image deletion", error);
        });
      await deleteDoc(doc(db, "products", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Product Deleted Successfully");
    } catch (err) {
      toast.error("Error deleting Product ", err);
    }
  };
  return (
    <>
   
    <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "20px" }}
      >
      {
        data.length !== 0 ? "All Products" : "No Products available"
      }
      </Typography> 
  

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {/*ADMIN PANELLLL*/}
        {data &&
          data.map((menu) => (
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
                    minHeight: "200px",
                    maxHeight: "250px",
                    minWidth: "350px",
                    maxWidth: "400px",
                    "@media(max-width:600px)": { minHeight: "250px" },
                  }}
                  component={"img"}
                  src={menu.img}
                />
                <CardContent>
                  <Typography variant="h5">{menu.modelName}</Typography>
                  <Typography variant="h6"> Brand : {menu.brand}</Typography>

                  <Typography variant="body2">{menu.Description}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Rs. {menu.price}
                  </Typography>
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
                    onClick={() => deleteItem(menu.id, menu.img,menu.category)}
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
        file={file}
        setPrice={setPrice}
        setDescription={setDescription}
        onClose={handleCloseDialog}
      
      />
    </>
  );
};

export default ProductsGrid;

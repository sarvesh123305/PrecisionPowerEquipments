import React, { useEffect, useState } from "react";
import { storage, db } from "../Database/Firebase1";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Layout from "../components/Layout";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ProductsGrid from "../Admin/pages/ProductsGrid";
import { toast } from "react-toastify";
import { Label } from "@mui/icons-material";

const initialState = {
  modelName: "",
  brand: "",
  manufacturer: "",
  info: "",
  category: "",
  price: "",
  file: "",
};
function AddProducts() {
  console.log(initialState);
  const [data, setData] = useState(initialState);
  const { modelName, brand, manufacturer, info, category, price } = data;
  const [file, setFile] = useState(null);
  const [progress, setprogress] = useState(null);
  const [isSubmit, setisSubmit] = useState(null);
  const [errors, seterror] = useState(null);
  if (isSubmit && errors) {
  } // To be modified later

  useEffect(() => {
    const uploadFile = () => {
      // const name = new Date().getTime + file.name;
      const storageref = ref(storage, "Images/" + file.name);
      const uploadTask = uploadBytesResumable(storageref, file);
      uploadTask.on(
        "state changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    // if (!name) {
    //   errors.name = "Name is required";
    // }
    // if (!email) {
    //   errors.email = "Email is required";
    // }
    // if (!info) {
    //   errors.info = "Info is required";
    // }
    // if (!contact) {
    //   errors.contact = "Contact is required";
    // }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return seterror(errors);

    setisSubmit(true);
    try {
      await addDoc(collection(db, "users"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      toast.success("Product Added Successfully");
    } catch (err) {
      toast.error("Product not added");
    }
    // naviga
  };
  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter name </label>
          <input
            type="text"
            name="name"
            // errors={errors.name ? { content:errors.name} : null}
            // value={name}
            onChange={handleChange}
          />
          <br></br>

          <label>Enter Email </label>

          <input
            type="email"
            name="email"
            // value={email}
            // errors={errors.email ? { content:errors.email} : null}
            onChange={handleChange}
          />
          <br></br>
          <label>Enter info </label>
          <input
            type="text"
            name="info"
            // errors={errors.info ? { content:errors.info} : null}
            value={info}
            onChange={handleChange}
          />
          <br></br>

          <label>Enter contact </label>

          <input
            type="text"
            name="contact"
            // errors={errors.contact ? { content:errors.contact} : null}
            // value={contact}
            onChange={handleChange}
          />
          <br></br>

          <label>Enter file </label>

          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
          <button type="submit" disabled={progress !== null && progress < 100}>
            {" "}
            submit
          </button>
        </form>
      </div>
      <Box>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {/* First Row */}
          <Grid item xs={6}>
            <TextField
              label="Model Name"
              placeholder="Enter Model Name"
              InputLabelProps={{ shrink: true }}
              fullWidth
              // onChange={(e) => setProductName(e.target.value)}
              // value={productName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Brand"
              placeholder="Enter Brand Name"
              InputLabelProps={{ shrink: true }}
              // value={price}
              // onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Manufacturer"
              placeholder="Enter Manufacturer Name"
              InputLabelProps={{ shrink: true }}
              // value={price}
              // onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Category"
              placeholder="Enter Category"
              InputLabelProps={{ shrink: true }}
              fullWidth
              // onChange={(e) => setProductName(e.target.value)}
              // value={productName}
            />
          </Grid>
          {/* Second Row */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              InputLabelProps={{ shrink: true }}
              placeholder="Enter Description"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="File"
              type="file"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ margin: "10px" }} variant="h6">
              File selected
            </Typography>
          </Grid>
            <Grid item xs={12}>
            <Button>Add Product</Button>
          </Grid>
        </Grid>

        <ProductsGrid />
      </Box>
    </Layout>
  );
}

export default AddProducts;

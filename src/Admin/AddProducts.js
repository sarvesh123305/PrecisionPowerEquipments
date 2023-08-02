import React, { useEffect, useState } from "react";
import { storage, db } from "../Database/Firebase1";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Layout from "../components/Layout";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ProductsGrid from "../Admin/pages/ProductsGrid";
import { toast } from "react-toastify";
import { Description, Label } from "@mui/icons-material";

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
  const [isSolar, setIsSolar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  if (isSubmit && errors) {
  } // To be modified later

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, "Products/" + category + "/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
    // URL.createObjectURL(selectedFile)
    file && uploadFile();
  }, [file, category]);

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
      await addDoc(collection(db, "products"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      toast.success("Product Added Successfully");
    } catch (err) {
      toast.error("Product not added");
    }
    // naviga
  };
  const handleSelect = (e) => {

    console.log("Solar ", e.target.value);
    if (e.target.value === "Solar") {
      setIsSolar(true);
    } else {
      setIsSolar(false);
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClear = () => {
    setData(initialState);
  };
  return (
    <Layout>
  
      <Paper
        sx={{
          textAlign: "center",
          margin: "5%",
          padding: "10px",
          maxWidth: "90%",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "10px" }}>
          Add Products
        </Typography>
        <Box>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {/* First Row */}
            <Grid item xs={6}>
              <TextField
                name="modelName"
                label="Model Name"
                placeholder="Enter Model Name"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={modelName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="brand"
                label="Brand"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="manufacturer"
                label="Manufacturer"
                placeholder="Enter Manufacturer Name"
                InputLabelProps={{ shrink: true }}
                value={manufacturer}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  name="category"
                  placeholder="Enter category"
                  labelId="category"
                  id="category"
                  label="category"
                  value={category}
                  onChange={handleSelect}
                >
                  <MenuItem value={10}>Inverter</MenuItem>
                  <MenuItem value={20}>Battery</MenuItem>
                  <MenuItem value={30}>Solar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {isSolar === true && (
              <Grid item xs={12}>
                Test
              </Grid>
            )}
            {/* Second Row */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Description"
                value={info}
                name="info"
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="File"
                type="file"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFile(file); // Set the selected file to the state variable
                  }
                  // setFileNameForAvatar(e.target.files[0]?.name || "");
                  console.log("File name " +e.target.files[0]?.name);
                }}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
            <a href={selectedFile && URL.createObjectURL(selectedFile)}  target="_blank" rel="noreferrer noopener" >
              <Avatar alt="Remy Sharp" sx={{ width: 100, height: 50 }}  src={selectedFile && URL.createObjectURL(selectedFile)} />
            </a>
              </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                disabled={progress >= 0 && progress < 100}
                sx={{ margin: "10px" }}
                color="success"
                onClick={handleSubmit}
              >
                {" "}
                Add Product
              </Button>
              <Button
                variant="contained"
                onClick={handleClear}
                style={{ backgroundColor: "#f0f0f0", color: "#000" }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <ProductsGrid />
    </Layout>
  );
}

export default AddProducts;

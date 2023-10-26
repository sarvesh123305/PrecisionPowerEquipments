import React, {useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  Paper,
  Typography,
  Grid,
  TextField,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
  InputLabel,
  Select,
  FormControl,
  MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { toast } from "react-toastify";
import { storage,db } from "../../Database/Firebase1";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setDoc,doc, serverTimestamp } from "firebase/firestore";

const EditProduct = (props) => {
  const {
    id,
    open,
    onClose,
    price,
    info,
    setPrice,
    setInfo,
    setCategory,
    setModelName,
    setCapacity,
    setSubsidy,
    setWarranty,
    setBrand,
    setFile,
    setManufacturer,
    modelName,
    brand,
    manufacturer,  
    category,
    capacity,
    subsidy,
    warranty    
  } = props;

  
  const [data, setData] = useState('');
  const [date, setDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
 );
 const [selectedFile, setSelectedFile] = useState(null);
 const [validationMessage, setValidationMessage] = useState('');
 const [isSubmit, setisSubmit] = useState(null);
 const [errors, seterror] = useState(null);
 const [imageUrl, setImageUrl] = useState('');

if (isSubmit && errors) {
} 
useEffect(() => {
  const uploadFile = () => {
    if (selectedFile) {
      const name = new Date().getTime() + selectedFile.name;
      const storageRef = ref(storage, "Products/" + category + "/" + name);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          
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
            setImageUrl(downloadURL);
            if (selectedFile) {
              // Only update the image URL if a new image is selected
              setData((prev) => ({ ...prev, img: downloadURL }));
            }
          });
        }
      );
    }
  };

  // Upload the image
  uploadFile();
}, [selectedFile, category]);

 const handleDateChange = e => {
  setDate(e.target.value);
};
const handleFileChange = (e) => {
  const file = e.target.files[0];
  
  if (file) {
    // Define an array of allowed MIME types for image files
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedMimeTypes.includes(file.type)) {
      setSelectedFile(file);
      setValidationMessage(file.name);
    } else {
      setValidationMessage('Please select a valid image file (JPEG, PNG, GIF).');
      e.target.value = ''; // Clear the file input field
    }
  } else {
    setSelectedFile(null);
    setValidationMessage('');
  }
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
    debugger
    const res =  await setDoc(doc(db, "products",id), {
    
     info:info,
     price:price,
     category:category,
     brand:brand,
     modelName:modelName,
     manufacturer:manufacturer,
     capacity:capacity,
     subsidy:subsidy,
     warranty:warranty,
     ...data,
     timestamp: serverTimestamp(),
    });
    
    toast.success("Product Edited Successfully",res);
  } catch (err) {
    console.log(err);
    toast.error("Failed to edit product");
  }
  // naviga
}; 

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h5" gutterBottom>
          Edit {date}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Paper
          sx={{
            textAlign: "center",
            padding: "20px",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={6}>
              <TextField
                name="modelName"
                label="Model Name"
                placeholder="Enter Model Name"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="brand"
                label="Brand"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
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
                onChange={(e) => setManufacturer(e.target.value)}
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
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"Inverter"}>Inverter</MenuItem>
                  <MenuItem value={"Battery"}>Battery</MenuItem>
                  <MenuItem value={"Solar"}>Solar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Capacity"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter capacity"
                value={capacity}
                name="capacity"
                onChange={(e) => setCapacity(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Subsidy Eligible</InputLabel>
                <Select
                  name="subsidy"
                  placeholder="Enter subsidy"
                  labelId="subsidy"
                  id="subsidy"
                  label="subsidy"
                  value={subsidy}
                  onChange={(e) => setSubsidy(e.target.value)}
                >
                  <MenuItem value={"Eligible"}>Eligible</MenuItem>
                  <MenuItem value={"Not Eligible"}>Not Eligible</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                placeholder="Enter price"
                type="number"
                InputLabelProps={{ shrink: true }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={6}>
              <TextField
                label="Description"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter description"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Select warranty</InputLabel>
                <Select
                  displayEmpty
                  name="warranty"
                  placeholder="Enter warranty"
                  labelId="warranty"
                  id="warranty"
                  label="warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                >
                  {[...Array(12)].map((_, index) => (
                    <MenuItem key={index} value={index + 1}>{`${
                      (index + 1) * 6
                    } months`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              fullWidth
              variant="outlined"
              type="date"
              onChange={handleDateChange}
              value={date}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: "2021-01-01", max: "2030-12-31" }}
            />
          </Grid>
            <Grid item xs={12}>
              <TextField
                label="File"
                type="file"
                InputLabelProps={{ shrink: true }}
                fullWidth
                accept="image/*"
               
                onChange={(e) => {
                  handleFileChange(e);
                  if(e.target.files[0]!==undefined)
                  setFile(imageUrl);
                  setFile(e.target.files[0]);
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedFile(file); // Set the selected file to the state variable
                  }
                }}  
              
              />
              <p value={selectedFile ? selectedFile.name : ''}>{validationMessage}</p>
            </Grid>

          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}  >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;

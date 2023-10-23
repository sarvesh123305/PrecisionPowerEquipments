import React, { useState } from 'react';
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
import { db } from "../../Database/Firebase1";
import { setDoc, collection, serverTimestamp } from "firebase/firestore";
const EditProduct = (props) => {
  const {
    open,
    onClose,
    price,
    description,
    setPrice,
    setDescription,
   
    //eslint-disable-next-line
    file,
    //eslint-disable-next-line
      setFile,
      modelName,
      brand,
      manufacturer,
      
      category,
      capacity,
      subsidy,
      warranty,

      
  } = props;

  const initialState = {
    modelName: "",
    brand: "",
    manufacturer: "",
    info: "",
    category: "",
    price: "",
    capacity: "",
    subsidy: "",
    warranty: "",
  };
  const [data, setData] = useState('');
  const [date, setDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
 );
 const [isSubmit, setisSubmit] = useState(null);
 const [errors, seterror] = useState(null);
 const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};
const [selectedFile, setSelectedFile] = useState(null);
const [validationMessage, setValidationMessage] = useState('');
if (isSubmit && errors) {
} 
 const handleDateChange = e => {
  setDate(e.target.value);
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
  debugger;
  let errors = validate();
  if (Object.keys(errors).length) return seterror(errors);

  setisSubmit(true);
  try {
    await setDoc(collection(db, "products"), {
     modelName:modelName,
     brand:brand,
     manufacturer:manufacturer,
     description:description,
     category:category,
     price:price,
     capacity:capacity,
     subsidy:subsidy,
     warranty:warranty,
    timestamp: serverTimestamp(),
    });
    setData(initialState);
    toast.success("Product Added Successfully");
  } catch (err) {
    toast.error("Failed to add product");
  }
 
}; 
const handleFileChange = (e) => {
  const file = e.target.files[0];
  
  if (file) {
    // Define an array of allowed MIME types for image files
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedMimeTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      setValidationMessage('Please select a valid image file (JPEG, PNG, GIF).');
      e.target.value = ''; // Clear the file input field
    }
  } else {
    setSelectedFile(null);
    setValidationMessage('');
  }
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
                  onChange={handleChange}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  onChange={handleChange}
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
                accept="image/*"
                onChange={handleFileChange}
                fullWidth
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
        <Button variant="contained" color="primary" onClick={handleSubmit} >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;

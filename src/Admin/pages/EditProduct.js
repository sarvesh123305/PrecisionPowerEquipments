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

const EditProduct = (props) => {
  const {
    open,
    onClose,
    productName,
    setProductName,
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
      info ,
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
 const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};
 const handleDateChange = e => {
  setDate(e.target.value);
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
              />
            </Grid>

          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;

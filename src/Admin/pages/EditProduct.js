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
      
  } = props;

  const [date, setDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
 );
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
                label="Product Name"
                placeholder="Enter product name"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
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

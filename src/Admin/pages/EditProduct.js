import React from "react";
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
    date,
    file,
    setPrice,
    setDescription,
    setDate,
    setFile,
  } = props;

  const formatDateForDisplay = (dateString) => {
    return moment(dateString, "YYYY-MM-DD").format("DD:MM:YYYY");
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
                onChange={(e) => {
                  const newDate = setDate(
                    moment(new Date(e.target.value)).format("DD-MM-YYYY")
                  );
                  setDate(newDate);
                }}
                value={"sa" + date}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: "2021-01-01", max: "2030-12-31" }} // Optional: Limit the date range
                // Format the displayed date in the correct format ("DD:MM:YYYY")
                InputProps={{
                  inputProps: {
                    value: formatDateForDisplay(date),
                  },
                }}
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
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;

import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../Database/Firebase1";
const initialState = {
  name: "",
  email: "",
  contact: "",
  address: "",
};
const Add = () => {
  const [state, setState] = useState(initialState);
  // const [data, setData] = useState({});
  const { name, email, contact, address } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
 
  const [isValid, setIsValid] = useState(true);

  // Function to handle input changes
  const handleMobileNumberChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    // Check if the input's length is equal to 10
    setIsValid(value.length === 10);
  };
  const handleSubmit = async (e) => {
    console.log("Name : " + name);
    console.log("email : " + email);
    console.log("contact : " + contact);
    console.log("address : " + address);

    e.preventDefault();
    try {
      const res = await setDoc(doc(db, "customers", state.email), {
        ...state,
        timestamp: serverTimestamp(),
      });
      
      toast.success("Customer added Successfully!",res);
    } catch (e) {
      toast.error("Error writing document: ", e);
    }

    // if (!name || !email || !contact || !address) {
    //   toast.error("Please provide all fields");
    // } else {
    //   fireDB.child("contacts").push(state, (err) => {
    //     if (err) toast.error(err);
    //     else toast.success("Added Successfully");
    //   });
    // }
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            textAlign: "center",
            padding: "20px",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add New Customer
          </Typography>

          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={6}>
              <TextField
                label="Full Name"
                placeholder="Enter Full Name"
                InputLabelProps={{ shrink: true }}
                onChange={handleInputChange}
                name="name"
                value={state.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                label="Mobile"
                placeholder="Enter Mobile Number"
                InputLabelProps={{ shrink: true }}
                name="contact"
                value={state.contact}
                onChange={handleMobileNumberChange}
                fullWidth
              />
               {!isValid && <p style={{ color: 'red' }}>Please enter a 10-digit mobile number.</p>}
            </Grid>
            

            {/* Second Row */}
            <Grid item xs={6}>
              <TextField
                label="Address"
                InputLabelProps={{ shrink: true }}
                onChange={handleInputChange}
                name="address"
                value={state.address}
                placeholder="Enter Address"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              {" "}
              <TextField
                label="email"
                InputLabelProps={{ shrink: true }}
                onChange={handleInputChange}
                name="email"
                value={state.email}
                placeholder="Enter email"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ margin: "10px" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add New Customer
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Add;

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
import {
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../Database/Firebase1";
import { toast } from "react-toastify";
// import moment from "moment";

const Edit = (props) => {
  const {
    open,
    onClose,
    name,
    email,
    contact,
    address,
    setName,
    setContact,
    setEmail,
    setAddress,
  } = props;

//   const [emailQuery, setEmailQuery] = useState(false);
  //   const [origEmail, setOrigEmail] = useState(email);
  var origEmail = email;
  //
  const handleSubmit = async () => {
    try {
    //   if (origEmail !== email) {
    //     onSnapshot(collection(db, "customers"), (querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         if (doc.id === email) {
    //           setEmailQuery(true);
    //           return;
    //         }
    //       });
    //     });
    //   }
    //   if (emailQuery === true) {
        // toast.warning("Email Already Exists");
        // onClose();
        // return;
    //   }
      if (origEmail !== email) {
        await deleteDoc(doc(db, "customers", email));
      }

      const res = await setDoc(doc(db, "customers", email), {
        name:name,
        address:address,
        email:email,
        contact:contact,
      });
      toast.success("Data Edited successfully", res);
      onClose();
    } catch (err) {
      toast.error("Error editing data", err);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h5" gutterBottom>
          Edit
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
                name="name"
                label="Full Name"
                placeholder="Enter Full name"
                // placeholder={"Enter fu"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="contact"
                label="Mobile Number"
                placeholder="Enter Mobile Number"
                type="number"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={6}>
              <TextField
                name="address"
                label="Address"
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                label="Email"
                placeholder="Enter email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Edit;

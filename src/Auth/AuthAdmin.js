import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import UserContext from "../context/loginContext";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import adminAuthContext from "../context/adminAuthContext";
import { useDispatch } from "react-redux";
import { login } from "../redux/states/adminSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Database/Firebase1";
import { toast } from "react-toastify";
const AuthAdmin = () => {
  const { updateAdminStatus } = useContext(UserContext);
  const { updateAdminAuth } = useContext(adminAuthContext);
  updateAdminStatus(true);

  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const paperStyle = {
    padding: "30px 20px",
    width: "325px",
    margin: "150px auto",
  };
  const headerStyle = {
    margin: "0",
  };
  const avatarStyle = {
    backgroundColor: "green",
  };
  const btnStyle = {
    margin: "8px 0px",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username ", username, password);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        updateAdminAuth(true);
        const user = userCredential.user;
        dispatch(
          login({
            userId: user,
            adminUsername: username,
            loggedIn: true,
          })
        );
        navigate("/Admin/");
      })
      .catch((error) => {
        updateAdminAuth(false);
        toast.error("Error authenticating user");
      });
  };
  return (
    <Layout>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 style={headerStyle}>Login</h2>
            <Typography variant="caption">
              Enter your username and password to login
            </Typography>
          </Grid>
          <form style={{ alignItems: "center" }} onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="standard"
              fullWidth
              type="email"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="standard"
              fullWidth
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FormControlLabel
              control={<Checkbox label="checkbox" color="primary" />}
              label="Remember me"
            />
            <Button
              style={btnStyle}
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
            <Typography>
              <Link href="#"> Forgot Password ?</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Layout>
  );
};

export default AuthAdmin;

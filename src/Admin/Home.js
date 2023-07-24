import React from "react";
import Layout from "../components/Layout";
import { Box, Button } from "@mui/material";
//eslint-disable-next-line
import { useDispatch, useSelector } from "react-redux";
//eslint-disable-next-line
import { logout, selectAdminUser } from "../redux/states/adminSlice";
import { useNavigate } from "react-router";
import { EnsureAuthentication } from "../Auth/EnsureAuthentication";
const AdminHome = () => {
  // const adminUser = useSelector(selectAdminUser);
  const adminUser = "Admin";

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = (e) => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Layout>
      <EnsureAuthentication />
      <Box display="flex" justifyContent="flex-end">
        {adminUser && (
          <Button
            onClick={handleLogout}
            sx={{ margin: "20px" }}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default AdminHome;

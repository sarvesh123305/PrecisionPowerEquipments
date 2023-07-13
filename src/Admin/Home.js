import React, { useContext } from "react";
import Layout from "../components/Layout";
import UserContext from "../context/loginContext";
const AdminHome = () => {
  const { updateAdminStatus } = useContext(UserContext);
  updateAdminStatus(true);
  return <Layout>Hii</Layout>;
};

export default AdminHome;

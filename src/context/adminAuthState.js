import React from "react";
import { useSelector, useDispatch } from "react-redux";
import adminAuthContext from "./adminAuthContext";

const AdminAuthState = ({ children }) => {
  const adminAuth = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  const updateAdminAuth = (newStatus) => {
    dispatch({ type: "SET_ADMIN_AUTH", payload: newStatus });
  }; 

  return (
    <adminAuthContext.Provider value={{ adminAuth, updateAdminAuth }}>
      {children}
    </adminAuthContext.Provider>
  );
};

export default AdminAuthState;

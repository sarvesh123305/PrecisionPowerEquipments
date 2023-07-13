import React from "react";
import UserContext from "./loginContext";
const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const updateAdminStatus = (newStatus) => {
    setIsAdmin(newStatus);
  };

  return (
    <UserContext.Provider value={{ isAdmin, updateAdminStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

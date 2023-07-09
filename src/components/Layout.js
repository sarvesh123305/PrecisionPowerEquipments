import React, { useState, createContext } from "react";
import Header from "./Header";
import Footer from "./Footer";

 const UserRoleContext = createContext();

const Layout = ({ children, props }) => {
  const [userRole, setUserRole] = useState(false);
  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      <Header role={userRole} />
      <div>{children}</div>
      <Footer />
    </UserRoleContext.Provider>
  );
};
Header.defaultProps = {
  menu: "user",
};

export default Layout;

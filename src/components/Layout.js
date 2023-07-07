import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ margin: "100px" }}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

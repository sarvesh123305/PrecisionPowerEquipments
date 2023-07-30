import React from "react";
import Layout from "../../components/Layout";
import Add from "./Customers/Add";
import View from "./Customers/View";

const Customers = () => {
  return (
    <Layout>
      <Add />
      <View />
    </Layout>
  );
};

export default Customers;

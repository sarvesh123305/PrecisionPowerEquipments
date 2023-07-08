import React from "react";
import Layout from "../components/Layout";
import ProductsGrid from "../components/ProductsGrid";
import HeadingComponent from "../components/HeadingComponent";
import Banner from "../images/aboutfin.jpg";

const Products = () => {
  return (
    <Layout>
      <HeadingComponent text="Inverter" image={Banner} />
      <ProductsGrid />
    </Layout>
  );
};

export default Products;

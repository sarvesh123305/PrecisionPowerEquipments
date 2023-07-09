import React from "react";
import Layout from "../components/Layout";
import Banner1 from "../images/test.jpeg";
import "../styles/Home.css";

const Home = () => {
  return (
    <Layout>
      <div
        className="home"
        style={{
          backgroundImage: `url(${Banner1})`,
          objectFit: 1,
        }}
      >
        {" "}
      </div>
    </Layout>
  );
};

export default Home;

import React from "react";
import Layout from "../components/Layout";
import { Box } from "@mui/material";
import Banner1 from "../images/aboutfin.jpg";
import "../styles/About.css";
import HeadingComponent from "../components/HeadingComponent";
const AboutUs = () => {
  return (
    <Layout>
      <Box>
        <HeadingComponent text="About Us" image={Banner1} />
        <Box className="content" sx={{ marginLeft: "15%", marginRight: "15%" }}>
          <p>
            Precision Power Equipments was established in 1995 and it has over
            10000 customers over MaharashtraIt is owned by Anant Kulkarni (A.B
            Kulkarni).
          </p>
          <p>
            We have been producing , trading with Inverter and Batteries since
            25 years. Our name is known for Good Quality Service.
          </p>
          <p>
            Renutron was established in 1995, with a focus on providing power
            conditioning solutions for IT industries and automations functioning
            in unreliable raw utility power supply. Renutron understood nerve of
            the market and spread its products and services north south east
            west. In no time Renutron became synonymous to reliability,
            durability, punctuality and built strong bonds of trust with its
            customers.
          </p>
          <p>
            Today, with this strong foundation of over 26 years in the power
            industry, Renutron stand tall to take on newer challenges to
            simplify the power solutions for classers and masses - From
            institutions, corporates to luxury households.
          </p>
        </Box>
      </Box>
    </Layout>
  );
};

export default AboutUs;

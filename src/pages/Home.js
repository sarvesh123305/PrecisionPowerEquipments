import React, { useContext } from "react";
import Layout from "../components/Layout";
import Banner1 from "../images/test.jpeg";
import "../styles/Home.css";
import UserContext from "../context/loginContext";

const Home = () => {  
  const { updateAdminStatus } = useContext(UserContext);
  updateAdminStatus(false);
  return (
    <Layout>
      <div
        className="home"
        style={{
          backgroundImage: `url(${Banner1})`,
          objectFit: 1,
        }}
      >
        {/*checkValidation*/}
      </div>
    </Layout>
  );
};

export default Home;

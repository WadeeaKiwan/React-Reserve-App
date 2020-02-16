import React from "react";
import axios from "axios";

const Home = () => {
  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const url = "http://localhost:3000/api/products";
    const response = await axios.get(url);
    console.log(response.data);
  };

  return <>Home</>;
};

export default Home;

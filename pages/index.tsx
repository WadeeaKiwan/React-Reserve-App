import React from "react";
import axios from "axios";

const Home = ({ products }) => {
  console.log(products);
  // React.useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = async () => {
  //   const url = "http://localhost:3000/api/products";
  //   const response = await axios.get(url);
  //   console.log(response.data);
  // };

  return <>Home</>;
};

Home.getInitialProps = async () => {
  // Fetch data on the server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  return {
    products: response.data
  };
  // Return the response data as an object
  // note: this object will be merged in existing props
};

export default Home;

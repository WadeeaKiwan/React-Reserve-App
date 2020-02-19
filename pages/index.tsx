import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";

const Home = ({ products }) => {
  return <ProductList products={products}></ProductList>;
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

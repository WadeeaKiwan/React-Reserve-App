import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";

const Home = ({ products }) => {
  return <ProductList products={products}></ProductList>;
};

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products`;
  // Fetch data on server
  const response = await axios.get(url);
  // Return the response data as an object
  return {
    products: response.data
  };
  // note: this object will be merged in existing props
};

export default Home;

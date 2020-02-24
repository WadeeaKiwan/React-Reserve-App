import React from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";

const Home = ({ products, totalPages }) => {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
};

Home.getInitialProps = async ctx => {
  // Configure Pagination
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };

  // Fetch data on server
  const response = await axios.get(url, payload);

  // Return the response data as an object
  return response.data;
  // note: this object will be merged in existing props
};

export default Home;

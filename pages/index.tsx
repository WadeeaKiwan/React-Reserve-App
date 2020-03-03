import React from "react";
import axios, { AxiosResponse } from "axios";
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseUrl from "../utils/baseUrl";

import { IProduct } from "../models/Product";

const Home = ({ products, totalPages }: { products: IProduct[]; totalPages: number }) => {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
};

Home.getInitialProps = async (ctx: any): Promise<any> => {
  // Configure Pagination
  const page: string = ctx.query.page ? ctx.query.page : "1";
  const size: number = 9;
  const url: string = `${baseUrl}/api/products`;
  const payload: { params: { page: string; size: number } } = { params: { page, size } };

  // Fetch data on server
  const response: AxiosResponse<any> = await axios.get(url, payload);

  // Return the response data as an object
  return response.data;
  // note: this object will be merged in existing props
};

export default Home;

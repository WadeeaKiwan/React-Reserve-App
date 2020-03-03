import axios, { AxiosResponse } from "axios";
import ProductSummary from "../components/Product/ProductSummary";
import ProductAttributes from "../components/Product/ProductAttributes";
import baseUrl from "../utils/baseUrl";

import { IUser } from "../models/User";
import { IProduct } from "../models/Product";

const Product = ({ product, user }: { product: IProduct; user: IUser }) => {
  return (
    <>
      <ProductSummary user={user} {...product} />
      <ProductAttributes user={user} {...product} />
    </>
  );
};

Product.getInitialProps = async ({
  query: { _id }
}: {
  query: { _id: string };
}): Promise<{ product: IProduct }> => {
  // const url = `http://localhost:3000/api/product?_id=${_id}`;
  const url: string = `${baseUrl}/api/product`;
  const payload: { params: { _id: string } } = { params: { _id } };
  const response: AxiosResponse<any> = await axios.get(url, payload);
  return {
    product: response.data
  };
};

export default Product;

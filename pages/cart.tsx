import React from "react";
import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { parseCookies } from "nookies";
import axios, { AxiosResponse } from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import cookie from "js-cookie";

import { IUser } from "../models/User";
import { ICart } from "../models/Cart";

const Cart = ({ products, user }: { products: ICart[]; user: IUser }) => {
  const [cartProducts, setCartProducts] = React.useState(products);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleRemoveFromCart = async (productId: string): Promise<void> => {
    const url: string = `${baseUrl}/api/cart`;
    const token: string = cookie.get("token");
    const payload: { params: { productId: string }; headers: { Authorization: string } } = {
      params: { productId },
      headers: { Authorization: token }
    };
    const response: AxiosResponse<any> = await axios.delete(url, payload);
    setCartProducts(response.data);
  };

  const handleCheckout = async (paymentData: any): Promise<void> => {
    try {
      setLoading(true);
      const url: string = `${baseUrl}/api/checkout`;
      const token: string = cookie.get("token");
      const payload = { paymentData };
      const headers: { headers: { Authorization: string } } = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment loading={loading}>
      <CartItemList
        handleRemoveFromCart={handleRemoveFromCart}
        products={cartProducts}
        user={user}
        success={success}
      />
      <CartSummary products={cartProducts} handleCheckout={handleCheckout} success={success} />
    </Segment>
  );
};

Cart.getInitialProps = async (ctx: any): Promise<{ products: any[] } | { products: ICart[] }> => {
  const { token }: { [token: string]: string } = parseCookies(ctx);

  // Check if the user is not authenticated
  if (!token) {
    return { products: [] };
  }

  const url: string = `${baseUrl}/api/cart`;
  const payload: { headers: { Authorization: string } } = { headers: { Authorization: token } };
  const response: AxiosResponse<[any]> = await axios.get(url, payload);
  return {
    products: response.data
  };
};

export default Cart;

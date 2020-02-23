import { Segment } from "semantic-ui-react";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const Cart = ({ products, user }) => {
  console.log(products);
  return (
    <Segment>
      <CartItemList products={products} user={user} />
      <CartSummary products={products} />
    </Segment>
  );
};

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);

  // Check if the user is not authenticated
  if (!token) {
    return { products: [] };
  }

  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const response = await axios.get(url, payload);
  console.log(response.data);
  return {
    products: response.data
  };
};

export default Cart;

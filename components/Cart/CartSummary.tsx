import React from "react";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

const CartSummary = ({ products }) => {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [StripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setIsCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setIsCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size='large'>
        <strong>Sub total:</strong> €{cartAmount}
        <Button
          disabled={isCartEmpty}
          icon='cart'
          color='teal'
          floated='right'
          content='Checkout'
        />
      </Segment>
    </>
  );
};

export default CartSummary;

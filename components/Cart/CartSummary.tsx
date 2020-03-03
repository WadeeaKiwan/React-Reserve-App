import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Button, Segment, Divider } from "semantic-ui-react";
import calculateCartTotal from "../../utils/calculateCartTotal";

import { ICart } from "../../models/Cart";

const CartSummary = ({
  products,
  handleCheckout,
  success
}: {
  products: any;
  handleCheckout: any;
  success: boolean;
}) => {
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
        <StripeCheckout
          name='React Reserve App'
          amount={StripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency='EUR'
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent='onClick'
          stripeKey='pk_test_0pZVzdiqTSFRC9kOkFyuHT3x006LEhdUs0'
        >
          <Button
            disabled={isCartEmpty || success}
            icon='cart'
            color='teal'
            floated='right'
            content='Checkout'
          />
        </StripeCheckout>
      </Segment>
    </>
  );
};

export default CartSummary;

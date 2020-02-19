import { Input } from "semantic-ui-react";

const AddProductToCart = () => (
  <Input
    type='number'
    min='1'
    placeholder='Quantity'
    value={1}
    action={{
      color: "orange",
      content: "Add to cart",
      icon: "plus cart"
    }}
  />
);

export default AddProductToCart;

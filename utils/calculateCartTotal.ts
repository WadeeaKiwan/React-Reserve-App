import { ICart } from "../models/Cart";

const calculateCartTotal = (
  products: ICart["products"]
): { cartTotal: number; stripeTotal: number } => {
  const total = products.reduce((acc, el) => {
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);
  // To avoid decimal faults of multiplying in javascript
  const cartTotal = Number(((total * 100) / 100).toFixed(2));
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
};

export default calculateCartTotal;

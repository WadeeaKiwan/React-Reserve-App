import React from "react";
import { Input } from "semantic-ui-react";
import { useRouter, NextRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";

import { IUser } from "../../models/User";

const AddProductToCart = ({ user, productId }: { user: IUser; productId: string }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router: NextRouter = useRouter();

  React.useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }

    // Clear the timeout when the component is unmounted
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  const handleQuantity = (event: any): void => {
    setQuantity(Number(event.target.value));
  };

  const handleAddProductToCart = async (): Promise<void> => {
    try {
      setLoading(true);
      const url: string = `${baseUrl}/api/cart`;
      const payload: { quantity: number; productId: string } = { quantity, productId };
      const token: string = cookie.get("token");
      const headers: { headers: { Authorization: string } } = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Input
      type='number'
      min='1'
      placeholder='Quantity'
      value={quantity}
      onChange={handleQuantity}
      action={
        user && success
          ? {
              color: "blue",
              content: "Item Added!",
              icon: "plus cart",
              disabled: true
            }
          : user
          ? {
              color: "orange",
              content: "Add to cart",
              icon: "plus cart",
              loading,
              disabled: loading,
              onClick: handleAddProductToCart
            }
          : {
              color: "blue",
              content: "Sign Up to Putchase",
              icon: "signup",
              onClick: () => router.push("/signup")
            }
      }
    />
  );
};

export default AddProductToCart;

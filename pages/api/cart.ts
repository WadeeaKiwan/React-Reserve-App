import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

import { ICart } from "../../models/Cart";

// Ensure that the database is connected while posting a request
connectDb();

// Mongoose function that converts string to ObjectId
const { ObjectId } = mongoose.Types;

export default async (req, res): Promise<any> => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req, res): Promise<any> => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId }: { userId: string } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart: ICart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });

    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
};

const handlePutRequest = async (req, res): Promise<any> => {
  const { quantity, productId }: { quantity: number; productId: string } = req.body;

  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId }: { userId: string } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // Get user cart based on userId
    const cart: ICart = await Cart.findOne({ user: userId });

    // Check if product already exists in cart
    const productExists: boolean = cart.products.some(doc =>
      ObjectId(productId).equals((doc as any).product)
    );

    // If so, increment quantity (by number provided to request)
    if (productExists) {
      await Cart.findOneAndUpdate(
        { _id: cart._id, "products.product": productId },
        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      // If not, add new product with given quantity
      const newProduct: { quantity: number; product: string } = { quantity, product: productId };
      //@ts-ignore
      await Cart.findOneAndUpdate({ _id: cart._id }, { $addToSet: { products: newProduct } });
    }
    res.status(200).send("Cart Updated");
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
};

const handleDeleteRequest = async (req, res): Promise<any> => {
  const { productId }: { productId: string } = req.query;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId }: { userId: string } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart: ICart = await Cart.findOneAndUpdate(
      { user: userId },
      //@ts-ignore
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      ref: "Product"
    });

    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
};

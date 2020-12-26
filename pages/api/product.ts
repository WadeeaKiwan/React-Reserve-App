import Product from "../../models/Product";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

import { IProduct } from "../../models/Product";

// Ensure that the database is connected while posting a request
connectDb();

export default async (req: any, res: any): Promise<void> => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRequest = async (req: any, res: any): Promise<void> => {
  try {
    const { _id }: { _id: string } = req.query;

    const product: IProduct = await Product.findOne({ _id });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in getting products");
  }
};

const handlePostRequest = async (req: any, res: any): Promise<void> => {
  const {
    name,
    price,
    description,
    mediaUrl
  }: { name: string; price: number; description: string; mediaUrl: string } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }

    const product: IProduct = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating product");
  }
};

const handleDeleteRequest = async (req: any, res: any): Promise<void> => {
  try {
    const { _id }: { _id: string } = req.query;

    // 1) Delete product by id
    await Product.findOneAndDelete({ _id });

    // 2) Remove product from all carts, referenced as 'product'
    //@ts-ignore
    await Cart.updateMany({ "products.product": _id }, { $pull: { products: { product: _id } } });

    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in deleting product");
  }
};

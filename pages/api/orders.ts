import Order from "../../models/Order";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

import { IOrder } from "../../models/Order";

// Ensure that the database is connected while posting a request
connectDb();

export default async (req: any, res: any): Promise<void> => {
  try {
    const { userId }: { userId: string } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const orders: IOrder[] = await Order.find({ user: userId })
      .sort({ createdAt: "desc" }) // same ad sort({ createdAt: -1 })
      .populate({
        path: "products.product",
        model: "Product"
      });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
  }
};

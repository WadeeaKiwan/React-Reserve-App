import mongoose from "mongoose";

import { IProduct } from "./Product";
import { IUser } from "./User";

export interface ICart extends mongoose.Document {
  user: string | IUser;
  products: [{ quantity: number; product: IProduct }];
}

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    }
  ]
});

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

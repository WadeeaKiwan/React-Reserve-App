import mongoose from "mongoose";

import { IProduct } from "./Product";

export interface IOrder extends mongoose.Document {
  user: string;
  products: [{ quantity: number; product: IProduct }];
  email: string;
  total: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema(
  {
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
    ],
    email: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

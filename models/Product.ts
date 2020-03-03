import mongoose from "mongoose";
import shortid from "shortid";

export interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  sku: string;
  description: string;
  mediaUrl: string;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate()
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  }
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

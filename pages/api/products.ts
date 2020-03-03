// import products from "../../static/products.json";
import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

import { IProduct } from "../../models/Product";

// Ensure that the database is connected while posting a request
connectDb();

export default async (req: any, res: any): Promise<void> => {
  const { page, size }: { page: string; size: string } = req.query;

  // Convert querystring values to numbers
  const pageNum: number = Number(page);
  const pageSize: number = Number(size);
  let products: IProduct[] = [];

  const totalDocs: number = await Product.countDocuments();
  // Round if the rest are les than 'pageSize'
  const totalPages: number = Math.ceil(totalDocs / pageSize);

  // Display the first page
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    // Escape the elements of previous pages
    const skips: number = pageSize * (pageNum - 1);
    products = await Product.find()
      .skip(skips)
      .limit(pageSize);
  }

  res.status(200).json({ products, totalPages });
};

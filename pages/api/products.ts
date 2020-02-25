// import products from "../../static/products.json";
import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

// Ensure that the database is connected while posting a request
connectDb();

export default async (req, res) => {
  const { page, size } = req.query;

  // Convert querystring values to numbers
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];

  const totalDocs = await Product.countDocuments();
  // Round if the rest are les than 'pageSize'
  const totalPages = Math.ceil(totalDocs / pageSize);

  // Display the first page
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    // Escape the elements of previous pages
    const skips = pageSize * (pageNum - 1);
    products = await Product.find()
      .skip(skips)
      .limit(pageSize);
  }

  res.status(200).json({ products, totalPages });
};

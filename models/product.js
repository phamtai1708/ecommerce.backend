import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  images: { type: Array, default: [] },
  productId: String,
  import_price: String,
  max_price: String,
  min_price: String,
  sold: Number,
  residual: Number,
  star: Number,
  colors: String,
  sizes: String,
});
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default ProductModel;

import mongoose from "mongoose";
import { uuid } from "uuidv4";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true, default: uuid() },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

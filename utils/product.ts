import mongoose from "mongoose";
import { ProductType } from "./data";

export const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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

const productModel: ReturnType<typeof mongoose.model<typeof productSchema>> =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

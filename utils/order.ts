import mongoose from "mongoose";

export type orderType = {
  user: mongoose.Schema.Types.ObjectId;
  orderItems: {
    name: string;
    category: string;
    image: string;
    price: number;
    brand: string;
    _id: string;
    quantity: number;
  }[];

  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: Date;
  deliveredAt: Date;
};

export const orderSchema = new mongoose.Schema<orderType>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: String, required: true },
        _id: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },

  {
    timestamps: true,
  }
);

const orderModel: ReturnType<typeof mongoose.model<typeof orderSchema>> =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;

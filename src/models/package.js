import mongoose from "mongoose";
import Shop from "./shop";
import User from "./user";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageItems: [
      {
        qty: { type: Number, required: true },
        shop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shops",
        },
      },
    ],
    paymentMethod: { type: String, required: true, default: "Stripe" },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    paidAt: { type: Date, required: true },
    isProcessing: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;

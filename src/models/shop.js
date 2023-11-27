import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    description1: String,
    description2: String,
    description3: String,
    description4: String,
    description5: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Shop =
  mongoose.models.Shops || mongoose.model("Shops", ShopSchema);

export default Shop;

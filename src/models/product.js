import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    user: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    brand: String,
    service: String,
    warranty: Number,
    deliveryInfo: String,
    bestSelling: String,
    newArrivals: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
    imageUrl2: String,
    imageUrl3: String,
    imageUrl4: String,
    imageUrl5: String,
    location: String,
    city: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;

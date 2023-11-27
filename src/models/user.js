import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
  imageURL: String,
  name: String,
  email: String,
  phone: String,
  whatsapp: String,
  facebookURL: String,
  youtubeURL: String,
  talents: [
    {
      imageURL: String,
      title: String,
      description: String,
    },
  ],
  totalShops: Number,
  shoppingMallCount: Number,
  shopCount: Number,
  productCount: Number,
  password: String,
  role: String,
  refkey: String,
  freelancerCount: Number,
  memberCount: Number,
  rookieCount: Number,
  veteranCount: Number,
  masterCount: Number,
  legendCount: Number,
  disable: Boolean,
  profit: Number,
  holdProfit: Number,
  // new addons
  class_name: String,
  class_lvl: Number,
  class_loaction:Number,
  // lvl3_count:Number,
  // lvl4_count:Number,
  city: String,
},
{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

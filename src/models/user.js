import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
  imageURL: String,
  bannerURL:String,
  name: String,
  first_name: String,
  last_name: String,
  nic: String, 
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
  district: String,
  city: String,
  aboutMe: String,
  lvl2_memberCount:Number,
  lvl3_memberCount:Number,
  lvl4_memberCount:Number,
},
{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

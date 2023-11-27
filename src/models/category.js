import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    imageUrl: String,
  },
);

const Category =
  mongoose.models.Categories || mongoose.model("Categories", CategorySchema);

export default Category;

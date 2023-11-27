import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    imageUrl: String,
    refkey: String,
  },
);

const Subcategory =
  mongoose.models.Subcategories || mongoose.model("Subcategories", SubcategorySchema);

export default Subcategory;

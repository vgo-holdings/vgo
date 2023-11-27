import mongoose from "mongoose";

const Class_dataSchema = new mongoose.Schema(
  {
    name: String,
    lvl3_count: Number,
    lvl4_count: Number,
    lvl2_count: Number,
  }
);

const Class_data =
  mongoose.models.Class_datas || mongoose.model("Class_datas", Class_dataSchema);

export default Class_data;

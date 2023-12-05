import mongoose from "mongoose";

const classDataSchema = new mongoose.Schema(
    {
        name: String,
        lvl1_count: Number,
        lvl2_count: Number,
        lvl3_count: Number,
        lvl4_count: Number,
    },
);

const classData  =
    mongoose.models.class_data || mongoose.model("class_data", classDataSchema);

export default classData;
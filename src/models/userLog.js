import mongoose from "mongoose";

const userLogSchema = new mongoose.Schema(
  {
    userId: String,
    description: String,
  },
  { timestamps: true }
);

const userLog = mongoose.models.userLog || mongoose.model("userLog", userLogSchema);

export default userLog;
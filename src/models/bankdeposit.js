import mongoose from "mongoose";

const BankdepositSchema = new mongoose.Schema(
  {
    name: String,
    user_id: String,
    refkey: String,
    imageUrl: String,
    approved: Boolean,
  },
  { timestamps: true }
);

const Bankdeposit =
  mongoose.models.Bankdeposits || mongoose.model("Bankdeposits", BankdepositSchema);

export default Bankdeposit;

import mongoose from "mongoose";

const NewBusinessSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageURL: String,
    fullName: String,
    descrition: String,
    certificate: [
        {
            name: String,
            description: String,
            imageURL: String,
        }
    ],
    openTime: Number,
    closeTime: Number,
    closedDates: String,
    holiDay: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    phone: String,
  },
  { timestamps: true }
);

const Business =
  mongoose.models.Business || mongoose.model("Business", NewBusinessSchema);

export default Business;

import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, default: "My Basket" },
  items: [
    {
      asin: String,
      title: String,
      image: String,
      qty: Number,
      frequencyDays: Number,
      lastOrdered: Date
    }
  ],
  nextRenewal: Date
});

export default mongoose.model("Basket", basketSchema);

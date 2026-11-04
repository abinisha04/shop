import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fcmToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shop =
  mongoose.models.Shop ||
  mongoose.model("Shop", ShopSchema);

export default Shop;
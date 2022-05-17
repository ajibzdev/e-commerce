const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    adress: { type: Object, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

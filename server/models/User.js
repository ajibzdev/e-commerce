const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, requierd: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);

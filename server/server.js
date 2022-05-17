const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_URL, PORT } = process.env;
const cors = require("cors");

// ********* MIDDLEWARES ******** //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// authentication
const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);

// user
const userRoute = require("./routes/User.js");
app.use("/api/users", userRoute);

// products
const productRoute = require("./routes/Product");
app.use("/api/products", productRoute);

// Cart
const cartRoute = require("./routes/Cart");
app.use("/api/carts", cartRoute);

// Order
const orderRoute = require("./routes/Order");
app.use("/api/orders", orderRoute);

// stripe Route
const stripeRoute = require("./routes/stripe");
app.use("/api/checkout", stripeRoute);

//listening to port
app.listen(PORT, () => {
  console.log("Backend is running on port 5000");
});

// connnecting to database
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Succesfully connected to database");
  })
  .catch((err) => {
    console.log("Failed to connect to the database");
  });

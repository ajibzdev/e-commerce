const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./varifyToken");

//  Create order
router.post("/create", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const order = await newOrder.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been cancelled");
  } catch (err) {
    response.status(500).json(err);
  }
});

// get  USER order
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err + "An Error occrured");
  }
});

// get all user order
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Cart.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err + "An Error occrured");
  }
});

// get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth - 1));
  try {
    const order = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

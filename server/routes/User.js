const router = require("express").Router();
const cryptoJS = require("crypto-js");
const { response } = require("express");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./varifyToken");

// update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { password } = req.body;

  if (password) {
    password = cryptoJS.AES.encrypt(password, process.env.PAS_SEC).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    response.status(500).json(err);
  }
});

// get  user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err + "An Error occrured");
  }
});

// get all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    const user = query
      ? await User.find().sort({ id: -1 }).limit(5)
      : await User.find();

    const { password, ...others } = user;
    res.status(200).json({ ...others });
  } catch (err) {
    res.status(500).json(err + "An Error occrured");
  }
});

// USER STATISTICS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      { $match: { createdAt: { $gt: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("An error occured " + err);
  }
});

module.exports = router;

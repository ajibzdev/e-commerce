const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cryptojs = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = new User({
    username,
    password: cryptojs.AES.encrypt(password, process.env.PASS_SEC).toString(),
    email,
  });

  try {
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    //checking user
    const user = await User.findOne({ username });
    !user && res.status(400).json("Wrong username");

    if (user) {
      // checking password
      const hashedPassword = cryptojs.AES.decrypt(
        user?.password,
        process.env.PASS_SEC
      );

      const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8);

      if (password == originalPassword) {
        const acessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, acessToken });
      } else {
        res.status(401).json("Wrong Credentials");
      }
    }
  } catch (err) {
    res.status(500).json("An error occured");
  }
});

module.exports = router;

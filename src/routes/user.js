const express = require("express");
const { userModel } = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_USER_SECRET;
const route = express.Router();
const { purchaseModel, courseModel } = require("../model/db");
const auth = require("../middleware/auth");
route.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email) {
    return res.json({
      message: "enter the first email ",
    });
  }

  const hashPassword = await bcrypt.hashSync(password, 10);

  console.log(hashPassword);

  const user = await userModel.create({
    email: email,
    password: hashPassword,
    firstName: firstname,
    lastName: lastname,
  });

  res.json({
    user,
    message: "signup endpoint",
  });
});
route.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.json({
      message: "User not found",
    });
  }

  // 2. Compare password
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.json({
      message: "Invalid password",
    });
  }

  // 3. Generate token
  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_KEY,
  );

  res.json({  
  });
});

route.post("/purchases", async (req, res) => {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  const courseData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });
  res.json({
    purchases,
    courseData,
  });
});

module.exports = route;

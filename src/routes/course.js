const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");
const purchaseModel = require("../model/db");

router.post("/purchase", async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId
  })

  res.json({
    message: "you have sucessgully bought the course",
  });
});

router.post("", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

router.post("/priview", (req, res) => {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = router;

const { Router, json } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRoutes = Router();
require("dotenv").config();
const JWT_KEY = process.env.JWT_ADMIN_SECRET;
const auth = require("../middleware/auth");
const { courseModel } = require("../model/db");

// 👉 Admin Signup
adminRoutes.post("/signup", async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin user
    const admin = await userModel.create({
      email,
      password: hashedPassword,
      firstName: firstname,
      lastName: lastname,
      role: "admin", // important
    });

    res.json({
      message: "Admin signup successful",
      adminId: admin._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error during signup",
    });
  }
});

// 👉 Admin Signin
adminRoutes.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find admin
    const admin = await userModel.findOne({ email });

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        message: "Admin not found",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      JWT_KEY,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Admin signin successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error during signin",
    });
  }
});

adminRoutes.route("/course", auth, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    createdId: adminId,
  });

  res.json({
    courseId: course._id,

    message: "course created ",
  });
});


adminRoutes.put('/course/update',auth,async function(req,res){
     const adminId=req.userId;

     const {title,description,price,imageUrl,courseId} = req.body;

     const course = await courseModel.updateOne({
      _id:courseId,
      createdId:adminId
     },{title:title,description:description,imageUrl:imageUrl,price:price})

     res.json({
      message:"course updated",
      courseId:course._id
     })
})

adminRoutes.get('/course/:id',auth,async function(req,res){
  const adminId = req.userId;

  const course = await courseModel.find({
    createdId:adminId
  })

  res.json({
    message:"course upodated",
    course
  })
})
module.exports = adminRoutes;

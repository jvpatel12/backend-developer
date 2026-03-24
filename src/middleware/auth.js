const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_KEY = process.env.JWT_ADMIN_SECRET

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token,  JWT_KEY);

    // Check if user is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only.",
      });
    }

    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = adminMiddleware;
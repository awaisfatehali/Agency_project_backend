const express = require("express");
const router = express.Router();
const User = require("../models/user");
const matchedPassword = require("../models/user");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await userData.matchPassword(password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      sendToken(userData, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

module.exports = router;

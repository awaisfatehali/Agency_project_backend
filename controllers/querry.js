const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const Query = require("../models/query");
const errorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// submit a query
router.post(
  "/submit",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return next(new errorHandler("Please fill all fields", 400));
      }
      const query = await Query.create({
        name,
        email,
        message,
      });

      res.send({
        success: true,
        message: "Query submitted successfully",
        query,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }),
);

// get all querries for the admin

router.get(
  "/all_queries",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const queries = await Query.find();
      res.send({
        success: true,
        message: "Queries fetched successfully",
        queries,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }),
);

router.delete(
  "/deleteQuery/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const deletedQuery = await Query.findByIdAndDelete(id);

      if (!deletedQuery) {
        return next(new errorHandler("Query not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Query deleted successfully",
      });
    } catch (error) {
      return next(new errorHandler(error.messaage, 500));
    }
  }),
);

module.exports = router;

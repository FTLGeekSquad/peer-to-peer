const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getAllReviews);
router.get("/:reviewId", reviewController.getReviewById);
// other routes

module.exports = router;

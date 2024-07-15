const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/reviews", reviewController.getAllReviews);
router.get("/reviews/:reviewId", reviewController.getReviewById);
// other routes

module.exports = router;

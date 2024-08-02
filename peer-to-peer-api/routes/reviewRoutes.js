const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get('/', reviewController.getAllReviews);
router.get('/:reviewId', reviewController.getReviewById);
router.get('/:listingId/rating/:userId', reviewController.getReviewByUserListing);
router.put('/:listingId/rating/:userId', reviewController.editReviewByUserListing);


router.post('/', reviewController.createReview);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);


module.exports = router;

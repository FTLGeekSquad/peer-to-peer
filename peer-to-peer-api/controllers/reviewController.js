const reviewModel = require('../models/reviewModel');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateAvgRating = async (listingId) => {
	try {
	  // Fetch all reviews for the listing
	  const reviews = await prisma.review.findMany({
		where: { listingId: listingId },
		select: { rating: true },
	  });
	  console.log(reviews)
  
	  // Calculate the average rating
	  if (reviews.length > 0) {
		const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
		const avgRating = totalRating / reviews.length;

		console.log(totalRating);
		console.log(avgRating)
  
		// Update the avgRating in the Listing model
		await prisma.listing.update({
		  where: { listingId: listingId },
		  data: { avgRating: avgRating },
		});
	  } else {
		// If there are no reviews, set avgRating to null or 0
		await prisma.listing.update({
		  where: { listingId: listingId },
		  data: { avgRating: 0 },
		});
	  }
	} catch (error) {
	  console.error(`Error updating average rating for listingId ${listingId}:`, error);
	}
  };

const getAllReviews = async (req, res) => {
	try {
		const reviews = await reviewModel.getAllReviews();
		res.status(200).json(reviews);
	} catch (error) {
		console.error("error fetching reviews:", error);
		res.status(500).json({ error: error.message });
	}
};

const getReviewById = async (req, res) => {
	try {
		const review = await reviewModel.getReviewById(req.params.reviewId);
		if (review) {
			res.status(200).json(review);
		} else {
			res.status(404).json({ error: "review not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const createReview = async (req, res) => {
	const reviewData = req.body;

	// when u create a review, must update the avgListing part of listing
	try {
		const newReview = await reviewModel.createReview(reviewData);
		await updateAvgRating(newReview.listingId); // Update avgRating after creating a review

		res.status(201).json(newReview);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateReview = async (req, res) => {
	try {
		const updatedReview = await reviewModel.updateReview(req.params.reviewId, req.body);

		// when u update a review, must edit avgListing
		if (updatedReview) {
			await updateAvgRating(updatedReview.listingId); // Update avgRating after updating a review

			res.status(200).json(updatedReview);
		} else {
			res.status(404).json({ error: "review not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteReview = async (req, res) => {
	try {
		const deletedReview = await reviewModel.deleteReview(req.params.reviewId);

		//when u delete a review, must edit avgListing in
		if (deletedReview) {
			await updateAvgRating(deletedReview.listingId); // Update avgRating after deleting a review

			res.status(200).json(deletedReview);
		} else {
			res.status(404).json({ error: "review not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getAllReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReview,
};


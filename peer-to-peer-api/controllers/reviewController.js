const reviewModel = require('../models/reviewModel');

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
	try {
		const newReview = await reviewModel.createReview(reviewData);
		res.status(201).json(newReview);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateReview = async (req, res) => {
	try {
		const updatedReview = await reviewModel.updateReview(req.params.reviewId, req.body);
		if (updatedReview) {
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
		if (deletedReview) {
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


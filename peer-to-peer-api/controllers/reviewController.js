const reviewModel = require("../models/reviewModel");

const getAllReviews = async (req, res) => {
	try {
		const reviews = await reviewModel.getAllReviews();
		res.status(200).json(reviews);
	} catch (error) {
		console.error("error fetching review:", error);
		res.status(500).json({ error: error.message });
	}
};

const getReviewById = async (req, res) => {
	try {
		const review = await reviewModel.getReviewById(req.params.review);
		if (review) {
			res.status(200).json(review);
		} else {
			res.status(404).json({ error: "review not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// crud here

module.exports = {
	getAllReviews,
	getReviewById,
	// other exports
};

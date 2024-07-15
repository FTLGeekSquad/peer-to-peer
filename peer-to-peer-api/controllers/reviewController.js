const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllReviews = async (req, res) => {
	try {
		const reviews = await prisma.review.findMany();
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getReviewById = async (req, res) => {
	const { reviewId } = req.params;
	try {
		const review = await prisma.review.findUnique({
			where: { reviewId: parseInt(reviewId) },
		});
		res.json(review);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// crud here 

module.exports = {
	getAllReviews,
	getReviewById,
	// other exports
};

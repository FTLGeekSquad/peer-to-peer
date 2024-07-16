const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllReviews = async () => {
	return prisma.review.findMany();
};

const getReviewById = async (card_id) => {
	return prisma.review.findUnique({ where: { reviewId: parseInt(reviewId) } });
};

module.exports = {
	getAllReviews,
	getReviewById,
	// other exports
};

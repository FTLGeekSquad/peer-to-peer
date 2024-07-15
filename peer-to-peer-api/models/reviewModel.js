const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllReviews = async () => {
	return await prisma.review.findMany();
};

const getReviewById = async (id) => {
	return await prisma.review.findUnique({
		where: { reviewId: parseInt(id) },
	});
};

// other model fuctions

module.exports = {
	getAllReviews,
	getReviewById,
	// other exports
};

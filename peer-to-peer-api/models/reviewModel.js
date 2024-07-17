const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllReviews = async () => {
	return prisma.review.findMany({
		include: {
			user: true,
			listing: true,
		},
	});
};

const getReviewById = async (reviewId) => {
	return prisma.review.findUnique({
		where: { reviewId: parseInt(reviewId) },
		include: {
			user: true,
			listing: true,
		},
	});
};

const createReview = async (reviewData) => {
	return prisma.review.create({
		data: {
			userId: reviewData.userId,
			message: reviewData.message,
			rating: reviewData.rating,
			listingId: reviewData.listingId,
		},
		include: {
			user: true,
			listing: true,
		},
	});
};

const updateReview = async (reviewId, reviewData) => {
	return prisma.review.update({
		where: { reviewId: parseInt(reviewId) },
		data: reviewData,
		include: {
			user: true,
			listing: true,
		},
	});
};

// Function to delete a review
const deleteReview = async (reviewId) => {
	return prisma.review.delete({
		where: { reviewId: parseInt(reviewId) },
	});
};

module.exports = {
	getAllReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReview,
};

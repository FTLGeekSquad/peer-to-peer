const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllListings = async () => {
	return prisma.listing.findMany();
};

const getListingById = async (listingId) => {
	return prisma.listing.findUnique({ where: { listingId: parseInt(listingId) } });
};

// other model fuctions

module.exports = {
	getAllListings,
	getListingById,
	// other exports
};

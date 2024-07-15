const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllListings = async () => {
	return await prisma.listing.findMany();
};

const getListingById = async (id) => {
	return await prisma.listing.findUnique({
		where: { listingId: parseInt(id) },
	});
};

// other model fuctions

module.exports = {
	getAllListings,
	getListingById,
	// other exports
};

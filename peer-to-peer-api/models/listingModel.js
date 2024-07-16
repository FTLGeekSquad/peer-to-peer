const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllListings = async () => {
	try {
		const listings = await prisma.listing.findMany();
		return listings;
	} catch (error) {
		throw new Error(`Error fetching listings: ${error.message}`);
	}
};



// other model fuctions

module.exports = {
	getAllListings,

	// other exports
};

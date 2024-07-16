const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllListings = async (req, res) => {
	try {
		const listings = await prisma.listing.findMany();
		res.json(listings);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getListingById = async (req, res) => {
	const { listingId } = req.params;
	try {
		const listing = await prisma.listing.findUnique({
			where: { listingId: parseInt(listingId) },
		});
		res.json(listing);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};



// crud here

module.exports = {
	getAllListings,
	getListingById,
	// other exports
};

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

const getListingById = async (listingId) => {
	return prisma.listing.findUnique({ where: { listingId: parseInt(listingId) } });
	// may need to add inclide: {listings: true} later
};

const createListing = async (listingData) => {
	return prisma.listing.create({
	  data: {
		title: listingData.title,
		userId: listingData.userId,
		description: listingData.description,
		category: listingData.category,
		subCategory: listingData.subCategory,
		priceHourly: listingData.priceHourly,
		photo: listingData.photo,
		location: listingData.location,
		availability: listingData.availability,
		// reviews will be added separately after creation
	  },
	});
  };

  const updateListing = async (listingId, listingData) => {
	return prisma.listing.update({
	  where: { listingId: parseInt(listingId) },
	  data: listingData,
	});
  };
  
  //Function to delete a listing
const deleteListing = async (listingId) => {
    return prisma.listing.delete({ where: { listingId: parseInt(listingId) } });
  };


// other model fuctions

module.exports = {
	getAllListings,
	getListingById,
	createListing, 
	updateListing, 
	deleteListing
};

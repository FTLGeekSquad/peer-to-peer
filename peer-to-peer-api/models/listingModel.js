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
	try {
		const listing = await prisma.listing.findUnique({
			where: {
				listingId: parseInt(listingId),
			},
		});
		return listing;
	} catch (error) {
		throw new Error(`Error fetching listing by ID: ${error.message}`);
	}
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

  const getListingsByCategory = async (category, subCategory) => {
	try {
		const filter = {
			category: {
				equals: category,
				mode: 'insensitive', // This makes the search case-insensitive
			}
		};

		if (subCategory) {
			filter.subCategory = {
				equals: subCategory,
				mode: 'insensitive',
			};
		}

		const listings = await prisma.listing.findMany({
			where: filter,
		});
		return listings;
	} catch (error) {
		throw new Error(`Error fetching listings by category: ${error.message}`);
	}
};

// other model fuctions

module.exports = {
	getAllListings,
	getListingById,
	createListing, 
	updateListing, 
	deleteListing, 
	getListingsByCategory
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllListings = async () => {
	try {
		const listings = await prisma.listing.findMany({
			include: {
				savedUsers: true,
				reviews: true
			}
		});
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
				include: { user: true, reviews: true },
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
		avgRating: listingData.avgRating
		// reviews will be added separately after creation
	  },
	});
  };

  const updateListing = async (listingId, listingData) => {
	listingData.priceHourly = parseFloat(listingData.priceHourly)
	return prisma.listing.update({
	  where: { listingId: parseInt(listingId)},
	  data: listingData,

	  // here, add the logic for calculating the new average based on the rati
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
			if (Array.isArray(subCategory)) {
				// If subCategory is an array, use 'in' to filter by multiple values
				filter.subCategory = {
					in: subCategory,
					mode: 'insensitive',
				};
			} else {
				// If subCategory is a single item, use 'equals'
				filter.subCategory = {
					equals: subCategory,
					mode: 'insensitive',
				};
			}
		}

		const listings = await prisma.listing.findMany({
			where: filter,
			include: { user: true, reviews: true },
		});
		return listings;
	} catch (error) {
		throw new Error(`Error fetching listings by category: ${error.message}`);
	}
};

// Fetch all listings by userId
const getListingsByUserId = async (userId) => {
	return prisma.listing.findMany({
	  where: { userId: parseInt(userId), 
	  include: { user: true, reviews: true },
	  }
	});
  };
  


// other model fuctions

module.exports = {
	getAllListings,
	getListingById,
	createListing, 
	updateListing, 
	deleteListing, 
	getListingsByCategory, 
	getListingsByUserId
};

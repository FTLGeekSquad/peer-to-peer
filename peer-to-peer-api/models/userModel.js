const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
	return prisma.user.findMany({
		include: {
			allListings: true,
		}
	});
};

// maybe do get user by email instead
const getUserByEmail = async (email) => {
	return prisma.user.findUnique({
	  where: { email },
	});
  };


const getUserById = async (userId) => {
	return prisma.user.findUnique({ 
		where: { userId: parseInt(userId) 
		} , 
		include: {
			allListings: true
		}
	});
	// may need to add include: {listings: true} later
};

const createUser = async (name, email) => {

	return prisma.user.create({
	  data: {
		name,
		email,
	  }
	});
  };

  const updateUser = async (userId, userData) => {
	return prisma.user.update({
	  where: { userId: parseInt(userId) },
	  data: userData,
	});
  };
  
//Function to delete a card
const deleteUser = async (userId) => {
    return prisma.user.delete({ where: { userId: parseInt(userId) } });
  };
  

  // Get saved listings for a specific user
const getSavedListings = async (userId) => {
	const user = await prisma.user.findUnique({
		where: { userId: parseInt(userId) },
		select: { savedListings: true }
	});
	if (!user) throw new Error("User not found");
	return user.savedListings;
};

// Add a listing to the user's saved listings
const saveListing = async (userId, listing) => {
    // Retrieve the current user's savedListings
    const user = await prisma.user.findUnique({
        where: { userId: parseInt(userId) },
        select: { savedListings: true }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Ensure savedListings is treated as an array
    const currentListings = Array.isArray(user.savedListings) ? user.savedListings : [];

    // Add the new listing to the current listings
    const updatedListings = [...currentListings, listing];

    // Update the user's savedListings in the database
    const updatedUser = await prisma.user.update({
        where: { userId: parseInt(userId) },
        data: {
            savedListings: updatedListings
        }
    });

    return updatedUser.savedListings;
};

// Remove a listing from the user's saved listings
const removeListing = async (userId, listingId) => {
	const user = await prisma.user.findUnique({
		where: { userId: parseInt(userId) },
		select: { savedListings: true }
	});
	if (!user) throw new Error("User not found");

	const updatedListings = user.savedListings.filter(
		(listing) => listing.listingId !== parseInt(listingId)
	);

	const updatedUser = await prisma.user.update({
		where: { userId: parseInt(userId) },
		data: {
			savedListings: updatedListings,
		},
	});
	return updatedUser.savedListings;
};


module.exports = {
	getAllUsers,
	getUserById,
	createUser, 
	updateUser, 
	deleteUser, 
	getSavedListings,
	saveListing,
	removeListing,
	getUserByEmail
};

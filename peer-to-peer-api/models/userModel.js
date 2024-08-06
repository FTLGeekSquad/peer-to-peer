const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
	return prisma.user.findMany({
		include: {
			allListings: true,
		},
	});
};

// maybe do get user by email instead
const getUserByEmail = async (email) => {
	return prisma.user.findUnique({
		where: { email },
		include: {
			allListings: true,
			savedListings: true,
		},
	});
};

const getUserById = async (userId) => {
	return prisma.user.findUnique({
		where: { userId: parseInt(userId) },
		include: {
			allListings: true,
			savedListings: true,
		},
	});
	// may need to add include: {listings: true} later
};

const createUser = async (name, email) => {
	return prisma.user.create({
		data: {
			name,
			email,
		},
	});
};

const updateUser = async (userId, userData) => {
	return prisma.user.update({
		where: { userId: parseInt(userId) },
		data: userData,
	});
};

const editUserByEmail = async (userEmail, userData) => {
	try {
		const updatedUser = await prisma.user.update({
			where: { email: userEmail },
			data: userData,
		});
		return updatedUser;
	} catch (error) {
		throw new Error(
			`Failed to update user with email ${userEmail}: ${error.message}`
		);
	}
};

//Function to delete a card
const deleteUser = async (userId) => {
	return prisma.user.delete({ where: { userId: parseInt(userId) } });
};

// Get saved listings for a specific user
const getSavedListings = async (userId) => {
	const user = await prisma.user.findUnique({
		where: { userId: parseInt(userId) },
		select: { savedListings: true },
	});
	if (!user) throw new Error("User not found");
	return user.savedListings;
};

// Add a listing to the user's saved listings
const saveListing = async (userId, listingId) => {
	// Retrieve the current user's savedListings
	const user = await prisma.user.findUnique({
		where: { userId: parseInt(userId) },
		select: { savedListings: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	return prisma.listing.update({
		where: {
			listingId: parseInt(listingId)
		}, 
		data: {
			savedUsers: {
				connect: {
					userId: parseInt(userId)
				}
			}
		}
	})
};

// Remove a listing from the user's saved listings
const removeListing = async (userId, listingId) => {
	const user = await prisma.user.findUnique({
		where: { userId: parseInt(userId) },
		select: { savedListings: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	return prisma.listing.update({
		where: {
			listingId: parseInt(listingId)
		}, 
		data: {
			savedUsers: {
				disconnect: {
					userId: parseInt(userId)
				}
			}
		}
	})
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
	getUserByEmail,
	editUserByEmail,
};

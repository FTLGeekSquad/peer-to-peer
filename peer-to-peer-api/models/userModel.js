const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
	return prisma.user.findMany();
};

const getUserById = async (userId) => {
	return prisma.user.findUnique({ where: { userId: parseInt(userId) } });
	// may need to add inclide: {listings: true} later
};

const createUser = async (userData) => {
	return prisma.user.create({
	  data: {
		name: userData.name,
		location: userData.location,
		savedListings: userData.savedListings
	  }
	});
  };
  

module.exports = {
	getAllUsers,
	getUserById,
	createUser
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
	return prisma.user.findMany({
		include: {
			allListings: true,
		}
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
  

module.exports = {
	getAllUsers,
	getUserById,
	createUser, 
	updateUser, 
	deleteUser
};

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
  

module.exports = {
	getAllUsers,
	getUserById,
	createUser, 
	updateUser, 
	deleteUser
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
	return prisma.user.findMany();
};

const getUsersById = async (userId) => {
	return prisma.user.findUnique({ where: { userId: parseInt(userId) } });
};
module.exports = {
	getAllUsers,
	getUsersById,
};

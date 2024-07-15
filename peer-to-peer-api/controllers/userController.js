const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUserById = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { userId: parseInt(userId) },
		});
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// crud here 

module.exports = {
	getAllUsers,
	getUserById,
	// other exports
};

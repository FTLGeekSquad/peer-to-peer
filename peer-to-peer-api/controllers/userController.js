const userModel = require('../models/userModel')

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		console.error("error fetching users:", error);
		res.status(500).json({ error: error.message });
	}
};

const getUserById = async (req, res) => {
	try {
		const users = await userModel.getUserById(req.params.userId);
		if (users) {
			res.status(200).json(users);
		} else {
			res.status(404).json({ error: "user not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// create user
const createUser = async (req, res) => {
	const userData = req.body;
	try {
	  const newUser = await userModel.createUser(userData);
	  res.status(201).json(newUser);
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  };

  

module.exports = {
	getAllUsers,
	getUserById,
	createUser
	// other exports
};

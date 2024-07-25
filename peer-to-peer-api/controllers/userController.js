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

//get user by email
const getUserByEmail = async (req, res) => {
	const { email } = req.params;
	try {
	  const user = await userModel.getUserByEmail(email);
	  if (user) {
		res.status(200).json(user);
	  } else {
		res.status(404).json({ message: 'User not found' });
	  }
	} catch (error) {
	  res.status(500).json({ message: 'Error retrieving user', error });
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

//Function to update a user
const updateUser = async (req, res) => {
    try {
      const updatedUser = await userModel.updateUser(req.params.userId, req.body);
      if (updatedUser) {
        res.status(200).json(updateUser);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //Function to delete a user
const deleteUser = async (req, res) => {
	try {
		const deletedUser = await userModel.deleteUser(req.params.userId);
		if (deletedUser) {
			res.status(200).json(deleteUser);
		} else {
			res.status(404).json({ error: "user not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};



module.exports = {
	getAllUsers,
	getUserById,
	createUser, 
	updateUser, 
	deleteUser,
	getUserByEmail
};

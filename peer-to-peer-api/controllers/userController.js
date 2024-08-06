const userModel = require('../models/userModel')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
	const { userEmail } = req.params;
	try {
	  const user = await userModel.getUserByEmail(userEmail);
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

  const editUserByEmail = async (userEmail, userData) => {
	try {
	  const updatedUser = await prisma.user.update({
		where: { email: userEmail },
		data: userData,
	  });
	  return updatedUser;
	} catch (error) {
	  throw new Error(`Failed to update user with email ${userEmail}: ${error.message}`);
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



// Get saved listings for a user
const getSavedListings = async (req, res) => {
    const { userId } = req.params;
    try {
        const savedListings = await userModel.getSavedListings(userId);
        res.json(savedListings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching saved listings', error });
    }
};

// Add a listing to saved listings
const saveListing = async (req, res) => {
    const { userId, listingId } = req.params;

    try {
        const updatedListings = await userModel.saveListing(userId, listingId);
        res.json(updatedListings);
    } catch (error) {
        res.status(500).json({ message: 'Error saving listing', error: error.message });
    }
};

// Remove a listing from saved listings
const removeListing = async (req, res) => {
    const { userId, listingId } = req.params;
    try {
        const updatedListings = await userModel.removeListing(userId, listingId);
        res.json(updatedListings);
    } catch (error) {
        res.status(500).json({ message: 'Error removing listing', error });
    }
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
	editUserByEmail
};

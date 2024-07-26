const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.get("/email/:userEmail", userController.getUserByEmail);
// Get saved listings for a user
router.get('/:userId/saved-listings', userController.getSavedListings);

// Add a listing to saved listings
router.post('/:userId/saved-listings', userController.saveListing);

// Remove a listing from saved listings
router.delete('/:userId/saved-listings/:listingId', userController.removeListing);

// put route to edit by email
router.put("/email/:userEmail", userController.editUserByEmail);



// other routes

module.exports = router;

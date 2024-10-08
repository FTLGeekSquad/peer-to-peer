const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

// Define more specific routes first
router.get("/filter/:category", listingController.getListingsByCategory);
router.get('/all-listings/:userId', listingController.getListingsByUserId);
//https://peer-to-peer-59rz.onrender.com/listings/all-listings/2 fyi

// Define other routes
router.get("/", listingController.getAllListings);
router.get("/:listingId", listingController.getListingById);
router.post("/", listingController.createListing);
router.put("/:listingId", listingController.updateListing);
router.delete("/:listingId", listingController.deleteListing);

module.exports = router;

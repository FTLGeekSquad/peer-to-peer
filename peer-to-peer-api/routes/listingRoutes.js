const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

router.get("/listings", listingController.getAllListings);
router.get("/listings/:listingId", listingController.getListingById);
// other routes

module.exports = router;

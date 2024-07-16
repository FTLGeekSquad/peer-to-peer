const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

router.get("/", listingController.getAllListings);
router.get("/:listingId", listingController.getListingById);
// other routes

module.exports = router;

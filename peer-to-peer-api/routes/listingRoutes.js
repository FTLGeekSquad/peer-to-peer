const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

router.get("/", listingController.getAllListings);
router.get("/:listingId", listingController.getListingById);
router.post("/", listingController.createListing);
router.put("/:listingId", listingController.updateListing);
router.delete("/:listingId", listingController.deleteListing);

router.get("/:equipment", listingController.getAllEquipment);





module.exports = router;

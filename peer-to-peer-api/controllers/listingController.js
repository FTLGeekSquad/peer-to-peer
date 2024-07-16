const listingModel = require("../models/listingModel");

// const getAllListings = async (req, res) => {
// 	try {
// 		const listing = await listingModel.getAllListings();
// 		res.status(200).json(listing);
// 	} catch (error) {
// 		console.error("Error fetching listings:", error); // Log the error for debugging
// 		res.status(400).json({ error: error.message });
// 	}
// };

// //Function to get card by ID
// const getListingById = async (req, res) => {
// 	try {
// 		const listing = await listingModel.getListingById(req.params.listing);
// 		if (listing) {
// 			res.status(200).json(listing);
// 		} else {
// 			res.status(404).json({ error: "listing not found" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// };

const getAllListings = async (req, res) => {
	try {
		const listings = await listingModel.getAllListings();
		res.status(200).json(listings);
	} catch (error) {
		console.error("Error fetching cards:", error);  // Log the error for debugging
        res.status(400).json({ error: error.message });
	}
}



// crud here

module.exports = {
	getAllListings,
};

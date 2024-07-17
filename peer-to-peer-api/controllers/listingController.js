const listingModel = require("../models/listingModel");

const getAllListings = async (req, res) => {
	try {
		const listings = await listingModel.getAllListings();
		res.status(200).json(listings);
	} catch (error) {
		console.error("Error fetching cards:", error);  // Log the error for debugging
        res.status(400).json({ error: error.message });
	}
}



const getListingById = async (req, res) => {
	try {
		const listing = await listingModel.getListingById(req.params.listingId);
		if (listing) {
			res.status(200).json(listing);
		} else {
			res.status(404).json({ error: "listing not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const createListing = async (req, res) => {
	const listingData = req.body;
	try {
	  const newListing = await listingModel.createListing(listingData);
	  res.status(201).json(newListing);
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  };

  const updateListing = async (req, res) => {
    try {
      const updatedListing = await listingModel.updateListing(req.params.listingId, req.body);
      if (updateListing) {
        res.status(200).json(updateListing);
      } else {
        res.status(404).json({ error: "listing not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//Function to delete a listing
const deleteListing = async (req, res) => {
	try {
		const deletedListing = await listingModel.deleteListing(req.params.listingId);
		if (deleteListing) {
			res.status(200).json(deleteListing);
		} else {
			res.status(404).json({ error: "listing not found" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getListingsByCategory = async (req, res) => {
	const category = req.params.category;
	const subCategory = req.query.subCategory;
	const validCategories = ['equipment', 'spaces', 'services'];

	if (!validCategories.includes(category.toLowerCase())) {
		return res.status(400).json({ error: "Invalid category" });
	}

	const validSubCategories = {
		equipment: ['cameras', 'lenses', 'tripods', 'flashes'],
		spaces: ['indoor', 'outdoor'],
		services: ['photography', 'videography']
	};

	if (subCategory && !validSubCategories[category.toLowerCase()].includes(subCategory.toLowerCase())) {
		return res.status(400).json({ error: "Invalid subcategory" });
	}

	try {
		const listings = await listingModel.getListingsByCategory(category, subCategory);
		res.status(200).json(listings);
	} catch (error) {
		console.error(`Error fetching listings by category: ${error.message}`);  // Log the error for debugging
		res.status(400).json({ error: error.message });
	}
};


module.exports = {
	getAllListings,
	getListingById, 
	createListing, 
	updateListing, 
	deleteListing, 
	getListingsByCategory
};

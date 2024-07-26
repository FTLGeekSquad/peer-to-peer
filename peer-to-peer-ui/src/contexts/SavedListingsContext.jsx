import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const SavedListingsContext = createContext();

export const useSavedListings = () => useContext(SavedListingsContext);

export const SavedListingsProvider = ({ children, userId }) => {
	const [savedListings, setSavedListings] = useState([]);

	// Fetch saved listings from the backend when the component mounts
	useEffect(() => {
		const fetchSavedListings = async () => {
			try {
				const response = await axios.get(`/api/users/${userId}/saved-listings`);
				console.log(response.data);
				setSavedListings(response.data);
			} catch (error) {
				console.error("Error fetching saved listings:", error);
			}
		};
		fetchSavedListings();
	}, [userId]);

	// Save a listing to the backend
	const saveListing = async (listing) => {
		try {
			const response = await axios.post(
				`http://localhost:3000/users/1/saved-listings`,
				{ listing }
			);
			setSavedListings(response.data);
		} catch (error) {
			console.error("Error saving listing:", error);
		}
	};

	// Remove a listing from the backend
	const removeListing = async (listingId) => {
		try {
			// eventually will have to change to only the logged in users' ID
			const response = await axios.delete(
				`http://localhost:3000/users/1/saved-listings/${listingId}`
			);
			setSavedListings(response.data);
		} catch (error) {
			console.error("Error removing listing:", error);
		}
	};

	return (
		<SavedListingsContext.Provider
			value={{ savedListings, saveListing, removeListing }}
		>
			{children}
		</SavedListingsContext.Provider>
	);
};

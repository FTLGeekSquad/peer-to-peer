import React, { createContext, useState, useContext, useEffect } from "react";

const SavedListingsContext = createContext();

export const useSavedListings = () => useContext(SavedListingsContext);

export const SavedListingsProvider = ({ children }) => {
	const [savedListings, setSavedListings] = useState([]);

	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem("savedListings")) || [];
		setSavedListings(saved);
	}, []);

	useEffect(() => {
		localStorage.setItem("savedListings", JSON.stringify(savedListings));
	}, [savedListings]);

	const saveListing = (listing) => {
		console.log('test')

		setSavedListings([...savedListings, listing]);
	};

	const removeListing = (listingId) => {
		setSavedListings(
			savedListings.filter((listing) => listing.listingId !== listingId)
		);
	};

	return (
		<SavedListingsContext.Provider
			value={{ savedListings, saveListing, removeListing }}
		>
			{children}
		</SavedListingsContext.Provider>
	);
};



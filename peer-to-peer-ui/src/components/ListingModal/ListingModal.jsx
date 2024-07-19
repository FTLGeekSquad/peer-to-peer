import React from "react";
import "./ListingModal.css";

const ListingModal = ({ listing, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="close-button" onClick={onClose}>
					X
				</button>
				<img src={listing.photo} alt="Listing" className="listing-image" />
				<div className="listing-info">
					<h2>{listing.title}</h2>
					<p>{listing.description}</p>
					<p>Category: {listing.category}</p>
					<p>SubCategory: {listing.subCategory}</p>
					<p>Price: ${listing.priceHourly}/hour</p>
					<p>Location: {listing.location}</p>
				</div>
			</div>
		</div>
	);
};

export default ListingModal;

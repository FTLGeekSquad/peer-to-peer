import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Equipment from "./Equipment";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSavedListings } from "../../contexts/SavedListingsContext";
import "./EquipmentGrid.css";
import Modal from "../GeneralModal/GeneralModal";
import Footer from "../Footer/Footer";
import googleButton from "/src/assets/web_light_rd_SI.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// strange error, where you have to reload for stars to show after put request.
// but also, site crashes when u do the put and then reload

function EquipmentGrid({}) {
	const { userData, setUserData } = useSavedListings();
	const [equipment, setEquipment] = useState([]);
	const [selectedEquipment, setSelectedEquipment] = useState(null);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userRating, setUserRating] = useState(null);
	const [currentRating, setCurrentRating] = useState(0);

	const dataUrl = "http://localhost:3000/listings/filter/equipment";

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		const fetchEquipment = async () => {
			let url = dataUrl;
			try {
				if (selectedCategories.length > 0) {
					const categoryQuery = selectedCategories
						.map((category) => `subCategory=${category}`)
						.join("&");
					url += `?${categoryQuery}`;
				}
				const response = await axios.get(url);
				setEquipment(response.data);
			} catch (error) {
				console.error("Error fetching equipment:", error);
			}
		};

		fetchEquipment();
	}, [selectedCategories]);

	const handleToggleChange = (event, newCategories) => {
		setSelectedCategories(newCategories);
	};

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
	};

	const handleItemClick = (equip) => {
		setSelectedEquipment(equip);
	};

	const handleLogin = () => {
		window.location.href = "http://localhost:3000/auth/login";
	};

	const filteredEquipment = equipment.filter((equip) =>
		equip.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const renderStars = (rating) => {
		const fullStars = Math.floor(rating); // Number of full stars
		const halfStar = rating % 1 >= 0.5; // Whether to show a half star

		return (
			<div className="star-rating">
				{[...Array(5)].map((_, index) => {
					if (index < fullStars) {
						return (
							<FontAwesomeIcon
								key={index}
								icon={faStar}
								className="star filled"
							/>
						);
					} else if (index === fullStars && halfStar) {
						return (
							<FontAwesomeIcon
								key={index}
								icon={faStar}
								className="star half"
							/>
						);
					} else {
						return (
							<FontAwesomeIcon
								key={index}
								icon={faStar}
								className="star empty"
							/>
						);
					}
				})}
			</div>
		);
	};

	useEffect(() => {
		console.log("hey HEY");
		if (selectedEquipment && userData.userId) {
			// Fetch the user's existing rating if available
			axios
				.get(
					`http://localhost:3000/reviews/${selectedEquipment.listingId}/rating/${userData.userId}`
				)
				.then((response) => setUserRating(response.data.rating))
				.catch((error) => console.error("Error fetching user rating:", error));
		}
	}, [selectedEquipment, userData.userId]);

	const handleRatingChange = (event) => {
		setCurrentRating(Number(event.target.value));
	};

	const handleRatingSubmit = async () => {
		if (!isLoggedIn) {
			alert("Please log in to rate this listing.");
			return;
		}

		if (currentRating < 0 || currentRating > 5) {
			alert("Rating must be between 0 and 5 stars.");
			return;
		}

		try {
			if (userRating !== null) {
				// User has already rated; update the rating
				await axios.put(
					`http://localhost:3000/reviews/${selectedEquipment.listingId}/rating/${userData.userId}`,
					{
						rating: currentRating,
					}
				);
				console.log("posting a rating");
			} else {
				// User has not rated; create a new rating
				await axios.post(`http://localhost:3000/reviews`, {
					userId,
					rating: currentRating,
				});
			}

			setUserRating(currentRating);
		} catch (error) {
			console.error("Error setting rating:", error);
		}
	};

	return (
		<>
			<Header handleSubmit={handleSearch} />
			<div className="allComponents">
				<div className="bottom">
					<div className="subcategoryToggle">
						<ToggleButtonGroup
							value={selectedCategories}
							onChange={handleToggleChange}
							aria-label="subcategory"
							color="primary"
							sx={{ marginBottom: 2 }}
						>
							<ToggleButton value="Cameras">Cameras</ToggleButton>
							<ToggleButton value="Lenses">Lenses</ToggleButton>
							<ToggleButton value="Flashes">Flash/Flash Equipment</ToggleButton>
							<ToggleButton value="Tripods">Tripods</ToggleButton>
						</ToggleButtonGroup>
					</div>
					<div className="equipmentGrid">
						{filteredEquipment.map((equip, index) => (
							<div key={index} className="equipment-item">
								<Equipment
									onClick={handleItemClick}
									listing={equip}
									isLoggedIn={isLoggedIn}
									setShowLoginModal={setShowLoginModal}
									userData={userData}
									setUserData={setUserData}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{selectedEquipment && (
				<Modal
					show={selectedEquipment !== null}
					onClose={() => setSelectedEquipment(null)}
				>
					<h2 className="modalHeader">{selectedEquipment.title}</h2>
					<img
						className="modal-img"
						src={selectedEquipment.photo}
						alt={selectedEquipment.title}
					/>
					<div className="modalWords">
						<div className="upperWords">
							<h2 className="lowerTitle">{selectedEquipment.title}</h2>
							<p className="locationText">
								<strong>Location:</strong> {selectedEquipment.location}
							</p>
						</div>
						<p>{selectedEquipment.description}</p>
						<div
							className="userInfo"
							style={{ filter: isLoggedIn ? "none" : "blur(5px)" }}
						>
							{selectedEquipment.user && (
								<>
									<p>
										<strong>Posted by:</strong> {selectedEquipment.user.name}
									</p>
									<p>
										<strong>Contact:</strong>{" "}
										{selectedEquipment.user.phoneNumber}
									</p>
								</>
							)}
						</div>
						{!isLoggedIn && <p>Please log in to view contact information.</p>}
					</div>
					<div className="rating">
						{renderStars(selectedEquipment.avgRating)}
						<span className="rating-number">
							{selectedEquipment.avgRating.toFixed(1)}
						</span>
					</div>
					{isLoggedIn && (
						<div className="rating-input">
							<input
								type="number"
								value={currentRating}
								min="0"
								max="5"
								step="0.5"
								onChange={handleRatingChange}
							/>
							<button onClick={handleRatingSubmit}>Submit Rating</button>
						</div>
					)}
				</Modal>
			)}
		</>
	);
}

export default EquipmentGrid;

// need to get reviews by listingId and userId

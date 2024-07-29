import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import { Link } from "react-router-dom";
import axios from "axios";
import FileUpload from "../FileUpload/FileUpload";
import { useNavigate } from "react-router-dom";

const ListContent = ({ showCreateListing, setShowCreateListing, userInfo }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [priceHourly, setPriceHourly] = useState("");
	const [photo, setPhoto] = useState("");
	const [location, setLocation] = useState("");
	const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadSuccess, setUploadSuccess] = useState("");

    const navigate = useNavigate(); // get the navigate function from useNavigate


	const [user, setUser] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		location: "",
		createdAt: "",
		userId: 0,
	});

	// useEffect(() => {
	// 	if (userInfo) {
	// 		const fetchUserData = async () => {
	// 			console.log("Fetching user data...");
	// 			try {
	// 				const response = await axios.get(
	// 					`http://localhost:3000/users/email/${userInfo.email}`
	// 				); // Adjust the URL based on your API endpoint
	// 				console.log("Response data:", response.data); // Log the response data
	// 				setUser({
	// 					name: response.data.name || "",
	// 					email: response.data.email || "",
	// 					phoneNumber: response.data.phoneNumber || "",
	// 					location: response.data.location || "",
	// 					createdAt: response.data.createdAt || "",
	// 					userId: response.data.userId,
	// 				});
    //             if (response.data.userId)
    //             {
    //                 const response = await axios.get(`http://localhost:3000/listings/user/all-listings/${user.userId}`);
	// 				setListings(response.data);
	// 				setLoading(false);

    //             }
	// 			} catch (error) {
    //                 setError(error);
	// 				console.error("Error fetching user data:", error);
	// 			}
	// 		};
	
	// 		fetchUserData();
	// 	}
	// }, [userInfo]);

    //combines it into one user effect for data population
    useEffect(() => {
        if (userInfo) {
            const fetchUserData = async () => {
                console.log("Fetching user data...");
                try {
                    const response = await axios.get(
                        `http://localhost:3000/users/email/${userInfo.email}`
                    );
                    console.log("Response data:", response.data);
                    const userData = {
                        name: response.data.name || "",
                        email: response.data.email || "",
                        phoneNumber: response.data.phoneNumber || "",
                        location: response.data.location || "",
                        createdAt: response.data.createdAt || "",
                        userId: response.data.userId,
                    };
                    setUser(userData);
    
                    if (userData.userId) {
                        const listingsResponse = await axios.get(
                            `http://localhost:3000/listings/user/all-listings/${userData.userId}`
                        );
                        setListings(listingsResponse.data);
                    }
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    console.error("Error fetching user data:", error);
                }
            };
    
            fetchUserData();
        }
    }, [userInfo]);
    
	
	// New useEffect to fetch listings when user state is updated
	// useEffect(() => {
	// 	const fetchListings = async () => {
	// 		if (user.userId) {
	// 			console.log("Fetching listings for userId:", user.userId);
	// 			try {
	// 				const response = await axios.get(`http://localhost:3000/listings/user/all-listings/${user.userId}`);
	// 				setListings(response.data);
	// 				setLoading(false);
	// 			} catch (err) {
	// 				setError(err);
	// 				setLoading(false);
	// 			}
	// 		}
	// 	};
	
	// 	fetchListings();
	// }, [user]); // Dependency array includes user
	
	

	const handleLogout = () => {
		console.log("Logging out");
		localStorage.removeItem("token");
		navigate("/home");
	};



	const handleOpenModal = () => {
		setShowCreateListing(true);
	};

	const handleCloseModal = () => {
		setShowCreateListing(false);
		setTitle("");
		setDescription("");
		setCategory("");
		setSubCategory("");
		setPriceHourly("");
		setPhoto("");
		setLocation("");
		setIsPhotoUploaded(false);
		setUploadSuccess("");
	};

	const handleCreateListing = async (e) => {
		e.preventDefault();

		if (isUploading) {
			setUploadSuccess("The photo is still uploading.");
			return;
		}

		const listingData = {
			title,
			userId,
			description,
			category,
			subCategory,
			priceHourly,
			photo,
			location,
			availability: {}, // Add a default value or modify as needed
		};

		try {
			const response = await axios.post(
				"http://localhost:3000/listings",
				listingData
			);
			console.log("Listing created:", response.data);
			handleCloseModal();
		} catch (error) {
			console.error(
				"Error creating listing:",
				error.response ? error.response.data : error.message
			);
		} finally {
			setIsPhotoUploaded(false);
		}
	};

	const subcategoryOptions = {
		equipment: ["Cameras", "Lenses", "Flashes", "Tripods"],
		spaces: ["Indoor", "Outdoor"],
		services: ["Photography", "Videography"],
	};

	const handleFileUploaded = (url) => {
		setPhoto(url);
		setIsPhotoUploaded(true);
		setUploadSuccess("File uploaded successfully.");
	};

	const handleUploading = (status) => {
		setIsUploading(status);
		if (status) {
			setUploadSuccess("");
		}
	};

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const date = new Date(dateString);
		return date.toLocaleDateString(undefined, options);
	};

	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error fetching listings: {error.message}</p>;

	return (
		<>
			<section className="profile-info">
				<div className="profile-picture">
					<img src={profileImg} alt="Profile" />
				</div>
				<div className="profile-details">
					<h2>{user.name}</h2>
					<p>
						Member since{" "}
						{user.createdAt ? formatDate(user.createdAt) : "Loading..."}
					</p>
					<div className="contact-info">
						<p>Email: {user.email}</p>
						<p>Phone Number: {user.phoneNumber}</p>
						<p>Location: {user.location}</p>
					</div>
					<button className="edit-button" onClick={handleOpenModal}>
						Edit Account Details
					</button>
					<button onClick={handleLogout}>Log out</button>
				</div>

				<div className="createListing">
					<div className="create-listing-button-container">
						<button className="create-listing-button" onClick={handleOpenModal}>
							Create Listing
						</button>
					</div>
					{showCreateListing && (
						<div className="modal" onClick={handleCloseModal}>
							<div
								className="listing-modal-content"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="listing-modal-header">
									<h2 className="modalTitle">Create a Listing</h2>
									<button className="modal-close" onClick={handleCloseModal}>
										&times;
									</button>
								</div>
								<div className="modal-body">
									{uploadSuccess && (
										<p className="upload-success-message">{uploadSuccess}</p>
									)}
									<form
										onSubmit={handleCreateListing}
										className="centered-form"
									>
										<input
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Enter a Title"
											required
											className="styled-input"
										/>
										<input
											type="text"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											placeholder="Description"
											required
											className="styled-input"
										/>
										<select
											value={category}
											onChange={(e) => {
												setCategory(e.target.value);
												setSubCategory(""); // Reset subCategory when category changes
											}}
											required
											className="styled-input"
										>
											<option value="" disabled>
												Select a category
											</option>
											<option value="equipment">Equipment</option>
											<option value="services">Services</option>
											<option value="spaces">Spaces</option>
										</select>
										<select
											value={subCategory}
											onChange={(e) => setSubCategory(e.target.value)}
											required
											className="styled-input"
											disabled={!category} // Disable subCategory if no category is selected
										>
											<option value="" disabled>
												Select a subcategory
											</option>
											{category &&
												subcategoryOptions[category]?.map((sub) => (
													<option key={sub} value={sub}>
														{sub}
													</option>
												))}
										</select>
										<input
											type="number"
											value={priceHourly}
											onChange={(e) =>
												setPriceHourly(parseFloat(e.target.value))
											}
											placeholder="Price Hourly"
											required
											className="styled-input"
										/>
										<input
											type="text"
											value={location}
											onChange={(e) => setLocation(e.target.value)}
											placeholder="Location"
											required
											className="styled-input"
										/>
										<FileUpload
											onFileUploaded={handleFileUploaded}
											setIsPhotoUploaded={setIsPhotoUploaded}
											handleUploading={handleUploading}
											className="fileUpload"
										/>
										<button
											type="submit"
											className="create-listing-button"
											disabled={isUploading}
										>
											Create Listing
										</button>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			<section className="listings">
				<div className="tabs">
					<button className="tab active">All</button>
				</div>
				<div className="listings-grid">
					{listings.length > 0 ? (
						listings.map((listing) => (
							<div key={listing.listingId} className="listing-card">
								<img src={listing.photo || placeHolderListing} alt="Listing" />
								<div className="listing-details">
									<p className="listingCardTitle">{listing.title}</p>
									<div className="paragraph">
										<p className="location">{listing.location}</p>
										<p className="price">${listing.priceHourly} per hour</p>
									</div>
									{/* Add other listing details here if needed */}
								</div>
							</div>
						))
					) : (
						<p>No listings available.</p>
					)}
				</div>
			</section>
		</>
	);
};

export default ListContent;

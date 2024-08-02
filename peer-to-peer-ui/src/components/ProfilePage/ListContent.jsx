import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import { Link } from "react-router-dom";
import axios from "axios";
import FileUpload from "../FileUpload/FileUpload";
import { useNavigate } from "react-router-dom";
import { useSavedListings } from "../../contexts/SavedListingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../GeneralModal/GeneralModal";

const ListContent = ({ showCreateListing, setShowCreateListing }) => {
	const { userData, setUserData } = useSavedListings();
	console.log(userData)
	const [listings, setListings] = useState(null);
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
	const [isEditing, setIsEditing] = useState(false);
	const [selectedEquipment, setSelectedEquipment] = useState(null);
	const [isEditingListing, setIsEditingListing] = useState(false);

    const navigate = useNavigate(); // get the navigate function from useNavigate
	console.log("ListConent")

	const fetchListings = async() => {
		try {
			const response = await axios.get(`http://localhost:3000/listings/all-listings/${userData.userId}`)
			console.log("fetchinglisting", response)
			setListings(response.data)
		} catch(error){
			console.error("Error fetching listings", error)
		}

	}
	
	useEffect(() => {
			fetchListings()
	}, []);

	const handleLogout = () => {
		console.log("Logging out");
		localStorage.removeItem("token");
		navigate("/home");
	};

	const handleEdit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/users/${userData.userId}`, {
                phoneNumber: userData.phoneNumber,
                location: userData.location,
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

	//delete listing function
const deleteListing = async (listingId) => {
	try {
		const response = await axios.delete(
			`http://localhost:3000/listings/${listingId}`
		);
		console.log(response)
		// setListings(listings?.filter((listing)=>listing.listingId !== listingId));
		// handleCloseModal()
		setSelectedEquipment(null);
		await fetchListings()
		//sets it to listings that do not have the removed listingId
		//setUserData(userData); //maybe
	} catch (error) {
		console.error("Error removing listing:", error);
	}
};



console.log("Listings:", listings)

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
			userId: userData.userId,
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
			fetchListings()
		} catch (error) {
			console.error(
				"Error creating listing:",
				error.response ? error.response.data : error.message
			);
		} finally {
			setIsPhotoUploaded(false);
		}
	};
//function to edit listing


const handleEditListing = async (e) => {
	e.preventDefault();

	if (isUploading) {
		setUploadSuccess("The photo is still uploading.");
		return;
	}

	const updatedListingData = {
		title: selectedEquipment.title,
		description: selectedEquipment.description,
		category: category,
		subCategory: subCategory,
		priceHourly: selectedEquipment.priceHourly,
		photo: selectedEquipment.photo,
		location: selectedEquipment.location,
		availability: selectedEquipment.availability,
	};

	try {
		const response = await axios.put(
			`http://localhost:3000/listings/${selectedEquipment.listingId}`,
			updatedListingData
		);
		console.log("Listing updated:", response.data);
		setIsEditingListing(false);
		setSelectedEquipment(null);
		setListings(listings.filter((listing)=>listing.listingId !== listingId))
	} catch (error) {
		console.error(
			"Error updating listing:",
			error.response ? error.response.data : error.message
		);
	} finally {
		setIsPhotoUploaded(false);
	}
};

const handleListingChange = (event) => {
	const { name, value } = event.target;
	setSelectedEquipment((prevEquipment) => ({
		...prevEquipment,
		[name]: value,
	}));
};




	const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    console.log("HC EV", event.target)
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

	//const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(null);
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
					<h2>{userData.name}</h2>
					<p>
						Member since{" "}
						{userData.createdAt ? formatDate(userData.createdAt) : "Loading..."}
					</p>
					<div className="contact-info">
						<p>Email: {userData.email}</p>
						<p>Phone Number: {userData.phoneNumber}</p>
						<p>Location: {userData.location}</p>
					</div>
					<button className="edit-button" onClick={() => setIsEditing(true)}>
						Edit Account Details
					</button>
					<button className='logout' onClick={handleLogout}>Log out</button>

                    {isEditing && (
				<div className="modal">
					<form onSubmit={handleEdit}>
						<label>
							Phone Number:
							<input
								type="text"
								name="phoneNumber"
								value={userData.phoneNumber || ""} // Default to empty string if undefined
								onChange={handleChange}
							/>
						</label>
						<label>
							Location:
							<input
								type="text"
								name="location"
								value={userData.location || ""} // Default to empty string if undefined
								onChange={handleChange}
							/>
						</label>
						<button type="submit">Save</button>
						<button type="button" onClick={() => setIsEditing(false)}>
							Cancel
						</button>
					</form>
				</div>
			)}

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
        {listings?.length > 0 ? (
          listings?.map((listing) => (
            <div 
              key={listing.listingId} 
              className="listing-card" 
              onClick={() => setSelectedEquipment(listing)}
            >
              <img 
                src={listing.photo || placeHolderListing} 
                alt="Listing" 
              />
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

      {selectedEquipment && (
        <Modal show={selectedEquipment !== null} onClose={() => setSelectedEquipment(null)}>
          <h2 className="modalHeader">{selectedEquipment.title}</h2>
          <img className="modal-img" src={selectedEquipment.photo} alt={selectedEquipment.title} />
          <div className="modalWords">
            <div className="upperWords">
              <h2 className="lowerTitle">{selectedEquipment.title}</h2>
              <p className="locationText">
                <strong>Location:</strong> {selectedEquipment.location}
              </p>
            </div>
            <p>{selectedEquipment.description}</p>
			<p className="price">${selectedEquipment.priceHourly} per hour</p>
            <div className="userInfo" >
              
                <>
                  {/* <p><strong>Posted by:</strong> {selectedEquipment.user.name}</p>
                  <p><strong>Contact:</strong> {selectedEquipment.user.phoneNumber}</p> */}
				  
                </>
              
			  {/* the user name and contact info aren't posting in the modal */}
            </div>
			<button onClick={() => {
					setIsEditingListing(true)
					setCategory(selectedEquipment.category);
					setSubCategory(selectedEquipment.subCategory);
				}}>Edit Listing</button> 
				<button onClick={() => {
					//setIsEditingListing(true)
					deleteListing(selectedEquipment.listingId);

				}}>Delete Listing</button> 
          </div>
        </Modal>
      )}
	  {isEditingListing && (
	<div className="modal" onClick={() => setIsEditingListing(false)}>
		<div
			className="listing-modal-content"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="listing-modal-header">
				<h2 className="modalTitle">Edit Listing</h2>
				<button
					className="modal-close"
					onClick={() => setIsEditingListing(false)}
				>
					&times;
				</button>
			</div>
			<div className="modal-body">
				{uploadSuccess && (
					<p className="upload-success-message">{uploadSuccess}</p>
				)}
				<form onSubmit={handleEditListing} className="centered-form">
					<input
						type="text"
						name="title"
						value={selectedEquipment.title}
						onChange={handleListingChange}
						placeholder="Enter a Title"
						required
						className="styled-input"
					/>
					<input
						type="text"
						name="description"
						value={selectedEquipment.description}
						onChange={handleListingChange}
						placeholder="Description"
						required
						className="styled-input"
					/>
					<select
						value={category}
						defaultValue={selectedEquipment.category}
						onChange={(e) => {
							setCategory(e.target.value);
							console.log("Target Value", e.target.value)
							setSubCategory(e.target.value.subCategory); // Reset subCategory when category changes
							//{handleListingChange}
						}}
						required
						className="styled-input"
					>
						{/* <option value={selectedEquipment.category}/> */}
						<option value="equipment">Equipment</option>
						<option value="services">Services</option>
						<option value="spaces">Spaces</option>
					
					</select>
					<select
							//value={subCategory} // Use subCategory state here
							defaultValue={selectedEquipment.subCategory}
							onChange={(e) => {console.log(e.target.value); setSubCategory(e.target.value)}}
							required
							className="styled-input"
							//disabled={!category} // Disable subCategory if no category is selected
						>
							<option value="" disabled>Select Subcategory</option>
							{category && subcategoryOptions[category] && 
								subcategoryOptions[category].map((sub) => ( // Filter here if needed
									<option key={sub} value={sub}>
										{sub}
									</option>
								))
							}
					</select>
					<input
						type="number"
						name="priceHourly"
						value={selectedEquipment.priceHourly}
						onChange={handleListingChange}
						placeholder="Price Per Hour"
						required
						className="styled-input"
					/>
					<FileUpload
						onFileUploaded={handleFileUploaded}
						isUploading={handleUploading}
					/>
					<input
						type="text"
						name="location"
						value={selectedEquipment.location}
						onChange={handleListingChange}
						placeholder="Location"
						required
						className="styled-input"
					/>
					<button type="submit" className="create-button">
						Done
					</button>
				</form>
			</div>
		</div>
	</div>
)}

    </section>
		</>
	);
};

export default ListContent;
import React, { useState } from "react";
import axios from "axios";
import FileUpload from "../FileUpload/FileUpload";
import { useSavedListings } from "../../contexts/SavedListingsContext";

const CreateListing = ({ showCreateListing, setShowCreateListing, fetchListings }) => {
    const { userData } = useSavedListings();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [priceHourly, setPriceHourly] = useState("");
    const [photo, setPhoto] = useState("");
    const [location, setLocation] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState("");
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
    
    
	
    const subcategoryOptions = {
        equipment: ['Cameras', 'Lenses', 'Tripods', 'Flashes'],
        services: ['Photographer', 'Videographer'],
        spaces: ['Outdoor', 'Indoor'],
    };

    const handleCloseModal = () => {
        setShowCreateListing(false);
        setTitle('');
        setDescription('');
        setCategory('');
        setSubCategory('');
        setPriceHourly('');
        setLocation('');
        setPhoto('');
        setIsUploading(false);
        setUploadSuccess('');
    };

    const handleUploading = (status) => {
		setIsUploading(status);
		if (status) {
			setUploadSuccess("");
		}
	};

    const handleFileUploaded = (url) => {
		setPhoto(url);
		setIsPhotoUploaded(true);
		setUploadSuccess("File uploaded successfully.");
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
            await fetchListings(); 
        } catch (error) {
            console.error(
                "Error creating listing:",
                error.response ? error.response.data : error.message
            );
        } finally {
            setIsPhotoUploaded(false);
        }
    };

    return (
        <div className="createListing">
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
                            <form onSubmit={handleCreateListing} className="centered-form">
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
                                        setSubCategory(''); // Reset subCategory when category changes
                                    }}
                                    required
                                    className="styled-input"
                                >
                                    <option value="" disabled>Select a category</option>
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
                                    <option value="" disabled>Select a subcategory</option>
                                    {category && subcategoryOptions[category]?.map((sub) => (
                                        <option key={sub} value={sub}>
                                            {sub}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={priceHourly}
                                    onChange={(e) => setPriceHourly(parseFloat(e.target.value))}
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
                                    // onFileUploaded={setPhoto}
                                    // isUploading={setIsUploading}
                                    // className="fileUpload"
                                    // handleUploading={handleUploading}
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
    );
};

export default CreateListing;

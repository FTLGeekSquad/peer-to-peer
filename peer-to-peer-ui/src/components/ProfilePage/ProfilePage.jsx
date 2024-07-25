// ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./ProfilePage.css";
import logo from "../../assets/logo.png";
import profileImg from "../../assets/profile.png";
import placeHolderListing from "../../assets/placeholderListing.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import FileUpload from '../FileUpload/FileUpload';


const ProfilePage = () => {
	const [activeTab, setActiveTab] = useState("rent");
  const [showCreateListing, setShowCreateListing] = useState(false);
	const { savedListings, removeListing } = useSavedListings(); // Use the context


	return (
		<div className="profile-page">
			<header className="header">
				<Link to="/home">
					<img src={logo} alt="Logo" className="pLogo" />
				</Link>
				<nav className="navigation">
					<button
						className={`nav-button ${activeTab === "rent" ? "active" : ""}`}
						onClick={() => setActiveTab("rent")}
					>
						Rent
					</button>
					<button
						className={`nav-button ${activeTab === "list" ? "active" : ""}`}
						onClick={() => setActiveTab("list")}
					>
						List
					</button>
				</nav>
				<div className="profile">
					<img src={profileImg} alt="Profile Icon" />
					<span>Scarlet</span>
				</div>
			</header>
			<main className="main-content">
				{activeTab === "rent" ? (
					<RentContent
						savedListings={savedListings}
						removeListing={removeListing}
					/>
				) : (
					<ListContent
            showCreateListing={showCreateListing}
            setShowCreateListing={setShowCreateListing}
          />
				)}
			</main>
		</div>
	);
};

const RentContent = ({ savedListings, removeListing }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    location: '', 
    createdAt: ''
  });

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
  };

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      console.log("Fetching user data...");
      try {
        const response = await axios.get('http://localhost:3000/users/1'); // Adjust the URL based on your API endpoint
        console.log("Response data:", response.data); // Log the response data
        setUser({
          name: response.data.name || '',
          email: response.data.email || '',
          phoneNumber: response.data.phoneNumber || '',
          location: response.data.location || '', 
          createdAt: response.data.createdAt || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('http://localhost:3000/users/1', user); // Adjust the URL based on your API endpoint
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

   // Function to format the date
   const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <section className="profile-info">
        <div className="profile-picture">
          <img src={profileImg} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>Member since {user.createdAt ? formatDate(user.createdAt) : 'Loading...'}</p>
          <div className="contact-info">
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Location: {user.location}</p>
          </div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Account Details</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </section>

      {isEditing && (
        <div className="modal">
          <form onSubmit={handleEdit}>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber || ''} // Default to empty string if undefined
                onChange={handleChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={user.location || ''} // Default to empty string if undefined
                onChange={handleChange}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}

      <section className="listings">
        <div className="tabs">
          <button className="tab active">Saved</button>
        </div>
        <div className="listings-grid">
          {savedListings.map((listing) => (
            <div key={listing.listingId} className="listing-card">
              <img src={listing.photo || placeHolderListing} alt="Listing" />
              <div className="listing-details">
                <p>{listing.title}</p>
                <p>{listing.location}</p>
                <p>${listing.priceHourly} per hour</p>
                <button
                  className="contact-button"
                  onClick={() => removeListing(listing.listingId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
	</>
);
}

/*
The isPhotoUploaded state is added to track whether the photo has been successfully uploaded.
The form submission (handleCreateListing) checks if the photo has been uploaded before proceeding.
The FileUpload component's onFileUploaded callback updates both the photo state and the isPhotoUploaded state.
The form's submit button is enabled only when all required fields are filled, including the photo URL.
*/


const ListContent = ({ showCreateListing, setShowCreateListing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [priceHourly, setPriceHourly] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState('');
  const [userId] = useState(1); // Assuming the userId is 1 for this example
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    location: '', 
    createdAt: ''
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data...");
      try {
        const response = await axios.get('http://localhost:3000/users/1'); // Adjust the URL based on your API endpoint
        console.log("Response data:", response.data); // Log the response data
        setUser({
          name: response.data.name || '',
          email: response.data.email || '',
          phoneNumber: response.data.phoneNumber || '',
          location: response.data.location || '',
          createdAt: response.data.createdAt || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenModal = () => {
    setShowCreateListing(true);
  };

  const handleCloseModal = () => {
    setShowCreateListing(false);
    setTitle('');
    setDescription('');
    setCategory('');
    setSubCategory('');
    setPriceHourly('');
    setPhoto('');
    setLocation('');
    setIsPhotoUploaded(false);
    setUploadSuccess('');
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
      availability: {} // Add a default value or modify as needed
    };

    try {
      const response = await axios.post('http://localhost:3000/listings', listingData);
      console.log('Listing created:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating listing:', error.response ? error.response.data : error.message);
    } finally {
      setIsPhotoUploaded(false);
    }
  };

  const subcategoryOptions = {
    equipment: ['Cameras', 'Lenses', 'Flashes', 'Tripods'],
    spaces: ['Indoor', 'Outdoor'],
    services: ['Photography', 'Videography']
  };

  const handleFileUploaded = (url) => {
    setPhoto(url);
    setIsPhotoUploaded(true);
    setUploadSuccess("File uploaded successfully.");
  };

  const handleUploading = (status) => {
    setIsUploading(status);
    if (status) {
      setUploadSuccess('');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <section className="profile-info">
        <div className="profile-picture">
          <img src={profileImg} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>Member since {user.createdAt ? formatDate(user.createdAt) : 'Loading...'}</p>
          <div className="contact-info">
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Location: {user.location}</p>
          </div>
          <button className="edit-button" onClick={handleOpenModal}>Edit Account Details</button>
        </div>
      </section>

      <div className='createListing'>
        <div className="create-listing-button-container">
          <button className="create-listing-button" onClick={handleOpenModal}>
            Create Listing
          </button>
        </div>
        {showCreateListing && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="listing-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="listing-modal-header">
                <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                <h2 className='modalTitle'>Create a Listing</h2>
              </div>
              <div className="modal-body">
                {uploadSuccess && <p className="upload-success-message">{uploadSuccess}</p>}
                <form onSubmit={handleCreateListing} className='centered-form'>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter a Title'
                    required
                    className='styled-input'
                  />
                  <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description'
                    required
                    className='styled-input'
                  />
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubCategory(''); // Reset subCategory when category changes
                    }}
                    required
                    className='styled-input'
                  >
                    <option value='' disabled>Select a category</option>
                    <option value='equipment'>Equipment</option>
                    <option value='services'>Services</option>
                    <option value='spaces'>Spaces</option>
                  </select>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    required
                    className='styled-input'
                    disabled={!category} // Disable subCategory if no category is selected
                  >
                    <option value='' disabled>Select a subcategory</option>
                    {category && subcategoryOptions[category]?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  <input
                    type='number'
                    value={priceHourly}
                    onChange={(e) => setPriceHourly(parseFloat(e.target.value))}
                    placeholder='Price Hourly'
                    required
                    className='styled-input'
                  />
                  <input
                    type='text'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder='Location'
                    required
                    className='styled-input'
                  />
                  <FileUpload onFileUploaded={handleFileUploaded} setIsPhotoUploaded={setIsPhotoUploaded} handleUploading={handleUploading} className='fileUpload' />
                  <button type='submit' className='create-listing-button' disabled={isUploading}>Create Listing</button>
                </form>
              </div>

            </div>
          </div>
        )}

      </div>

      <section className="listings">
        <div className="tabs">
          <button className="tab active">All</button>
        </div>
        <div className="listings-grid">
          <div className="listing-item">
          
          <div className="listing-card">
            <img src={placeHolderListing} alt="Listing" />
          
            <div className="listing-details">
              <p className="listingCardTitle">Title</p>
              <div className="paragraph">
              <p className="location">Location</p>
              <p className="price">Price</p>
              </div>
              {/* <button className="contact-button">Mark as Contacted</button> */}
            </div>
          </div>
          <div className="listing-card">
            <img src={placeHolderListing} alt="Listing" />
            <div className="listing-details">
              <p>Title</p>
              <p>Location</p>
              <p>Price</p>
              <button className="contact-button">Mark as Contacted</button>
            </div>
          </div>
          <div className="listing-card">
            <img src={placeHolderListing} alt="Listing" />
            <div className="listing-details">
              <p>Title</p>
              <p>Location</p>
              <p>Price</p>
              <button className="contact-button">Mark as Contacted</button>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
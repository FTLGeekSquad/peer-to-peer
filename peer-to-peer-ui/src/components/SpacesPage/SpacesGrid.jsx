import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Spaces from "./Spaces";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./SpacesGrid.css";
import Modal from "../GeneralModal/GeneralModal"; // Import the Modal component
import Footer from "../Footer/Footer";
import googleButton from "/src/assets/web_light_rd_SI.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";



function SpacesGrid() {
  const { userData, setUserData } = useSavedListings();
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null); // State for modal
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const dataUrl = "http://localhost:3000/listings/filter/spaces";

  useEffect(() => {
    const fetchSpaces = async () => {
      let url = dataUrl;
      try {
        if (selectedCategories.length > 0) {
          const categoryQuery = selectedCategories
            .map((category) => `subCategory=${category}`)
            .join("&");
          url += `?${categoryQuery}`;
        }
        const response = await axios.get(url);
        setSpaces(response.data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, [selectedCategories]);

  const handleToggleChange = (event, newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleItemClick = (space) => {
    setSelectedSpace(space); // Set the selected space to show in the modal
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/login";
  };

  const filteredSpaces = spaces.filter((space) =>
    space.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
		const fullStars = Math.floor(rating); // Number of full stars
		const halfStar = rating % 1 >= 0.5;  // Whether to show a half star

		return (
			<div className="star-rating">
				{[...Array(5)].map((_, index) => {
					if (index < fullStars) {
						return <FontAwesomeIcon key={index} icon={faStar} className="star filled" />;
					} else if (index === fullStars && halfStar) {
						return <FontAwesomeIcon key={index} icon={faStar} className="star half" />;
					} else {
						return <FontAwesomeIcon key={index} icon={faStar} className="star empty" />;
					}
				})}
			</div>
		);
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
              <ToggleButton value="Indoor">Indoor</ToggleButton>
              <ToggleButton value="Outdoor">Outdoor</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className="spacesGrid">
            {filteredSpaces.map((space, index) => (
              <div key={index} className="spaces-item">
                <Spaces
                  onClick={handleItemClick}
                  listing={space}
                  setShowModal={setShowModal}
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  setUserData={setUserData}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedSpace && (
        <Modal
          show={selectedSpace !== null}
          onClose={() => setSelectedSpace(null)}
        >
          <h2 className="modalHeader">{selectedSpace.title}</h2>
          <img className="modal-img" src={selectedSpace.photo} />
          <div className="modalWords">
            <div className="upperWords">
              <h2 className="lowerTitle">{selectedSpace.title}</h2>
              <p className="locationText">
                <strong>Location:</strong> {selectedSpace.location}
              </p>
            </div>
            <p>{selectedSpace.description}</p>
            <div
              className="userInfo"
              style={{ filter: isLoggedIn ? "none" : "blur(5px)" }}
            >
              {selectedSpace.user && (
                <>
                  <p>
                    <strong>Posted by:</strong> {selectedSpace.user.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedSpace.user.phoneNumber}
                  </p>
                </>
              )}
            </div>
          </div>
          {!isLoggedIn && <p>Please log in to view contact information.</p>}

                
          <div className="rating">
            {renderStars(selectedSpace.avgRating)}
           </div>
        </Modal>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-content">
          <h3>Please log in to save listings</h3>
          <img
            className="google-signin-button-icon"
            onClick={handleLogin}
            src={googleButton}
            alt="Google icon"
          />
        </div>
      </Modal>

      <Footer />
    </>
  );
}

export default SpacesGrid;

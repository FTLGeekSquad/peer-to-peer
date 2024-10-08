import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Spaces from "./Spaces";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSavedListings } from "../../contexts/SavedListingsContext";
import "./SpacesGrid.css";
import Modal from "../GeneralModal/GeneralModal";
import Footer from "../Footer/Footer";
import googleButton from "/src/assets/web_light_rd_SI.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function SpacesGrid() {
  const { userData } = useSavedListings();
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);

  const dataUrl = "https://peer-to-peer-59rz.onrender.com/listings/filter/spaces";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

  useEffect(() => {
    fetchSpaces();
  }, [selectedCategories]);

  useEffect(() => {
    if (selectedSpace && userData?.userId) {
      axios
        .get(
          `https://peer-to-peer-59rz.onrender.com/reviews/${selectedSpace.listingId}/rating/${userData.userId}`
        )
        .then((response) => {
          setUserRating(response.data.rating);
          setCurrentRating(response.data.rating);
        })
        .catch((error) => console.error("Error fetching user rating:", error));
    }
  }, [selectedSpace, userData?.userId]);

  const handleToggleChange = (event, newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleItemClick = (space) => {
    setSelectedSpace(space);
  };

  const handleLogin = () => {
    window.location.href = "https://peer-to-peer-59rz.onrender.com/auth/login";
  };

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
        await axios.put(
          `https://peer-to-peer-59rz.onrender.com/reviews/${selectedSpace.listingId}/rating/${userData.userId}`,
          { rating: currentRating }
        );
      } else {
        await axios.post("https://peer-to-peer-59rz.onrender.com/reviews", {
          userId: userData.userId,
          listingId: selectedSpace.listingId,
          rating: currentRating,
        });
      }

      await fetchSpaces();
      setUserRating(currentRating);
      setSelectedSpace((prev) => ({
        ...prev,
        avgRating: currentRating,
      }));
    } catch (error) {
      console.error("Error setting rating:", error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
  
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <FontAwesomeIcon key={index} icon={faStar} className="star filled" />;
          } else if (index === fullStars && halfStar) {
            return (
              <span key={index} className="half-star">
                <FontAwesomeIcon icon={faStar} className="star half full" />
                <FontAwesomeIcon icon={faStar} className="star half empty" />
              </span>
            );
          } else {
            return <FontAwesomeIcon key={index} icon={faStar} className="star empty" />;
          }
        })}
      </div>
    );
  };

  const filteredSpaces = spaces.filter((space) =>
    space.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  isLoggedIn={isLoggedIn}
                  setShowModal={setShowModal}
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
          <img
            className="modal-img"
            src={selectedSpace.photo}
            alt={selectedSpace.title}
          />
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
                    <strong>Contact:</strong>{" "}
                    {selectedSpace.user.phoneNumber}
                  </p>
                </>
              )}
            </div>
            {!isLoggedIn && <p>Please log in to view contact information.</p>}
          </div>
          <div className="rating">
            {renderStars(selectedSpace.avgRating)}
            {selectedSpace.avgRating !== null &&
            selectedSpace.avgRating !== undefined ? (
              <span className="rating-number">
                {selectedSpace.avgRating.toFixed(1)}
              </span>
            ) : (
              <span className="rating-number">N/A</span>
            )}
          </div>
          {isLoggedIn && (
            <div className="rating-input">
              <input
                type="number"
                value={currentRating}
                min="0"
                max="5"
                step="1.0"
                onChange={handleRatingChange}
              />
              <button onClick={handleRatingSubmit}>Submit Rating</button>
            </div>
          )}
        </Modal>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-content">
          <h3>Please log in to save listings</h3>
          <img
            src={googleButton}
            alt="Google Sign-In"
            className="google-sign-in-button"
            onClick={handleLogin}
          />
        </div>
      </Modal>

      <Footer />
    </>
  );
}

export default SpacesGrid;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Services from "./Services";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./ServicesGrid.css";
import Modal from "../GeneralModal/GeneralModal"; // Import the Modal component
import Footer from "../Footer/Footer";
import googleButton from "/src/assets/web_light_rd_SI.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ServicesGrid() {
  const { userData } = useSavedListings();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null); // State for modal
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const { saveListing } = useSavedListings(); // Use the context

  const dataUrl = "http://localhost:3000/listings/filter/services";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchServices = async () => {
    let url = dataUrl;
    try {
      if (selectedCategories.length > 0) {
        const categoryQuery = selectedCategories
          .map((category) => `subCategory=${category}`)
          .join("&");
        url += `?${categoryQuery}`;
      }
      const response = await axios.get(url);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [selectedCategories]);

  useEffect(() => {
    if (selectedService && userData?.userId) {
      axios
        .get(
          `http://localhost:3000/reviews/${selectedService.listingId}/rating/${userData.userId}`
        )
        .then((response) => {
          setUserRating(response.data.rating);
          setCurrentRating(response.data.rating);
        })
        .catch((error) => console.error("Error fetching user rating:", error));
    }
  }, [selectedService, userData?.userId]);

  const handleToggleChange = (event, newCategories) => {
    setSelectedCategories(newCategories);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleItemClick = (service) => {
    setSelectedService(service);
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/login";
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
          `http://localhost:3000/reviews/${selectedService.listingId}/rating/${userData.userId}`,
          { rating: currentRating }
        );
      } else {
        await axios.post("http://localhost:3000/reviews", {
          userId: userData.userId,
          listingId: selectedService.listingId,
          rating: currentRating,
        });
      }

      await fetchServices();
      setUserRating(currentRating);
      setSelectedService((prev) => ({
        ...prev,
        avgRating: currentRating,
      }));
    } catch (error) {
      console.error("Error setting rating:", error);
    }
  };

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
              <FontAwesomeIcon key={index} icon={faStar} className="star half" />
            );
          } else {
            return (
              <FontAwesomeIcon key={index} icon={faStar} className="star empty" />
            );
          }
        })}
      </div>
    );
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
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
              <ToggleButton value="Photography">Photography</ToggleButton>
              <ToggleButton value="Videography">Videography</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="servicesGrid">
            {filteredServices.map((service, index) => (
              <div key={index} className="services-item">
                <Services
                  onClick={handleItemClick}
                  listing={service}
                  isLoggedIn={isLoggedIn}
                  setShowModal={setShowModal}
                  onSave={saveListing} // Pass the saveListing function
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedService && (
        <Modal
          show={selectedService !== null}
          onClose={() => setSelectedService(null)}
        >
          <h2 className="modalHeader">{selectedService.title}</h2>
          <img className="modal-img" src={selectedService.photo} />
          <div className="modalWords">
            <div className="upperWords">
              <h2 className="lowerTitle">{selectedService.title}</h2>
              <p className="locationText">
                <strong>Location:</strong> {selectedService.location}
              </p>
            </div>
            <p>{selectedService.description}</p>
            <div
              className="userInfo"
              style={{ filter: isLoggedIn ? "none" : "blur(5px)" }}
            >
              {selectedService.user && (
                <>
                  <p>
                    <strong>Posted by:</strong> {selectedService.user.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedService.user.phoneNumber}
                  </p>
                </>
              )}
            </div>
          </div>
          {!isLoggedIn && <p>Please log in to view contact information.</p>}
          <div className="rating">
            {renderStars(selectedService.avgRating)}
            {selectedService.avgRating !== null &&
            selectedService.avgRating !== undefined ? (
              <span className="rating-number">
                {selectedService.avgRating.toFixed(1)}
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
                step="0.5"
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

export default ServicesGrid;

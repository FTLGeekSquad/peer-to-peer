

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

function EquipmentGrid() {
  const { userData, setUserData } = useSavedListings();
  const [equipment, setEquipment] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <img className="modal-img" src={selectedEquipment.photo} />
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
                    <strong>Contact:</strong> {selectedEquipment.user.phoneNumber}
                  </p>
                </>
              )}
            </div>
          </div>
          {!isLoggedIn && <p>Please log in to view contact information.</p>}
        </Modal>
      )}

      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
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

export default EquipmentGrid;

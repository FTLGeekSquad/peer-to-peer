import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Equipment from "./Equipment";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./EquipmentGrid.css";
import Modal from "../GeneralModal/GeneralModal"; // Import the Modal component

function EquipmentGrid() {
    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null); // State for modal
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const dataUrl = "http://localhost:3000/listings/filter/equipment";

    useEffect(() => {
        const fetchEquipment = async () => {
            let url = dataUrl; // declare the url, 
            try {
                if (selectedCategories.length > 0) {
                    const categoryQuery = selectedCategories.map(category => `subCategory=${category}`).join('&');
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
        setSelectedEquipment(equip); // Set the selected equipment to show in the modal
    };

    const filteredEquipment = equipment.filter(equip =>
        equip.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header handleSubmit={handleSearch} />
            {/* Toggle buttons with: 
                - Cameras http://localhost:3000/listings/filter/equipment?subCategory=cameras
                - Lenses lenses: http://localhost:3000/listings/filter/equipment?subCategory=lenses
                - Flash/Flash Equipment flashes: http://localhost:3000/listings/filter/equipment?subCategory=flashes
                - Tripods tripods: http://localhost:3000/listings/filter/equipment?subCategory=tripods
            */}
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
                        {/* the actual equipment listings */}
                        {filteredEquipment.map((equip, index) => (
                            <div key={index} className="equipment-item" onClick={() => handleItemClick(equip)}>
                                <Equipment
                                    equipmentId={equip.listingId}
                                    title={equip.title}
                                    category={equip.category}
                                    subCategory={equip.subCategory}
                                    location={equip.location}
                                    equipment={equip}
                                    setEquipment={setEquipment}
                                    priceHourly={equip.priceHourly}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Show modal if equipment is selected */}
            {selectedEquipment && (
                <Modal
                    show={selectedEquipment !== null}
                    onClose={() => setSelectedEquipment(null)}
                >
                    <h2>{selectedEquipment.title}</h2>
                    <p><strong>Location:</strong> {selectedEquipment.location}</p>
                    <p>{selectedEquipment.description}</p>
                </Modal>
            )}
        </>
    );
}

export default EquipmentGrid;

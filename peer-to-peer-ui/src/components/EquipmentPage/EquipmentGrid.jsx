import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Equipment from "./Equipment";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./EquipmentGrid.css";

function EquipmentGrid() {
    const [equipment, setEquipment] = useState([]); // will fill the grid with the equipment as its updated
    const [selectedCategories, setSelectedCategories] = useState([]); // sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // search bar implementation.. initially empty
    const dataUrl = "http://localhost:3000/listings/filter/equipment"; // declare the url, 
    console.log("in the equipment grid!"); // made it here lol

    useEffect(() => {
        const fetchEquipment = async () => {
            let url = "http://localhost:3000/listings/filter/equipment"; // declare the url, 
            try {
                if (selectedCategories.length > 0) {
                    const categoryQuery = selectedCategories.map(category => `subCategory=${category}`).join('&');
                    url += `?${categoryQuery}`;
                }

                const response = await axios.get(url);
                setEquipment(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, [selectedCategories]); // fetches whenever selectedCategories updates

    const handleToggleChange = (event, newCategories) => {
        setSelectedCategories(newCategories);
    };

    return (
        <>
            <Header />
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
                        {equipment.map((equip, index) => (
                            <div key={index} className="equipment-item">
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
        </>
    );
}

export default EquipmentGrid;

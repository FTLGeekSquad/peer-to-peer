import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Equipment from "./Equipment";
import "./EquipmentGrid.css";

function EquipmentGrid() {
    const [equipment, setEquipment] = useState([]); // will fill the grid with the equipment as its updated
    const [selectedCategories, setSelectedCategories] = useState([]); // sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // search bar implementation.. initially empty
    const dataUrl = "http://localhost:3000/listings/filter/equipment"; // declare the constant url, REMEMBER TO CHANGE
    console.log("in the equipment grid!"); // made it here lol

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(dataUrl, // get based on the dataUrl
                    {
                        params: {
                            categories: selectedCategories.join(','), // allows multiple selected categories to be shown
                        },
                    });
                setEquipment(response.data); // sets the equipment based on the received data
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, [selectedCategories]);

    const handleCheckboxChange = (event) => { // event handler
        const category = event.target.value; // the category is equal to the category checked
        setSelectedCategories(prevCategories => // prevCategories is the previous categories selected
            prevCategories.includes(category) // checks if prevCategories has the checked category
                ? prevCategories.filter(cat => cat !== category)
                : [...prevCategories, category]
        );
    };

    return (
        <>
            <Header />
            {/* Checkboxes with: 
                - Cameras 
                - Lenses
                - Flash/Flash Equipment
                - Tripods
            NEXT: Need to be changed to a side bar!!
            */}
            <div className="idk">
                <div className="subcategoryCheckbox">
                    <h3>SubCategories</h3>
                    <label>
                        <input
                            type="checkbox"
                            value="Cameras"
                            checked={selectedCategories.includes("Cameras")}
                            onChange={handleCheckboxChange}
                        />
                        Cameras
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Lenses"
                            checked={selectedCategories.includes("Lenses")}
                            onChange={handleCheckboxChange}
                        />
                        Lenses
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Flash/Flash Equipment"
                            checked={selectedCategories.includes("Flash/Flash Equipment")}
                            onChange={handleCheckboxChange}
                        />
                        Flash/Flash Equipment
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Tripods"
                            checked={selectedCategories.includes("Tripods")}
                            onChange={handleCheckboxChange}
                        />
                        Tripods
                    </label>
                </div>

                <div className="equipmentGrid">
                    {/* the actual equipment listings */}
                    {equipment.map((equipment, index) => (
                        <div key={index} className="equipment-item">
                            
                        
                                <Equipment
                                    equipmentId={equipment.listingId}
                                    title={equipment.title}
                                    category={equipment.category}
                                    subCategory={equipment.subCategory}
                                    location={equipment.location}
                                    equipment={equipment}
                                    setEquipment={setEquipment}
                                    priceHourly={equipment.priceHourly}
                                />
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default EquipmentGrid;

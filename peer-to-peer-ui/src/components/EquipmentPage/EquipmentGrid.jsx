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
    const dataUrl = "http://localhost:3000/listings/filter/equipment"; // declare the url, 
    console.log("in the equipment grid!"); // made it here lol

    useEffect(() => {
        const fetchEquipment = async () => {
            let dataUrl = "http://localhost:3000/listings/filter/equipment"; // declare the url, 
            try {
        
                if (selectedCategories.length > 0) {
                    const categoryQuery = selectedCategories.map(category => `subCategory=${category}`).join('&');
                    dataUrl += `?${categoryQuery}`;
                }
        
                const response = await axios.get(dataUrl);
                setEquipment(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, [selectedCategories]);//fetches whenever selectedCategories Updates




    const handleCheckboxChange = (event) => {
        const category = event.target.value;
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(cat => cat !== category)
                : [...prevCategories, category]
        );
    };
    

    return (
        <>
            <Header />
            {/* Checkboxes with: 
                - Cameras http://localhost:3000/listings/filter/equipment?subCategory=cameras
                - Lenses lenses: http://localhost:3000/listings/filter/equipment?subCategory=lenses
                - Flash/Flash Equipment flashes: http://localhost:3000/listings/filter/equipment?subCategory=flashes
                - Tripods tripods: http://localhost:3000/listings/filter/equipment?subCategory=tripods
            */}
            <div className="allComponents">
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
                            value="Flashes"
                            checked={selectedCategories.includes("Flashes")}
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

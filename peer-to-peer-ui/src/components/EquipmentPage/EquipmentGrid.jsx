import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Equipment from "./Equipment";
import "./EquipmentGrid.css";

function EquipmentGrid() {
    const [equipment, setEquipment] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const dataUrl = "http://localhost:3000/listings";

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(dataUrl, {
                    params: {
                        categories: selectedCategories.join(','),
                    },
                });
                setEquipment(response.data);
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, [selectedCategories]);

    const handleCheckboxChange = (event) => {
        const category = event.target.value;
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(cat => cat !== category)
                : [...prevCategories, category]
        );
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const filteredEquipment = equipment.filter(equip =>
        equip.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header handleSubmit={handleSearch} />
            <div className="idk">
                <div className="bottom">
                    <div className="subcategoryCheckbox">
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
                            Flashes
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
                        {filteredEquipment.map((equipment, index) => (
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
            </div>
        </>
    );
}

export default EquipmentGrid;




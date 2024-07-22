import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Spaces from "./Spaces";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Modal from "../GeneralModal/GeneralModal"; // Import the Modal component
import "./SpacesGrid.css";

function SpacesGrid() {
    const [spaces, setSpaces] = useState([]); // will fill the grid with the spaces as its updated
    const [selectedSpace, setSelectedSpace] = useState(null); // State for modal
    const [selectedCategories, setSelectedCategories] = useState([]); // sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // search bar implementation.. initially empty
    const dataUrl = "http://localhost:3000/listings/filter/spaces"; // declare the url, 
    console.log("in the spaces grid!"); // made it here lol

    useEffect(() => {
        const fetchSpaces = async () => {
            let url = dataUrl; // declare the url
            try {
                if (selectedCategories.length > 0) {
                    const categoryQuery = selectedCategories.map(category => `subCategory=${category}`).join('&');
                    url += `?${categoryQuery}`;
                }

                const response = await axios.get(url);
                setSpaces(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching spaces:", error);
            }
        };

        fetchSpaces();
    }, [selectedCategories]); // fetches whenever selectedCategories updates

    const handleToggleChange = (event, newCategories) => {
        setSelectedCategories(newCategories);
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    const handleItemClick = (space) => {
        setSelectedSpace(space); // Set the selected space to show in the modal
    };

    const filteredSpaces = spaces.filter(space =>
        space.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header handleSubmit={handleSearch} />
            {/* Toggle buttons with: 
                - Indoor http://localhost:3000/listings/filter/spaces?subCategory=indoor
                - Outdoor http://localhost:3000/listings/filter/spaces?subCategory=outdoor
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
                            <ToggleButton value="Indoor">Indoor</ToggleButton>
                            <ToggleButton value="Outdoor">Outdoor</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="spacesGrid">
                        {filteredSpaces.map((space, index) => (
                            <div key={index} className="spaces-item" onClick={() => handleItemClick(space)}>
                                <Spaces
                                    spacesId={space.listingId}
                                    title={space.title}
                                    category={space.category}
                                    subCategory={space.subCategory}
                                    location={space.location}
                                    spaces={space}
                                    setSpaces={setSpaces}
                                    priceHourly={space.priceHourly}
                                    photo={space.photo}

                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Show modal if Space is selected */}
            {selectedSpace && (
                <Modal
                    show={selectedSpace !== null}
                    onClose={() => setSelectedSpace(null)}
                >
                    <h2>{selectedSpace.title}</h2>
                    <p><strong>Location:</strong> {selectedSpace.location}</p>
                    <p>{selectedSpace.description}</p>
                </Modal>
            )}
        </>
    );
}

export default SpacesGrid;

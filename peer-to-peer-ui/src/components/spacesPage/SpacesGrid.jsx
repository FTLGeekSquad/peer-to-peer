import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Spaces from "./Spaces";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./SpacesGrid.css";

function SpacesGrid() {
    const [spaces, setSpaces] = useState([]); // will fill the grid with the spaces as its updated
    const [selectedCategories, setSelectedCategories] = useState([]); // sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // search bar implementation.. initially empty
    const dataUrl = "http://localhost:3000/listings/filter/spaces"; // declare the url, 
    console.log("in the spaces grid!"); // made it here lol

    useEffect(() => {
        const fetchSpaces = async () => {
            let url = "http://localhost:3000/listings/filter/spaces"; // declare the url, 
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

    return (
        <>
            <Header />
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
                        {spaces.map((space, index) => (
                            <div key={index} className="spaces-item">
                                <Spaces
                                    spacesId={space.listingId}
                                    title={space.title}
                                    category={space.category}
                                    subCategory={space.subCategory}
                                    location={space.location}
                                    spaces={space}
                                    setSpaces={setSpaces}
                                    priceHourly={space.priceHourly}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpacesGrid;

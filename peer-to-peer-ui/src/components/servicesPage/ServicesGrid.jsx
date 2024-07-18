import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Services from "./Services";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./ServicesGrid.css";

function ServicesGrid() {
    const [services, setServices] = useState([]); // Will fill the grid with the services as its updated
    const [selectedCategories, setSelectedCategories] = useState([]); // Category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // Search bar implementation, initially empty
    const dataUrl = "http://localhost:3000/listings/filter/services"; // Declare the URL
    console.log("in the services grid!"); // Debugging log

    useEffect(() => {
        const fetchServices = async () => {
            let url = "http://localhost:3000/listings/filter/services"; // Base URL
            try {
                if (selectedCategories.length > 0) {
                    // Construct query string for selected categories
                    const categoryQuery = selectedCategories.map(category => `subCategory=${category}`).join('&');
                    url += `?${categoryQuery}`;
                }

                console.log("Fetching data from URL:", url); // Log the URL being fetched

                const response = await axios.get(url);
                setServices(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, [selectedCategories]); // Fetches whenever selectedCategories updates

    const handleToggleChange = (event, newCategories) => {
        console.log("Selected Categories:", newCategories); // Log the updated categories
        setSelectedCategories(newCategories);
    };

    return (
        <>
            <Header />
            {/* Toggle buttons with: 
                - Photography http://localhost:3000/listings/filter/services?category=photography
                - Videography http://localhost:3000/listings/filter/services?category=videography
            */}
            <div className="allComponents">
                <div className="bottom">
                    <div className="subcategoryToggle">
                        <ToggleButtonGroup
                            value={selectedCategories}
                            onChange={handleToggleChange}
                            aria-label="category"
                            color="primary"
                            sx={{ marginBottom: 2 }}
                        >
                            <ToggleButton value="Photography">Photography</ToggleButton>
                            <ToggleButton value="Videography">Videography</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <div className="servicesGrid">
                        {services.map((service, index) => (
                            <div key={index} className="services-item">
                                <Services
                                    servicesId={service.listingId}
                                    title={service.title}
                                    category={service.category}
                                    subCatgeory={service.subCategory}
                                    location={service.location}
                                    services={service}
                                    setServices={setServices}
                                    priceHourly={service.priceHourly}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServicesGrid;

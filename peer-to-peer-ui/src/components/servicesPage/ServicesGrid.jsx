
//this serves as the page that will hold the services "card" as well as filter the services 
//Filter: videographer and photographer
//should contain a search bar
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Services from "./Services";
import "./ServicesGrid.css";

function ServicesGrid() {
    const [services, setServices] = useState([]); // will fill the grid with the services as its updated
    const [selectedCategories, setSelectedCategories] = useState([]); // sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // search bar implementation.. initially empty
    console.log("in the services grid!"); // made it here lol

    useEffect(() => {
        const fetchServices = async () => {
            let dataUrl = "http://localhost:3000/listings/filter/services"; // declare the url
            try {
                const response = await axios.get(dataUrl, {
                    params: {
                        categories: selectedCategories.join(','),
                    },
                });
                setServices(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, [selectedCategories]); // fetches whenever selectedCategories updates

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

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header handleSubmit={handleSearch} />
            {/* Filter Toggle button 
                - photographer - http://localhost:3000/listings/filter/services?subCategory=photographer
                - videographer - http://localhost:3000/listings/filter/services?subCategory=videographer
            */}
            <div className="allComponents">
                <div className="subcategoryCheckbox">
                    <label>
                        <input
                            type="checkbox"
                            value="Photographer"
                            checked={selectedCategories.includes("Photographer")}
                            onChange={handleCheckboxChange}
                        />
                        Photographer
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Videographer"
                            checked={selectedCategories.includes("Videographer")}
                            onChange={handleCheckboxChange}
                        />
                        Videographer
                    </label>
                </div>

                <div className="servicesGrid">
                    {filteredServices.map((service, index) => (
                        <div key={index} className="services-item">
                            <Services
                                servicesId={service.listingId}
                                title={service.title}
                                category={service.category}
                                subCategory={service.subCategory}
                                location={service.location}
                                services={service}
                                setServices={setServices}
                                priceHourly={service.priceHourly}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ServicesGrid;

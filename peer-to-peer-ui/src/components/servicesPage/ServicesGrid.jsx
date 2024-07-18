//this serves as the page that will hold the services "card" as well as filter the serves 
//Filter: videographer and photographer
//should contain a search bar
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
// import Services from "./Services";
import "./ServicesGrid.css";

function ServicesGrid() {

    const [services, setServices] = useState([]); // will fill the grid with the services as its updated
    const [selectedCategories, setSelectedCategories] = useState([]); // sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // search bar implementation.. initially empty
    console.log("in the services grid!"); // made it here lol

    useEffect(() => {
        const fetchServices = async () => {
            let dataUrl = "http://localhost:3000/listings/filter/services"; // declare the url, 
            try {
                //get based on the toggle button
                

                const response = await axios.get(dataUrl);
                setServices(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, [selectedCategories]);//fetches whenever selectedCategories Updates











return(
<>
<Header />
{/* Filter Toggle button 
    - videographer 
    - photographer

*/}



</>



)


}





export default ServicesGrid;

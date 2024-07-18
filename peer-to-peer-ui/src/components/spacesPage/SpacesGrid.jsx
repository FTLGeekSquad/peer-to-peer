//this serves as the page that will hold the spaces "card" as well as filter the spaces 
//Filter: indoor and outdoor
//should contain a search bar
//this serves as the page that will hold the services "card" as well as filter the serves 
//Filter: videographer and photographer
//should contain a search bar
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Spaces from "./Spaces";
import "./SpacesGrid.css";

function SpacesGrid() {

    const [spaces, setSpaces] = useState([]); // will fill the grid with the services as its updated
    const [selectedCategories, setSelectedCategories] = useState([]); // sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState(""); // search bar implementation.. initially empty
    console.log("in the spaces grid!"); // made it here lol

    useEffect(() => {
        const fetchSpaces = async () => {
            let dataUrl = "http://localhost:3000/listings/filter/spaces"; // declare the url, 
            try {
                //get based on the toggle button
                

                const response = await axios.get(dataUrl);
                setSpaces(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching spaces:", error);
            }
        };

        fetchSpaces();
    }, [selectedCategories]);//fetches whenever selectedCategories Updates










return(
<>
<Header />
{/* Filter Toggle button 
    - indoor - http://localhost:3000/listings/filter/spaces?subCategory=outdoor
    - outdoor - http://localhost:3000/listings/filter/spaces?subCategory=indoor

*/}
<div className="allComponents">



<div className= "spacesGrid"></div>
    {spaces.map((spaces, index) => (
    <div key={index} className="spaces-item">
                            
                        
        <Spaces
            spacesId={spaces.listingId}
            title={spaces.title}
            category={spaces.category}
            subCategory={spaces.subCategory}
            location={spaces.location}
            spaces={spaces}
            setSpaces={setSpaces}
            priceHourly={spaces.priceHourly}
                                />
                            
                        </div>
                    ))}
</div>





</>)}





export default SpacesGrid;

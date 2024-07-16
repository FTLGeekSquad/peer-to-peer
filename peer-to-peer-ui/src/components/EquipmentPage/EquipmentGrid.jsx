//this serves as the page that will hold the equipment "card" as well as filter the equipment 
//Filter: Cameras, Lenses, Flash/Flash Equipment, Tripods
//should contain a search bar
//refers to kudoboard
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import equipment from "./Equipment";
import axios from "axios";

function EquipmentGrid () {
    const [equipment, setEquipment] = useState([]); //will fill the grid with the equipment as its updated  
    const [selectedCategories, setSelectedCategories] = useState([]); //sub category filter, initially nothing 
    const [searchTerm, setSearchTerm] = useState("");//search bar implementation.. initially empty
    const dataUrl = "http://localhost:3000/listings/equipment"; //declare the constant url 
    console.log("in the equipment grid!") //made it here lol




    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(dataUrl, //get based on the dataUrl
                    {
                    params: {
                        categories: selectedCategories.join(','), // allows multiple selected categories to be shown
                    },
                });
                setEquipment(response.data);//sets the equipment based on the received data
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        };

        fetchEquipment();
    }, [selectedCategories]);



const handleCheckboxChange = (category) => {
    setSelectedCategories(category);
};


return(
    <>

    {/* Checkboxes with: 
        - Cameras 
        - Lenses
        - Flash/Flash Equipment
        - Tripods
    NEXT: Need to be changed to a side bar!!
    */}
    
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

    
    </>


)

}
export default EquipmentGrid;
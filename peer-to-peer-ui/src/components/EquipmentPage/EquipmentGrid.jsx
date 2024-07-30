// EquipmentGrid.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Equipment from "./Equipment";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./EquipmentGrid.css";
import Modal from "../GeneralModal/GeneralModal";

function EquipmentGrid() {
	const [equipment, setEquipment] = useState([]);
	const [selectedEquipment, setSelectedEquipment] = useState(null);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const { saveListing } = useSavedListings(); // Use the context

	const dataUrl = "https://peer-to-peer-59rz.onrender.com/listings/filter/equipment";

	useEffect(() => {
		const fetchEquipment = async () => {
			let url = dataUrl;
			try {
				if (selectedCategories.length > 0) {
					const categoryQuery = selectedCategories
						.map((category) => `subCategory=${category}`)
						.join("&");
					url += `?${categoryQuery}`;
				}
				const response = await axios.get(url);
				setEquipment(response.data);
			} catch (error) {
				console.error("Error fetching equipment:", error);
			}
		};

		fetchEquipment();
	}, [selectedCategories]);

	const handleToggleChange = (event, newCategories) => {
		setSelectedCategories(newCategories);
	};

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
	};

	const handleItemClick = (equip) => {
		setSelectedEquipment(equip);
	};

	const filteredEquipment = equipment.filter((equip) =>
		equip.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<Header handleSubmit={handleSearch} />
			{/* Toggle buttons with: 
                - Cameras https://peer-to-peer-59rz.onrender.com/listings/filter/equipment?subCategory=cameras
                - Lenses lenses: https://peer-to-peer-59rz.onrender.com/listings/filter/equipment?subCategory=lenses
                - Flash/Flash Equipment flashes: https://peer-to-peer-59rz.onrender.com/listings/filter/equipment?subCategory=flashes
                - Tripods tripods: https://peer-to-peer-59rz.onrender.com/listings/filter/equipment?subCategory=tripods
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
							<ToggleButton value="Cameras">Cameras</ToggleButton>
							<ToggleButton value="Lenses">Lenses</ToggleButton>
							<ToggleButton value="Flashes">Flash/Flash Equipment</ToggleButton>
							<ToggleButton value="Tripods">Tripods</ToggleButton>
						</ToggleButtonGroup>
					</div>

					<div className="equipmentGrid">
						{filteredEquipment.map((equip, index) => (
							<div key={index} className="equipment-item">
								<Equipment
									onClick={handleItemClick}
									listing={equip}
									onSave={saveListing} // Pass the saveListing function
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{selectedEquipment && (
				<Modal
					show={selectedEquipment !== null}
					onClose={() => setSelectedEquipment(null)}
				>
					<img className="modal-img" src={selectedEquipment.photo} />
					<h2>{selectedEquipment.title}</h2>
					<p>
						<strong>Location:</strong> {selectedEquipment.location}
					</p>
					<p>{selectedEquipment.description}</p>
				</Modal>
			)}
		</>
	);
}

export default EquipmentGrid;

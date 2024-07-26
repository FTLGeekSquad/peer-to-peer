//this serves as the page that will hold the services "card" as well as filter the services
//Filter: videographer and photographer
//should contain a search bar
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Services from "./Services";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./ServicesGrid.css";
import Modal from "../GeneralModal/GeneralModal"; // Import the Modal component

function ServicesGrid() {
	const [services, setServices] = useState([]);
	const [selectedService, setSelectedService] = useState(null); // State for modal
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const { saveListing } = useSavedListings(); // Use the context

	const dataUrl = "http://localhost:3000/listings/filter/services";

	useEffect(() => {
		const fetchServices = async () => {
			let url = dataUrl;
			try {
				if (selectedCategories.length > 0) {
					const categoryQuery = selectedCategories
						.map((category) => `subCategory=${category}`)
						.join("&");
					url += `?${categoryQuery}`;
				}
				const response = await axios.get(url);
				setServices(response.data);
			} catch (error) {
				console.error("Error fetching services:", error);
			}
		};

		fetchServices();
	}, [selectedCategories]);

	const handleToggleChange = (event, newCategories) => {
		setSelectedCategories(newCategories);
	};

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
	};

	const handleItemClick = (service) => {
		setSelectedService(service); // Set the selected service to show in the modal
	};

	const filteredServices = services.filter((service) =>
		service.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<Header handleSubmit={handleSearch} />
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
							aria-label="subcategory"
							color="primary"
							sx={{ marginBottom: 2 }}
						>
							<ToggleButton value="Photography">Photography</ToggleButton>
							<ToggleButton value="Videography">Videography</ToggleButton>
						</ToggleButtonGroup>
					</div>

					<div className="servicesGrid">
						{filteredServices.map((service, index) => (
							<div
								key={index}
								className="services-item"
								onClick={() => handleItemClick(service)}
							>
								<Services
									listing={service}
									onSave={saveListing} // Pass the saveListing function
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{selectedService && (
				<Modal
					show={selectedService !== null}
					onClose={() => setSelectedService(null)}
				>
					<img className="modal-img" src={selectedService.photo} />
					<h2>{selectedService.title}</h2>
					<p>
						<strong>Location:</strong> {selectedService.location}
					</p>
					<p>{selectedService.description}</p>
				</Modal>
			)}
		</>
	);
}

export default ServicesGrid;

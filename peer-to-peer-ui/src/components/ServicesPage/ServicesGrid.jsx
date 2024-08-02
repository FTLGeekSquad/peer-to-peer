// //this serves as the page that will hold the services "card" as well as filter the services
// //Filter: videographer and photographer
// //should contain a search bar
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../Header/Header";
// import Services from "./Services";
// import { ToggleButton, ToggleButtonGroup } from "@mui/material";
// import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
// import "./ServicesGrid.css";
// import Modal from "../GeneralModal/GeneralModal"; // Import the Modal component
// import Footer from "../Footer/Footer";
// import googleButton from "/src/assets/web_light_rd_SI.svg";


// function ServicesGrid() {
// 	const { userData, setUserData } = useSavedListings();
// 	const [services, setServices] = useState([]);
// 	const [selectedService, setSelectedService] = useState(null); // State for modal
// 	const [selectedCategories, setSelectedCategories] = useState([]);
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const { saveListing } = useSavedListings(); // Use the context
// 	const [showModal, setShowModal] = useState(false);
// 	const [isLoggedIn, setIsLoggedIn] = useState(false);


// 	const dataUrl = "http://localhost:3000/listings/filter/services";

// 	const handleLogin = () => {
// 		window.location.href = "http://localhost:3000/auth/login";
// 	  };

// 	const closeModal = () => {
// 		setShowModal(false);
// 	  };

// 	useEffect(() => {
// 		const token = localStorage.getItem("token");
// 		if (token) {
// 		  setIsLoggedIn(true);
// 		}
// 	  }, []);

// 	useEffect(() => {
// 		const fetchServices = async () => {
// 			let url = dataUrl;
// 			try {
// 				if (selectedCategories.length > 0) {
// 					const categoryQuery = selectedCategories
// 						.map((category) => `subCategory=${category}`)
// 						.join("&");
// 					url += `?${categoryQuery}`;
// 				}
// 				const response = await axios.get(url);
// 				setServices(response.data);
// 			} catch (error) {
// 				console.error("Error fetching services:", error);
// 			}
// 		};

// 		fetchServices();
// 	}, [selectedCategories]);

// 	const handleToggleChange = (event, newCategories) => {
// 		setSelectedCategories(newCategories);
// 	};

// 	const handleSearch = (searchTerm) => {
// 		setSearchTerm(searchTerm);
// 	};

// 	const handleItemClick = (service) => {
// 		setSelectedService(service); // Set the selected service to show in the modal
// 	};

// 	const filteredServices = services.filter((service) =>
// 		service.title.toLowerCase().includes(searchTerm.toLowerCase())
// 	);

// 	return (
// 		<>
// 			<Header handleSubmit={handleSearch} />
// 			{/* Toggle buttons with: 
//                 - Photography http://localhost:3000/listings/filter/services?category=photography
//                 - Videography http://localhost:3000/listings/filter/services?category=videography
//             */}
// 			<div className="allComponents">
// 				<div className="bottom">
// 					<div className="subcategoryToggle">
// 						<ToggleButtonGroup
// 							value={selectedCategories}
// 							onChange={handleToggleChange}
// 							aria-label="subcategory"
// 							color="primary"
// 							sx={{ marginBottom: 2 }}
// 						>
// 							<ToggleButton value="Photography">Photography</ToggleButton>
// 							<ToggleButton value="Videography">Videography</ToggleButton>
// 						</ToggleButtonGroup>
// 					</div>

// 					<div className="servicesGrid">
// 						{filteredServices.map((service, index) => (
// 							<div key={index} className="services-item">
// 								<Services
// 									onClick={handleItemClick}
// 									listing={service}
// 									onSave={saveListing} // Pass the saveListing function
// 									setShowModal={setShowModal}
//                   					isLoggedIn={isLoggedIn}
// 								/>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>

// 			{selectedService && (
//         <Modal
//           show={selectedService !== null}
//           onClose={() => setSelectedService(null)}
//         >
//           <h2 className="modalHeader">{selectedService.title}</h2>
//           <img className="modal-img" src={selectedService.photo} />
//           <div className="modalWords">
//             <div className="upperWords">
//               <h2 className="lowerTitle">{selectedService.title}</h2>
//               <p className="locationText">
//                 <strong>Location:</strong> {selectedService.location}
//               </p>
//             </div>
//             <p>{selectedService.description}</p>
//             <div
//               className="userInfo"
//               style={{ filter: isLoggedIn ? "none" : "blur(5px)" }}
//             >
//               {selectedService.user && (
//                 <>
//                   <p>
//                     <strong>Posted by:</strong> {selectedService.user.name}
//                   </p>
//                   <p>
//                     <strong>Contact:</strong> {selectedService.user.phoneNumber}
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//           {!isLoggedIn && <p>Please log in to view contact information.</p>}
//         </Modal>
//       )}

// 			<Modal show={showModal} onClose={closeModal}>
//         <div className="modal-content">
//           <h3>Please log in to save listings</h3>
//           <img
//             className="google-signin-button-icon"
//             onClick={handleLogin}
//             src={googleButton}
//             alt="Google icon"
//           />
//         </div>
//       </Modal>
// 			<Footer/>
// 		</>
// 	);
// }

// export default ServicesGrid;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Services from "./Services";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSavedListings } from "../../contexts/SavedListingsContext"; // Import the context
import "./ServicesGrid.css";
import Modal from "../GeneralModal/GeneralModal"; // Import the Modal component
import Footer from "../Footer/Footer";
import googleButton from "/src/assets/web_light_rd_SI.svg";

function ServicesGrid() {
	const { userData, setUserData } = useSavedListings();
	const [services, setServices] = useState([]);
	const [selectedService, setSelectedService] = useState(null); // State for modal
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const { saveListing } = useSavedListings(); // Use the context
	const [showModal, setShowModal] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const dataUrl = "http://localhost:3000/listings/filter/services";

	const handleLogin = () => {
		window.location.href = "http://localhost:3000/auth/login";
	};

	const closeModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	useEffect(() => {
		const fetchServices = async () => {
			let url = dataUrl;
			try {
				if (selectedCategories.length > 0) {
					const categoryQuery = selectedCategories
						.map((category) => `category=${category}`)
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
							<div key={index} className="services-item">
								<Services
									onClick={handleItemClick}
									listing={service}
									onSave={saveListing} // Pass the saveListing function
									setShowModal={setShowModal}
                  					isLoggedIn={isLoggedIn}
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
					<h2 className="modalHeader">{selectedService.title}</h2>
					<img className="modal-img" src={selectedService.photo} />
					<div className="modalWords">
						<div className="upperWords">
							<h2 className="lowerTitle">{selectedService.title}</h2>
							<p className="locationText">
								<strong>Location:</strong> {selectedService.location}
							</p>
						</div>
						<p>{selectedService.description}</p>
						<div
							className="userInfo"
							style={{ filter: isLoggedIn ? "none" : "blur(5px)" }}
						>
							{selectedService.user && (
								<>
									<p>
										<strong>Posted by:</strong> {selectedService.user.name}
									</p>
									<p>
										<strong>Contact:</strong> {selectedService.user.phoneNumber}
									</p>
								</>
							)}
						</div>
					</div>
					{!isLoggedIn && <p>Please log in to view contact information.</p>}
				</Modal>
			)}

			<Modal show={showModal} onClose={closeModal}>
				<div className="modal-content">
					<h3>Please log in to save listings</h3>
					<img
						className="google-signin-button-icon"
						onClick={handleLogin}
						src={googleButton}
						alt="Google icon"
					/>
				</div>
			</Modal>
			<Footer />
		</>
	);
}

export default ServicesGrid;

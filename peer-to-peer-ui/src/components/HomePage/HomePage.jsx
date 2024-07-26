import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Header from "../Header/Header";
import equipment from "/src/assets/equipment.png";
import services from "/src/assets/services.png";
import spaces from "/src/assets/spaces.png";

const HomePage = () => {
	return (
		<div className="home-page">
			<Header />
			<div className="categories">
				<Link to="/equipment" className="category-link">
					<img src={equipment} alt="Category 1" className="category-image" />
				</Link>
				<Link to="/spaces" className="category-link">
					<img src={spaces} alt="Category 2" className="category-image" />
				</Link>
				<Link to="/services" className="category-link">
					<img src={services} alt="Category 3" className="category-image" />
				</Link>
			</div>

			<div className="banner">
				<div className="text">
					<div className="banner-text">
						Break Into the Scene without Breaking the Bank
					</div>
					<div className="subtext">
						Peer to Peer Photography Rental Services
					</div>
				</div>
			</div>

			<footer className="footer">
				<div className="footer-content">
					<div className="footer-section about">
						<h3>About Us</h3>
						<p>
							We are a peer-to-peer photography rental platform, connecting
							photographers with the best equipment, spaces, and services.
						</p>
					</div>
					<div className="footer-section links">
					</div>
					<div className="footer-section contact">
						<h3>Contact Us</h3>
						<p>Email: info@peer2peer.com</p>
						<p>Phone: (123) 456-7890</p>
					</div>
				</div>
				<div className="footer-bottom">
					<p>&copy; 2024 Photography Rentals | All Rights Reserved</p>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;

// import React from "react";
// import { Link } from "react-router-dom";
// import "./HomePage.css";
// import Header from "../Header/Header";
// import equipment from "/src/assets/equipment.png";
// import services from "/src/assets/services.png";
// import spaces from "/src/assets/spaces.png";
// import FileUpload from "../FileUpload/FileUpload";

// const HomePage = () => {
// 	return (
// 		<div className="home-page">
// 			<div>
// 				<Header />
// 			</div>
// 			<div className="categories">
// 				<Link to="/equipment" className="category-link">
// 					<img src={equipment} alt="Category 1" className="category-image" />
// 				</Link>
// 				<Link to="/spaces" className="category-link">
// 					<img src={spaces} alt="Category 2" className="category-image" />
// 				</Link>
// 				<Link to="/services" className="category-link">
// 					<img src={services} alt="Category 3" className="category-image" />
// 				</Link>
// 			</div>

// 			<div className="banner">
// 				<div className="text">
// 					<div className="banner-text">
// 						Break Into the Scene without Breaking the Bank
// 					</div>
// 					<div className="subtext">
// 						Peer to Peer Photography Rental Services
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default HomePage;

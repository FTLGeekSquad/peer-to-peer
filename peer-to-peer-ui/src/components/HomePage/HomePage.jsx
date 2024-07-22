import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Header from "../Header/Header"
import equipment from "/src/assets/equipment.png";
import services from "/src/assets/services.png";
import spaces from "/src/assets/spaces.png";
import FileUpload from "../FileUpload/FileUpload";

const HomePage = () => {
	return (
		<div className="home-page">
			<div>
				<Header />
			</div>
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
		</div>
	);
};

export default HomePage;
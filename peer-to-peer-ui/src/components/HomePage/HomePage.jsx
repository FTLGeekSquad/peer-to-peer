import React from "react";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./HomePage.css";
import HeaderHomePage from "../HeaderHomePage/HeaderHomePage";
import equipment from "/src/assets/equipment.png";
import services from "/src/assets/services.png";
import spaces from "/src/assets/spaces.png";
import roxanapfp from "/src/assets/RoxanaPfp.png";
import sydneypfp from "/src/assets/SydneyPfp.jpg";
import jazzlynpfp from "/src/assets/JazzPfp.jpg";

const HomePage = () => {
	return (
		<div className="home-page">
			<HeaderHomePage />
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
						<h3>Meet the Creators</h3>
						<div className="creators">
							<div className="creator-card">
								<img src={roxanapfp} alt="Roxana" className="creator-photo" />
								<h4>Roxana</h4>
								<div className="social-icons">
									<a
										href="https://www.linkedin.com/in/roxanacruzlopez/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<LinkedInIcon fontSize="large" />
									</a>
									<a
										href="https://github.com/RoxanaCruz"
										target="_blank"
										rel="noopener noreferrer"
									>
										<GitHubIcon fontSize="large" />
									</a>
								</div>
								<p className="description">
									CS & ECE @Cal State LA | Looking to learn, apply, and create
								</p>
							</div>
							<div className="creator-card">
								<img src={sydneypfp} alt="Sydney" className="creator-photo" />
								<h4>Sydney</h4>
								<div className="social-icons">
									<a
										href="https://www.linkedin.com/in/sydneybrown224"
										target="_blank"
										rel="noopener noreferrer"
									>
										<LinkedInIcon fontSize="large" />
									</a>
									<a
										href="https://github.com/scbrown-224"
										target="_blank"
										rel="noopener noreferrer"
									>
										<GitHubIcon fontSize="large" />
									</a>
								</div>
								<p className="description">
									Computer & Cognitive Science @Vanderbilt | hope to discover
									spaces where my computer science skills can help solve human
									rights issues
								</p>
							</div>
							<div className="creator-card">
								<img src={jazzlynpfp} alt="Jazzlyn" className="creator-photo" />
								<h4>Jazzlyn</h4>
								<div className="social-icons">
									<a
										href="https://www.linkedin.com/in/jazlyn-jones"
										target="_blank"
										rel="noopener noreferrer"
									>
										<LinkedInIcon fontSize="large" />
									</a>
									<a
										href="https://github.com/JazlynJ1212"
										target="_blank"
										rel="noopener noreferrer"
									>
										<GitHubIcon fontSize="large" />
									</a>
								</div>
								<p className="description">
									CS @Spelman | passionate about sustainability and learning
									about technology
								</p>
							</div>
						</div>
					</div>
					<div className="footer-section contact">
						<h3>Contact Us</h3>
						<p>Email: info@peer2peer.com</p>
						<p>Phone: (123) 456-7890</p>
					</div>
				</div>
				<div className="footer-bottom">
					<p>&copy; 2024 Peer2Peer | All Rights Reserved</p>
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

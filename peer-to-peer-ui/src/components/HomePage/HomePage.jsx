import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./HomePage.css";
import HeaderHomePage from "../HeaderHomePage/HeaderHomePage";
import equipment from "/src/assets/equipment.png";
import services from "/src/assets/services.png";
import spaces from "/src/assets/spaces.png";
import axios from "axios";
import { SavedListingsProvider, useSavedListings } from "../../contexts/SavedListingsContext.jsx"; //import the context



const HomePage = () => {
//user useState
//const { userId, setUserId} = useSavedListings();
const {userInfo, setUserInfo, userData, setUserData} = useSavedListings();
// const [listings, setListings] = useState(null);
const [loading, setLoading] = useState(null);
// const [savedListings, setSavedListings] = useState([]);
const [error, setError] = useState(null);
// const [user, setUser] = useState({
// 	name: "",
// 	email: "",
// 	phoneNumber: "",
// 	location: "",
// 	createdAt: "",
// 	userId: 0,
// });
	//Get the user info using the token -> set the userId in the COntext.
	const token = localStorage.getItem("token");
	// get the user from the token and get the user info from the DB using the backend
	useEffect(() => {
		console.log(token)
		if (token) {
			// setToken(localStorage.getItem("token"))
			setUserInfo(jwtDecode(token));
		}
	}, []);
    //combines it into one user effect for data population
	
    useEffect(() => {

		console.log(userInfo)
        if (userInfo) {
			
            const fetchUserData = async () => {
                console.log("Fetching user data...");
                try {
                    const response = await axios.get(
                        `http://localhost:3000/users/email/${userInfo.email}`
                    );
                    console.log("Response data:", response.data);
                    const user = {
                        name: response.data.name || "",
                        email: response.data.email || "",
                        phoneNumber: response.data.phoneNumber || "",
                        location: response.data.location || "",
                        createdAt: response.data.createdAt || "",
                        userId: response.data.userId,
						listings: response.data.allListings,
						savedListings: response.data.savedListings
                    };
                    setUserData(user);
					console.log("Use Data from fetch:",user)
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    console.error("Error fetching user data:", error);
                }
            };
    
            fetchUserData();
        }
    }, [userInfo]);
    


	// The context will have the userID- all the components will thenhave the userID
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

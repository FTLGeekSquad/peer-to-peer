import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const SavedListingsContext = createContext();

export const useSavedListings = () => {
  return useContext(SavedListingsContext);
};

export const SavedListingsProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token");
	// get the user from the token and get the user info from the DB using the backend
	useEffect(() => {
		if (token) {
			// setToken(localStorage.getItem("token"))
			setUserInfo(jwtDecode(token));
		}
	}, []);
    //combines it into one user effect for data population
	
    useEffect(() => {

        if (userInfo) {
			
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(
                        `http://peer-to-peer-59rz.onrender.com/users/email/${userInfo.email}`
                    );
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
					// localStorage.setItem("userData", user)
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    console.error("Error fetching user data:", error);
                }
            };
    
            fetchUserData();
        }
    }, [userInfo]);

  return (
    <SavedListingsContext.Provider value={{ userInfo, setUserInfo, userData, setUserData }}>
      {children}
    </SavedListingsContext.Provider>
  );
};


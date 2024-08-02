// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// const SavedListingsContext = createContext();

// export const useSavedListings = () => useContext(SavedListingsContext);

// export const SavedListingsProvider = ({ children, userId }) => {
// 	console.log("userId in cintext is:",userId )
	
// 	const [savedListings, setSavedListings] = useState([]);
// //useState for user
// //const [userId, setUserId] = useState(null);

// 	return (
// 		<SavedListingsContext.Provider
// 			value={{ savedListings, saveListing, removeListing, userId }}
// 		>
// 			{children}
// 		</SavedListingsContext.Provider>
// 	);
// };


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
					// localStorage.setItem("userData", user)
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

  return (
    <SavedListingsContext.Provider value={{ userInfo, setUserInfo, userData, setUserData }}>
      {children}
    </SavedListingsContext.Provider>
  );
};


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


import React, { createContext, useState, useContext } from "react";

const SavedListingsContext = createContext();

export const useSavedListings = () => {
  return useContext(SavedListingsContext);
};

export const SavedListingsProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <SavedListingsContext.Provider value={{ userInfo, setUserInfo, userData, setUserData }}>
      {children}
    </SavedListingsContext.Provider>
  );
};


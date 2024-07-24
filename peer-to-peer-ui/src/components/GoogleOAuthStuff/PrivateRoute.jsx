import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {

  const isValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      
      // Check name field for validity
      if (!decodedToken.name) {
        return false;
      }

      // Check exp field for expiry
      const expirationTime = decodedToken.exp; // his is the exp field
      const now = Math.floor(Date.now() / 1000); // Current time in seconds

      if (expirationTime < now) {
        console.log("invalid token!");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  return isValid() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

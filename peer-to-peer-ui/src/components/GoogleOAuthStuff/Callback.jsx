import React, { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("Token from URL:", token); // Debugging log

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored in localStorage"); // Debugging log
      window.location.href = "/dashboard"; // Directly change the window location
    } else {
      console.log("No token found, redirecting to login"); // Debugging log
      window.location.href = "/login"; // Directly change the window location
    }
  }, []);

  return <div>Loading...</div>;
};

export default Callback;

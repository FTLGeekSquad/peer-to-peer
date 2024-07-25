// import React, { useEffect } from "react";
// import queryString from "query-string";
// import { useNavigate } from "react-router-dom";

// const Callback = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = queryString.parse(window.location.search);
//     const token = urlParams.token;
//     console.log("Token from URL:", token); // Debugging log

//     if (token) {
//       localStorage.setItem("token", token);
//       console.log("Token stored in localStorage"); // Debugging log
//       navigate("/dashboard"); // Directly change the window location
   
//     } else {
//       console.log("No token found, redirecting to login"); // Debugging log
//       navigate("/login"); // Directly change the window location

//     }
//   }, []);
// }
// export default Callback;


// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Callback = () => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');
//     console.log("Token from URL:", token); // Debugging log

//     if (token) {
//       localStorage.setItem("token", token);
//       console.log("Token stored in localStorage"); // Debugging log
//       navigate("/dashboard"); // Directly change the window location
//     } else {
//       console.log("No token found, redirecting to login"); // Debugging log
//       navigate("/login"); // Directly change the window location
//     }
//   }, []);

//   return <div>Loading...</div>;
// };

// export default Callback;

import React, { useEffect } from "react";
import queryString from "query-string";

const Callback = () => {

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const token = urlParams.token;
    console.log("Token from URL:", token); // Debugging log

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored in localStorage"); // Debugging log
      window.location.href = "/home"; // Directly change the window location
    } else {
      console.log("No token found, redirecting to login"); // Debugging log
      window.location.href = "/home"; // Directly change the window location
    }
  }, []);

  return <div>Loading...</div>;
};

export default Callback;
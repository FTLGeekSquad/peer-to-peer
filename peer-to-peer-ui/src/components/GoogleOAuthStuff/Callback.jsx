import React, { useEffect } from "react";
import queryString from "query-string";

const Callback = () => {

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const token = urlParams.token;

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/home"; // Directly change the window location
    } else {
      window.location.href = "/home"; // Directly change the window location
    }
  }, []);

  return <div>Loading...</div>;
};

export default Callback;
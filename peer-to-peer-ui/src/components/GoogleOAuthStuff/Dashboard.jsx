import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getResource = async () => {
    const resp = await axios.get("http://localhost:3000/auth/protected_route", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setUserInfo(resp.data.user.name);
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={getResource}>Get Resource</button> 
      <div>User name: {userInfo}</div>    
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Dashboard;
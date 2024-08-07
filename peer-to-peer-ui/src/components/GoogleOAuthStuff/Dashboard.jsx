import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  const getResource = async () => {
    const resp = await axios.get("https://peer-to-peer-59rz.onrender.com/protected_route", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setUserInfo(resp.data.user.name);
    setUserInfo(resp.data.user.location);

  }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={getResource}>Get Resource</button> 
      <div>User name: {userInfo}</div>    
      <button className='logout' onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Dashboard;
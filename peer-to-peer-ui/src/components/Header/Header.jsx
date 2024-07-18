import React from "react";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import logo from "/src/assets/logo.png";
import profileImg from "/src/assets/profile.png";
import { Link } from "react-router-dom";

const Header = ({ handleSubmit }) => {
    return (
        <div>
            <h1 className="bigTitle">Peer2Peer</h1>
            <header className="header">
                <Link to="/home">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <div className='headerBottom'>
                    <SearchBar handleSubmit={handleSubmit} />
                    <NavBar />
                </div>
                <Link to="/profile">
                    <img src={profileImg} style={{ height: "50px" }} />
                </Link>
            </header>
        </div>
    );
};

export default Header;

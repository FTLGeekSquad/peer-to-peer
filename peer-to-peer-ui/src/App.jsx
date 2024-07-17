import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	BrowserRouter,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

const Equipment = () => <div>Equipment Page</div>;
const Spaces = () => <div>Spaces Page</div>;
const Services = () => <div>Services Page</div>;
const Home = () => <div>Home Page</div>;

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/equipment" element={Equipment} />
				<Route path="/spaces" element={Spaces} />
				<Route path="/services" element={Services} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

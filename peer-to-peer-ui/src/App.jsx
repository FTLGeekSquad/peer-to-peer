import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css'
import HomePage from './components/HomePage/HomePage'
import Header from './components/Header/Header';
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ServicesGrid from './components/ServicesPage/ServicesGrid';
import SpacesGrid from './components/SpacesPage/SpacesGrid';
import EquipmentGrid from './components/EquipmentPage/EquipmentGrid';



const Equipment = () => <div>Equipment Page</div>;
const Spaces = () => <div>Spaces Page</div>;
const Services = () => <div>Services Page</div>;
const Home = () => <div>Home Page</div>;

function App() {
	

	return (
	<Router> 
    {/* <To be displayed on every page*/}

		<Routes>
			<Route path="/" element={<HomePage />} /> 
			<Route path="/home" element={<HomePage />} />
			<Route path="/equipment" element={<EquipmentGrid />} />
			<Route path="/spaces" element={<SpacesGrid/>} />
			<Route path="/services" element={<ServicesGrid/>} />
			<Route path="/profile" element={<ProfilePage />} />
		</Routes>
	</Router>
	);
}

export default App;

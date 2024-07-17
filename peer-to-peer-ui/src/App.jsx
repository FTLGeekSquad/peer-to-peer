import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './App.css'
import HomePage from './components/HomePage/HomePage'
import EquipmentGrid from './components/EquipmentPage/EquipmentGrid';
import Header from './components/Header/Header';


const Equipment = () => <div>Equipment Page</div>;
const Spaces = () => <div>Spaces Page</div>;
const Services = () => <div>Services Page</div>;
const Home = () => <div>Home Page</div>

function App() {
  return (
    <Router> 
    {/* <To be displayed on every page*/}
   
    <Routes>
      <Route path="/" element={<HomePage />} /> 
      <Route path="/home" element={<HomePage />} />
      <Route path="/equipment" element={<EquipmentGrid />} />
      <Route path="/spaces" element={Spaces} />
      <Route path="/services" element={Services} />

    </Routes>
    </Router>
    
  );
}

export default App;



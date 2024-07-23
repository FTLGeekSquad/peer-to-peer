import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage/HomePage';
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ServicesGrid from './components/ServicesPage/ServicesGrid';
import SpacesGrid from './components/SpacesPage/SpacesGrid';
import EquipmentGrid from './components/EquipmentPage/EquipmentGrid';
import { SavedListingsProvider } from './contexts/SavedListingsContext'; // Import the context provider
import './App.css';

function App() {
  return (
    <SavedListingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/equipment" element={<EquipmentGrid />} />
          <Route path="/spaces" element={<SpacesGrid />} />
          <Route path="/services" element={<ServicesGrid />} />
          <Route path="/profile" element={<ProfilePage />} />

		
        	<Route path="/callback" element={<Callback />} />
			<Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
		<Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </SavedListingsProvider>
  );
}

export default App;



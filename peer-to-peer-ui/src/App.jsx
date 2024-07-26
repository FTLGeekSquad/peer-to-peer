import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header/Header";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ServicesGrid from "./components/ServicesPage/ServicesGrid";
import SpacesGrid from "./components/SpacesPage/SpacesGrid";
import EquipmentGrid from "./components/EquipmentPage/EquipmentGrid";
import Login from "./components/GoogleOAuthStuff/Login";
import Dashboard from "./components/GoogleOAuthStuff/Dashboard";
import PrivateRoute from "./components/GoogleOAuthStuff/PrivateRoute";
import Callback from "./components/GoogleOAuthStuff/Callback";
import { SavedListingsProvider } from "./contexts/SavedListingsContext"; // Import the context provider

function App() {
	return (
		<SavedListingsProvider>
			<Router>
				{/* <To be displayed on every page*/}

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/equipment" element={<EquipmentGrid />} />
					<Route path="/spaces" element={<SpacesGrid />} />
					<Route path="/services" element={<ServicesGrid />} />
					{/* <Route path="/profile" element={<ProfilePage />} /> */}
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<ProfilePage />
							</PrivateRoute>
						}
					/>

					<Route path="/callback" element={<Callback />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>

					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
		</SavedListingsProvider>
	);
}
export default App;

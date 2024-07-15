import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

const Equipment = () => <div>Equipment Page</div>;
const Spaces = () => <div>Spaces Page</div>;
const Services = () => <div>Services Page</div>;
const Home = () => <div>Home Page</div>

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/equipment" component={Equipment} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/services" component={Services} />
        <Route path="/home" component={Home} />
      </Routes>
    </Router>
  );
}

export default App;



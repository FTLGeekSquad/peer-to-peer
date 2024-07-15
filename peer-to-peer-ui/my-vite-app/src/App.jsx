import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar/navBar';

const Equipment = () => <div>Equipment Page</div>;
const Spaces = () => <div>Spaces Page</div>;
const Services = () => <div>Services Page</div>;

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/equipment" component={Equipment} />
        <Route path="/spaces" component={Spaces} />
        <Route path="/services" component={Services} />
      </Switch>
    </Router>
  );
}

export default App;



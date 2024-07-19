// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';

// const NavBar = () => {
//   return (
//     <nav className="navbar">
//       <ul className="nav-links">
//       <li>
//           <Link to="/home">Home</Link>
//         </li>
//         <li>
//           <Link to="/equipment">Equipment</Link>
//         </li>
//         <li>
//           <Link to="/spaces">Spaces</Link>
//         </li>
//         <li>
//           <Link to="/services">Services</Link>
//         </li>
        
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className={isActive('/home') ? 'active-link' : ''}>
          <Link to="/home">Home</Link>
        </li>
        <li className={isActive('/equipment') ? 'active-link' : ''}>
          <Link to="/equipment">Equipment</Link>
        </li>
        <li className={isActive('/spaces') ? 'active-link' : ''}>
          <Link to="/spaces">Spaces</Link>
        </li>
        <li className={isActive('/services') ? 'active-link' : ''}>
          <Link to="/services">Services</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;






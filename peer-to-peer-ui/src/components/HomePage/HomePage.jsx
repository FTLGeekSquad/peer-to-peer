// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import "./HomePage.css";
// import HeaderHomePage from "../HeaderHomePage/HeaderHomePage";
// import equipment from "/src/assets/equipment.png";
// import services from "/src/assets/services.png";
// import spaces from "/src/assets/spaces.png";
// import roxanapfp from "/src/assets/RoxanaPfp.png";
// import sydneypfp from "/src/assets/SydneyPfp.jpg";
// import jazzlynpfp from "/src/assets/JazzPfp.jpg";
// import Footer from "../Footer/Footer";

// const HomePage = () => {
//     useEffect(() => {
//         const handleScroll = () => {
//             const footer = document.querySelector('.footer-home');
//             const footerPosition = footer.getBoundingClientRect().top;
//             const windowHeight = window.innerHeight;

//             if (footerPosition < windowHeight) {
//                 footer.classList.add('in-view');
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         handleScroll(); // Check scroll position on initial load

//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <div className="home-page">
//             <HeaderHomePage />
//             <div className="categories">
//                 <Link to="/equipment" className="category-link">
//                     <img src={equipment} alt="Category 1" className="category-image" />
//                 </Link>
//                 <Link to="/spaces" className="category-link">
//                     <img src={spaces} alt="Category 2" className="category-image" />
//                 </Link>
//                 <Link to="/services" className="category-link">
//                     <img src={services} alt="Category 3" className="category-image" />
//                 </Link>
//             </div>

//             <div className="banner">
//                 <div className="text">
//                     <div className="banner-text">
//                         Break Into the Scene without Breaking the Bank
//                     </div>
//                     <div className="subtext">
//                         Peer to Peer Photography Rental Services
//                     </div>
//                 </div>

//                 <div className="website-description">
//                     <h2>Welcome to Peer2Peer</h2>
//                     <p>
//                         Discover a unique platform that connects photographers with an array of rental
//                         options including top-notch equipment, versatile spaces, and specialized services.
//                         Whether you’re an amateur or a professional, find everything you need to elevate your
//                         photography experience. Join our community and access affordable resources while
//                         contributing to a collaborative network of creatives.
//                     </p>
//                 </div>
//             </div>

//             <footer className="footer-home">
//                 <div className="footer-content">
//                     <div className="footer-section about">
//                         <h3>About Us</h3>
//                         <p>
//                             We are a peer-to-peer photography rental platform, connecting
//                             photographers with the best equipment, spaces, and services.
//                         </p>
//                     </div>
//                     <div className="footer-section links">
//                         <h3>Meet the Creators</h3>
//                         <div className="creators">
//                             <div className="creator-card">
//                                 <img src={roxanapfp} alt="Roxana" className="creator-photo" />
//                                 <h4>Roxana</h4>
//                                 <div className="social-icons">
//                                     <a
//                                         href="https://www.linkedin.com/in/roxanacruzlopez/"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <LinkedInIcon
//                                             fontSize="large"
//                                             style={{ color: "#0e76a8" }}
//                                         />
//                                     </a>
//                                     <a
//                                         href="https://github.com/RoxanaCruz"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <GitHubIcon fontSize="large" style={{ color: "#333" }} />
//                                     </a>
//                                 </div>
//                                 <p className="description">
//                                     CS & ECE @Cal State LA | Looking to learn, apply, and create
//                                 </p>
//                             </div>
//                             <div className="creator-card">
//                                 <img src={sydneypfp} alt="Sydney" className="creator-photo" />
//                                 <h4>Sydney</h4>
//                                 <div className="social-icons">
//                                     <a
//                                         href="https://www.linkedin.com/in/sydneybrown224"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <LinkedInIcon
//                                             fontSize="large"
//                                             style={{ color: "#0e76a8" }}
//                                         />
//                                     </a>
//                                     <a
//                                         href="https://github.com/scbrown-224"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <GitHubIcon fontSize="large" style={{ color: "#333" }} />
//                                     </a>
//                                 </div>
//                                 <p className="description">
//                                     CS & Cog Studies @Vanderbilt | interested in the how technology and society impact each other
//                                 </p>
//                             </div>
//                             <div className="creator-card">
//                                 <img src={jazzlynpfp} alt="Jazzlyn" className="creator-photo" />
//                                 <h4>Jazzlyn</h4>
//                                 <div className="social-icons">
//                                     <a
//                                         href="https://www.linkedin.com/in/jazlyn-jones"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <LinkedInIcon
//                                             fontSize="large"
//                                             style={{ color: "#0e76a8" }}
//                                         />
//                                     </a>
//                                     <a
//                                         href="https://github.com/JazlynJ1212"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <GitHubIcon fontSize="large" style={{ color: "#333" }} />
//                                     </a>
//                                 </div>
//                                 <p className="description">
//                                     CS @Spelman | passionate about sustainability and learning
//                                     about technology
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="footer-section contact">
//                         <h3>Contact Us</h3>
//                         <p>Email: info@peer2peer.com</p>
//                         <p>Phone: (123) 456-7890</p>
//                     </div>
//                 </div>
                
//                 <Footer />
//             </footer>
//         </div>
//     );
// };

// export default HomePage;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./HomePage.css";
import HeaderHomePage from "../HeaderHomePage/HeaderHomePage";
import equipment from "/src/assets/equipment.png";
import services from "/src/assets/services.png";
import spaces from "/src/assets/spaces.png";
import roxanapfp from "/src/assets/RoxanaPfp.png";
import sydneypfp from "/src/assets/SydneyPfp.jpg";
import jazzlynpfp from "/src/assets/JazzPfp.jpg";
import Footer from "../Footer/Footer";

const HomePage = () => {
    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('.footer-home');
            const footerPosition = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (footerPosition < windowHeight - 50) { // Add a small offset to trigger earlier
                footer.classList.add('in-view');
            } else {
                footer.classList.remove('in-view');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check scroll position on initial load

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-page">
            <HeaderHomePage />
            <div className="categories">
                <Link to="/equipment" className="category-link">
                    <img src={equipment} alt="Category 1" className="category-image" />
                </Link>
                <Link to="/spaces" className="category-link">
                    <img src={spaces} alt="Category 2" className="category-image" />
                </Link>
                <Link to="/services" className="category-link">
                    <img src={services} alt="Category 3" className="category-image" />
                </Link>
            </div>

            <div className="banner">
                <div className="text">
                    <div className="banner-text">
                        Break Into the Scene without Breaking the Bank
                    </div>
                    <div className="subtext">
                        Peer to Peer Photography Rental Services
                    </div>
                </div>

                <div className="website-description">
                    <h2>Welcome to Peer2Peer</h2>
                    <p>
                        Discover a unique platform that connects photographers with an array of rental
                        options including top-notch equipment, versatile spaces, and specialized services.
                        Whether you’re an amateur or a professional, find everything you need to elevate your
                        photography experience. Join our community and access affordable resources while
                        contributing to a collaborative network of creatives.
                    </p>
                </div>
            </div>

            <footer className="footer-home">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>About Us</h3>
                        <p>
                            We are a peer-to-peer photography rental platform, connecting
                            photographers with the best equipment, spaces, and services.
                        </p>
                    </div>
                    <div className="footer-section links">
                        <h3>Meet the Creators</h3>
                        <div className="creators">
                            <div className="creator-card">
                                <img src={roxanapfp} alt="Roxana" className="creator-photo" />
                                <h4>Roxana</h4>
                                <div className="social-icons">
                                    <a
                                        href="https://www.linkedin.com/in/roxanacruzlopez/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LinkedInIcon
                                            fontSize="large"
                                            style={{ color: "#0e76a8" }}
                                        />
                                    </a>
                                    <a
                                        href="https://github.com/RoxanaCruz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GitHubIcon fontSize="large" style={{ color: "#333" }} />
                                    </a>
                                </div>
                                <p className="description">
                                    CS & ECE @Cal State LA | Looking to learn, apply, and create
                                </p>
                            </div>
                            <div className="creator-card">
                                <img src={sydneypfp} alt="Sydney" className="creator-photo" />
                                <h4>Sydney</h4>
                                <div className="social-icons">
                                    <a
                                        href="https://www.linkedin.com/in/sydneybrown224"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LinkedInIcon
                                            fontSize="large"
                                            style={{ color: "#0e76a8" }}
                                        />
                                    </a>
                                    <a
                                        href="https://github.com/scbrown-224"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GitHubIcon fontSize="large" style={{ color: "#333" }} />
                                    </a>
                                </div>
                                <p className="description">
                                    CS & Cog Studies @Vanderbilt | interested in the how technology and society impact each other
                                </p>
                            </div>
                            <div className="creator-card">
                                <img src={jazzlynpfp} alt="Jazzlyn" className="creator-photo" />
                                <h4>Jazlyn</h4>
                                <div className="social-icons">
                                    <a
                                        href="https://www.linkedin.com/in/jazlyn-jones"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LinkedInIcon
                                            fontSize="large"
                                            style={{ color: "#0e76a8" }}
                                        />
                                    </a>
                                    <a
                                        href="https://github.com/JazlynJ1212"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GitHubIcon fontSize="large" style={{ color: "#333" }} />
                                    </a>
                                </div>
                                <p className="description">
                                    CS @Spelman | passionate about sustainability and learning
                                    about technology
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-section contact">
                        <h3>Contact Us</h3>
                        <p>Email: info@peer2peer.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                
                <Footer />
            </footer>
        </div>
    );
};

export default HomePage;

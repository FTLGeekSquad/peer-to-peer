import React from 'react';
import Header from '../Header/Header'
import { Link } from 'react-router-dom';
import './HomePage.css'
import equipment from '/Users/sydney.brown/peer-to-peer/peer-to-peer-ui/my-vite-app/src/assets/equipment.png'
import services from '/Users/sydney.brown/peer-to-peer/peer-to-peer-ui/my-vite-app/src/assets/services.png'
import spaces from '/Users/sydney.brown/peer-to-peer/peer-to-peer-ui/my-vite-app/src/assets/spaces.png'
import banner from '/Users/sydney.brown/peer-to-peer/peer-to-peer-ui/my-vite-app/src/assets/banner.png'

const HomePage = () => {
    return (
        <div className='home-page'>
            <div><Header/></div>
            <div className='categories'>
                <Link to='/equipment' className='category-link'>
                    <img src={equipment} alt='Category 1' className='category-image' />
                </Link>
                <Link to='/spaces' className='category-link'>
                    <img src={spaces} alt='Category 2' className='category-image' />
                </Link>
                <Link to='/services' className='category-link'>
                    <img src={services} alt='Category 3' className='category-image' />
                </Link>
            </div>
            {/* <div className='banner'>
                <img src={banner} alt='Banner' className='banner-image' />
                <div className='text'>
                <div className='banner-text'>
                    Break Into the Scene without Breaking the Bank
                </div>
                <div className='subtext'>
                    Peer to Peer Photography Rental Services
                </div>
                </div>
            </div> */}
            <div className="banner">
                <div className="text">
                    <div className="banner-text">
                        Break Into the Scene without Breaking the Bank
                    </div>
                    <div className="subtext">
                        Peer to Peer Photography Rental Services
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage;
// import React, { useState } from 'react';
// import './ProfilePage.css';
// import logo from '../../assets/logo.png';
// import profileImg from '../../assets/profile.png';
// import placeHolderListing from '../../assets/placeholderListing.png';
// import { Link } from "react-router-dom";
// import Modal from '../GeneralModal/GeneralModal'; 
// import axios from 'axios';

// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('rent');
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
//   const [showCreateListing, setShowCreateListing] = useState(false);

//   return (
//     <div className="profile-page">
//       <header className="header">
//         <Link to="/home">
//           <img src={logo} alt="Logo" className="pLogo" />
//         </Link>
//         <nav className="navigation">
//           <button
//             className={`nav-button ${activeTab === 'rent' ? 'active' : ''}`}
//             onClick={() => setActiveTab('rent')}
//           >
//             Rent
//           </button>
//           <button
//             className={`nav-button ${activeTab === 'list' ? 'active' : ''}`}
//             onClick={() => setActiveTab('list')}
//           >
//             List
//           </button>
//         </nav>
//         <div className="profile">
//           <img src={profileImg} alt="Profile Icon" />
//           <span>Scarlet</span>
//         </div>
//       </header>
//       <main className="main-content">
//         {activeTab === 'rent' ? (
//           <RentContent />
//         ) : (
//           <ListContent
//             selectedEquipment={selectedEquipment}
//             setSelectedEquipment={setSelectedEquipment}
//             showCreateListing={showCreateListing}
//             setShowCreateListing={setShowCreateListing}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// const RentContent = () => (
//   <>
//     <section className="profile-info">
//       <div className="profile-picture">
//         <img src={profileImg} alt="Profile" />
//       </div>
//       <div className="profile-details">
//         <h2>First Last</h2>
//         <p>Member since ...</p>
//         <div className="contact-info">
//           <p>Email</p>
//           <p>Phone Number</p>
//           <p>Location</p>
//         </div>
//         <button className="edit-button">Edit Account Details</button>
//       </div>
//     </section>
//     <section className="listings">
//       <div className="tabs">
//         <button className="tab active">Saved</button>
//       </div>
//       <div className="listings-grid">
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//         <div className="listing-card">
//           <img src={placeHolderListing} alt="Listing" />
//           <div className="listing-details">
//             <p>Title</p>
//             <p>Location</p>
//             <p>Price</p>
//             <button className="contact-button">Mark as Contacted</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   </>
// );

// const ListContent = ({ selectedEquipment, setSelectedEquipment, showCreateListing, setShowCreateListing }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [location, setLocation] = useState('');

//   const handleCreateListing = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/listings', {
//         title,
//         description,
//         category,
//         price,
//         location,
//       });

//       console.log('Listing created:', response.data);
//       // Optionally, reset the form or close the modal after successful submission
//       setTitle('');
//       setDescription('');
//       setCategory('');
//       setPrice('');
//       setLocation('');
//       setShowCreateListing(false);
//     } catch (error) {
//       console.error('Error creating listing:', error);
//     }
//   };

//   return (
//     <>
//       <section className="profile-info">
//         <div className="profile-picture">
//           <img src={profileImg} alt="Profile" />
//         </div>
//         <div className="profile-details">
//           <h2>First Last</h2>
//           <p>Member since ...</p>
//           <div className="contact-info">
//             <p>Email</p>
//             <p>Phone Number</p>
//             <p>Location</p>
//           </div>
//           <button className="edit-button">Edit Account Details</button>
//         </div>
//       </section>

//       <div className='createListing'>
//         <button onClick={() => setShowCreateListing(true)}>Create Listing</button>
//         {showCreateListing && (
//           <Modal show={showCreateListing} onClose={() => setShowCreateListing(false)}>
//             <h2>Create New Listing</h2>
//             <form onSubmit={handleCreateListing}>
//               <div>
//                 <label htmlFor='title'>Title:</label>
//                 <input
//                   type='text'
//                   id='title'
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor='description'>Description:</label>
//                 <textarea
//                   id='description'
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 ></textarea>
//               </div>
//               <div>
//                 <label htmlFor='category'>Category:</label>
//                 <select
//                   id='category'
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   required
//                 >
//                   <option value=''>Select a category</option>
//                   <option value='services'>Services</option>
//                   <option value='spaces'>Spaces</option>
//                   <option value='equipment'>Equipment</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor='price'>Price:</label>
//                 <input
//                   type='number'
//                   id='price'
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor='location'>Location:</label>
//                 <input
//                   type='text'
//                   id='location'
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type='submit'>Create Listing</button>
//             </form>
//           </Modal>
//         )}
//       </div>

//       <section className="listings">
//         <div className="tabs">
//           <button className="tab active">All</button>
//         </div>
//         <div className="listings-grid">
//           <div className="listing-card">
//             <img src={placeHolderListing} alt="Listing" />
//             <div className="listing-details">
//               <p>Title</p>
//               <p>Location</p>
//               <p>Price</p>
//               <button className="contact-button">Mark as Contacted</button>
//             </div>
//           </div>
//           <div className="listing-card">
//             <img src={placeHolderListing} alt="Listing" />
//             <div className="listing-details">
//               <p>Title</p>
//               <p>Location</p>
//               <p>Price</p>
//               <button className="contact-button">Mark as Contacted</button>
//             </div>
//           </div>
//           <div className="listing-card">
//             <img src={placeHolderListing} alt="Listing" />
//             <div className="listing-details">
//               <p>Title</p>
//               <p>Location</p>
//               <p>Price</p>
//               <button className="contact-button">Mark as Contacted</button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProfilePage;

import React, { useState } from 'react';
import './ProfilePage.css';
import logo from '../../assets/logo.png';
import profileImg from '../../assets/profile.png';
import placeHolderListing from '../../assets/placeholderListing.png';
import { Link } from "react-router-dom";
import axios from 'axios';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('rent');
  const [showCreateListing, setShowCreateListing] = useState(false);

  return (
    <div className="profile-page">
      <header className="header">
        <Link to="/home">
          <img src={logo} alt="Logo" className="pLogo" />
        </Link>
        <nav className="navigation">
          <button
            className={`nav-button ${activeTab === 'rent' ? 'active' : ''}`}
            onClick={() => setActiveTab('rent')}
          >
            Rent
          </button>
          <button
            className={`nav-button ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            List
          </button>
        </nav>
        <div className="profile">
          <img src={profileImg} alt="Profile Icon" />
          <span>Scarlet</span>
        </div>
      </header>
      <main className="main-content">
        {activeTab === 'rent' ? (
          <RentContent />
        ) : (
          <ListContent
            showCreateListing={showCreateListing}
            setShowCreateListing={setShowCreateListing}
          />
        )}
      </main>
    </div>
  );
};

const RentContent = () => (
  <>
    <section className="profile-info">
      <div className="profile-picture">
        <img src={profileImg} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>First Last</h2>
        <p>Member since ...</p>
        <div className="contact-info">
          <p>Email</p>
          <p>Phone Number</p>
          <p>Location</p>
        </div>
        <button className="edit-button">Edit Account Details</button>
      </div>
    </section>
    <section className="listings">
      <div className="tabs">
        <button className="tab active">Saved</button>
      </div>
      <div className="listings-grid">
        <div className="listing-card">
          <img src={placeHolderListing} alt="Listing" />
          <div className="listing-details">
            <p>Title</p>
            <p>Location</p>
            <p>Price</p>
            <button className="contact-button">Mark as Contacted</button>
          </div>
        </div>
        <div className="listing-card">
          <img src={placeHolderListing} alt="Listing" />
          <div className="listing-details">
            <p>Title</p>
            <p>Location</p>
            <p>Price</p>
            <button className="contact-button">Mark as Contacted</button>
          </div>
        </div>
        <div className="listing-card">
          <img src={placeHolderListing} alt="Listing" />
          <div className="listing-details">
            <p>Title</p>
            <p>Location</p>
            <p>Price</p>
            <button className="contact-button">Mark as Contacted</button>
          </div>
        </div>
      </div>
    </section>
  </>
);

const ListContent = ({ showCreateListing, setShowCreateListing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [priceHourly, setPriceHourly] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState('');
  const [userId] = useState(2); // Assuming the userId is 2 for this example

  const handleOpenModal = () => {
    setShowCreateListing(true);
  };

  const handleCloseModal = () => {
    setShowCreateListing(false);
    setTitle('');
    setDescription('');
    setCategory('');
    setSubCategory('');
    setPriceHourly('');
    setPhoto('');
    setLocation('');
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    const listingData = {
      title,
      userId,
      description,
      category,
      subCategory,
      priceHourly,
      photo,
      location
    };

    try {
      const response = await axios.post('http://localhost:3000/listings', listingData);
      console.log('Listing created:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <>
      <section className="profile-info">
        <div className="profile-picture">
          <img src={profileImg} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>First Last</h2>
          <p>Member since ...</p>
          <div className="contact-info">
            <p>Email</p>
            <p>Phone Number</p>
            <p>Location</p>
          </div>
          <button className="edit-button">Edit Account Details</button>
        </div>
      </section>

      <div className='createListing'>
        <button onClick={handleOpenModal}>Create Listing</button>
        {showCreateListing && (
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <button className="modal-close" onClick={handleCloseModal}>&times;</button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateListing}>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter a Title'
                    required
                    className='styled-input'
                  />
                  <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description'
                    required
                    className='styled-input'
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className='styled-input'
                  >
                    <option value='' disabled>Select a category</option>
                    <option value='equipment'>Equipment</option>
                    <option value='services'>Services</option>
                    <option value='spaces'>Spaces</option>
                  </select>
                  <input
                    type='text'
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    placeholder='SubCategory'
                    required
                    className='styled-input'
                  />
                  <input
                    type='number'
                    value={priceHourly}
                    onChange={(e) => setPriceHourly(e.target.value)}
                    placeholder='Price Hourly'
                    required
                    className='styled-input'
                  />
                  <input
                    type='text'
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder='Photo URL'
                    required
                    className='styled-input'
                  />
                  <input
                    type='text'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder='Location'
                    required
                    className='styled-input'
                  />
                  <button type='submit' className='create-listing-button'>Create Listing</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="listings">
        <div className="tabs">
          <button className="tab active">All</button>
        </div>
        <div className="listings-grid">
          <div className="listing-card">
            <img src={placeHolderListing} alt="Listing" />
            <div className="listing-details">
              <p>Title</p>
              <p>Location</p>
              <p>Price</p>
              <button className="contact-button">Mark as Contacted</button>
            </div>
          </div>
          <div className="listing-card">
            <img src={placeHolderListing} alt="Listing" />
            <div className="listing-details">
              <p>Title</p>
              <p>Location</p>
              <p>Price</p>
              <button className="contact-button">Mark as Contacted</button>
            </div>
          </div>
          <div className="listing-card">
            <img src={placeHolderListing} alt="Listing" />
            <div className="listing-details">
              <p>Title</p>
              <p>Location</p>
              <p>Price</p>
              <button className="contact-button">Mark as Contacted</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;


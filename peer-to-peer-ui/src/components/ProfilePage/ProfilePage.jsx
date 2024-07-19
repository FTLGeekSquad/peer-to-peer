// import React, { useState } from 'react';
// import './ProfilePage.css';
// import logo from '../../assets/logo.png';
// import profileImg from '../../assets/profile.png';
// import placeHolderListing from '../../assets/placeholderListing.png';
// import { Link } from "react-router-dom";


// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('rent');

//   return (
//     <div className="profile-page">
//       <header className="header">
//       <Link to="/home">
//                     <img src={logo} alt="Logo" className="pLogo" />
//                 </Link>
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
//           <ListContent />
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
//         {/* <button className="tab">Contacted</button> */}
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

// const ListContent = () => (
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
//         {/* <button className="tab active">Saved</button> */}
//         <button className="tab active">All</button>
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

// export default ProfilePage;


import React, { useState } from 'react';
import './ProfilePage.css';
import logo from '../../assets/logo.png';
import profileImg from '../../assets/profile.png';
import placeHolderListing from '../../assets/placeholderListing.png';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('rent');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="profile-page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Peer2Peer Logo" />
        </div>
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
          <ListContent openModal={openModal} />
        )}
        {isModalOpen && <CreateListingModal closeModal={closeModal} />}
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
        <button className="tab">Contacted</button>
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

const ListContent = ({ openModal }) => (
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
        <button className="tab active">All</button>
      </div>
      <button className="create-listing-button" onClick={openModal}>
        Create Listing
      </button>
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

const CreateListingModal = ({ closeModal }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={closeModal}>×</button>
      <h2>Create New Listing</h2>
      {/* Add your form elements here */}
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Location:
          <input type="text" name="location" />
        </label>
        <label>
          Price:
          <input type="number" name="price" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
);


export default ProfilePage;

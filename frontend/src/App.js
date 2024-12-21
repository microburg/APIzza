import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/App.css';
import heroImage from './images/hero2.png';      
import offerImage from './images/pepperoni.jpg';
import buy2 from './images/buy2.jpg';
import freedelivery from './images/freedelivery.png';

// Components
import Menu from './components/menupage';
import Cart from './components/Cart';
import AdminOrders from './components/AdminOrders';
import CustomizePizza from './components/CustomizePizza';
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import PaymentCard from './components/Payment';
import Navbar from './components/Navbar';  // Ensure Navbar is imported

function App() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');  // Define setAccessToken here

  useEffect(() => {
    fetchOffers();  // Call function to fetch offers on initial load
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/offers/');
      if (!response.ok) throw new Error('Failed to fetch offers');
      const data = await response.json();
      setOffers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <Navbar /> {/* Add the Navbar here */}
        <div className="App">
          {/* Hero Section */}
          <div className="hero">
            <div className="hero-content">
              <div className="text-section">
                <h1>Welcome to APizza</h1>
                <p>Order your favorite pizza and enjoy a 50% discount on your first purchase!</p>
                <button>Order Now</button>
              </div>
              <div className="image-section">
                <img src={heroImage} alt="Pizza" />
              </div>
            </div>
          </div>

          {/* Special Offers Section */}
          <section id="offers" className="offers-section">
            <h1>Special Offers</h1>
            <div className="offers-container">
              {loading && <p>Loading offers...</p>}
              {offers.length === 0 ? (
                <p>There are currently no offers.</p>
              ) : (
                offers.map((offer) => (
                  <div className="offer-card" key={offer.id}>
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <p>Offer: {offer.discount_percentage}%</p>
                    <p>From {offer.start_date} To {offer.end_date}</p>
                    <button>Claim Offer</button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Define the Routes */}
          <Routes>
            <Route path="/" element={<Home offers={offers} loading={loading} error={error} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/customize" element={<CustomizePizza />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<Login setAccessToken={setAccessToken} setError={setError} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/payment" element={<PaymentCard />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

const Home = ({ offers, loading, error }) => {
  return (
    <div className="home">
      <h1>Latest Offers</h1>
      {loading && <p>Loading offers...</p>}
      {error && <p>Error: {error}</p>}
      <div className="offers-container">
        {offers.length === 0 ? (
          <p>There are currently no offers.</p>
        ) : (
          offers.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p>Offer: {offer.discount_percentage}%</p>
              <p>From {offer.start_date} To {offer.end_date}</p>
              <button>Claim Offer</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

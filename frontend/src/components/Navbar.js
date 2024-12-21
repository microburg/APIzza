import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>  {/* Link to the homepage route */}
        <li><Link to="/login">Login</Link></li>  {/* Link to the login page */}
        <li><Link to="/menu">Menu</Link></li>  {/* Link to the menu page */}
        <li><Link to="/admin-orders">Admin Orders</Link></li>  {/* Link to Admin Orders */}
        <li><Link to="/cart">Cart</Link></li>  {/* Link to the cart */}
        <li><Link to="/profile">Profile</Link></li>  {/* Link to the profile page */}
      </ul>
    </nav>
  );
};

export default Navbar;
 
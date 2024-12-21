import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CustomizePizza.css';

const PizzaCustomizer = () => {
  const [toppings, setToppings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/toppings/')
      .then(response => setToppings(response.data))
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert('You need to log in to customize your pizza.');
          navigate('/login');  
        } else {
          console.error('Error fetching toppings:', error);
          alert('Failed to load toppings. Please try again later.');
        }
      });
  }, [navigate]);

  const handleToppingChange = (toppingId) => {
    setToppings(toppings.map(topping =>
      topping.id === toppingId
        ? { ...topping, selected: !topping.selected }
        : topping
    ));
  };

  const calculateTotal = () => {
    return toppings
      .filter(topping => topping.selected)
      .reduce((sum, topping) => sum + parseFloat(topping.price || 0), 0)
      .toFixed(2);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('access_token');
    const selectedToppings = toppings.filter(topping => topping.selected);

    if (!token) {
      alert('You need to log in to add items to your cart.');
      navigate('/login');
      return;
    }

    if (selectedToppings.length === 0) {
      alert('Please select at least one topping.');
      return;
    }

    const toppingsDescription = selectedToppings.map(topping => topping.name).join(', ');

    const payload = {
      pizza_name: 'Special Pizza',
      toppings_description: toppingsDescription,
      quantity: 1
    };

    console.log('Payload:', payload); 

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/carts/add_to_cart/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      alert('Pizza added to cart successfully!');
    } catch (error) {
      console.error('Error adding pizza to cart:', error);
      alert('Failed to add pizza to cart. Please try again.');
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="main-card">
          <div className="header">
            <h2 className="title">Customize Your Perfect Pizza</h2>
          </div>

          <div className="toppings-grid">
            {toppings.map((topping) => (
              <div
                key={topping.id}
                className={`topping-card ${topping.selected ? 'selected' : ''}`}
              >
                <div className="topping-content">
                  <div className="topping-image-container">
                    <img
                      src={`http://127.0.0.1:8000${topping.image}`}
                      alt={topping.name}
                      className="topping-image"
                    />
                  </div>
                  <div className="topping-info">
                    <p className="topping-name">{topping.name}</p>
                    <p className="topping-price">
                      +${(parseFloat(topping.price) || 0).toFixed(2)}
                    </p>
                    <input
                      type="checkbox"
                      id={`topping-${topping.id}`}
                      checked={topping.selected || false}
                      onChange={() => handleToppingChange(topping.id)}
                      className="topping-checkbox"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="footer">
            <div className="total-amount">
              Total Amount: <span className="total-price">${calculateTotal()}</span>
            </div>
            <div className="button-group">
              <button
                onClick={handleAddToCart}
                className="button button-primary"
              >
                Add to Cart
              </button>
              <button
                onClick={handleGoToCart}
                className="button button-secondary"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCustomizer;

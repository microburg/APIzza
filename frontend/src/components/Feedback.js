
import React, { useState } from 'react';
import api from './api'; 
import './Feedback.css'; 

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0,
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/feedback/', formData);
      setMessage(response.data.message);
      setFormData({ name: '', email: '', feedback: '', rating: 0 }); // Reset form
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="feedback-page">
      <h2>Feedback</h2>
      <p>We value your feedback! Let us know about your experience with APIzza.</p>

      {message && <p className="message">{message}</p>}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="feedback">Your Feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleInputChange}
          placeholder="Share your experience with us"
          rows="5"
          required
        ></textarea>

        <label>Rate Our Service:</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${formData.rating >= star ? 'selected' : ''}`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;

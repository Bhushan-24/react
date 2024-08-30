import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    hallTicketNumber: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isUploadSuccess, setIsUploadSuccess] = useState(true); // For success or error message styling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('User Registration successful!');
        setIsUploadSuccess(true);
      } else {
        setMessage(`Error: ${data.message}`);
        setIsUploadSuccess(false);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setIsUploadSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hall Ticket Number:</label>
          <input
            type="text"
            name="hallTicketNumber"
            value={formData.hallTicketNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
      {message && (
        <p className={isUploadSuccess ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;

// LoginForm.js
import React, { useState } from 'react';
import './Login.css';
import email_image from '../../assets/User/email.png';
import { forgotPassword } from '../../UserService';

function ForgotPassword() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleForgotPassword = async () => {
    try {
        // Validate fields before attempting login
        if (!user.email) {
          alert('Email field is required.');
          return;
        }else if(!user.email.includes('@')){
            alert('Entered email is incorrect.');
            return;
        }
        // Call the loginUserService method
        await forgotPassword(user);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

  return (
    <div className='login-container'>
      <div className="login-header">
        <div className="text">
          Forgot Password
        </div>
        <div className="underline"></div>
        <div className="inputs">
          <div className="input">
            <img src={email_image} alt='' />
            <input type='email' name = "email" placeholder='Email Id' onChange={handleChange} />
          </div>
        </div>
        <div className="submit-container">
          <div className="current-button" onClick={handleForgotPassword}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

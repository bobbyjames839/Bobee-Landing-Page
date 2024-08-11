// src/App.js
import React from 'react';
import './App.css';
import home from './images/home.jpg';
import contact from './images/contact.jpg';
import Chatbot from './Chatbot';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <p className='header_logo'>Bobee</p>
        <div className='header_right'>
          <a href='#home' className='home_link'>Home</a>
          <a href='#about_us' className='about_us_link'>About Us</a>
          <a href='#contact' className='contact_link'>Contact</a>
        </div>
      </div>

      <div className='home' id='home'>
        <div className='home_left'>
          <h1 className='home_left_header'>Bobee Cleaning Services</h1>
          <h3 className='home_left_subheader'>Order a cleaner anytime from anywhere with us</h3>
        </div>
        <img src={home} alt='Home' className='home_right_image' />
      </div>

      <div className='about_us' id='about_us'>
        <div className='about_us_inner'>
          <h1 className='about_us_title'>About Us</h1>
          <p className='about_us_para'>We are a company looking to launch an affordable, accessible cleaning service in London. We are currently surveying the public about their cleaning preferences. You can help us by filling in the short form below. We promise it'll only take a few minutes!</p>
          <button className='about_us_button'>Start Survey</button>
        </div>
      </div>

      <div className='contact' id='contact'>
        <div className='contact_left'>
          <div className='contact_left_inner'>
            <h5>Join our mailing list</h5>
            <p className='email'>Email *</p>
            <div className='contact_left_inner_form'>
              <input />
              <button className='subscribe'>Subscribe</button>
            </div>
            <div className='contact_left_inner_checker'>
              <button className='subscribe_checker'></button>
              <p className='subscribe_text'>I want to subscribe to your mailing list.</p>
            </div>
          </div>
        </div>
        <img src={contact} alt='Contact' className='contact_image' />
      </div>

      <div className='footer'>
        <div className='footer_inner'>
          <p className='footer_logo'>Bobee</p>
          <p className='footer_email'>bobeeclean@gmail.com</p>
        </div>
        <p className='terms'>Designed & Developed by Bobee, all rights reserved.</p>
      </div>

      <Chatbot />
    </div>
  );
}

export default App;

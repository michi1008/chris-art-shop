import React from 'react';
import './ContactScreen.css';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import riding from '../assets/chris-riding.jpg';
import artEvent from '../assets/chris-art-event.jpg';

const ContactScreen = () => {
  return (
    <div className='contact-container'>
      <div className='contact-title-container'>
        <h1>Contact</h1>
        <div className='underline-contact'></div>
      </div>
      <div className='contact-image-container'>
        <img src={riding} alt='artist riding a hourse' />
        <img src={artEvent} alt='artist in an art event' />
      </div>
      <div className='social-links'>
        <a href='https://www.facebook.com/search/top?q=chris%20lange%20art'>
          <FaFacebook className='social-icon' />
        </a>
        <a href='https://www.instagram.com/chris_lange_art/'>
          <FaInstagramSquare className='social-icon' />
        </a>
        <a href='mailto:chrislangeart1@gmail.com'>
          <MdEmail className='social-icon' />
        </a>
      </div>
    </div>
  );
};

export default ContactScreen;

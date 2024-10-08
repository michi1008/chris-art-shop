import React from 'react';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer-social'>
        <h4>follow me</h4>
        <div className='social-links'>
          <a href='https://www.facebook.com/ChrisLangeArt/'>
            <FaFacebook className='social-icon' />
          </a>
          <a href='https://www.instagram.com/chris_lange_art/'>
            <FaInstagramSquare className='social-icon' />
          </a>
          
        </div>
      </div>
      <div className='copyright'>
        <p className='copyright'>Chris Lange Fine Art Gallery &copy; {currentYear}</p>
      </div>
      <div className="contact-me">
      <h4>Contact me</h4>
        <a href="mailto:chrislangeart1@gmail.com">
            <MdEmail className='social-icon'/>
          </a>
      </div>
    </footer>
  );
};

export default Footer;

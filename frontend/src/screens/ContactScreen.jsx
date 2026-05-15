import React from 'react';
import './ContactScreen.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import riding from '../assets/chris-riding.jpg';
import artEvent from '../assets/chris-art-event.jpg';

const ContactScreen = () => {
  return (
    <div className='contact-page'>
      <div className='contact-layout'>

        <div className='contact-info'>
          <p className='contact-eyebrow'>Chris Lange Fine Art</p>
          <h1 className='contact-heading'>Get in Touch</h1>
          <div className='contact-divider' />
          <p className='contact-body'>
            Interested in a painting, have a question about availability, or
            looking to commission an original piece? Reach out directly —
            Chris would love to hear from you.
          </p>

          <div className='contact-links'>
            <p className='contact-links-label'>Contact</p>
            <a className='contact-link' href='mailto:chrislangeart1@gmail.com'>
              <MdEmail className='contact-link-icon' />
              <span>chrislangeart1@gmail.com</span>
            </a>

            <hr className='contact-links-rule' />

            <p className='contact-links-label'>Follow</p>
            <a
              className='contact-link'
              href='https://www.facebook.com/search/top?q=chris%20lange%20art'
              target='_blank'
              rel='noreferrer'
            >
              <FaFacebook className='contact-link-icon' />
              <span>Facebook</span>
            </a>
            <a
              className='contact-link'
              href='https://www.instagram.com/chris_lange_art/'
              target='_blank'
              rel='noreferrer'
            >
              <FaInstagram className='contact-link-icon' />
              <span>@chris_lange_art</span>
            </a>
          </div>
        </div>

        <div className='contact-images'>
          <img src={artEvent} alt='Chris at an art event' className='contact-img contact-img--main' />
          <img src={riding} alt='Chris riding a horse' className='contact-img contact-img--accent' />
        </div>

      </div>
    </div>
  );
};

export default ContactScreen;

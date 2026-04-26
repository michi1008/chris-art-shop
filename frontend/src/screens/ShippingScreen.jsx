import React, { useState } from 'react';
import './ShippingScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [state, setState] = useState(shippingAddress?.state || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, state }));
    navigate('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className='shipping-page'>
        <div className='shipping-header'>
          <h2>Shipping</h2>
          <div className='shipping-divider' />
        </div>
        <form className='shipping-form' onSubmit={submitHandler}>
          <div className='shipping-field'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              placeholder='Street address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='shipping-field'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              id='city'
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className='shipping-field'>
            <label htmlFor='postalCode'>Postal Code</label>
            <input
              type='text'
              id='postalCode'
              placeholder='Postal code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className='shipping-field'>
            <label htmlFor='state'>State</label>
            <input
              type='text'
              id='state'
              placeholder='State'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <button type='submit'>Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;

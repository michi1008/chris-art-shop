import React, { useState, useEffect } from 'react';
import './PaymentScreen.css';
import { savePaymentMethod } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className='payment-page'>
        <div className='payment-header'>
          <h2>Payment Method</h2>
          <div className='payment-divider' />
        </div>
        <form onSubmit={submitHandler} className='payment-form'>
          <div className='payment-option'>
            <div className='payment-option-check'>✓</div>
            <div className='payment-option-info'>
              <p className='payment-option-title'>PayPal</p>
              <p className='payment-option-sub'>or Credit / Debit Card</p>
            </div>
            <input
              type='checkbox'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ display: 'none' }}
            />
          </div>
          <button type='submit'>Continue</button>
          <p className='payment-note'>
            Prefer another payment method? Contact the artist directly.
          </p>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;

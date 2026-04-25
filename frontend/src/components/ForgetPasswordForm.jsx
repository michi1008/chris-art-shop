import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgetPasswordMutation } from '../slices/apiSlice';
import './ForgetPasswordForm.css';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword({ email }).unwrap();
      setMessage(response.message);
      setIsSuccess(true);
    } catch (err) {
      setMessage(err?.data?.message || 'Something went wrong. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className='auth-page'>
      <p className='auth-brand'>Chris Lange Fine Art</p>

      <div className='auth-header'>
        <h2>Forgot Password</h2>
        <div className='auth-divider'></div>
      </div>

      <p className='auth-description'>
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form className='auth-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='auth-input'
            placeholder='your@email.com'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className='auth-submit-btn' type='submit' disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Send Reset Link'}
        </button>

        {message && (
          <p className={`auth-message ${isSuccess ? 'auth-message--success' : 'auth-message--error'}`}>
            {message}
          </p>
        )}
      </form>

      <div className='auth-links'>
        <p className='auth-switch'>
          Remembered it?{' '}
          <Link to='/login'>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;

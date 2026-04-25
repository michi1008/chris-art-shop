import React, { useState, useEffect } from 'react';
import './RegisterScreen.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const isPasswordStrong = (pw) => {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw)
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else if (!isPasswordStrong(password)) {
      toast.error(
        'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character'
      );
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className='auth-page'>
      <p className='auth-brand'>Chris Lange Fine Art</p>

      <div className='auth-header'>
        <h2>Create Account</h2>
        <div className='auth-divider'></div>
      </div>

      <form className='auth-form' onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='auth-input'
            placeholder='Your name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='auth-input'
            placeholder='your@email.com'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='auth-input'
            placeholder='••••••••'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            className='auth-input'
            placeholder='••••••••'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className='auth-submit-btn' type='submit' disabled={isLoading}>
          {isLoading ? 'Creating account…' : 'Create Account'}
        </button>

        {isLoading && <Loader />}
      </form>

      <div className='auth-links'>
        <p className='auth-switch'>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;

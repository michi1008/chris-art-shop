import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='auth-page'>
      <p className='auth-brand'>Chris Lange Fine Art</p>

      <div className='auth-header'>
        <h2>Sign In</h2>
        <div className='auth-divider'></div>
      </div>

      <form className='auth-form' onSubmit={submitHandler}>
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

        <button className='auth-submit-btn' type='submit' disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign In'}
        </button>

        {isLoading && <Loader />}
      </form>

      <div className='auth-links'>
        <Link to='/forget-password' className='auth-link-secondary'>
          Forgot your password?
        </Link>
        <p className='auth-switch'>
          New here?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;

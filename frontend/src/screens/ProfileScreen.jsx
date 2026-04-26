import React, { useState, useEffect } from 'react';
import './ProfileScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials, logout } from '../slices/authSlice';
import { FaTimes } from 'react-icons/fa';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  useEffect(() => {
    if (error?.status === 401) {
      dispatch(logout());
      navigate('/login');
    }
  }, [error, dispatch, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className='profile-container'>
      <div className='profile'>
        <h2 className='profile-title'>User Profile</h2>
        <form className='register-form' onSubmit={submitHandler}>
          <div className='form-item'>
            <label>Name</label>
            <input
              type='text'
              className='register-input'
              placeholder='Enter your name...'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label>Email</label>
            <input
              type='email'
              className='register-input'
              placeholder='Enter your email...'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label>Password</label>
            <input
              type='password'
              className='register-input'
              placeholder='Enter your password...'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-item'>
            <label>Password Confirm</label>
            <input
              type='password'
              className='register-input'
              placeholder='Confirm your password...'
              id='password'
              name='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='profile-btn-container'>
            <button type='submit'>Update</button>
          </div>
          {loadingUpdateProfile && <Loader />}
        </form>
       
      </div>
      <div className='profile-orders'>
        <h2 className='profileOrders-title'>User Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error || !orders?.length ? (
          <p style={{ color: 'var(--clr-grey)', fontStyle: 'italic' }}>No orders yet.</p>
        ) : (
          <table className='profile-orders-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th className='details-btn'></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className='table-inside-btn'>Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;

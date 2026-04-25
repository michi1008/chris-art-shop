import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaWindowClose } from 'react-icons/fa';
import { BiSolidDownArrow } from 'react-icons/bi';
import { TiThMenu } from 'react-icons/ti';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle link click and close the menu
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav>
      <NavLink to='/' className='title'>
        Chris Lange Fine Art Gallery
      </NavLink>
      {userInfo && <span className='nav-greeting'>Hello, {userInfo.name}</span>}
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <FaWindowClose
            style={{
              fontSize: '2rem',
              color: 'var(--clr-white)',
              backgroundColor: 'var(--clr-primary-5)',
            }}
          />
        ) : (
          <TiThMenu style={{ fontSize: '2rem' }} />
        )}
      </div>

      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <NavLink to='/' onClick={handleLinkClick}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about' onClick={handleLinkClick}>About</NavLink>
        </li>
        <li>
          <NavLink to='/contact' onClick={handleLinkClick}>Contact</NavLink>
        </li>
        <li>
          {userInfo ? (
            <div>
              <NavLink to='/profile' onClick={handleLinkClick}>User Profile</NavLink>
            </div>
          ) : (
            <NavLink to='/login' onClick={handleLinkClick}>
              <FaUser /> Sign In
            </NavLink>
          )}
        </li>
        <li className='logout'>
          {userInfo ? (
            <NavLink onClick={() => { handleLogout(); handleLinkClick(); }}>
              <FaUser /> Logout
            </NavLink>
          ) : (
            ''
          )}
        </li>
        <li>
          <NavLink className='navlink-cart' to='/cart' onClick={handleLinkClick}>
            {' '}
            <FaShoppingCart /> Cart
            {cartItems.length > 0 && (
              <div className='navlink-cart-qty'>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </div>
            )}
          </NavLink>
        </li>
        <SearchBox className='searchBox' />
        {userInfo && userInfo.isAdmin && (
          <div className='dropdown'>
            <button className='dropbtn'>
              Admin <BiSolidDownArrow />
            </button>
            <div className='dropdown-content'>
              <NavLink className='dropdown-link' to='/admin/productList' onClick={handleLinkClick}>
                Products
              </NavLink>
              <NavLink className='dropdown-link' to='/admin/orderList' onClick={handleLinkClick}>
                Orders
              </NavLink>
              <NavLink className='dropdown-link' to='/admin/userList' onClick={handleLinkClick}>
                Users
              </NavLink>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import './CartScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryMethod, removeFromCart } from '../slices/cartSlice';
import { updateCart } from '../utils/cartUtils';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [deliveryMethod, setDeliveryMethod] = useState('shipped');

  const removeFromCartHandler = async (id) => {
    await dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!deliveryMethod) {
      toast.error("Please select a delivery method");
      return;
    }
    dispatch(saveDeliveryMethod({ deliveryMethod }));
    updateCart({ ...cart, deliveryMethod });
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className='cart-page'>
      <div className='cart-page-header'>
        <h1>Shopping Cart</h1>
        <div className='cart-header-divider' />
      </div>

      {cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p>Your cart is empty.</p>
          <Link to='/'>
            <button>Browse Gallery</button>
          </Link>
        </div>
      ) : (
        <div className='cart-layout'>
          <div className='cart-items'>
            {cartItems.map((item) => (
              <div className='cart-row' key={item._id}>
                <img className='cart-row-img' src={item.image} alt={item.name} />
                <div className='cart-row-info'>
                  <Link to={`/product/${item._id}`}>
                    <p className='cart-row-name'>{item.name}</p>
                  </Link>
                  <p className='cart-row-price'>${item.price}</p>
                </div>
                <button
                  className='cart-row-remove'
                  onClick={() => removeFromCartHandler(item._id)}
                  title='Remove item'
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className='cart-summary-card'>
            <h3>Order Summary</h3>
            <div className='cart-summary-row'>
              <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
              <span>${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
            </div>
            <hr className='cart-summary-hr' />
            <div className='cart-delivery-group'>
              <label className='cart-delivery-label'>Delivery Method</label>
              <select
                className='cart-delivery-select'
                name='deliveryMethod'
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value=''>Select a delivery option</option>
                <option value='shipped'>Shipped</option>
                <option value='hand-delivered'>Hand-delivered</option>
              </select>
            </div>
            <button
              className='cart-checkout-btn'
              type='button'
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;

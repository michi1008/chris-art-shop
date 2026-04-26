import React, { useEffect } from 'react';
import './PlaceOrderScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { updateCart } from '../utils/cartUtils';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, cart.deliveryMethod, cart.shippingPrice, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        deliveryMethod: cart.deliveryMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to place order");
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='po-page'>
        <div className='po-layout'>
          <div className='po-details'>
            <div className='po-section'>
              <p className='po-section-label'>Shipping Address</p>
              <p className='po-section-text'>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.state}
              </p>
            </div>
            <hr className='po-divider' />

            <div className='po-section'>
              <p className='po-section-label'>Payment Method</p>
              <p className='po-section-text'>{cart.paymentMethod}</p>
            </div>
            <hr className='po-divider' />

            <div className='po-section'>
              <p className='po-section-label'>Order Items</p>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className='po-items-list'>
                  {cart.cartItems.map((item, index) => (
                    <li key={index} className='po-item'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='po-item-img'
                      />
                      <div className='po-item-info'>
                        <Link to={`/product/${item.product}`} className='po-item-name'>
                          {item.name}
                        </Link>
                        <span className='po-item-price'>${item.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className='po-summary-card'>
            <h3>Order Summary</h3>
            <div className='po-summary-row'>
              <span>Items</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className='po-summary-row'>
              <span>Delivery</span>
              <span>{cart.deliveryMethod}</span>
            </div>
            <div className='po-summary-row'>
              <span>Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className='po-summary-row'>
              <span>Tax</span>
              <span>${cart.taxPrice}</span>
            </div>
            <hr className='po-summary-hr' />
            <div className='po-summary-row po-summary-total'>
              <span>Total</span>
              <span>${cart.totalPrice}</span>
            </div>
            {error && <Message variant='warning'>{error.data.message}</Message>}
            <button
              type='button'
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;

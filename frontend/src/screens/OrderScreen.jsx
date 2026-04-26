import React, { useEffect } from 'react';
import './OrderScreen.css';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap;
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='warning'>{error?.data?.message || 'Something went wrong'}</Message>
  ) : (
    <div className='order-page'>
      <div className='order-page-header'>
        <p className='order-page-label'>Order Confirmation</p>
        <h2 className='order-page-id'>#{order._id}</h2>
      </div>

      <div className='order-layout'>
        <div className='order-details'>
          <div className='order-section'>
            <p className='order-section-label'>Shipping</p>
            <p className='order-section-text'><strong>Name:</strong> {order.user.name}</p>
            <p className='order-section-text'><strong>Email:</strong> {order.user.email}</p>
            <p className='order-section-text'>
              <strong>Address:</strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.state.slice(0, 2).toUpperCase()}
            </p>
            <div className='order-badge-row'>
              {order.isDelivered ? (
                <span className='order-badge order-badge--success'>
                  Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                </span>
              ) : (
                <span className='order-badge order-badge--warn'>Not Delivered</span>
              )}
            </div>
          </div>
          <hr className='order-divider' />

          <div className='order-section'>
            <p className='order-section-label'>Payment</p>
            <p className='order-section-text'><strong>Method:</strong> {order.paymentMethod}</p>
            <div className='order-badge-row'>
              {order.isPaid ? (
                <span className='order-badge order-badge--success'>
                  Paid on {new Date(order.paidAt).toLocaleDateString()}
                </span>
              ) : (
                <span className='order-badge order-badge--warn'>Not Paid</span>
              )}
            </div>
          </div>
          <hr className='order-divider' />

          <div className='order-section'>
            <p className='order-section-label'>Order Items</p>
            {order.orderItems.length === 0 ? (
              <Message variant='warning'>Your cart is empty</Message>
            ) : (
              <ul className='order-items-list'>
                {order.orderItems.map((item, index) => (
                  <li key={index} className='order-item'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='order-item-img'
                    />
                    <div className='order-item-info'>
                      <Link to={`/product/${item.product}`} className='order-item-name'>
                        {item.name}
                      </Link>
                      <span className='order-item-price'>${item.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className='order-summary-card'>
          <h3>Order Summary</h3>
          <div className='order-summary-row'>
            <span>Items</span>
            <span>${order.itemsPrice}</span>
          </div>
          <div className='order-summary-row'>
            <span>Delivery</span>
            <span>{order.deliveryMethod}</span>
          </div>
          <div className='order-summary-row'>
            <span>Shipping</span>
            <span>${order.shippingPrice}</span>
          </div>
          <div className='order-summary-row'>
            <span>Tax</span>
            <span>${order.taxPrice}</span>
          </div>
          <hr className='order-summary-hr' />
          <div className='order-summary-row order-summary-total'>
            <span>Total</span>
            <span>${order.totalPrice}</span>
          </div>

          {!order.isPaid && (
            <div className='order-paypal-wrap'>
              {loadingPay && <Loader />}
              {isPending ? (
                <Loader />
              ) : (
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'rect', label: 'paypal' }}
                  locale='en_US'
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              )}
            </div>
          )}

          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <button type='button' onClick={deliverHandler}>
              Mark As Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';
import styles from '../styles/CartPage.module.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = savedCart.map(item => ({
      ...item,
      price: Number(item.price) || 0,
      quantity: item.quantity || 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        item.quantity += 1;
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setCartItems([]); 
    localStorage.removeItem('cart'); 
    navigate('/mainpage'); 
  };

  return (
    <div className={styles.cartPage}>
      <Header />
      <div className={styles.cartContent}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <h1>Your cart is empty</h1>
            <p>Looks like you haven’t added anything to your cart yet. Start exploring our products now!</p>
            <button 
              className={styles.exploreButton} 
              onClick={() => navigate('/mainpage')}
            >
              Go to Homepage
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              <h1>Your Cart</h1>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={`http://localhost:3333${item.image}`} alt={item.title} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h2>{item.title}</h2>
                    <div className={styles.quantityControl}>
                      <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <div className={styles.price}>
                    <p>{(item.price * item.quantity)}₽</p>
                  </div>
                  <div className={styles.removeButton}>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.checkoutForm}>
              <div className={styles.cartSummary}>
                <p><strong>Total Items:</strong> {calculateTotalQuantity()}</p>
                <p><strong>Total Price:</strong> {calculateTotal()}₽</p>
              </div>
              <input type="text" placeholder="Name" className={styles.inputField} />
              <input type="text" placeholder="Phone" className={styles.inputField} />
              <button onClick={handleCheckout} className={styles.orderButton}>Order</button>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thank you for your purchase!</h2>
            <p>Your order has been successfully placed. We will contact you shortly!</p>
            <button className={styles.closeButton} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CartPage;

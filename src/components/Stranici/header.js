
import logo from '../pic/logo.png'; 
import basketIcon from '../pic/basket.png'; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(savedCart.length);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>Garden Shop</h1>
      </div>
      <nav>
        <Link to="/mainpage">Main Page</Link>
        <Link to="/category">Categories</Link>
        <Link to="/products">All products</Link>
        <Link to="/sales">All sales</Link>
      </nav>
      <Link to="/cart">
        <button className={styles.cartButton}>
          <img src={basketIcon} alt="Basket" className={styles.cartIcon} />
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </button>
      </Link>
    </header>
  );
};

export default Header;

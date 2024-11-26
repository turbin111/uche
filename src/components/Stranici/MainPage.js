import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../../store/actions/products';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/MainPage.module.css';
import Header from './header'; 
import Footer from './Footer'; 

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.push({ ...product, quantity: 1 }); 
    localStorage.setItem('cart', JSON.stringify(savedCart));
    alert(`${product.title} added to cart!`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted');
    // Here you can handle form submission, like sending data to the server
  };

  return (
    <div className={styles.mainPage}>

      <Header />

      <div className={styles.banner}>
        <h1>Amazing Discounts on Garden Products!</h1>
        <button className={styles.checkOutButton}>Check out</button>
        <div className={styles.checkoutBanner}></div> 
      </div>

      <section className={styles.categoriesSection}>
        <h2>Categories</h2>
        <div className={`${styles.categories} ${styles.centeredContent}`}>
          {categories.map(category => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <div className={styles.categoryCard}>
                <img src={`http://localhost:3333${category.image}`} alt={category.title} />
                <p>{category.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Banner with Form */}
      <section className={styles.formBanner}>
        <div className={styles.formContainer}>
          <h2>Get Our Latest Updates</h2>
          <p>Fill in your details to receive notifications about new products and discounts!</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={form.name} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Your Phone" 
              value={form.phone} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={form.email} 
              onChange={handleInputChange} 
              required 
            />
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </section>

      <section className={styles.saleSection}>
        <h2>Sale</h2>
        <div className={`${styles.saleProducts} ${styles.centeredContent}`}>
          {products.slice(0, 4).map(product => (
            <div 
              key={product.id} 
              className={styles.productCard}
              onClick={() => navigate(`/product/${product.id}`)} 
            >
              <img src={`http://localhost:3333${product.image}`} alt={product.title} />
              <h3>{product.title}</h3>
              <p className={styles.price}>{product.price}₽</p>
              {product.discont_price && <p className={styles.oldPrice}>{product.discont_price}₽</p>}
              <button 
                className={styles.addToCartButton} 
                onClick={(e) => {
                  e.stopPropagation(); 
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MainPage;

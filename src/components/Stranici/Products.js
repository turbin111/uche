import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/actions/products';
import { Link, useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';
import styles from '../styles/Products.module.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [sortedProducts, setSortedProducts] = useState(products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setSortedProducts(products); 
  }, [products]);

  const sortByPrice = () => {
    
    setSortedProducts([...products].sort((a, b) => a.price - b.price));
  };

  const sortByDiscounted = () => {
   
    setSortedProducts([...products].sort((a, b) => {
      const priceA = a.discont_price || a.price;
      const priceB = b.discont_price || b.price;
      return priceA - priceB;
    }));
  };

  const sortByTitle = () => {
    
    setSortedProducts([...products].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.push(product);
    localStorage.setItem('cart', JSON.stringify(savedCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className={styles.productsPage}>

      <Header />


      <div className={styles.sorting}>
        <button onClick={sortByPrice}>Sort by Price</button>
        <button onClick={sortByDiscounted}>Sort by Discounted Price</button>
        <button onClick={sortByTitle}>Sort by Title</button>
      </div>

      <section className={styles.productsSection}>
        <h2>All Products</h2>
        <div className={styles.products}>
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => navigate(`/product/${product.id}`)} 
            >
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />
              <h3>{product.title}</h3>
              <p>Price: {product.discont_price ? product.discont_price : product.price}₽</p>
              {product.discont_price && (
                <p className={styles.discountPrice}>
                  Discount Price: {product.discont_price}₽
                </p>
              )}
              <button onClick={(e) => {
                e.stopPropagation(); 
                addToCart(product);
              }}>
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

export default ProductsPage;

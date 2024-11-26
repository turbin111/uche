

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './Footer';
import styles from '../styles/ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/products/${productId}`);
        const fetchedProduct = Array.isArray(response.data) ? response.data[0] : response.data;
        setProduct(fetchedProduct);
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.push(product);
    localStorage.setItem('cart', JSON.stringify(savedCart));
    alert(`${product.title} added to cart!`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.productDetailsPage}>
      <Header />
      {product ? (
        <div className={styles.productCard}>
          <img
            src={product.image ? `http://localhost:3333${product.image}` : '/placeholder.jpg'}
            alt={product.title || 'Product Image'}
          />
          <div className={styles.productDetails}>
            <h2>{product.title}</h2>
            <p className={styles.price}><strong>Price:</strong> {product.price}₽</p>
            {product.discont_price && (
              <p className={styles.oldPrice}>
                <strong>Discount:</strong> {product.discont_price}₽
              </p>
            )}
            <p><strong>Description:</strong> {product.description}</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;

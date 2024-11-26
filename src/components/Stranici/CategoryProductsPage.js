import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../../store/actions/products';
import Header from './header'; 
import Footer from './Footer'; 
import styles from '../styles/CategoryProductsPage.module.css';

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories()); 
  }, [dispatch]);

  const category = categories.find((cat) => cat.id === parseInt(categoryId));
  const filteredProducts = products.filter(
    (product) => product.categoryId === parseInt(categoryId)
  );

  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.push(product);
    localStorage.setItem('cart', JSON.stringify(savedCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className={styles.categoryProductsPage}>
      <Header />

      <h2>{category ? `Category: ${category.title}` : 'Category Not Found'}</h2>

      <div className={styles.products}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image ? `http://localhost:3333${product.image}` : '/placeholder.jpg'}
                  alt={product.title || 'Product Image'}
                />
                <h3>{product.title}</h3>
              </Link>
              <p>Price: {product.price}₽</p>
              {product.discont_price && (
                <p>Discount: {product.discont_price}₽</p>
              )}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProductsPage;

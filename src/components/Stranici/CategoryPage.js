import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/actions/products';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';
import styles from '../styles/CategoryPage.module.css';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.categoryPage}>

      <Header />


      <section className={styles.categoriesSection}>
        <h2>Categories</h2>
        <div className={styles.categories}>
          {categories.map((category) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <div className={styles.categoryCard}>
                <img
                  src={`http://localhost:3333${category.image}`}
                  alt={category.title}
                />
                <h3>{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

   
      <Footer />
    </div>
  );
};

export default CategoryPage;

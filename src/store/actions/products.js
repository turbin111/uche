import axios from 'axios';

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3333/categories/all');
    dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CATEGORIES_FAILURE', payload: error.message });
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3333/products/all'); 
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};


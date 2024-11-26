const initialState = [];

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return action.payload;
    case 'FETCH_PRODUCTS_FAILURE':
      return state;
    default:
      return state;
  }
};

export default productsReducer;

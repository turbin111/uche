const initialState = [];

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return action.payload;
    case 'FETCH_CATEGORIES_FAILURE':
      return state;
    default:
      return state;
  }
};

export default categoriesReducer;

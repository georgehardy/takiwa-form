import { ADD_PRODUCT, ADD_PRODUCTS, DELETE_PRODUCT } from './ProductActions';

const initialState = { data: [] };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT :
      return {
        data: [action.product, ...state.data],
      };

    case ADD_PRODUCTS :
      return {
        data: action.products,
      };

    case DELETE_PRODUCT :
      return {
        data: state.data.filter(product => product.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = state => state.products.data;

// Get product by cuid. Return blank product if not matched.
export const getProduct = (state, cuid) => {
  if (cuid) {
    return state.products.data.filter(product => product.cuid === cuid)[0];
  }
  return {
    product: {
      cuid: 0,
      name: '',
      items: [''],
    },
  };
};

export default ProductReducer;

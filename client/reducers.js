/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import products from './modules/Products/ProductReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  products,
});

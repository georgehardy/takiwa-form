import callApi from '../../util/apiCaller';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function fetchProducts() {
  return (dispatch) => {
    return callApi('products').then(res => {
      dispatch(addProducts(res.products));
    });
  };
}

export function fetchProduct(cuid) {
  return (dispatch) => {
    return callApi(`products/${cuid}`)
      .then(res => {
        return dispatch(addProduct(res.product));
      });
  };
}

export function deleteProduct(cuid) {
  return {
    type: DELETE_PRODUCT,
    cuid,
  };
}

export function deleteProductRequest(cuid) {
  return (dispatch) => {
    return callApi(`products/${cuid}`, 'delete').then(() => dispatch(deleteProduct(cuid)));
  };
}

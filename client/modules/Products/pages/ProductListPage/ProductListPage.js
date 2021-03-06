import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProducts, deleteProductRequest } from '../../ProductActions';
import { getProducts } from '../../ProductReducer';

import ProductList from '../../components/ProductList/ProductList';

class ProductListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  handleDeleteProduct = e => {
    if (confirm('Do you want to delete this product')) { // eslint-disable-line
      this.props.dispatch(deleteProductRequest(e.target.name));
    }
  };

  render() {
    return <ProductList products={this.props.products} handleDelete={this.handleDeleteProduct} />;
  }
}

// Actions required to provide data for this component to render in sever side.
ProductListPage.need = [() => { return fetchProducts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    products: getProducts(state),
  };
}

ProductListPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

ProductListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(ProductListPage);

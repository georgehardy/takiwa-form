import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditProductForm from '../../components/EditProductForm/EditProductForm';

import { fetchProduct } from '../../ProductActions';
import { getProduct } from '../../ProductReducer';

export function EditProductPage(props) {
  return (
    <div>
      <EditProductForm
        cuid={props.product.cuid}
        name={props.product.name}
        items={props.product.items}
        router={props.router}
      />
    </div>
  );
}


// Actions required to provide data for this component to render in server side.
EditProductPage.need = [params => {
  return fetchProduct(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, { params }) {
  const cuid = params.cuid ? params.cuid : 0;
  return {
    product: getProduct(state, cuid || 0),
  };
}

EditProductPage.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    items: PropTypes.array,
    cuid: PropTypes.string,
  }),
  router: PropTypes.object,
};

export default connect(mapStateToProps)(EditProductPage);

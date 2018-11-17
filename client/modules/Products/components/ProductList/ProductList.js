import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Card, Container } from 'semantic-ui-react';
import styles from './ProductList.css';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.productList}>
        <Container>
          <Button as={Link} to={'/edit'} size="huge" className="centered" fluid>Add New</Button>
          <Card.Group className={styles.cardGroup} centered>
          {
            this.props.products.map(product => {
              return (
                <Card key={product.cuid}>
                  <Card.Content>
                    <Card.Header>{product.name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button
                        basic color="green"
                        as={Link}
                        to={`/edit/${product.cuid}`}
                      > View / Edit </Button>
                      <Button
                        basic color="red"
                        name={product.cuid}
                        onClick={this.props.handleDelete}
                      > Delete </Button>
                    </div>
                  </Card.Content>
                </Card>
              );
            })
          }
          </Card.Group>
        </Container>
      </div>
    );
  }
}

ProductList.propTypes = {
  cuid: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  handleDelete: PropTypes.func,
  products: PropTypes.shape({
    map: PropTypes.func,
  }),
};


export default ProductList;

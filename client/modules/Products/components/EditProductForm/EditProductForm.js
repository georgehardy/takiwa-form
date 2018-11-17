import React, { Component } from 'react';
import PropTypes from 'prop-types';
import callApi from '../../../../util/apiCaller';
import { Button, Input, Form, Label } from 'semantic-ui-react';
import styles from './EditProductForm.css';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuid: props.cuid || 0,
      name: props.name || '',
      items: props.items || [''],
    };
  }

  handleName = e => {
    this.setState({ name: e.target.value });
  }

  handleChange = e => {
    const items = [...this.state.items];
    items[e.target.name] = e.target.value;
    this.setState({ items });
  }

  handleAdd = () => {
    const items = [...this.state.items];
    items.push('');
    this.setState({ items });
  }

  handleDelete = e => {
    const items = [...this.state.items];
    items.splice(Number(e.target.name), 1);
    this.setState({ items });
  }

  handleSubmit = () => {
    const errors = this.state.items.filter(item => !item.length);
    if (!errors.length && this.state.name) {
      this.submitData();
    }
  }

  submitData = () => {
    callApi('products', 'post', {
      product: {
        name: this.state.name,
        cuid: this.state.cuid,
        items: this.state.items,
      },
    })
    .then(() => {
      this.props.router.push('/');
    });
  }

  render() {
    return (
      <div className={styles.editProduct}>
        <Form>
          <Form.Field>
            <Label>Product Category</Label>
            <Input
              name="name"
              value={this.state.name}
              onChange={this.handleName}
              autoComplete="off"
              className={!this.state.name.length && 'error'}
              icon="tags"
              iconPosition="left"
            />
          </Form.Field>
          <Label>Items</Label>
          {this.state.items.map((item, idx) => {
            return (
              <Form.Field>
                <Input
                  name={idx}
                  value={item}
                  key={`input${idx}`}
                  onChange={this.handleChange}
                  placeholder="Item"
                  autoComplete="off"
                  className={!item.length && 'error'}
                >
                  <input />
                  <Button.Group>
                    <Button
                      key={`add${idx}`}
                      name={idx}
                      onClick={this.handleAdd}
                      disabled={!item.length}
                      color="green"
                      icon="add"
                    />
                    <Button
                      key={`del${idx}`}
                      name={idx}
                      onClick={this.handleDelete}
                      disabled={!idx}
                      color="red"
                      icon="minus"
                    />
                  </Button.Group>
                </Input>
              </Form.Field>
            );
          })}
          <Button onClick={this.handleSubmit} color="black">Save</Button>
          <Button color="black" basic onClick={() => this.props.router.push('/')}>Back</Button>
        </Form>
      </div>
    );
  }
}

EditProduct.propTypes = {
  cuid: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};


export default EditProduct;

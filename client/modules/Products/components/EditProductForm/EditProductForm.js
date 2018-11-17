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
    if (!errors.length) {
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
    .then(res => {
      if (res.message) {
        this.props.router.push('/');
      } else {
        // to-do better error handling
        console.log('error');
      }
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
                  placeholder="item"
                  key={`input${idx}`}
                  name={idx}
                  value={item}
                  onChange={this.handleChange}
                  autoComplete="off"
                  className={!item.length && 'error'}
                  icon="tag"
                  iconPosition="left"
                  option
                >
                <input />
                <Button.Group>
                  <Button
                    key={`add${idx}`}
                    name={idx}
                    onClick={this.handleAdd}
                    disabled={!item.length}
                    color="black"
                    basic
                  >
                    +
                  </Button>
                  <Button
                    key={`del${idx}`}
                    name={idx}
                    onClick={this.handleDelete}
                    disabled={!idx}
                    color="black"
                    basic
                  >
                    -
                  </Button>
                </Button.Group>
                </Input>
                </Form.Field>

            );
          })}

        <Button onClick={this.handleSubmit} color="black">
          Save
        </Button>
        <Button color="black" basic onClick={() => this.props.router.push('/')}>
          Back
        </Button>
          </Form>
      </div>
    );
  }
}

EditProduct.propTypes = {
  cuid: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
};


export default EditProduct;

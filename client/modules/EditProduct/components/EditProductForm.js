import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import callApi from '../../../util/apiCaller';

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuid: props.params.id || 0,
      name: '',
      items: [''],
      errors: [],
      saved: false,
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
    const errors = [];
    this.state.items.map((item, idx) => !item.length && errors.push(idx));
    this.setState({ errors });
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
      if (res.product) {
        this.props.router.push('/');
      } else {
        // to-do better error handling
        console.log('error');
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.saved && <Redirect to="/" />}
        <input
          name="name"
          value={this.state.name}
          onChange={this.handleName}
          autoComplete="off"
          className={!this.state.name.length && 'error'}
        />
        <ul>
          {this.state.items.map((item, idx) => {
            return (
              <li key={`item${idx}`}>
                <input
                  key={`input${idx}`}
                  name={idx}
                  value={item}
                  onChange={this.handleChange}
                  autoComplete="off"
                  className={this.state.errors.includes(idx) && 'error'}
                />
                <button
                  key={`del${idx}`}
                  name={idx}
                  onClick={this.handleDelete}
                  disabled={!idx}
                >
                  DEL
                </button>
                <button
                  key={`add${idx}`}
                  name={idx}
                  onClick={this.handleAdd}
                  disabled={!item.length}
                >
                  ADD
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={this.handleSubmit}>Save</button>
      </div>
    );
  }
}

EditProduct.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  router: PropTypes.shape({
    push: PropTypes.string,
  }),
};

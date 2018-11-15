import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      first: 'testinit',
      items: ['test0', 'test1', 'test2'],
    };
  }

  handleChange = e => {
    console.log('hit', e.target.name);
    e.preventDefault();
    const items = [...this.state.items];
    items[Number(e.target.name)] = e.target.value;
    this.setState({ items });
  }

  handleAdd = e => {

  }

  handleDelete = e => {

  }

  handleSave = e => {

  }

  render() {
    return (
      <ul>
        {this.state.items.map((item, idx) => {
          return (
            <li>
              <input
                name={idx}
                value={this.state.items[idx]}
                onChange={this.handleChange}
                autoComplete="off"
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

EditProduct.propTypes = {
  id: PropTypes.string,
};

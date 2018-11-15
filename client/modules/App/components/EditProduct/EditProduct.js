import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      items: [''],
      errors: [],
    };
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
      console.log('ready to submit');
    }
  }

  render() {
    return (
      <div>
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
  id: PropTypes.string,
};

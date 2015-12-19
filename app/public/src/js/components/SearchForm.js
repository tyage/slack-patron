import React from 'react';
import SlackActions from '../actions/SlackActions';

let getState = () => {
  return {
  };
};

export default React.createClass({
  getInitialState() {
    return getState();
  },
  componentDidMount() {
  },
  _onSearch(e) {
    console.log(this.refs.search.value);
    console.log(this.refs)
    e.preventDefault();
  },
  render() {
    return (
      <div className="search-form-wrapper">
        <form className="search-form" onSubmit={this._onSearch}>
          <input type="search" ref="search" />
        </form>
      </div>
    );
  }
});

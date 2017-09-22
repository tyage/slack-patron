import React, { Component } from 'react';
import SlackActions from '../actions/SlackActions';

export default class extends Component {
  componentDidMount() {
  }
  _onSearch(e) {
    e.preventDefault();

    SlackActions.updateSearchWord(this.refs.search.value)
    // TODO: update URL
  }
  render() {
    return (
      <div className="search-form-wrapper">
        <form className="search-form" onSubmit={this._onSearch}>
          <input type="search" ref="search" />
        </form>
      </div>
    );
  }
}

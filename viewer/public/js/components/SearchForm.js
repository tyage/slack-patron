import React from 'react';
import { connect } from 'react-redux'
import SlackActions from '../actions/SlackActions';

class SearchForm extends React.Component {
  onSearch(e) {
    e.preventDefault();

    this.props.updateSearchWord(this.refs.search.value);
  }
  render() {
    return (
      <div className="search-form-wrapper">
        <form className="search-form" onSubmit={this.onSearch.bind(this)}>
          <input type="search" ref="search" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchWord: searchWord => {
      dispatch(SlackActions.updateSearchWord(searchWord));
    }
  };
};

export default connect(null, mapDispatchToProps)(SearchForm);

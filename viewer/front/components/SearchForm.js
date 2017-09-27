import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import SlackActions from '../actions/SlackActions';

import './SearchForm.less';

class SearchForm extends React.Component {
  onSearch(e) {
    e.preventDefault();

    this.props.updateSearchWord(this.refs.search.value);
  }
  render() {
    const searchWord = this.props.match ? this.props.match.params.searchWord : '';
    return (
      <div className="search-form-wrapper">
        <form className="search-form" onSubmit={this.onSearch.bind(this)}>
          <input type="search" ref="search" defaultValue={searchWord} placeholder="Search" />
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
const ConnectedSearchForm = connect(null, mapDispatchToProps)(SearchForm);

const SearchFormWithRouteParam = () => (
  <Switch>
    <Route path="/search/:searchWord" component={ConnectedSearchForm} />
    <Route path="/" component={ConnectedSearchForm} />
  </Switch>
);

export default SearchFormWithRouteParam;

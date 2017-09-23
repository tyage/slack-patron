import React from 'react';
import { connect } from 'react-redux'
import MessagesList from './MessagesList';
import SlackActions from '../actions/SlackActions';

class SearchMessagesSection extends React.Component {
  componentDidMount() {
    this.initialzeData(this.props.match.params.searchWord);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.searchWord !== nextProps.match.params.searchWord) {
      this.initialzeData(nextProps.match.params.searchWord);
    }
  }
  initialzeData(searchWord) {
    this.props.loadSearchMessages(decodeURIComponent(searchWord));
  }
  render() {
    const { match, loadMoreSearchMessages } = this.props;
    const searchWord = match.params.searchWord;
    return (
      <div className="search-messages">
        <div className="messages-header">
          <div className="title">Search: { searchWord }</div>
        </div>
        <MessagesList onLoadMoreMessages={loadMoreSearchMessages(searchWord)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    router: state.router
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadMoreSearchMessages: searchWord => minTs => {
      dispatch(SlackActions.searchMore(searchWord, minTs));
    },
    loadSearchMessages: searchWord => {
      dispatch(SlackActions.search(searchWord));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMessagesSection);

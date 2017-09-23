import React from 'react';
import { connect } from 'react-redux'

const SearchMessagesSection = ({ searchWord, loadMoreSearchMessages }) => (
  <div className="search-messages">
    <div className="messages-header">
      <div className="title">Search: { searchWord }</div>
    </div>
    <MessagesList onLoadMoreMessages={loadMoreSearchMessages(searchWord)} />
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    loadMoreSearchMessages: searchWord => minTs => {
      SlackActions.searchMore(searchWord, minTs);
    }
  };
};

export default connect(null, mapDispatchToProps)(SearchMessagesSection);

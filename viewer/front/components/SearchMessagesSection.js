import React from 'react';
import { connect } from 'react-redux'
import MessagesList from './MessagesList';
import SlackActions from '../actions/SlackActions';

class SearchMessagesSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }
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
  handleToggleSidebar(event) {
    event.stopPropagation();
    this.props.openSidebar();
  }
  render() {
    const { match, loadMoreSearchMessages } = this.props;
    const searchWord = match.params.searchWord;
    return (
      <div className="search-messages">
        <div className="messages-header">
          <div className="toggle-sidebar" onClick={this.handleToggleSidebar}>
            <div className="bar"/>
            <div className="bar"/>
            <div className="bar"/>
          </div>
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
    openSidebar: () => {
      dispatch(SlackActions.openSidebar());
    },
    loadMoreSearchMessages: searchWord => params => {
      dispatch(SlackActions.searchMore(searchWord, params));
    },
    loadSearchMessages: searchWord => {
      dispatch(SlackActions.search(searchWord));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMessagesSection);

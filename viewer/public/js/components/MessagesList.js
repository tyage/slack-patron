import React from 'react';
import { connect } from 'react-redux'
import $ from 'jquery';
import SlackMessage from './SlackMessage';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingMore: false
    };
  }
  scrollToLastMessage() {
    $(this.refs.messagesList).scrollTop(this.currentHeight());
  }
  currentHeight() {
    return this.refs.messagesList.scrollHeight;
  }
  handleLoadMore() {
    if (this.state.isLoadingMore) {
      return;
    }

    this.setState({ isLoadingMore: true });
    this.oldHeight = this.currentHeight();

    const minTs = (this.props.messages.length > 0) && this.props.messages[0].ts;
    this.props.onLoadMoreMessages(minTs);
  }
  componentDidMount() {
    this.scrollToLastMessage();
  }
  componentDidUpdate() {
    if (this.scrollBackAfterUpdate) {
      // fix scrollTop when load more messages
      $(this.refs.messagesList).scrollTop(
        this.currentHeight() - (this.oldHeight || 0)
      );
      this.scrollBackAfterUpdate = false;
    }
    if (this.scrollToLastMessageAfterUpdate) {
      this.scrollToLastMessage();
      this.scrollToLastMessageAfterUpdate = false;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isLoadingMore && nextProps.messages !== this.props.messages) {
      this.scrollBackAfterUpdate = true;
      this.setState({ isLoadingMore: false });
    }
    if (nextProps.messagesInfo !== this.props.messagesInfo) {
      this.scrollToLastMessageAfterUpdate = true;
    }
  }
  render() {
    const createMessages = (messages) => messages.map(message => (
        <SlackMessage message={message} users={this.props.users}
          teamInfo={this.props.teamInfo}
          channels={this.props.channels}
          ims={this.props.ims}
          key={message.ts}
          type={this.props.messagesInfo.type} />
      ));
    const loadMoreSection = () => {
      if (!this.props.hasMoreMessage) {
        return;
      }

      if (this.state.isLoadingMore) {
        return <div className="messages-load-more loading">Loading...</div>;
      } else {
        return (
          <div className="messages-load-more" onClick={this.handleLoadMore.bind(this)}>
            Load more messages...
          </div>
        );
      }
    };

    return (
      <div className="messages-list" ref="messagesList">
        {loadMoreSection()}
        {createMessages(this.props.messages)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    hasMoreMessage: state.messages.hasMoreMessage,
    messagesInfo: state.messages.messagesInfo,
    users: state.users,
    channels: state.channels,
    ims: state.ims,
    teamInfo: state.teamInfo
  };
};

export default connect(mapStateToProps)(MessagesList);

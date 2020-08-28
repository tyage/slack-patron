import React from 'react';
import { connect } from 'react-redux'
import MessagesList from './MessagesList';
import SlackActions from '../actions/SlackActions';
import ThreadMessagesHeader from './ThreadMessagesHeader';

class ThreadMessagesSection extends React.Component {
  componentDidMount() {
    this.initialzeData(this.props.match.params.channel, this.props.match.params.thread_ts, this.props.match.params.ts);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.channel !== nextProps.match.params.channel ||
      this.props.match.params.ts !== nextProps.match.params.ts ||
      this.props.match.params.thread_ts !== nextProps.match.params.thread_ts
    ) {
      this.initialzeData(nextProps.match.params.channel, nextProps.match.params.thread_ts, nextProps.match.params.ts);
    }
  }
  initialzeData(channel, thread_ts, ts) {
    this.props.loadThreadMessages(channel, thread_ts, ts);
  }
  render() {
    const channel = this.props.match.params.channel;
    return (
      <div className="thread-messages">
        <ThreadMessagesHeader currentChannelId={channel} />
        <MessagesList scrollToTs={this.props.match.params.ts} onLoadMoreMessages={this.props.loadMoreThreadMessages(channel, this.props.match.params.thread_ts)} />
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
    loadMoreThreadMessages: (channel, thread_ts) => params => {
      dispatch(SlackActions.getMoreMessages(channel, params, thread_ts));
    },
    loadThreadMessages: (channel, thread_ts, ts) => {
      dispatch(SlackActions.getAroundMessages(channel, ts, thread_ts));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadMessagesSection);

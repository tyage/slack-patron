import React from 'react';
import { connect } from 'react-redux'
import ChannelMessagesHeader from './ChannelMessagesHeader';
import MessagesList from './MessagesList';
import SlackActions from '../actions/SlackActions';

class ChannelMessagesSection extends React.Component {
  componentDidMount() {
    this.initialzeData(this.props.match.params.channel, this.props.match.params.ts);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.channel !== nextProps.match.params.channel ||
      this.props.match.params.ts !== nextProps.match.params.ts
    ) {
      this.initialzeData(nextProps.match.params.channel, nextProps.match.params.ts);
    }
  }
  initialzeData(channel, ts) {
    this.props.loadChannelMessages(channel, ts);
  }
  render() {
    const channel = this.props.match.params.channel;
    return (
      <div className="channel-messages">
        <ChannelMessagesHeader currentChannelId={channel} />
        <MessagesList scrollToTs={this.props.match.params.ts} onLoadMoreMessages={this.props.loadMoreChannelMessages(channel)} />
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
    loadMoreChannelMessages: channel => params => {
      dispatch(SlackActions.getMoreMessages(channel, params));
    },
    loadChannelMessages: (channel, ts) => {
      if (ts) {
        dispatch(SlackActions.getAroundMessages(channel, ts));
      } else {
        dispatch(SlackActions.getMessages(channel));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessagesSection);

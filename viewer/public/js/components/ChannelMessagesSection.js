import React from 'react';
import { connect } from 'react-redux'
import ChannelMessagesHeader from './ChannelMessagesHeader';
import MessagesList from './MessagesList';
import SlackActions from '../actions/SlackActions';

class ChannelMessagesSection extends React.Component {
  componentDidMount() {
    this.initialzeData(this.props.match.params.channel);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.channel !== nextProps.match.params.channel) {
      this.initialzeData(nextProps.match.params.channel);
    }
  }
  initialzeData(channel) {
    this.props.loadChannelMessages(channel);
  }
  render() {
    const channel = this.props.match.params.channel;
    return (
      <div className="channel-messages">
        <ChannelMessagesHeader currentChannelId={ channel } />
        <MessagesList onLoadMoreMessages={this.props.loadMoreChannelMessages(channel)} />
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
    loadMoreChannelMessages: channel => minTs => {
      dispatch(SlackActions.getMoreMessages(channel, minTs));
    },
    loadChannelMessages: channel => {
      dispatch(SlackActions.getMessages(channel));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessagesSection);

import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import MessagesList from './MessagesList';
import SlackActions from '../actions/SlackActions';

class ThreadMessagesSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    const params = new URLSearchParams(props.location.search);
    this.state = {
      ts: params.get('ts'),
    };
  }
  componentDidMount() {
    this.initialzeData(this.props.match.params.thread_ts);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.thread_ts !== nextProps.match.params.thread_ts
    ) {
      this.initialzeData(nextProps.match.params.thread_ts);
    }
  }
  initialzeData(thread_ts) {
    this.props.loadThreadMessages(thread_ts);
  }
  handleToggleSidebar(event) {
    event.stopPropagation();
    this.props.openSidebar();
  }
  getChannelName() {
    if (this.props.messages.length === 0 || !this.props.channels) {
      return '';
    }
    const initialMessage = this.props.messages[0];
    if (!this.props.channels.hasOwnProperty(initialMessage.channel)) {
      return '';
    }
    return `#${this.props.channels[initialMessage.channel].name}`;
  }
  getChannelLink() {
    if (this.props.messages.length === 0) {
      return '';
    }
    const initialMessage = this.props.messages[0];
    return `/${initialMessage.channel}/${initialMessage.ts}`;
  }
  render() {
    return (
      <div className="thread-messages">
        <div className="messages-header">
          <div className="toggle-sidebar" onClick={this.handleToggleSidebar}>
            <div className="bar"/>
            <div className="bar"/>
            <div className="bar"/>
          </div>
          <div className="title">Thread in <Link to={this.getChannelLink()}>{this.getChannelName()}</Link></div>
        </div>
        <MessagesList scrollToTs={this.state.ts} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    router: state.router,
    messages: state.messages.messages,
    channels: state.channels.channels,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openSidebar: () => {
      dispatch(SlackActions.openSidebar());
    },
    loadThreadMessages: (thread_ts) => {
      dispatch(SlackActions.getThreadMessages(thread_ts));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadMessagesSection);

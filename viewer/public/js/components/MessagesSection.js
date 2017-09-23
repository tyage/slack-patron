import React from 'react';
import MessagesList from './MessagesList';
import SearchMessagesSection from './SearchMessagesSection';
import ChannelMessagesSection from './ChannelMessagesSection';
import MessagesType from '../constants/MessagesType';

const MessageSection = ({ isMessageLoading }) => {
  let messages = () => (
    <Switch>
      <Route path="/search/:searchWord" component={ SearchMessagesSection }>
      <Route path="/:channel" component={ ChannelMessagesSection }>
    </Switch>
  };
  let loadingMessages = () => (
    <div className="loading-messages">
      <h2 className="title">Now loading...</h2>
    </div>
  );
  return (
    <div className="messages">
      { isMessageLoading ? loadingMessages() : messages() }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isMessageLoading: state.isMessageLoading
  };
};

export default connect(mapStateToProps)(MessagesSection);

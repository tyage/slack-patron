import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import SearchMessagesSection from './SearchMessagesSection';
import ChannelMessagesSection from './ChannelMessagesSection';

const messages = () => (
  <Switch>
    <Route path="/search/:searchWord" component={ SearchMessagesSection } />
    <Route path="/:channel" component={ ChannelMessagesSection } />
  </Switch>
);
const loadingMessages = () => (
  <div className="loading-messages">
    <h2 className="title">Now loading...</h2>
  </div>
);
const MessagesSection = ({ isMessageLoading }) => (
  <div className="messages">
    { isMessageLoading ? loadingMessages() : messages() }
  </div>
);

const mapStateToProps = state => {
  return {
    isMessageLoading: state.isMessageLoading,
    router: state.router
  };
};

export default connect(mapStateToProps)(MessagesSection);

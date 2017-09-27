import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import SearchMessagesSection from './SearchMessagesSection';
import ChannelMessagesSection from './ChannelMessagesSection';

import './MessagesSection.less';

const MessagesSection = ({ isMessageLoading }) => (
  <div className="messages">
    { isMessageLoading ? (
        <div className="loading-messages">
          <h2 className="title">Now loading...</h2>
        </div>
      ) : null }
    <Switch>
      <Route path="/search/:searchWord" component={ SearchMessagesSection } />
      <Route path="/:channel/:ts" component={ ChannelMessagesSection } />
      <Route path="/:channel" component={ ChannelMessagesSection } />
    </Switch>
  </div>
);

const mapStateToProps = state => {
  return {
    isMessageLoading: state.isMessageLoading,
    router: state.router
  };
};

export default connect(mapStateToProps)(MessagesSection);

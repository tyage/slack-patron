import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import SearchMessagesSection from './SearchMessagesSection';
import ChannelMessagesSection from './ChannelMessagesSection';
import ThreadMessagesSection from './ThreadMessagesSection';
import SlackActions from '../actions/SlackActions';

import './MessagesSection.less';

const MessagesSection = ({ isMessageLoading, closeSidebar }) => (
  <div className="messages" onClick={closeSidebar}>
    { isMessageLoading ? (
        <div className="loading-messages">
          <h2 className="title">Now loading...</h2>
        </div>
      ) : null }
    <Switch>
      <Route path="/search/:searchWord" component={ SearchMessagesSection } />
      <Route path="/thread/:channel/:thread_ts/:ts" component={ ThreadMessagesSection } />
      <Route path="/:channel/:ts" component={ ChannelMessagesSection } />
      <Route path="/:channel" component={ ChannelMessagesSection } />
    </Switch>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    closeSidebar: () => {
      dispatch(SlackActions.closeSidebar());
    },
  };
};

const mapStateToProps = state => {
  return {
    isMessageLoading: state.isMessageLoading,
    router: state.router
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesSection);

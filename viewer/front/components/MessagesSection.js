import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router';
import SearchMessagesSection from './SearchMessagesSection';
import ChannelMessagesSection from './ChannelMessagesSection';
import ThreadMessagesSection from './ThreadMessagesSection';
import JumpToWindow from './JumpToWindow';
import SlackActions from '../actions/SlackActions';

import './MessagesSection.less';

class MessagesSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.state = {
      showJumpToWindow: false
    };
  }
  toggleJumpToWindow() {
    this.setState({
      showJumpToWindow: !this.state.showJumpToWindow
    });
  }
  handleKeydown(event){
    if(event.ctrlKey && event.key === "k") {
      this.toggleJumpToWindow();
      event.preventDefault();
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeydown, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeydown, false);
  }
  render() {
    return (
      <div className="messages" onClick={this.props.closeSidebar}>
        { this.props.isMessageLoading ? (
            <div className="loading-messages">
              <h2 className="title">Now loading...</h2>
            </div>
          ) : null }
        <Switch>
          <Route path="/search/:searchWord" component={ SearchMessagesSection } />
          <Route path="/thread/:thread_ts" component={ ThreadMessagesSection } />
          <Route path="/:channel/:ts" component={ ChannelMessagesSection } />
          <Route path="/:channel" component={ ChannelMessagesSection } />
        </Switch>
        {
          this.state.showJumpToWindow &&
            <JumpToWindow toggleJumpToWindow={this.toggleJumpToWindow.bind(this)} />
        }
      </div>
    );
  }
}

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

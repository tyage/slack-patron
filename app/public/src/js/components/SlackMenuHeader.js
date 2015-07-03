import React from 'react';
import SlackTeamStore from '../stores/SlackTeamStore';
import SlackActions from '../actions/SlackActions';

let getState = () => {
  return {
    teamInfo: SlackTeamStore.getTeamInfo()
  };
};

export default React.createClass({
  getInitialState() {
    return getState();
  },
  _onTeamInfoChange() {
    this.setState(getState());
    console.log(this.state)
  },
  componentDidMount() {
    SlackTeamStore.addChangeListener(this._onTeamInfoChange);
    SlackActions.getTeamInfo();
  },
  render() {
    return (
      <div className="slack-menu-header">
        <div class="team-info">
          <div class="team-name">{this.state.teamInfo.name}</div>
        </div>
        <ul class="menu-items">
          <li class="menu-item"></li>
        </ul>
      </div>
    );
  }
});

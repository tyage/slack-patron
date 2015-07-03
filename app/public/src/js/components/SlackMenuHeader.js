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
  },
  componentDidMount() {
    SlackTeamStore.addChangeListener(this._onTeamInfoChange);
    SlackActions.getTeamInfo();
  },
  render() {
    return (
      <div className="slack-menu-header">
        <div className="team-info">
          <span className="team-name">{this.state.teamInfo.name}</span>
        </div>
        <ul className="menu-items">
          <li className="menu-item"></li>
        </ul>
      </div>
    );
  }
});

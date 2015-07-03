import React from 'react';
import _ from 'lodash';
import SlackTeamStore from '../stores/SlackTeamStore';
import SlackActions from '../actions/SlackActions';

let getState = () => {
  return {
    teamInfo: SlackTeamStore.getTeamInfo()
  };
};

export default React.createClass({
  getInitialState() {
    return _.merge(getState(), {
      showMenu: false
    });
  },
  _onTeamInfoChange() {
    this.setState(getState());
  },
  componentDidMount() {
    SlackTeamStore.addChangeListener(this._onTeamInfoChange);
    SlackActions.getTeamInfo();
  },
  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  },
  render() {
    return (
      <div className="slack-menu-header">
        <div className="team-info" onClick={this.toggleMenu}>
          <span className="team-name">{this.state.teamInfo.name}</span>
          <p className="menu-toggler"></p>
        </div>
        {
          this.state.showMenu &&
            <ul className="menu-items">
              <li className="menu-item">Preferences</li>
              <li className="menu-item">Configure Logger</li>
            </ul>
        }
      </div>
    );
  }
});

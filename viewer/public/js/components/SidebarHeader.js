import React, { Component } from 'react';
import _ from 'lodash';
import SlackTeamStore from '../stores/SlackTeamStore';
import SlackActions from '../actions/SlackActions';
import ConfigureWindow from './ConfigureWindow';

let getState = () => {
  return {
    teamInfo: SlackTeamStore.getTeamInfo()
  };
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = _.merge(getState(), {
      showConfigureWindow: null
    });
  }
  _onTeamInfoChange() {
    this.setState(getState());
  }
  componentDidMount() {
    SlackTeamStore.addChangeListener(this._onTeamInfoChange.bind(this));
  }
  componentWillUnmount() {
    SlackTeamStore.removeChangeListener(this._onTeamInfoChange);
  }
  toggleConfigureWindow() {
    this.setState({
      showConfigureWindow: !this.state.showConfigureWindow
    });
  }
  render() {
    return (
      <div>
        <div className="sidebar-header">
          <div className="team-info" onClick={this.toggleConfigureWindow}>
            <span className="team-name">{this.state.teamInfo.name}</span>
            <p className="configure-toggler"></p>
          </div>
        </div>
        {
          this.state.showConfigureWindow &&
            <ConfigureWindow toggleConfigureWindow={this.toggleConfigureWindow} />
        }
      </div>
    );
  }
}

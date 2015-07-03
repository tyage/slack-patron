import React from 'react';
import SlackActions from '../actions/SlackActions';
import SlackTeamStore from '../stores/SlackTeamStore';
import LoggerStatusStore from '../stores/LoggerStatusStore';

let getState = () => {
  return {
    teamInfo: SlackTeamStore.getTeamInfo(),
    loggerStatus: LoggerStatusStore.getLoggerStatus()
  };
};

export default React.createClass({
  getInitialState() {
    return getState();
  },
  _onTeamInfoChange() {
    this.setState(getState());
  },
  _onLoggerStatusChange() {
    this.setState(getState());
  },
  componentDidMount() {
    SlackTeamStore.addChangeListener(this._onTeamInfoChange);
    LoggerStatusStore.addChangeListener(this._onLoggerStatusChange);
  },
  startLogger() {
    SlackActions.startLogger();
  },
  stopLogger() {
    SlackActions.stopLogger();
  },
  render() {
    let isLoggerWorking = !!this.state.loggerStatus ;
    return (
      <div>
        <div className="configure-window">
          <div className="configure-section">
            <p className="section-title">Import Slack Data</p>
            <p>Import a Slack data from zipfile</p>
            <p>You can export Slack data from <a href={`https://${this.state.teamInfo.domain}.slack.com/services/export`} target="_blank">here</a>(You need administrator privileges)</p>
            <div>
              <input type="file" />
            </div>
          </div>
          <div className="configure-section">
            <p className="section-title">Slack Data Logger</p>
            <p>Fetch Slack event of messages, channels and users with Realtime API</p>
            <p>
              Logger status:
              <span id="logger-status">{this.state.loggerStatus ? 'working' : 'stopped'}</span>
            </p>
            <div id="logger-configure-form">
              <label>
                <input type="radio" name="logger" onChange={this.startLogger} checked={isLoggerWorking} />
                <span>On</span>
              </label>
              <label>
                <input type="radio" name="logger" onChange={this.stopLogger} checked={!isLoggerWorking} />
                <span>Off</span>
              </label>
            </div>
          </div>
        </div>
        <div className="configure-background" onClick={this.props.toggleConfigureWindow}></div>
      </div>
    );
  }
});

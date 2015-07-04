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
  importData(e) {
    e.preventDefault();
    let formData = new FormData(React.findDOMNode(this.refs.importData));
    SlackActions.importData(formData);

    let importFile = React.findDOMNode(this.refs.importFile);
    importFile.value = "";
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
            <form id="import-slack-data-form" onSubmit={this.importData} ref="importData">
              <div className="form-section">
                <input type="file" name="file" ref="importFile" />
              </div>
              <div className="form-section">
                <input className="submit-button" type="submit" value="Import data" />
              </div>
            </form>
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

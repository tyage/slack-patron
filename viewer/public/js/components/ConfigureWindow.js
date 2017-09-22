import React, { Component } from 'react';
import SlackActions from '../actions/SlackActions';
import SlackTeamStore from '../stores/SlackTeamStore';

let getState = () => {
  return {
    teamInfo: SlackTeamStore.getTeamInfo()
  };
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }
  _onTeamInfoChange() {
    this.setState(getState());
  }
  componentDidMount() {
    SlackTeamStore.addChangeListener(this._onTeamInfoChange);
  }
  componentWillUnmount() {
    SlackTeamStore.removeChangeListener(this._onTeamInfoChange);
  }
  importBackup(e) {
    e.preventDefault();
    let formData = new FormData(this.refs.importBackup);
    SlackActions.importBackup(formData);

    this.refs.backupFile.value = '';
  }
  render() {
    return (
      <div>
        <div className="configure-window">
          <div className="configure-section">
            <p className="section-title">Import Slack Backup File</p>
            <p>Import a Slack backup file</p>
            <p>You can download Slack backup file from <a href={`https://${this.state.teamInfo.domain}.slack.com/services/export`} target="_blank">this page</a>(You need administrator privileges)</p>
            <form id="import-slack-backup-form" onSubmit={this.importBackup} ref="importBackup">
              <div className="form-section">
                <input type="file" name="file" ref="backupFile" />
              </div>
              <div className="form-section">
                <input className="submit-button" type="submit" value="Import backup file" />
              </div>
            </form>
          </div>
        </div>
        <div className="configure-background" onClick={this.props.toggleConfigureWindow}></div>
      </div>
    );
  }
}

import React from 'react';
import { connect } from 'react-redux'
import SlackActions from '../actions/SlackActions';

class ConfigureWindow extends React.Component {
  importBackup(e) {
    e.preventDefault();
    let formData = new FormData(this.refs.importBackup);
    this.props.importBackup(formData);
    this.refs.backupFile.value = '';
  }
  render() {
    return (
      <div>
        <div className="configure-window">
          <div className="configure-section">
            <p className="section-title">Import Slack Backup File</p>
            <p>Import a Slack backup file</p>
            <p>You can download Slack backup file from <a href={`https://${this.props.teamInfo.domain}.slack.com/services/export`} target="_blank">this page</a>(You need administrator privileges)</p>
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

const mapStateToProps = state => {
  return {
    teamInfo: state.teamInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    importBackup: (formData) => {
      dispatch(SlackActions.importBackup(formData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureWindow);

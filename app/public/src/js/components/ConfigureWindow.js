import React from 'react';
import SlackActions from '../actions/SlackActions';

export default React.createClass({
  startLogger() {
    SlackActions.startLogger();
  },
  stopLogger() {
    SlackActions.stopLogger();
  },
  render() {
    return (
      <div>
        <div className="configure-window">
          <div className="configure-section">
            <p className="section-title">Slack Data Logger</p>
            <p>Fetch Slack event of messages, channels and users with Realtime API</p>
            <div id="logger-configure-form">
              <label>
                <input type="radio" name="logger" onChange={this.startLogger} />
                <span>On</span>
              </label>
              <label>
                <input type="radio" name="logger" onChange={this.stopLogger} />
                <span>Off</span>
              </label>
            </div>
          </div>
          <div className="configure-section">
            <p className="section-title">Import Slack Data</p>
            <div>
              <input type="file" />
            </div>
          </div>
        </div>
        <div className="configure-background" onClick={this.props.toggleConfigureWindow}></div>
      </div>
    );
  }
});

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        <div className="configure-window">
          <div className="configure-section">
            <p className="section-title">Realtime Message Logger</p>
            <p>Fetch Slack event of messages, channels and users with Realtime API</p>
            <div id="realtime-configure-form">
              <label>
                <input type="radio" name="realtime" />
                <span>On</span>
              </label>
              <label>
                <input type="radio" name="realtime" />
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

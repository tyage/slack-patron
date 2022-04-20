import React from 'react';

import './ModalWindow.less';

class ModalWindow extends React.Component {
  render() {
    return (
      <div>
        <div className="modal-window">
          <div className="modal-section">
            <p className="section-title">{this.props.title}</p>
            <div className="section-content">
              {this.props.children}
            </div>
          </div>
        </div>
        <div className="modal-background" onClick={this.props.toggleModalWindow}></div>
      </div>
    );
  }
}

export default ModalWindow;

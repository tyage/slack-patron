import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import ModalWindow from './ModalWindow';

import 'react-datepicker/dist/react-datepicker.css';
import './JumpToWindow.less';

class JumpToWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectChannel: null,
    };
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  handleChangeChannel(value) {
    this.setState({selectChannel: value});
  }
  getChannelOptions() {
    return Object.entries(this.props.channels).map(([k, v]) => (
      {value: k, label: v.name}
    ));
  }
  handleKeydown(event){
    if(event.key === "Esc" || event.key === "Escape") {
      this.props.toggleJumpToWindow();
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeydown, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeydown, false);
  }
  jump(e) {
    e.preventDefault();
    this.props.jumpToChannel(this.state.selectChannel.value);
    this.props.toggleJumpToWindow();
  }
  render() {
    return (
      <div>
        <ModalWindow
          toggleModalWindow={this.props.toggleJumpToWindow}
          title="Jump to ..."
        >
          <form id="jump-to-form" onSubmit={this.jump.bind(this)}>
            <div className="form-section">
              <Select
                autoFocus
                onChange={this.handleChangeChannel.bind(this)}
                options={this.getChannelOptions()}
                value={this.state.selectChannel}
              />
            </div>
            <div className="form-section">
              <input type="submit" value="Go" />
            </div>
          </form>
        </ModalWindow>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    jumpToChannel: (channel) => {
      dispatch(push(`/${channel}`));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(JumpToWindow);

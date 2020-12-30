import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class ChannelMention extends React.Component {
  getChannel(id) {
    const channels = this.props.channels;
    const ims = this.props.ims;
    if (channels && channels[id]) {
      return channels[id];
    }
    if (ims && ims[id]) {
      return ims[id];
    }
  }
  render() {
    const channel = this.getChannel(this.props.id);
    return (
      <Link className="channel-mention" to={`/${this.props.id}`}>
        #{channel && channel.name}
      </Link>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    ims: state.channels.ims,
  };
};

export default connect(mapStateToProps)(ChannelMention);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { EmojiData } from 'emoji-data-ts';

const emojiData = new EmojiData();

class Emoji extends Component {
  getEmojiImage(name) {
    const data = emojiData.getImageData(name);
    if (data) {
      return `https://cdn.jsdelivr.net/gh/iamcal/emoji-data@v4.1.0/img-apple-64/${data.imageUrl}`
    }
    const emojis = this.props.emojis;
    const emoji = emojis && emojis[name];
    if (emoji && emoji.startsWith('alias:')) {
      return this.getEmojiImage(emoji.split(':')[1]);
    }
    return emoji;
  }
  render() {
    const image = this.getEmojiImage(this.props.name);
    if (image) {
      return <img className="emoji" src={image} />;
    }
    return <span>:{name}:</span>;
  }
}

const mapStateToProps = state => {
  return {
    emojis: state.emojis,
  };
};

export default connect(mapStateToProps)(Emoji);

import React, { Component } from 'react';
import Emoji from './Emoji';
import UserMention from './UserMention';
import ChannelMention from './ChannelMention';

import './Block.less';

class RichTextSection extends Component {
  getClasses(style) {
    const {bold, italic, code, strike} = style || {};
    return [
      ...(bold ? ['bold'] : []),
      ...(italic ? ['italic'] : []),
      ...(strike ? ['strike'] : []),
      ...(code ? ['code'] : []),
    ].join(' ');
  }
  render() {
    const {elements} = this.props;
    return (
      <div className="rich-text-section">
        {
          elements.map((element, index) => {
            if (element.type === 'text') {
              return <span key={index} className={this.getClasses(element.style)}>{element.text}</span>
            }
            if (element.type === 'link') {
              return (
                <a
                  key={index}
                  href={element.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={this.getClasses(element.style)}
                >
                  {element.text || element.url}
                </a>
              );
            }
            if (element.type === 'emoji') {
              return <Emoji key={index} name={element.name} className={this.getClasses(element.style)} />
            }
            if (element.type === 'user') {
              return <UserMention key={index} id={element.user_id} className={this.getClasses(element.style)} />
            }
            if (element.type === 'channel') {
              return <ChannelMention key={index} id={element.channel_id} className={this.getClasses(element.style)} />
            }
            if (element.type === 'broadcast') {
              return <span key={index} className={this.getClasses(element.style)}>@{element.range}</span>
            }
            return <code key={index}>{JSON.stringify(element)}</code>
          })
        }
      </div>
    );
  }
}

class RichTextBlock extends Component {
  render() {
    const {elements} = this.props;
    return (
      <div className="rich-text-block">
        {
          elements.map((element, index) => {
            if (element.type === 'rich_text_section') {
              return <RichTextSection key={index} elements={element.elements} />
            }
            return <span style={{color: 'red'}}>ERROR: Unsupported element type {element.type}</span>
          })
        }
      </div>
    );
  }
}

export default class extends Component {
  render() {
    const {block} = this.props;
    if (block.type === 'rich_text') {
      return (
        <div className="slack-message-block">
          <RichTextBlock elements={block.elements} />
          <pre>
            {JSON.stringify(block, null, '  ')}
          </pre>
        </div>
      )
    }
    return (
      <div className="slack-message-block">
        <pre>
          {JSON.stringify(block, null, '  ')}
        </pre>
      </div>
    );
  }
}

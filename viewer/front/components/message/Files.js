import React, { Component } from 'react';
import MrkdwnText from './MrkdwnText';

import './Files.less';

export default class extends Component {
  render() {
    const {files} = this.props;
    return (
      <div className="slack-message-files">
        { files.map((file) => (
          <div key={file.id} className="slack-message-file">
            {file.mimetype && file.mimetype.startsWith('image/') ? (
              <div className="file-thumb">
                <div className="file-title">{file.title} ({file.original_w}x{file.original_h}, {(file.size / 1024).toFixed(2)}KB, {file.pretty_type})</div>
                <a href={file.url_private_download} target="_blank" rel="noopener noreferrer">
                  <img src={file.url_private_download}/>
                </a>
              </div>
            ) : (
              <a href={file.url_private_download} target="_blank" rel="noopener noreferrer">
                <div className="file-no-thumb">
                  <div className="file-no-thumb-title">{file.title}</div>
                  <div className="file-no-thumb-description">{(file.size / 1024).toFixed(2)}KB, {file.pretty_type}</div>
                </div>
              </a>
            )}
          </div>
        )) }
      </div>
    );
  }
}

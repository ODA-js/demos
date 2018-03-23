import React from 'react';
import Dropzone from 'react-dropzone';

class FileUploader extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      files: []
    };
  }

  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles,
      multiple: false,
    });
  }

  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    return (
      <div className="dropzone-upload">
        <Dropzone className="dropzone" ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop.bind(this)}>
          <div className="dropzone-text"><b>Try dropping</b> some files here, or <b>click</b> to select files to upload <i className="fa fa-upload" /></div>
        </Dropzone>
        {this.state.files.length > 0 ? <div>
          <h2>Uploading file...</h2>
          <div>{this.state.files.map((file, i) => <img key={i} alt='preview...' src={file.preview} />)}</div>
        </div> : null}
      </div>
    );
  }
};

export default FileUploader;
import React from 'react';
import FileUploader from './file_uploader';
import { Modal } from 'react-bootstrap';

const InputFieldName = () => {
  return (
    <div className="field-name-input">
      <label>Blob Field Name *</label>
      <input type="text" onChange={handleChangeInputFieldName} />
    </div>
  )
}

function handleChangeInputFieldName(event) {
  event.preventDefault();
  console.log(event.target.value);
};

class UploadModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <a className="toolbar-button" onClick={this.open.bind(this)}>
          Upload
        </a>

        <Modal className="upload-modal" show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Upload <i className="fa fa-upload"></i></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputFieldName />
            <FileUploader />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close.bind(this)}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default UploadModal;
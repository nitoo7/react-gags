import React from 'react';
import { Button, Modal, Upload, Card, Icon} from 'antd';
import GoogleSignIn from '../GoogleSignIn'
import './Header.css';
const Dragger = Upload.Dragger;

class Header extends React.Component {

  state = {
    modal2Visible: false,
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-title">
          <p className="title">GAG</p>
        </div>
        <div className="header-selectors">
          <p>Trending</p>
          <p>Latest</p>
        </div>
        <div className="header-btns">
          <Button type="primary" onClick={() => this.setModal2Visible(true)}>+ Upload</Button>
          <GoogleSignIn />
        </div>

        <Modal
          title="Upload a Post"
          wrapClassName="vertical-center-modal"
          visible={this.state.modal2Visible}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>        
          <div className="custom-image">
            <Dragger>
            <p className="ant-upload-text">Drop image to upload or choose files</p>
            <Button type="primary">Choose files...</Button>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
          </Dragger>
          </div>
        </Card>
        </Modal>

      </div>
    );
  }
}

export default Header;
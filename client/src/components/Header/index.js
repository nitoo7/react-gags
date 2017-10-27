import React from 'react';
import { Button, Modal, Upload, Card, Icon} from 'antd';
import GoogleSignIn from '../GoogleSignIn'
import './Header.css';
import { connect } from 'react-redux';
import { postGag } from '../../actions';
const Dragger = Upload.Dragger;

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.postData= {
      gagDesc: "yyyy",
      gagImg: ""
    }
    this.state = {
      modal2Visible: false,
      mediaProps : {
        name: 'file',
        multiple: true,
        showUploadList: false,
        onChange(info) {
          const status = info.file.status;

          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {

            console.log(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
          }
        },        
      }
    }
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
            <Dragger onChange={(info)=>{
              if(info.file.status === "done") {
                this.postData.gagImg = info.file.response.s3Url;
                this.setState({modal2Visible: false});
                console.log("HOLA==>", this.postData);
                this.props.postGag(this.postData);
              }
              }} action="http://localhost:8000/gag/media/upload">
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) =>({
  postGag: (gagData) => {
    dispatch(postGag(gagData));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);
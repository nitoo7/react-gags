import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import './GoogleSignIn.css';
import SignInBtn from '../../assets/googleSignInBtn.png';
import { Modal, Popover, Button } from 'antd';
import {setUserInfo} from '../../actions';

class GoogleSignIn extends React.Component {

  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    this.props.setUserInfo(
      {
        userDetails: response.profileObj,
        userToken: response.tokenId
      }
    )
  }

  render() {
    let content;
    if (this.props.isLoggedIn) {
      const popTitle = (
        <div style={{textAlign: 'center'}}>
          {this.props.userDetails.name}
        </div>
      );
      const popContent = (
        <Button style={{width: '100%' }}>
          Logout
        </Button>
      );
      content = (
        <Popover
          placement="bottomRight"
          title={popTitle}
          content={popContent}
          trigger="click">
          <img className='google-userpic'
            src={this.props.userDetails.imageUrl}
            alt='Profile'/>
        </Popover>
      );
    } else {
      content = (
        <GoogleLogin className='google-login-btn'
            clientId={'409775674375-ik77js1a750tvmf63h7iebhfirgt85rh.apps.googleusercontent.com'}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}>
            <img src={SignInBtn}></img>
          </GoogleLogin>
     );
    }
    return (<div className='login-btn-container'>{content}</div>);
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (userInfo) => {
      dispatch(setUserInfo(userInfo))
    }
  };
};

const mapStateToProps = (state) => {
  console.log("SSSSSS==>", state)
  return {
    isLoggedIn: state.loginInfo.isLoggedIn,
    userDetails: state.userInfo,
    userToken: state.loginInfo.userToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn);

import React from 'react';
import { Card, Icon } from 'antd';
import './GagPage.css';
import GagCard from '../GagCard'
import { connect } from 'react-redux';
import { getGagData } from '../../actions';

class GagPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getGagData(this.props.match.params.id);
  }

  render() {
    return (
      <GagCard gagData={this.props}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGagData: (gagId) => {
      dispatch(getGagData(gagId));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    gagDesc: state.gagInfo.gagDesc,
    gagImg: state.gagInfo.gagImg,
    gagLikesCount: state.gagInfo.gagLikesCount,
    gagLikesList: state.gagInfo.gagLikesList,
    gagDisLikesCount: state.gagInfo.gagDisLikesCount,
    gagDisLikesList: state.gagInfo.gagDisLikesList,
    gagCommentsCount: state.gagInfo.gagCommentsCount,
    gagComments: state.gagInfo.gagComments   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GagPage)
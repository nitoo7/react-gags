import React from 'react';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './GagCard.css';

class GagPage extends React.Component {
  render() {
    console.log("PROPS==>", this.props.gagData)
    return (
      <Card className="gag-card">
        <div className="gag-title">
          <h3>              
            <Link to={'/gag/' + 'aaaa'}>
                {this.props.gagData.gagDesc}
            </Link>
          </h3>
       </div>        
        <div className="gag-image">
          <img alt="example" width="100%" src={this.props.gagData.gagImg} />
        </div>
        <div className="gag-info">
          <div className="gag-btns">
            <Icon type="like" style={{ fontSize: '20px' }} />
            <Icon type="dislike" style={{ fontSize: '20px' }} />
            <Icon type="message" style={{ fontSize: '20px' }}/>            
          </div>
          <div className="gag-stats">
            <span>{this.props.gagData.gagLikesCount}</span>
            <span> likes . </span>
            <span>{this.props.gagData.gagDisLikesCount}</span>
            <span> dislikes . </span>
            <span>{this.props.gagData.gagCommentsCount}</span>
            <span> comments</span>
          </div>
        </div>
      </Card>   
    );
  }
}

export default GagPage;
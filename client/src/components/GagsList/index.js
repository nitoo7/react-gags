import React from 'react';
import GagCard from '../GagCard'
import { connect } from 'react-redux';
import { getGagList } from '../../actions';

class GagsList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getGagList('fresh');
  }

  render() {
    console.log("GAG===>", this.props.gagList)
    return (
      <div>
        {
          this.props.gagList.map((gag) => {
            return (<GagCard gagData={gag} />)
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gagList: state.gagList
})

const mapDispatchToProps = (dispatch) =>({
  getGagList: (filterType) => {
    dispatch(getGagList(filterType));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GagsList);
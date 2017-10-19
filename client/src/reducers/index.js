import { combineReducers } from 'redux';
import loginInfo from './loginInfo';
import userInfo from './userInfo';
import gagInfo from './gagInfo';
import gagList from './gagList'

export default combineReducers({
  loginInfo,
  userInfo,
  gagInfo,
  gagList
});
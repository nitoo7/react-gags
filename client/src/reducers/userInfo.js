export default function(state = {}, action) {
  switch ( action.type ) {
    case 'SET_USER_INFO':
      return action.payload.userDetails
    default: return state;
  }
}
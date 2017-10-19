export default function(state = [], action) {
  switch ( action.type ) {
    case 'GET_GAG_LIST':
      return Object.assign([], state, action.payload);
    default: return state;
  }
}

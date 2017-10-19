export default function(state = {}, action) {
  switch ( action.type ) {
    case 'SET_USER_INFO':
    console.log("HOLA",{...state, 
      isLoggedIn: true,
      userToken: action.payload.userToken       
    })
      return {...state, 
        isLoggedIn: true,
        userToken: action.payload.userToken       
      }
    default: return state;
  }
}
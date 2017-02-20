//this is the file which contains the reducers for the login actions
// which handles the loginReducer action 
//loginReducer function which takes current state and action and return new state
var initailState = {
  user: {},
  isUserLoggedIn: false
}
export default function loginReducer(state = initailState, action) {
  //based on action.type state will be modified
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        user: action.user,
        isUserLoggedIn: action.isUserLoggedIn,
      });
  case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        user: action.user,
        isUserLoggedIn: action.isUserLoggedIn,
      });
    case 'CREATE_LOGOUT':
    
      return Object.assign({}, state, { user: action.user, isUserLoggedIn: action.isUserLoggedIn });
    default:
      return state;
  }
}
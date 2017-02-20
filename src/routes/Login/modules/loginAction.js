// this file contains action related for user login
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const CREATE_LOGOUT = 'CREATE_LOGOUT'
import { APIPATH } from '../../../constant/common'
import { browserHistory } from 'react-router'

// ------------------------------------
// Create Actions
// ------------------------------------
// createLogin is the function  which accepts the user data
export function createLogin (user) {
  return (dispatch) => {
    // fetching userName and password from user
    var userInfo = 'userId=' + user.userName + '&password=' + user.password
    fetch(APIPATH + 'Account/Login?' + userInfo, {
      method: 'GET',
      dataType: 'application/json'
    }).then((response) => response.json())
      .then((responseJson) => {
        // clearing password
        user.password = ''
        if (responseJson.Token != null && typeof responseJson.Token !== 'undefined') {
          // sessionStorage.setItem('jwtToken', responseJson.Token);
           // localStorage.removeItem('jwtToken');
          localStorage.setItem('jwtToken', responseJson.Token)
          user.isLoggedIn = true
          user.failureMessage = ''

          // dispatching the loginSuccess method
          dispatch(loginSuccess(user))
        } else {
          // setting isLogedin false and failureMessage
          user.isLoggedIn = false
          user.failureMessage = 'invalid credentials'
          dispatch(loginFailure(user))
        }
      })
      .catch(function (ex) {
        console.log('action createLogin ', ex)
          // setting isLogedin false and failureMessage
        user.isLogedin = false
        user.failureMessage = 'invalid credentials'
        dispatch(loginFailure(user))
      })
  }
}

// loginSuccess is the function  which accepts the user data, it is called form createLogin if login method is success
export function loginSuccess (user) {
  
  // redirecting to requisitionList
  browserHistory.push('/requisitionList')

  // returning the action
  // returning the plain object that must have type property
  // for LOGIN_SUCCESS action passing user data and isUserLoggedIn
  return {
    type: LOGIN_SUCCESS, // defining the name of the action to identify in the reducer
    user: user, // passing user object
    isUserLoggedIn: user.isLoggedIn // setting and  passing isUserLoggedIn as user loged in
  }
}

// loginSuccess is the function  which accepts the user data, it is called form createLogin if login method is failed or exception is thrown
export function loginFailure (user) {
  // returning the action
  // returning the plain object that must have type property
  // for LOGIN_FAILURE action passing user data and isUserLoggedIn
  return {
    type: LOGIN_FAILURE, // defining the name of the action to identify in the reducer
    user: user, // passing user object
    isUserLoggedIn: user.isLoggedIn // setting and  passing isUserLoggedIn as user loged in
  }
}

// ------------------------------------
// Create Actions
// ------------------------------------
// createLogin is the function  which accepts the user data
export function createLogout (user) {
 console.log('hi buddy what is going on ');

  user.userName = ''
  user.password = ''
  user.isLogedin = false
  // sessionStorage.removeItem('jwtToken');
  localStorage.removeItem('jwtToken')
  // localStorage.removeItem('state');

  // redirecting to login page
  window.location.href = window.location.protocol + '/'
  // browserHistory.push("/");

  // returning the action
  // returning the plain object that must have type property
  return {
    type: CREATE_LOGOUT,
    user:user,
    isUserLoggedIn: user.isLoggedIn
  }
}

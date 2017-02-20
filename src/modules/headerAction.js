//this file contains action related for header

//export const CREATE_LOGOUT = 'CREATE_LOGOUT'
import { combineReducers } from 'redux';
import * as loginAction from '../routes/Login/modules/loginAction'

// ------------------------------------
// Create Actions
// ------------------------------------
//createLogin is the function  which accepts the user data  

export function createLogout(user) {
//dispatching the locreateLogout of loginAction
  return (dispatch) => {
    dispatch(loginAction.createLogout(user));
  };
}

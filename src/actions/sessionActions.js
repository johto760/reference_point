import * as types from './actionTypes';  
import sessionApi from '../api/sessionAPI';

export function loginSuccess(response) {  
  return {type: types.LOG_IN_SUCCESS, response:response}
}

export function loginFailed(response) {  
  return {type: types.LOG_IN_FAILED, response:response}
}

export function logInUser(credentials) { 
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      if (typeof response.errors !== "undefined" || typeof response.description !== "undefined"){
        dispatch(loginFailed(response));
      }else{
        sessionStorage.setItem('deviceIdentityToken', response.data.deviceIdentityToken);
        sessionStorage.setItem('authenticatedMessage', response.message);
        dispatch(loginSuccess(response));
      }

    }).catch(error => {
      throw(error);
    });
  };
}
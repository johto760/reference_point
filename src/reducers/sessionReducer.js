import * as types from '../actions/actionTypes';  
import initialState from './initialState';  

export function sessionReducer(state = initialState.session, action) {
  console.log(action)  
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      return {data:action.response.data, message:action.response.message}
    case types.LOG_IN_FAILED:
      if (typeof action.response.description!=="undefined"){
        return {errors:{auth:action.response.description}, message:action.response.description}
      }else{
        return {errors:action.response.errors, message:action.response.message}
      }

    default: 
      return state;
  }
}
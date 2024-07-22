// userReducer.js
import {
    FETCH_REGISTERED_USERS_COUNT_REQUEST,
    FETCH_REGISTERED_USERS_COUNT_SUCCESS,
    FETCH_REGISTERED_USERS_COUNT_FAILURE
  } from '../action/userAction';
  
  const initialState = {
    registeredUsersCount: 0,
    loading: false,
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REGISTERED_USERS_COUNT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_REGISTERED_USERS_COUNT_SUCCESS:
        return {
          ...state,
          loading: false,
          registeredUsersCount: action.payload
        };
  
      case FETCH_REGISTERED_USERS_COUNT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  
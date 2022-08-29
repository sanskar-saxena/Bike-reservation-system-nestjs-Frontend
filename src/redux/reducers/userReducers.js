import {
  USER_LOGIN_REQ,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQ,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_DETAILS_UPDATE_RESET,
  USER_RESERVATION_LIST_REQ,
  USER_RESERVATION_LIST_SUCCESS,
  USER_RESERVATION_LIST_FAIL,
  USERS_LIST_REQ,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_FAIL_RESET,
  USER_DETAILS_REQ,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_UPDATE_REQ,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
  USER_DELETE_REQ,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_CREATE_REQ,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USERS_LOGIN_FAIL_RESET,
  USERS_SIGNUP_FAIL_RESET,
  USER_RESERVATION_LIST_FAIL_RESET,
  USER_DETAILS_UPDATE_FAIL_RESET,
  USER_DETAILS_FAIL_RESET,
  USER_DELETE_FAIL_RESET,
} from "../actions/userActions";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USERS_LOGIN_FAIL_RESET:
      return {...state, error : null}
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer=(state={},action)=>{
    switch(action.type){
        case USER_SIGNUP_REQ:
            return {loading:true}
        case USER_SIGNUP_SUCCESS:
            return {loading:false,userInfo: action.payload}
        case USER_SIGNUP_FAIL:
            return {loading:false,error: action.payload}
        case USERS_SIGNUP_FAIL_RESET:
            return {...state, error : null}
        default:
            return state
    }
}

export const userReservationsListReducer=(state={reservation:[]},action)=>{
    switch(action.type){
        case USER_RESERVATION_LIST_REQ:
            return { loading: true }
        case USER_RESERVATION_LIST_SUCCESS:
            return { loading:false, reservations:action.payload }
        case USER_RESERVATION_LIST_FAIL:
            return { loading:false, error: action.payload }
        case USER_RESERVATION_LIST_FAIL_RESET :
            return {...state, error : null}
        default:
            return state;
    }
} 

export const usersListReducer=(state={ users:[] },action)=>{
    switch(action.type){
        case USERS_LIST_REQ:
            return { loading: true }
        case USERS_LIST_SUCCESS:
            return { 
                loading: false,
                users: action.payload.data,
                totalCount: action.payload.totalCount
            }
        case USERS_LIST_FAIL_RESET :
            return {...state, error : null}
        case USERS_LIST_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user: { } },action) => {
    switch(action.type){
        case USER_DETAILS_REQ:
            return { loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false,user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false,error: action.payload }
        case USER_DETAILS_FAIL_RESET :
            return {...state, error : null}
        default:
            return state;
    }
}

export const userDetailsUpdateReducer = (state = { user: { } },action) => {
    switch(action.type){
        case USER_DETAILS_UPDATE_REQ:
            return { loading: true }
        case USER_DETAILS_UPDATE_SUCCESS:
            return { loading: false,user: {...state.user,...action.payload}, success: true}
        case USER_DETAILS_UPDATE_RESET:
            return {loading : false, bike :{}}
        case USER_DETAILS_UPDATE_FAIL:
            return { loading: false,error: action.payload }
        case USER_DETAILS_UPDATE_FAIL_RESET :
            return {...state, error : null}
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {  },action) => {
    switch(action.type){
        case USER_DELETE_REQ:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, user: null }
        case USER_DELETE_FAIL:
            return { loading: false,error: action.payload }
        case USER_DELETE_FAIL_RESET :
            return {...state, error : null}
        default:
            return state;
    }
}

export const userCreateReducer = (state = { user:{} },action) => {
    switch(action.type){
        case USER_CREATE_REQ:
            return { loading: true }
        case USER_CREATE_SUCCESS:
            return { loading: false,user: action.payload }
        case USER_CREATE_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state;
    }
}


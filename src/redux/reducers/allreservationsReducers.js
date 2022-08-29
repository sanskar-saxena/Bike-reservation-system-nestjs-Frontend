import {
    RESERVATION_LIST_REQ,
    RESERVATION_LIST_SUCCESS,
    RESERVATION_LIST_FAIL,
    RESERVATION_CREATE_REQ,
    RESERVATION_CREATE_SUCCESS,
    RESERVATION_CREATE_FAIL,
    RESERVATION_CANCEL_REQ,
    RESERVATION_CANCEL_SUCCESS,
    RESERVATION_CANCEL_FAIL,
    RESERVATION_BIKE_LIST_REQ,
    RESERVATION_BIKE_LIST_SUCCESS,
    RESERVATION_BIKE_LIST_FAIL,
    RESERVATION_USER_LIST_REQ,
    RESERVATION_USER_LIST_SUCCESS,
    RESERVATION_USER_LIST_FAIL,
    RESERVATION_LIST_FAIL_RESET,
    RESERVATION_CREATE_FAIL_RESET,
    RESERVATION_CANCEL_FAIL_RESET,
    RESERVATION_USER_LIST_FAIL_RESET,
    RESERVATION_CREATE_SUCCESS_RESET,
    RESERVATION_BIKE_LIST_FAIL_RESET
} from '../actions/allreservationAction'


export const reservationListReducer = (state = {reservations :[]}, action)=>{
    switch(action.type){
        case RESERVATION_LIST_REQ :
            return {loading : true}
        case RESERVATION_LIST_SUCCESS:
            return {loading : false, reservations : action.payload.data, pages: action.payload.pages}
        case RESERVATION_LIST_FAIL:
            return {loading : false, error : action.payload}
        case RESERVATION_LIST_FAIL_RESET :
            return {...state, error : null}
        default :
            return state;
    }
}

export const createReservationReducer = (state = {reservation : {}},action)=>{
    switch(action.type){
        case RESERVATION_CREATE_REQ :
            return {loading : true}
        case RESERVATION_CREATE_SUCCESS :
            return {loading : false, reservation :action.payload, success: true}   
        case RESERVATION_CREATE_SUCCESS_RESET :
            return {...state, success:null} 
        case RESERVATION_CREATE_FAIL :
            return {loading : false, error : action.payload}
        case RESERVATION_CREATE_FAIL_RESET :
            return {...state, error : null}
        default : 
            return state;
    }
}

export const cancelReservationReducer = (state={}, action)=>{
    switch(action.type){
        case RESERVATION_CANCEL_REQ :
            return {loading : true}
        case RESERVATION_CANCEL_SUCCESS :
            return {loading : false, status : action.payload}
        case RESERVATION_CANCEL_FAIL :
            return {loading : false, error : action.payload}
        case RESERVATION_CANCEL_FAIL_RESET :
            return {...state, error : null}
        default :
            return state;
    }
}

export const allUsersInReservationReducer = (state = {usersReservations : []}, action)=>{
    switch(action.type){
        case RESERVATION_USER_LIST_REQ:
            return { loading:true }
        case RESERVATION_USER_LIST_SUCCESS:
            return { loading:false, usersReservations: action.payload.resList ,totalCount: action.payload.totalCount }
        case RESERVATION_USER_LIST_FAIL:
            return { loading:false, error: action.payload }
        case RESERVATION_USER_LIST_FAIL_RESET :
            return {...state, error : null}
        default:
            return state;
    }
}

export const allBikesInReservationReducer = (state={ bikesReservations:[]},action)=>{
    switch(action.type){
        case RESERVATION_BIKE_LIST_REQ:
            return { loading:true }
        case RESERVATION_BIKE_LIST_SUCCESS:
            return { loading:false, bikesReservations: action.payload.resList,totalCount: action.payload.totalCount }
        case RESERVATION_BIKE_LIST_FAIL:
            return { loading:false, error: action.payload }
        case RESERVATION_BIKE_LIST_FAIL_RESET:
            return {loading : false, error : null}
        default:
            return state;
    }
}
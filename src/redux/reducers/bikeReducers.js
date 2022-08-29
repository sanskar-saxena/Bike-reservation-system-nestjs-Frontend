import { 
    BIKE_LIST_REQ,
    BIKE_LIST_SUCCESS,
    BIKE_LIST_FAIL,
    BIKE_DETAILS_REQ,
    BIKE_DETAILS_SUCCESS,
    BIKE_DETAILS_FAIL,
    BIKE_CREATE_REQ,
    BIKE_CREATE_SUCCESS,
    BIKE_CREATE_FAIL,
    BIKE_UPDATE_REQ,
    BIKE_UPDATE_SUCCESS,
    BIKE_UPDATE_FAIL,
    BIKE_UPDATE_RESET,
    BIKE_DELETE_REQ,
    BIKE_DELETE_SUCCESS,
    BIKE_DELETE_FAIL,
    MANAGER_BIKE_LIST_REQ,
    MANAGER_BIKE_LIST_SUCCESS,
    MANAGER_BIKE_LIST_FAIL,
    BIKE_LIST_FAIL_RESET,
    BIKE_DETAILS_FAIL_RESET,
    MANAGER_BIKE_LIST_FAIL_RESET,
    BIKE_CREATE_FAIL_RESET,
    BIKE_DELETE_FAIL_RESET,
    BIKE_UPDATE_FAIL_RESET

    
} from '../actions/bikeActions'

export const bikeListReducer = (state = {bikes : []}, action)=>{
    switch(action.type){
        case BIKE_LIST_REQ :
            return {loading : true}
        case BIKE_LIST_SUCCESS :
            return {loading : false, bikes : action.payload.data, pages: action.payload.pages }
        case BIKE_LIST_FAIL :
            return {loading : false, error : action.payload}
        case BIKE_LIST_FAIL_RESET :
            return {...state, error : null}
        default : 
            return state
    }
}

export const bikeDetailsReducer = (state = {bike : {}}, action)=>{
    switch(action.type){
        case BIKE_DETAILS_REQ :
            return {loading : true}
        case BIKE_DETAILS_SUCCESS :
            return {loading : false, bike : action.payload}
        case BIKE_DETAILS_FAIL :
            return {loading : false, error: action.payload}
        case BIKE_DETAILS_FAIL_RESET :
            return {...state, error : null} 
        default :
            return state
    }
}

export const managerBikeListReducer = (state = {bikes : []}, action)=>{
    switch(action.type){
        case MANAGER_BIKE_LIST_REQ :
            return {loading : true}
        case MANAGER_BIKE_LIST_SUCCESS :
            return {loading : false, bikes : action.payload.data, pages : action.payload.pages }
        case MANAGER_BIKE_LIST_FAIL :
            return {loading : false, error : action.payload}
        case MANAGER_BIKE_LIST_FAIL_RESET :
            return {...state, error : null}
        default :
            return state
    }
}

export const createBikeReducer = (state = {bike : {}}, action)=>{
    switch(action.type){
        case BIKE_CREATE_REQ :
            return {loading : true}
        case BIKE_CREATE_SUCCESS :
            return {loading : false, bike : action.payload}
        case BIKE_CREATE_FAIL :
            return {loading : false, error : action.payload}
        case BIKE_CREATE_FAIL_RESET :
            return {...state, error : null}
        default :
            return state
    }
}

export const deleteBikeReducer = (state = {}, action)=>{
    switch(action.type){
        case BIKE_DELETE_REQ:
            return {loading : true}
        case BIKE_DELETE_SUCCESS:
            return {loading : false, bike : null}
        case BIKE_DELETE_FAIL :
            return {loading : false, error : action.payload}
        case BIKE_DELETE_FAIL_RESET :
            return {...state, error : null}
        default :
            return state;
    }
}

export const updateBikeReducer = (state = {bike : {}}, action ) =>{
    switch(action.type){
        case BIKE_UPDATE_REQ :
            return {loading : true}
        case BIKE_UPDATE_SUCCESS :
            return {loading : false, success : true}
        case BIKE_UPDATE_RESET :
            return {loading : false, bike :{}}
        case BIKE_UPDATE_FAIL :
            return {loading : false, error : action.payload}
        case BIKE_UPDATE_FAIL_RESET :
            return {...state, error : null}
        default :
            return state;
    }
}

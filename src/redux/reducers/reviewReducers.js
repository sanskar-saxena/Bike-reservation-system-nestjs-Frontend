import {
    REVIEW_CREATE_REQ,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
    REVIEW_LIST_REQ,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,
    ADD_REVIEW,
    REVIEW_CREATE_FAIL_RESET,
    REVIEW_LIST_FAIL_RESET
} from '../actions/reviewAction'

export const reviewCreateReducer = (state = {review :null }, action)=>{
    switch (action.type){
        case REVIEW_CREATE_REQ :
            return{loading : true}
        case REVIEW_CREATE_SUCCESS :
            return {loading : false, review : action.payload }
        case REVIEW_CREATE_FAIL :
            return {loading : false, error : action.payload}
        case REVIEW_CREATE_FAIL_RESET :
            return {...state, error : null}
        default : 
            return state
    }
}

export const reviewListReducer = (state = {reviews : []}, action)=>{
    switch(action.type){
        case REVIEW_LIST_REQ :
            return {loading : true}
        case REVIEW_LIST_SUCCESS :
            return {loading : false, reviews : action.payload }
        case ADD_REVIEW :
            return {loading : false, reviews : [...state.reviews, action.payload]}
        case REVIEW_LIST_FAIL :
            return {loading : false, error : action.payload}
        case REVIEW_LIST_FAIL_RESET :
            return {...state, error : null}
        default :
            return state
    }
}
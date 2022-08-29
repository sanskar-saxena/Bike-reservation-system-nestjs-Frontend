import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  reservationListReducer,
  createReservationReducer,
  cancelReservationReducer,
  allUsersInReservationReducer,
  allBikesInReservationReducer,
} from "../reducers/allreservationsReducers";

import {
  bikeListReducer,
  bikeDetailsReducer,
  managerBikeListReducer,
  createBikeReducer,
  deleteBikeReducer,
  updateBikeReducer,
} from "../reducers/bikeReducers";

import {
  reviewCreateReducer,
  reviewListReducer,
} from "../reducers/reviewReducers";

import {
  loginReducer,
  registerReducer,
  userReservationsListReducer,
  usersListReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  userDeleteReducer,
  userCreateReducer,
} from "../reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const inState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const reducer = combineReducers({
  bikeList: bikeListReducer,
  bikeDetails: bikeDetailsReducer,
  newBike: createBikeReducer,
  bikeUpdate: updateBikeReducer,
  deleteBike: deleteBikeReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  userReservationsList: userReservationsListReducer,
  usersList: usersListReducer,
  createUser: userCreateReducer,
  managerBikeList: managerBikeListReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  deleteUser: userDeleteReducer,
  reservationUsersList: allUsersInReservationReducer,
  reservationBikesList: allBikesInReservationReducer,
  createReservation: createReservationReducer,
  cancelReservation: cancelReservationReducer,
  reservationList: reservationListReducer,
  createReview: reviewCreateReducer,
  reviewList: reviewListReducer,
});

const store = createStore(
  reducer,
  inState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

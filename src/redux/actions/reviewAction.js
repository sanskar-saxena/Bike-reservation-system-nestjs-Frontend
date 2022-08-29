import axios from "axios";
export const REVIEW_LIST_REQ = "REVIEW_LIST_REQ";
export const REVIEW_LIST_SUCCESS = "REVIEW_LIST_SUCCESS";
export const REVIEW_LIST_FAIL = "REVIEW_LIST_FAIL";
export const REVIEW_CREATE_FAIL_RESET = "REVIEW_CREATE_FAIL_RESET";
export const REVIEW_LIST_FAIL_RESET = "REVIEW_LIST_FAIL_RESET";
export const REVIEW_CREATE_REQ = "REVIEW_CREATE_REQ";
export const REVIEW_CREATE_SUCCESS = "REVIEW_CREATE_SUCCESS";
export const REVIEW_CREATE_FAIL = "REVIEW_CREATE_FAIL";
export const ADD_REVIEW = "ADD_REVIEW";

export const createReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data: reservations } = await axios.get(
      `https://bike-bungy-backend-nest.herokuapp.com/users/${userInfo.user.id}/reservations`,
      headerInfo
    );

    if (reservations.length === 0 ) {
      throw new Error("Reserve your First Bike to Review");
    } else if (reservations.length !== 0) {
      const reservationExist = reservations.find(
        (reservation) => +reservation.bikeId === +review.bikeId && reservation.status==="BOOKED"
      );
      if (!reservationExist) {
        throw new Error("Reservation doesn't exist");
      }
    }
    const { data: userReviews } = await axios.get(
      `https://bike-bungy-backend-nest.herokuapp.com/users/${userInfo.user.id}/reviews`,
      headerInfo
    );
    if (userReviews.length !== 0) {
      const reviewed = userReviews.find(
        (currReview) => +currReview.bikeId === +review.bikeId
      );
      if (reviewed) {
        throw new Error("You have already reviewed this bike");
      }
    }

    const { data } = await axios.post(
      `https://bike-bungy-backend-nest.herokuapp.com/bike/${review.bikeId}/reviews`,
      review,
      headerInfo
    );

    dispatch({
      type: REVIEW_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ADD_REVIEW,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload: error.response && error.response.data ? error.response.data : error.message,
    });
    setTimeout(()=>{
      dispatch({
        type : REVIEW_CREATE_FAIL_RESET,
      })
    }, 3000)
  }
};

export const reviewList = (bikeId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_LIST_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axios.get(`https://bike-bungy-backend-nest.herokuapp.com/bikes/${bikeId}/reviews`, headerInfo);

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: error.response && error.response.data ? error.response.data : error.message,
    });
    setTimeout(()=>{
      dispatch({
        type : REVIEW_LIST_FAIL_RESET,
      })
    },3000)
  }
};

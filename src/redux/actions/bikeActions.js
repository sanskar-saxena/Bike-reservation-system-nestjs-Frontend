import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BIKE_LIST_REQ = "BIKE_LIST_REQ";
export const BIKE_LIST_SUCCESS = "BIKE_LIST_SUCCESS";
export const BIKE_LIST_FAIL = "BIKE_LIST_FAIL";
export const BIKE_LIST_FAIL_RESET = "BIKE_LIST_FAIL_RESET";
export const BIKE_DETAILS_REQ = "BIKE_DETAILS_REQ";
export const BIKE_DETAILS_SUCCESS = "BIKE_DETAILS_SUCCESS";
export const BIKE_DETAILS_FAIL = "BIKE_DETAILS_FAIL";
export const BIKE_DETAILS_FAIL_RESET = "BIKE_DETAILS_FAIL_RESET";
export const BIKE_CREATE_REQ = "BIKE_CREATE_REQ";
export const BIKE_CREATE_SUCCESS = "BIKE_CREATE_SUCCESS";
export const BIKE_CREATE_FAIL = "BIKE_CREATE_FAIL";
export const BIKE_CREATE_FAIL_RESET = "BIKE_CREATE_FAIL_RESET";
export const BIKE_UPDATE_REQ = "BIKE_UPDATE_REQ";
export const BIKE_UPDATE_SUCCESS = "BIKE_UPDATE_SUCCESS";
export const BIKE_UPDATE_FAIL = "BIKE_UPDATE_FAIL";
export const BIKE_UPDATE_RESET = "BIKE_UPDATE_RESET";
export const BIKE_UPDATE_FAIL_RESET = "BIKE_UPDATE_FAIL_RESET";
export const BIKE_DELETE_REQ = "BIKE_DELETE_REQ";
export const BIKE_DELETE_SUCCESS = "BIKE_DELETE_SUCCESS";
export const BIKE_DELETE_FAIL = "BIKE_DELETE_FAIL";
export const BIKE_DELETE_FAIL_RESET = "BIKE_DELETE_FAIL_RESET";
export const MANAGER_BIKE_LIST_REQ = "MANAGER_BIKE_LIST_REQ";
export const MANAGER_BIKE_LIST_SUCCESS = "MANAGER_BIKE_LIST_SUCCESS";
export const MANAGER_BIKE_LIST_FAIL = "MANAGER_BIKE_LIST_FAIL";
export const MANAGER_BIKE_LIST_FAIL_RESET = "MANAGER_BIKE_LIST_FAIL_RESET";

export const bikeList = (filter, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BIKE_LIST_REQ,
    });

    console.log(filter);
    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    if (userInfo.user.role === "REGULAR") {
      filter["isAvailable"] = true;
    }

    const res = await axios.post(
      `https://bike-bungy-backend-nest.herokuapp.com/bikes/page/${page}`,
      filter,
      headerInfo
    );
    // console.log(res);
    dispatch({
      type: BIKE_LIST_SUCCESS,
      payload: {
        data: res.data[0],
        pages: res.data[1],
      },
    });
  } catch (error) {
    dispatch({
      type: BIKE_LIST_FAIL,
      payload:
      error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: BIKE_LIST_FAIL_RESET,
      });
    }, 3000);
  }
};

export const bikeDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BIKE_DETAILS_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axios.get(
      `https://bike-bungy-backend-nest.herokuapp.com/bikes/${id}`,
      headerInfo
    );
    dispatch({
      type: BIKE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIKE_DETAILS_FAIL,
      payload:
      error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: BIKE_DETAILS_FAIL_RESET,
      });
    }, 3000);
  }
};

export const createBike = (bike) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BIKE_CREATE_REQ,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axios.post(
      `https://bike-bungy-backend-nest.herokuapp.com/bikes`,
      bike,
      headerInfo
    );
    dispatch({
      type: BIKE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIKE_CREATE_FAIL,
      payload:
        error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: BIKE_CREATE_FAIL_RESET,
      });
    }, 3000);
  }
};

export const deleteBike = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BIKE_DELETE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axios.delete(
      `https://bike-bungy-backend-nest.herokuapp.com/bikes/${id}`,
      headerInfo
    );

    dispatch({
      type: BIKE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIKE_DELETE_FAIL,
      payload:
      error.response.data.message
    });
    setTimeout(() => {
      dispatch({
        type: BIKE_DELETE_FAIL_RESET,
      });
    }, 3000);
  }
};

export const updateBike = (bike) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BIKE_UPDATE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

      console.log(bike);
    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axios.patch(
      `https://bike-bungy-backend-nest.herokuapp.com/bikes/${bike.id}`,
      bike,
      headerInfo
    );
    console.log(data);
    dispatch({
      type: BIKE_UPDATE_SUCCESS,
    });
    dispatch({
      type: BIKE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: BIKE_UPDATE_FAIL,
      payload:
      error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: BIKE_UPDATE_FAIL_RESET,
      });
    }, 3000);
  }
};

import axios from "axios";
import { toast } from "react-toastify";

export const USER_LOGIN_REQ = "USER_LOGIN_REQ";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_SIGNUP_REQ = "USER_SIGNUP_REQ";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAIL = "USER_SIGNUP_FAIL";
export const USER_DETAILS_UPDATE_RESET = "USER_DETAILS_UPDATE_RESET";
export const USER_DETAILS_REQ = "USER_DETAILS_REQ";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL";
export const USER_DETAILS_FAIL_RESET = "USER_DETAILS_FAIL_RESET";
export const USER_DETAILS_UPDATE_REQ = "USER_DETAILS_UPDATE_REQ";
export const USER_DETAILS_UPDATE_SUCCESS = "USER_DETAILS_UPDATE_SUCCESS";
export const USER_DETAILS_UPDATE_FAIL = "USER_DETAILS_UPDATE_FAIL";
export const USER_DETAILS_UPDATE_FAIL_RESET = "USER_DETAILS_UPDATE_FAIL_RESET";
export const USER_DELETE_REQ = "USER_DELETE_REQ";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAIL = "USER_DELETE_FAIL";
export const USER_DELETE_FAIL_RESET = "USER_DELETE_FAIL_RESET";
export const USER_CREATE_REQ = "USER_CREATE_REQ";
export const USER_CREATE_SUCCESS = "USER_CREATE_SUCCESS";
export const USER_CREATE_FAIL = "USER_CREATE_FAIL";
export const USER_RESERVATION_LIST_FAIL_RESET =
  "USER_RESERVATION_LIST_FAIL_RESET";
export const USER_RESERVATION_LIST_REQ = "USER_RESERVATION_LIST_REQ";
export const USER_RESERVATION_LIST_SUCCESS = "USER_RESERVATION_LIST_SUCCESS";
export const USER_RESERVATION_LIST_FAIL = "USER_RESERVATION_LIST_FAIL";
export const USERS_LIST_FAIL_RESET = "USERS_LIST_FAIL_RESET";
export const USERS_LIST_REQ = "USERS_LIST_REQ";
export const USERS_LIST_SUCCESS = "USERS_LIST_SUCCESS";
export const USERS_LIST_FAIL = "USERS_LIST_FAIL";
export const USERS_LOGIN_FAIL_RESET = "USERS_LOGIN_FAIL_RESET";
export const USERS_SIGNUP_FAIL_RESET = "USERS_SIGNUP_FAIL_RESET";
export const USER_CREATE_FAIL_RESET = "USER_CREATE_FAIL_RESET";

export const logIn = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQ,
    });

    const headerInfo = {
      header: {
        "Content-type": "applicaton/json",
      },
    };

    const { data } = await axios.post(
      "https://bike-bungy-backend-nest.herokuapp.com/users/login",
      { email, password },
      headerInfo
    );
    console.log(data);
    toast("Login Succesful!");
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: USERS_LOGIN_FAIL_RESET,
      });
    }, 3000);
  }
};

export const logOut = () => {
  localStorage.removeItem("userInfo");
  return {
    type: USER_LOGOUT,
  };
};

export const signUp =
  (email, password, name, role = "REGULAR") =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_SIGNUP_REQ,
      });

      const headerInfo = {
        header: {
          "Content-type": "applicaton/json",
        },
      };

      const { data } = await axios.post(
        "https://bike-bungy-backend-nest.herokuapp.com/users/signup",
        { email, password, name, role },
        headerInfo
      );
      console.log(data);
      toast("Signup Successful!");
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
      toast("Signup Succesful!");
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: error.response.data.message,
      });
      setTimeout(() => {
        dispatch({
          type: USERS_SIGNUP_FAIL_RESET,
        });
      }, 3000);
    }
  };

export const allUsers = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const res = await axios.get(
      `https://bike-bungy-backend-nest.herokuapp.com/users/${page}`,
      headerInfo
    );
    console.log(res);
    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: { data: res.data[0], totalCount: res.data[1] },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USERS_LIST_FAIL,
      payload: error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: USERS_LIST_FAIL_RESET,
      });
    }, 3000);
  }
};
export const userReservations = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_RESERVATION_LIST_REQ,
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
      `https://bike-bungy-backend-nest.herokuapp.com/users/${id}/reservations`,
      headerInfo
    );

    dispatch({
      type: USER_RESERVATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_RESERVATION_LIST_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: USER_RESERVATION_LIST_FAIL_RESET,
      });
    }, 3000);
  }
};

export const userDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQ,
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
      `https://bike-bungy-backend-nest.herokuapp.com/users/page/${id}`,
      headerInfo
    );
      console.log(data);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data[0],
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
      error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: USER_DETAILS_FAIL_RESET,
      });
    }, 3000);
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_UPDATE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axios.patch(
      `https://bike-bungy-backend-nest.herokuapp.com/users/${user.id}`,
      user,
      headerInfo
    );

    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAIL,
      payload:
      error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: USER_DETAILS_UPDATE_FAIL_RESET,
      });
    }, 3000);
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQ,
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
      `https://bike-bungy-backend-nest.herokuapp.com/users/${id}`,
      headerInfo
    );

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
      error.response.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: USER_DELETE_FAIL_RESET,
      });
    }, 3000);
  }
};

export const createUser =
  ({ email, password, name, role }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_CREATE_REQ,
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
        "https://bike-bungy-backend-nest.herokuapp.com/users",
        { email, password, name, role },
        headerInfo
      );

      console.log(data);
      dispatch({
        type: USER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_CREATE_FAIL,
        payload: error.response.data.message,
      });
      setTimeout(() => {
        dispatch({
          type: USER_CREATE_FAIL_RESET,
        });
      }, 3000);
    }
  };

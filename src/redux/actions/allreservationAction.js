import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const RESERVATION_LIST_REQ = "RESERVATION_LIST_REQ";
export const RESERVATION_LIST_SUCCESS = "RESERVATION_LIST_SUCCESS";
export const RESERVATION_LIST_FAIL = "RESERVATION_LIST_FAIL";
export const RESERVATION_LIST_FAIL_RESET = "RESERVATION_LIST_FAIL_RESET"
export const RESERVATION_CANCEL_FAIL_RESET = "RESERVATION_CANCEL_FAIL_RESET";
export const RESERVATION_BIKE_LIST_FAIL_RESET = "RESERVATION_BIKE_LIST_FAIL_RESET";
export const RESERVATION_CANCEL_REQ = "RESERVATION_CANCEL_REQ";
export const RESERVATION_CANCEL_SUCCESS = "RESERVATION_CANCEL_SUCCESS";
export const RESERVATION_CANCEL_FAIL = "RESERVATION_CANCEL_FAIL";
export const RESERVATION_CREATE_SUCCESS_RESET = "RESERVATION_CREATE_SUCCESS_RESET";
export const RESERVATION_CREATE_REQ = "RESERVATION_CREATE_REQ";
export const RESERVATION_CREATE_SUCCESS = "RESERVATION_CREATE_SUCCESS";
export const RESERVATION_CREATE_FAIL = "RESERVATION_CREATE_FAIL";
export const RESERVATION_CREATE_FAIL_RESET = "RESERVATION_CREATE_FAIL_RESET";
export const RESERVATION_USER_LIST_REQ = "RESERVATION_USER_LIST_REQ";
export const RESERVATION_USER_LIST_SUCCESS = "RESERVATION_USER_LIST_SUCCESS";
export const RESERVATION_USER_LIST_FAIL = "RESERVATION_USER_LIST_FAIL";
export const RESERVATION_USER_LIST_FAIL_RESET = "RESERVATION_USER_LIST_FAIL_RESET";
export const RESERVATION_BIKE_LIST_REQ = "RESERVATION_BIKE_LIST_REQ";
export const RESERVATION_BIKE_LIST_SUCCESS = "RESERVATION_BIKE_LIST_SUCCESS";
export const RESERVATION_BIKE_LIST_FAIL = "RESERVATION_BIKE_LIST_FAIL";


export const allReservations = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_LIST_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const headerInfo = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const res = await axios.get(`https://bike-bungy-backend-nest.herokuapp.com/reservations/page/${page}`, headerInfo);

    dispatch({
      type: RESERVATION_LIST_SUCCESS,
      payload: 
      {
        data : res.data[0],
        pages : res.data[1]
      }
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_LIST_FAIL,
      payload: error.response.data.message
    });
    setTimeout(()=>{
      dispatch({
        type : RESERVATION_LIST_FAIL_RESET,
      })
    },3000)
  }
};

export const createReservation =
  (reservation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESERVATION_CREATE_REQ,
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
        "https://bike-bungy-backend-nest.herokuapp.com/reservations/book",
        reservation,
        headerInfo
      );

      console.log(data);
      toast.success("Reservation Created Successfully")
      dispatch({
        type: RESERVATION_CREATE_SUCCESS,
        payload: data,
      });
      setTimeout(()=>{
        dispatch({
          type : RESERVATION_CREATE_SUCCESS_RESET
        })
      },3000)

    } catch (error) {
      console.log(error);
      dispatch({
        type: RESERVATION_CREATE_FAIL,
        payload: error.response.data.message,
      });
      setTimeout(()=>{
        dispatch({
          type : RESERVATION_CREATE_FAIL_RESET
        })
      },3000)
    }
  };

export const cancelReservation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESERVATION_CANCEL_REQ,
    });
    const updateData = { status: "CANCELLED" };
    const {
        userLogin: { userInfo },
      } = getState();

      const headerInfo = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      };

    const { data } = await axios.patch(
      `https://bike-bungy-backend-nest.herokuapp.com/reservations/${id}`,
      updateData,
      headerInfo
    );

    dispatch({
      type: RESERVATION_CANCEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_CANCEL_FAIL,
      payload: error.response && error.response.data ? error.response.data : error.message,
    });
    setTimeout(()=>{
      dispatch({
        type : RESERVATION_CANCEL_FAIL_RESET,
      })
    }, 3000)
  }
};

export const allUsersInReservation = (page)=>async(dispatch,getState)=>{
    try{
        dispatch({
            type : RESERVATION_USER_LIST_REQ
        })
        const {
            userLogin: { userInfo },
          } = getState();
    
          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

          // console.log(page);
          const res = await axios.get(`https://bike-bungy-backend-nest.herokuapp.com/reservations/page/${page}`, headerInfo);
          
          console.log(res);
          const userReservation = [];
          const users_inRes = [];
          for(let i=0; i<res.data[0].length; i++){

            let currUserReservation = await axios.get(`https://bike-bungy-backend-nest.herokuapp.com/users/page/${res.data[0][i].userId}`, headerInfo);
            // console.log(currUserReservation)
            // console.log(res.data[0][i]);

              userReservation.push(res.data[0][i]);
              users_inRes.push(currUserReservation )
          }
          const resList = [];
          Promise.all(users_inRes)
          .then(users =>{
            console.log(users);
                for(let i=0; i<userReservation.length; i++) {
                   const newUser = {id: userReservation[i].id,
                    userEmail: users[i].data.email,
                    role: users[i].data.role,
                    bikeId: userReservation[i].bikeId,
                    startDate: userReservation[i].startDate,
                    endDate: userReservation[i].endDate,
                    status: userReservation[i].status
                    }
                  resList.push(newUser);
                }
                dispatch({
                    type : RESERVATION_USER_LIST_SUCCESS,
                    payload : {resList, totalCount : res.data[1]}
                })
          })
          .catch((error)=>{
            console.log(error)
              dispatch({
                  type : RESERVATION_USER_LIST_FAIL,
                  payload : error.response && error.response.data ? error.response.data : error.message
              })
          })  
    } catch(error){
      console.log(error)
        dispatch({
            type : RESERVATION_USER_LIST_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
          dispatch({
            type : RESERVATION_USER_LIST_FAIL_RESET,

          })
        },3000)
    }
}

export const allBikesInReservation = (page,bikeId="")=>async(dispatch,getState)=>{
    try{
        dispatch({
            type : RESERVATION_BIKE_LIST_REQ
        })
        const {
            userLogin: { userInfo },
          } = getState();
    
          const headerInfo = {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          };

          let url = ""
          if(bikeId===""){
            url = `https://bike-bungy-backend-nest.herokuapp.com/reservations/page/${page}`;
          }
          else {
            url = `https://bike-bungy-backend-nest.herokuapp.com/reservations/page/${bikeId}/${page}`
          }
            const res = await axios.get(url, headerInfo);
         
          
          const bikesReservation = [];
          const bike_inRes = []
          for(let i=0; i<res.data[0].length; i++){
            let currBikeReservation = axios.get(`https://bike-bungy-backend-nest.herokuapp.com/bikes/${res.data[0][i].bikeId}`, headerInfo);
            bikesReservation.push(res.data[0][i])
            bike_inRes.push(currBikeReservation);
          }

          Promise.all(bike_inRes)
          .then(bikes =>{
                // console.log(bikes)
                const resList =[];
                for(let i=0; i<bikesReservation.length; i++){
                    const newBike = {
                    id: bikes[i].data.id,
                    model : bikes[i].data.model,
                    location : bikes[i].data.location,
                    color : bikes[i].data.color,
                    avgRating : bikes[i].data.avgRating,
                    bikeId: bikesReservation[i].bikeId,
                    startDate: bikesReservation[i].startDate,
                    endDate: bikesReservation[i].endDate,
                    status: bikesReservation[i].status
                    }
                    resList.push(newBike)
                  
                }
            
                dispatch({
                    type : RESERVATION_BIKE_LIST_SUCCESS,
                    payload : {resList, totalCount : res.data[1]}
                })
          })
          .catch((error)=>{
              dispatch({
                  type : RESERVATION_BIKE_LIST_FAIL,
                  payload : error.response && error.response.data ? error.response.data : error.message
              })
              setTimeout(()=>{
                dispatch({
                  type : RESERVATION_BIKE_LIST_FAIL_RESET
                })
              },3000)
          })  
    } catch(error){
        dispatch({
            type : RESERVATION_BIKE_LIST_FAIL,
            payload : error.response && error.response.data ? error.response.data : error.message
        })
        setTimeout(()=>{
          dispatch({
            type : RESERVATION_BIKE_LIST_FAIL_RESET
          })
        },3000)
    }
}
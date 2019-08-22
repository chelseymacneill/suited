import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { 
    SIGNUP_USER, 
    LOGIN_USER, 
    DUMMY_JSON,
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
 } from "./types";
import API from "../utils/API";

//pass in history?
export const newUser = (userSignup, history) => dispatch => {
    //similar to set state, but we're dispatching actions to the reducer
    // console.log("new user in action")
    API.postSignup(userSignup)
        .then(res => console.log(res))
        .then(user =>
            dispatch({
            type: SIGNUP_USER,
            payload: user
        }))
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const loginUser = (userLogin) => dispatch => {
  API.postLogin(userLogin)
    .then(res => console.log(res))
    .then(user =>
        dispatch({
        type: LOGIN_USER,
        payload: user
    }))
    .then(res => {
    // Save to localStorage
    // Set token to localStorage
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  // User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };

//think of dispatch like a "resolve" in a promise
export const fetchJSON = () => dispatch => {
        //similar to set state, but we're dispatching actions to the reducer
        //https://www.youtube.com/watch?v=93p3LxR9xfM#action=share
        //MINUTE 41 --> import data on page load
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(posts => 
            dispatch({
            type: DUMMY_JSON,
            payload: posts
        }));
}


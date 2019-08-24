import { SIGNUP_USER, LOGIN_USER, DUMMY_JSON } from "./types";
import API from "../utils/API";


export const newUser = (userSignup) => dispatch => {
    let user = {};

    //similar to set state, but we're dispatching actions to the reducer
    // console.log("new user in action")
    API.postSignup(userSignup)
        .then(res => {
            user = res;
            console.log(user);
        })
    .then(user =>
        dispatch({
        type: SIGNUP_USER,
        payload: user
    }))
    .then(() => {
        localStorage.setItem("id_token", user.data.user.token)
    })
    // .then(() => console.log(localStorage.getToken("id_token"))
    //.data.user.token
}

export const loginUser = (userLogin) => dispatch => {
  API.postLogin(userLogin)
      .then(res => console.log(res))
  .then(user =>
      dispatch({
      type: LOGIN_USER,
      payload: user
  })
  );
}

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


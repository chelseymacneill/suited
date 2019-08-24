import { SIGNUP_USER, LOGIN_USER, DUMMY_JSON } from "./types";
// console.log("fetching");

// export function fetchJSON() {
//     return function(dispatch) {
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
        // console.log("fetchJSON")

    // }
}

// const test = () => console.log("test fetching");
// export default test;
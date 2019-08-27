//evauate any actions that are committed
import { SIGNUP_USER, LOGIN_USER, DUMMY_JSON } from "../actions/types";
import {
    SET_CURRENT_USER,
    USER_LOADING
  } from "../actions/types";

// const isEmpty = require("lodash.isempty");

const initialState = {
    items: [],
    item: {},
    user: {},
    email: "",
    password: "",
    token: "",
    isAuthenticated: false,
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
         
        // case SET_CURRENT_USER:
        // return {
        //     ...state,
        //     isAuthenticated: !isEmpty(action.payload),
        //     user: action.payload
        // };
        case USER_LOADING:
        return {
            ...state,
            loading: true
        };

        case SIGNUP_USER:
            console.log("signup")
            return {
                ...state,
                //payload is defined in reducers/signupAction, could be .posts or whatever
                user: action.payload
            }

        case LOGIN_USER:
            console.log("login")
            return {
                ...state,
                //payload is defined in reducers/signupAction, could be .posts or whatever
                user: action.payload
            }

        case DUMMY_JSON:
            // console.log(action.payload)
            // break;    
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
    
}
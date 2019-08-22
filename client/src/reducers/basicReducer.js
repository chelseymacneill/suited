//evauate any actions that are committed
import { SIGNUP_USER, LOGIN_USER, DUMMY_JSON } from "../actions/types";

const initialState = {
    items: [],
    item: {},
    user: {},
    email: "",
    password: "",
    token: ""
};

export default function(state = initialState, action) {
    switch(action.type) {
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
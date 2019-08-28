//evauate any actions that are committed
import { SIGNUP_USER, LOGIN_USER, DUMMY_JSON } from "../actions/types";

const initialState = {
    items: [],
    item: {}
    // users: [],
    // user: {},
    // email: "",
    // password: "",
    // token: ""
};

export default function(state = initialState, action) {
    switch(action.type) {
        // case SIGNUP_USER:
        //     // console.log("signup")
        //     // break;
        //     return {
        //         ...state,
        //         //payload is defined in reducers/signupAction, could be .posts or whatever
        //         items: action.payload
        //     }
        // case LOGIN_USER:
        //     console.log("login")
        //     break;
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
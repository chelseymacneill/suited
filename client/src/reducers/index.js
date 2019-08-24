//this function combines all reducers
import { combineReducers } from "redux";
import basicReducer from "./basicReducer"
// import {reduxTokenAuthReducer} from "redux-token-auth"

export default combineReducers({
    basic: basicReducer,
    // reduxTokenAuth: reduxTokenAuthReducer
});
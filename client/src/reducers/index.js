//this function combines all reducers
import { combineReducers } from "redux";
import basicReducer from "./basicReducer"

export default combineReducers({
    basic: basicReducer,
});
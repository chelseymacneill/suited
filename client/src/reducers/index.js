//this function combines all reducers
import { combineReducers } from "redux";
import basicReducer from "./basicReducer"
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    basic: basicReducer,
    auth: authReducer,
    errors: errorReducer
});
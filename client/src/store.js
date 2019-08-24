import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];
//use "spread operator", createStore requires 3 paramaters
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
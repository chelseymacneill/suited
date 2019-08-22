import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];
//use "spread operator", createStore requires 3 paramaters
const store = createStore(
    rootReducer, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

// window.__REDUX_DEVTOOLS_EXTENSION__ IS USED FOR THE CHROME REDUX EXTENSION
    
export default store;
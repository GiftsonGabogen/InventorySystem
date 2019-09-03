import { createStore, applyMiddleware } from "redux";
import Root from "./Reducers/Root";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];
const store = createStore(Root, initialState, applyMiddleware(...middleware));

export default store;

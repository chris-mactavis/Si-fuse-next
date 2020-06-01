import React from "react";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import auth from "../store/reducers/auth";
import {Provider} from "react-redux";
import '../styles/global.css';
import toggleLoading from "../store/reducers/loader";
import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
    auth: auth,
    loader: toggleLoading
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default function App({Component, pageProps}) {
    return <Provider store={store}><Component {...pageProps} /></Provider>
}
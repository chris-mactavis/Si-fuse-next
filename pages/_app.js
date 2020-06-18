import React from "react";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import auth from "../store/reducers/auth";
import {Provider} from "react-redux";
import '../styles/global.css';
import toggleLoading from "../store/reducers/loader";
import {composeWithDevTools} from "redux-devtools-extension";
import profile from "../store/reducers/profile";
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.css';
import notifier from "../store/reducers/notifier";

const reducers = combineReducers({
    auth: auth,
    loader: toggleLoading,
    profile: profile,
    notifier: notifier
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default function App({Component, pageProps}) {
    return <Provider store={store}><Component {...pageProps} /></Provider>
}
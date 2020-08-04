import React from "react";
import thunkMiddleware from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import auth from "../store/reducers/auth";
import {Provider} from "react-redux";
import toggleLoading from "../store/reducers/loader";
import {composeWithDevTools} from "redux-devtools-extension";
import profile from "../store/reducers/profile";
// import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
// import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.css';
import notifier from "../store/reducers/notifier";
import imageViewer from "../store/reducers/imageViewer";
import startupProfile from "../store/reducers/startupProfile";
import investorProfile from "../store/reducers/investorProfile";
import notifications from "../store/reducers/notification";
import {addStartups} from "../store/actions/discover";
// import '../styles/global.css';
// import '../public/slim/slim.min.css';
// import '../public/css/filepond.css'
// import '../public/css/filepond-plugin-image-preview.css'
// import "../public/css/slick.css";

const reducers = combineReducers({
    auth: auth,
    loader: toggleLoading,
    profile: profile,
    notifier: notifier,
    imageViewer: imageViewer,
    startupProfile: startupProfile,
    investorProfile: investorProfile,
    notifications: notifications,
    addStartups: addStartups,
});

const store = process.env.environment === 'dev' ? createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware))) : createStore(reducers, applyMiddleware(thunkMiddleware));

export default function App({Component, pageProps}) {
    return <Provider store={store}><Component {...pageProps} /></Provider>
}
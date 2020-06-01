import axiosInstance from "../../config/axios";
import {loader} from "./loader";
import Cookies from 'js-cookie';

export const LOGIN = 'LOGIN';
export const STORE_AUTH = 'STORE_AUTH';
export const LOGOUT = 'LOGOUT';

export const loginAsync = data => {

    return async dispatch => {
        dispatch(loader());
        try {
            const {data: {status_code, token, user}} = await axiosInstance.post('login', data);
            dispatch(loader());

            if (status_code === 200) {
                dispatch(storeAuth({token, user}));
            }
        } catch (e) {
            dispatch(loader());
            console.log(e);
        }
    }
}

export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    return {
        type: LOGOUT
    }
}

export const storeAuth = data => {
    Cookies.set('token', data.token);
    Cookies.set('user', JSON.stringify(data.user));

    return {
        type: LOGIN,
        data
    }
};
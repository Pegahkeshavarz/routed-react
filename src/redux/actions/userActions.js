
import * as types from './actionTypes';
import Api from '../../core/Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loginSuccess(user) {
    return {type: types.USER_LOGIN_SUCCESS, user}
}

export function logoutSuccess() {
    return {type: types.USER_LOGOUT_SUCCESS}
}

export function loadCurrentUser(user) {

    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post("/UserService/getUserProfile", user)
            .then(apiResponse => {

                const currentUser = apiResponse.data.result;
                dispatch(loginSuccess(currentUser));

                return currentUser;

        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

function saveUserInLocalStorage(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearLocalStorage() {
    localStorage.clear();
}

export function login(userData) {

    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post("/UserService/logInWithFacebook", userData)
            .then(apiResponse => {

                const currentUser = apiResponse.data.result.userProfile;
                dispatch(loginSuccess(currentUser));

                saveUserInLocalStorage(currentUser);

                return currentUser; //ex: {user: ..., isFirstLogin: true}

        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

export function logout() {

    return function (dispatch) {

        dispatch(beginAjaxCall());

        // return Api.post("/api/v1/logout", {})
        //     .then(apiResponse => {
        //
               dispatch(logoutSuccess());

                clearLocalStorage();

        // }).catch(error => {
        //     dispatch(ajaxCallError(error));
        //     throw(error);
        // });
    }
}

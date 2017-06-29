import * as types from './actionTypes';
import Api from '../../core/Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadGroupSuccess(group) {
    return {type: types.LOAD_GROUP_SUCCESS, group}
}




export function loadRequestedGroup(groupId) {

    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post("/GroupService/getGroup", groupId)
            .then(apiResponse => {
                debugger
                const currentGroup = apiResponse.data.result;
                dispatch(loadGroupSuccess(currentGroup));

                return currentGroup;

        }).catch(error => {
            debugger
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

export function saveGroupRequest(groupId){
    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post("/GroupService/saveGroup", groupId)
            .then(apiResponse => {
                return apiResponse.data;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

export function leaveGroupRequest(groupId){
    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post("/GroupService/unsaveGroup", groupId)
            .then(apiResponse => {
             return apiResponse.data;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

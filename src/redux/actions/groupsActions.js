import * as types from './actionTypes';
import Api from '../../core/Api';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadSavedGroupSuccess(groups){
    return {type: types.LOAD_SAVED_GROUP_SUCCESS, groups}
}

export function getSavedGroups(data){
    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post("/GroupService/getSavedGroups", data)
            .then(apiResponse => {
                const savedGroups = apiResponse.data.result;
                dispatch(loadSavedGroupSuccess(savedGroups));
                return savedGroups;
        }).catch(error => {
            debugger
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

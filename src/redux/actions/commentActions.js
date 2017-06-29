import * as types from './actionTypes';
import Api from '../../core/Api';
import ApiHandler from '../../core/ApiHandler';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function loadGroupCommentsSuccess(comments){
    return {type: types.LOAD_GROUP_COMMENTS_SUCCESS, comments}
}


export function loadRequestedGroupChats(groupId) {

    return function (dispatch) {

        dispatch(beginAjaxCall());
        let ping;
        if(!groupId.header){
           ping = ApiHandler.customApiHeader({groupId:groupId });
        } else {
            ping = groupId
        }
        debugger
        return Api.post("/GroupService/getPastComments", ping)
            .then(apiResponse => {
                debugger
                let currentComments ='';
                if(apiResponse.data.result){
                     currentComments = apiResponse.data.result.comments.reverse();
                } else {
                    currentComments= groupId;
                }

                dispatch(loadGroupCommentsSuccess(currentComments));

                return currentComments;

        }).catch(error => {

            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

export function createNewComment(header,newComment) {

    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post("/GroupService/putComment", header)
            .then(apiResponse => {

                const commentResponse = apiResponse.data.result;
                dispatch(loadRequestedGroupChats(newComment));

                return commentResponse;

        }).catch(error => {

            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

export function deleteComment(ping,groupId){
    return function (dispatch) {

        dispatch(beginAjaxCall());

        return Api.post(`/GroupService/deleteComment`, ping)
            .then(apiResponse => {
                debugger
                dispatch(loadRequestedGroupChats(groupId));

        }).catch(error => {
            debugger
            dispatch(ajaxCallError(error));
            throw(error);
        });
    }
}

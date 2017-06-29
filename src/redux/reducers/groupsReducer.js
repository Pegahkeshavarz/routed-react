import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function Group(state = initialState.savedGroups, action) {

    switch (action.type) {

        case types.LOAD_SAVED_GROUP_SUCCESS: {
            debugger
            return Object.assign({}, state,  {
                savedGroups: action.groups
            });
        }

        default:
            return state;
    }
}

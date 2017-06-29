import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function Group(state = initialState.currentGroup, action) {

    switch (action.type) {

        case types.LOAD_GROUP_SUCCESS: {

            return Object.assign({}, state,  {
                currentGroup: action.group
            });
        }

        default:
            return state;
    }
}

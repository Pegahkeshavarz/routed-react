
import {combineReducers} from 'redux';
import user from './userReducer';
import group from './groupReducer';
import groups from './groupsReducer';
import comments from './commentReducer';
import ajaxStatusReducer from './ajaxStatusReducer';

const rootReducer = combineReducers({
    ajaxStatusReducer,
    user,
    group,
    groups,
    comments
});

export default rootReducer;

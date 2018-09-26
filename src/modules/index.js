import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

export default combineReducers({
    session: sessionReducer
});
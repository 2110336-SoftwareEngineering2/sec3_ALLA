import { createStore } from 'redux';
import AuthReducer from './AuthReducer';
import { combineReducers } from 'redux';

const combinedReducer = combineReducers({
    Auth: AuthReducer
})

const store = createStore(combinedReducer)
export default store;

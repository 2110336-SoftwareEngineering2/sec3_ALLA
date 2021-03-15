import { createStore } from 'redux';
import AuthReducer from './AuthReducer';
import JobReducer from './JobReducer';
import { combineReducers } from 'redux';

const combinedReducer = combineReducers({
    Auth: AuthReducer,
    Job: JobReducer
})

const store = createStore(combinedReducer)
export default store;

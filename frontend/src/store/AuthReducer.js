import axios from 'axios';

//ACTION (function name to call on other component)


export const login = () => {
    return {
        type: 'LOGIN',
    }
}

export const test = () => {
    return {
        type: 'TEST',
    }
}

//initial state for the reducer
const initialState = {
    "id": "",
    "isLogin": false,
    "token": "",
    "username": "test",
    "password": "test",
    "type": "STUDENT",
    "email": "test@example.com",
    "firstName": "fname",
    "lastName": "lname",
    "phoneNumber": "+66999999999",
    "birthDate": "_",
    "university": "Chula",
    "degree": "Bachelor",
    "faculty": "Eng",
    "department": "Com",
    "fields_of_work": "something",
    //Employer
    "company": "usercomp",
    "position": "frontend",
    "fields_of_work": "work"
}


/// REDUCER (update or modify state)
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TEST':
            console.log('in test Auth Reducer');
            return 'testAction'
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLogin: true,
                token: action.payload.token,
                id: action.payload.id
            }
        case 'GET_ACCESS_TOKEN':
            //localStorage.getItem('accessToken');
            return {
                ...state,
                token: localStorage.getItem('accessToken'),
            }
        case 'GET_UID':
            //localStorage.getItem('accessToken');
            return {
                ...state,
                id: localStorage.getItem('uid'),
            }
        case 'SET_ACCESS_TOKEN':
            localStorage.setItem('accessToken', action.payload.token);
            return state
        case 'SET_UID':
            localStorage.setItem('uid', action.payload.id);
            return state
        default: return state
    }
}

export default AuthReducer;


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
    "type": "",
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
    "fields_of_work": "work",
    "login_type" : ""
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
        case 'SET_LOGIN_TYPE':
            localStorage.setItem('login_type', action.payload.type);
            return state
        case 'GET_LOGIN_INFO':
            return {
                ...state,
                login_type: localStorage.getItem('login_type'),
                id: localStorage.getItem('uid'),
                token: localStorage.getItem('accessToken'),
            }
        default: return state
    }
}

export default AuthReducer;


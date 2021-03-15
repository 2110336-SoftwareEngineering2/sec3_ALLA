<<<<<<< HEAD
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
    signUpType:
    {
        prefix: '',
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    },
    userData: {
        id: '',
        username: 'AAAAAAA',
        email: '',
        prefix: '',
        firstname: '',
        lastname: '',
        prefix_en: '' | null,
        firstname_en: '' | null,
        lastname_en: '' | null,
        tel_country_code: '' | null,
        tel_number: '' | null,
        avatar_url: '',
    },
    user: {
        id: '',
        firstname: '',
        lastname: ''
    }
}


/// REDUCER (update or modify state)
const AuthReducer = async (state = initialState, action) => {
    switch (action.type) {
        case 'TEST':
            console.log('in test Auth Reducer');
            return 'testAction'
        case 'LOGIN':
            try {
                const response = await axios.get('/loginapi?ID=12345', {
                    params: {
                        ID: 12345
                    }
                });
                response.then(ret => { console.log(ret) })
                // runInAction(() => {
                //     // Data access
                //     const res = data.data?.rewards;
                //     // state.username = ;
                //     // state.password = ;
                //     // (rewards?.data as Array<RewardModel>).forEach(item => {
                //     //     this.myReward.push(keysToCamelCase(item))
                //     // });

                // });
                // console.log(response);
            } catch (error) {
                console.error(error);
            }
            return 'logged-in'
        default: return state
    }
}

export default AuthReducer;

||||||| merged common ancestors
=======
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
    "login_type": ""
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
        case 'LOGOUT':
            localStorage.removeItem('uid');
            localStorage.removeItem('accessToken');
            return state
        default: return state
    }
}

export default AuthReducer;

>>>>>>> 11330c79483976b90d5a261a6c66d2917b7145f4

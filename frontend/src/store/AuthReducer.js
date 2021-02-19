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
const AuthReducer =  (state = initialState, action) => {
    switch (action.type) {
        case 'TEST':
            console.log('in test Auth Reducer');
            return 'testAction'
        case 'LOGIN':
            try {
                // const response = await axios.get('/loginapi?ID=12345', {
                //     params: {
                //         ID: 12345
                //     }
                // });
                return 'login test'
            } catch (error) {
                console.error(error);
                return 'error'
            }
            
        default: return state
    }
}

export default AuthReducer;


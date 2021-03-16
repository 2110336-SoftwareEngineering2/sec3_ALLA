import axios from 'axios';

//ACTION (function name to call on other component)



//initial state for the reducer
const initialState = {
    paramObj: {
        q: '',
        smax: '',
        smin: '',
        t: '',
        tag: ''
    },
    jobList: [
        {
            'Jid': '999',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/202',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Analyst',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 6hours/week',
            'salaryMin': '8000',
            'salaryMax': '12000',
            'positionLeft': '999',
            'status': 'active'
        },
        {
            'Jid': '998',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/203',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Software Engineer',
            'location': 'chonburi',
            'minEducation': 'highschool',
            'workingHours': 'min 8hours/week',
            'salaryMin': '9000',
            'salaryMax': '10000',
            'positionLeft': '998',
            'status': ''
        }, {
            'Jid': '997',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/208',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Data scientist',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 7hours/week',
            'salaryMin': '10000',
            'salaryMax': '11000',
            'positionLeft': '997',
            'status': ''
        },
        {
            'Jid': '999',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/207',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Analyst',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 6hours/week',
            'salaryMin': '8000',
            'salaryMax': '12000',
            'positionLeft': '999',
            'status': 'active'
        },
        {
            'Jid': '998',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/206',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Software Engineer',
            'location': 'chonburi',
            'minEducation': 'highschool',
            'workingHours': 'min 8hours/week',
            'salaryMin': '9000',
            'salaryMax': '10000',
            'positionLeft': '998',
            'status': ''
        }, {
            'Jid': '997',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/205',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Data scientist',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 7hours/week',
            'salaryMin': '10000',
            'salaryMax': '11000',
            'positionLeft': '997',
            'status': ''
        },
        {
            'Jid': '999',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/210',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Analyst',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 6hours/week',
            'salaryMin': '8000',
            'salaryMax': '12000',
            'positionLeft': '999',
            'status': 'active'
        },
        {
            'Jid': '998',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/200',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Software Engineer',
            'location': 'chonburi',
            'minEducation': 'highschool',
            'workingHours': 'min 8hours/week',
            'salaryMin': '9000',
            'salaryMax': '10000',
            'positionLeft': '998',
            'status': ''
        }, {
            'Jid': '997',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/203',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Data scientist',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 7hours/week',
            'salaryMin': '10000',
            'salaryMax': '11000',
            'positionLeft': '997',
            'status': ''
        },
        {
            'Jid': '999',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/205',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Analyst',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 6hours/week',
            'salaryMin': '8000',
            'salaryMax': '12000',
            'positionLeft': '999',
            'status': 'active'
        },
        {
            'Jid': '998',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/201',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Software Engineer',
            'location': 'chonburi',
            'minEducation': 'highschool',
            'workingHours': 'min 8hours/week',
            'salaryMin': '9000',
            'salaryMax': '10000',
            'positionLeft': '998',
            'status': ''
        }, {
            'Jid': '997',
            'Eid': '888',
            'companyPic_url': 'https://picsum.photos/200',
            'companyName': 'Nisiter.co',
            'jobTitle': 'Data scientist',
            'location': 'bangkok',
            'minEducation': 'highschool',
            'workingHours': 'min 7hours/week',
            'salaryMin': '10000',
            'salaryMax': '11000',
            'positionLeft': '997',
            'status': ''
        }
    ]
}




/// REDUCER (update or modify state)
const JobReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PARAMOBJ':
            return { ...state, paramObj: action.payload.paramObj }
        // case 'LOGIN_SUCCESS':
        //     return {
        //         ...state,
        //         isLogin: true,
        //         token: action.payload.token,
        //         id: action.payload.id
        //     }
        // case 'GET_ACCESS_TOKEN':
        //     //localStorage.getItem('accessToken');
        //     return {
        //         ...state,
        //         token: localStorage.getItem('accessToken'),
        //     }
        // case 'GET_UID':
        //     //localStorage.getItem('accessToken');
        //     return {
        //         ...state,
        //         id: localStorage.getItem('uid'),
        //     }
        // case 'SET_ACCESS_TOKEN':
        //     localStorage.setItem('accessToken', action.payload.token);
        //     return state
        // case 'SET_UID':
        //     localStorage.setItem('uid', action.payload.id);
        //     return state
        // case 'LOGOUT':
        //     localStorage.removeItem('uid');
        //     localStorage.removeItem('accessToken');
        //     return state
        default: return state
    }
}

export default JobReducer;


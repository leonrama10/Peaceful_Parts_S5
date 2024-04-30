import {AUTH_REQ, AUTH_SUCCESS, AUTH_FAILURE, ADMIN_AUTH_STATE, THERAPIST_AUTH_STATE, USER_AUTH_STATE} from '../types';

const initialState={
    user:{},
    error:'',
    loading:false,
    isAdminAuthenticated: false,
    isTherapistAuthenticated: false,
    isUserAuthenticated: false
};

const auth=(state=initialState,action)=>{
    switch(action.type){
        case AUTH_REQ:
            return {...state,error:'',loading:true};

        case AUTH_SUCCESS:
            const data=action.payload;
            return {...state,error:'',loading:false,user:data};

        case AUTH_FAILURE:
            const error=action.payload;
            return {...state,loading:false,error:error};

        case ADMIN_AUTH_STATE:
            return {...state, loading: false, error: '', isAdminAuthenticated: action.payload};

        case THERAPIST_AUTH_STATE:
            return {...state, loading: false, error: '', isTherapistAuthenticated: action.payload};

        case USER_AUTH_STATE:
            return {...state, loading: false, error: '', isUserAuthenticated: action.payload};

        default:
            return state;
    }
}

export default auth;
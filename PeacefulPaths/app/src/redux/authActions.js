import {
    AUTH_REQ,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_STATE,
    ADMIN_AUTH_STATE,
    THERAPIST_AUTH_STATE,
    USER_AUTH_STATE
} from './types';

export const authenticate=()=>{
    return {
        type:AUTH_REQ
    }
}

export const authSuccess = (content) => {
    if (content === null) {
        localStorage.removeItem('USER_KEY');
    } else {
        localStorage.setItem('USER_KEY', content.token);
    }

    return {
        type: AUTH_SUCCESS,
        payload: content,
    };
};

export const authFailure=(error)=>{
    return {
        type:AUTH_FAILURE,
        payload:error
    }
}

export const setAdminAuthenticationState=(boolean)=>{
    return {
        type:ADMIN_AUTH_STATE,
        payload:boolean
    }
}
export const setTherapistAuthenticationState=(boolean)=>{
    return {
        type:THERAPIST_AUTH_STATE,
        payload:boolean
    }
}
export const setUserAuthenticationState=(boolean)=>{
    return {
        type:USER_AUTH_STATE,
        payload:boolean
    }
}


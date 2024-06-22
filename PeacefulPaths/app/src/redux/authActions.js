import {
    AUTH_REQ,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    USER_LOCATION
} from './types';

export const authenticate=()=>{
    return {
        type:AUTH_REQ
    }
}

export const authSuccess = (content) => {
    if (content===null ) {
        localStorage.removeItem('USER_KEY');
        localStorage.removeItem('REFRESH_TOKEN');
    } else {
        localStorage.setItem('USER_KEY', content.token);
        localStorage.setItem('REFRESH_TOKEN', content.refreshToken);
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

export const setLocation=(path)=>{
    return {
        type:USER_LOCATION,
        payload:path
    }
}



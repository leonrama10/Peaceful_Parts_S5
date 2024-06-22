import {
    AUTH_REQ,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    USER_LOCATION
} from '../types';

const initialState={
    user:{},
    error:'',
    loading:false,
    location: '',
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

        case USER_LOCATION:
            return {...state, loading: false, error: '', location: action.payload};

        default:
            return state;
    }
}

export default auth;
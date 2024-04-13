import React from 'react';
import axios from 'axios';

const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/auth/login`,
        'data':authRequest
    })
}

export const userRegister=(authRequest)=>{

    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/auth/register`,
        'data':authRequest
    })
}

export const userUpdate=(authRequest)=>{
    return axios({
         method:'PUT',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/update`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchUserData=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchAllUserData=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/allUserinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchUserDataId=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/userinfoId/${authRequest}`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const userDelete = (authRequest) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/deleteUser/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}
export const fetchAllTherapistData = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/allTherapistInfo`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};








export const userSendEmail=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/auth/sendEmail`,
        'data':authRequest
    })
}

export const userResetPassword=(authRequest)=>{
    return axios({
        method:'PUT',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/resetPassword`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchAllAdminData = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/allAdminInfo`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};



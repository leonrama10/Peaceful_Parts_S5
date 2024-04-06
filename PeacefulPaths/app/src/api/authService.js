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
    console.log("UUUUUUUUUUUUUUUUU",authRequest)
    return axios({
         method:'PUT',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/update`,
        data:authRequest,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}

export const fetchAllUserData=(authRequest)=>{ ////*
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











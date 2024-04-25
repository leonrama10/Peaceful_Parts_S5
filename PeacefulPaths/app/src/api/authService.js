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

export const fetchAllTherapistData = () => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/allTherapistInfo`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchAllTherapistNotConnectedData = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchAllTherapistNotConnectedData/${authRequest}`,
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

export const fetchAllAdminData = () => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/allAdminInfo`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const userTherapistConnection=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/auth/userTherapistConnection`,
        'data':authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}


export const registerAdmin = (authRequest) => {
console.log("DATAa",authRequest)
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/registerAdmin`,
        data: authRequest,
        headers:{
              'Authorization':'Bearer '+getToken()
        }
    });
};


export const registerTherapist = (authRequest) => {
console.log("DATAa",authRequest)
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/registerTherapist`,
        data: authRequest,
        headers:{
              'Authorization':'Bearer '+getToken()
        }
    });
};



export const fetchUserTherapistConnectionData = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchUserTherapistConnectionData/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const removeTherapist = (authRequest) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/removeTherapist/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
}


export const fetchAllUsersConnectedData = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchAllUsersConnectedData/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchAllUsersConnectedDataHistory = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchAllUsersConnectedDataHistory/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByGender = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByGender/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByGenderNotConnected = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByGenderNotConnected`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};


export const therapistFilterByExperience = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByExperience/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByExperienceNotConnected = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByExperienceNotConnected`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByLocation = (authRequest) => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByLocation/${authRequest}`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByLocationNotConnected = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByLocationNotConnected`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const questionnaireAnswers = (authRequest) => {
    console.log("AUTHHHHHHHHHHHHHHHHH" , authRequest)
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/questionnaireAnswers`,
        data:authRequest
    });
};


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
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchAllTherapistNotConnectedData`,
        data:authRequest,
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
 console.log("Received date of birth: {}");
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
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByGender`,
        data:authRequest,
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
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByExperience`,
        data:authRequest,
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
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByLocation`,
        data:authRequest,
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

export const therapistFilterByLanguage = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByLanguage`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByLanguageNotConnected = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByLanguageNotConnected`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByTherapyType = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByTherapy`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByTherapyTypeNotConnected = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByTherapyNotConnected`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByIdentityType = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByIdentityType`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByIdentityTypeNotConnected = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByIdentityTypeNotConnected`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByTherapistType = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByTherapistType`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByTherapistTypeNotConnected = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByTherapistTypeNotConnected`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const questionnaireAnswers = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/questionnaireAnswers`,
        data:authRequest
    });
};

export const therapistFilterByGetStarted = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByGetStarted`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const therapistFilterByGetStartedNotConnectedData = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/therapistFilterByGetStartedNotConnectedData`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const addNewNote = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/addNewNote`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchOldNotes = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchOldNotes`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchOldNotesHistory = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchOldNotesHistory`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const selectWorkDays = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/selectWorkDays`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchBookedHours = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchBookedHours`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const bookSession = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/bookSession`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchBookings = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchBookings`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchWorkDays = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchWorkDays`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchWorkHours = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchWorkHours`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchNextBooking = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchNextBooking`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const cancelBooking = (authRequest) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/cancelBooking`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchBookingByBookingId = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchBookingByBookingId`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const updateBookingSession = (authRequest) => {
    return axios({
        method: 'PUT',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/updateBookingSession`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};

export const fetchBookedHoursInEdit = (authRequest) => {
    return axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/auth/fetchBookedHoursInEdit`,
        data:authRequest,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
};


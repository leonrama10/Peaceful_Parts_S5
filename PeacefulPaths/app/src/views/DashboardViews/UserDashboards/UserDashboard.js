import React, {useEffect, useState} from 'react';
import {
    fetchAllTherapistData,
    fetchAllTherapistNotConnectedData, fetchConnectionsAmount,
    fetchNextBooking,
    fetchUserData,
    fetchUserTherapistConnectionData,
    therapistFilterByExperience,
    therapistFilterByExperienceNotConnected,
    therapistFilterByGender,
    therapistFilterByGenderNotConnected,
    therapistFilterByGetStarted,
    therapistFilterByGetStartedNotConnectedData,
    therapistFilterByIdentityType,
    therapistFilterByIdentityTypeNotConnected,
    therapistFilterByLanguage,
    therapistFilterByLanguageNotConnected,
    therapistFilterByLocation, therapistFilterByLocationNotConnected,
    therapistFilterByTherapistType,
    therapistFilterByTherapistTypeNotConnected,
    therapistFilterByTherapyType,
    therapistFilterByTherapyTypeNotConnected
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import DashboardNav from "../DashboardNav";
import "../../../css/UserDashboard.css"
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import SideBarUser from "../SideBars/SideBarUser";
import TherapistCards from "./TherapistCards";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import malePhoto from "../../../img/Depositphotos_484354208_S.jpg";
import femalePhoto from "../../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCalendarCheck, faEllipsisVertical, faInbox, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Collapse} from "react-bootstrap";
import Loading from "../LoadingPage";
import photo2 from "../../../img/Cartoon-illustration-website-building-vector.jpg";
import {faMessage} from "@fortawesome/free-regular-svg-icons";
let connected = null;
const getRefreshToken = () => {
    const token = localStorage.getItem('REFRESH_TOKEN');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}
const getAccessToken = () => {
    const token = localStorage.getItem('USER_KEY');

    if (!token || token==="null") {
        return null;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        console.log("Token expired.");
        return null;
    } else {
        return token;
    }
}
let therapistId = 0
let connectedBoolean = false
let loadPage = false
function UserDashboard({loading,error,...props}) {
    const history = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [data, setData] = useState({});
    const [hideTherapists, setHideTherapists] = useState(false);
    const [bookingExists, setBookingExists] = useState(false);
    const [nextBooking, setNextBooking] = useState({});
    const [connectionsAmount, setConnectionsAmount] = useState(0);
    const [therapistData, setTherapistData] = useState({
        id: 0,
        email: '',
        name: '',
        surname: '',
        password: '',
        roles: [],
        number: '',
        experience: 0,
        location: {},
        gender: {},
        language: [],
        allRoles: [],
        university: {},
        therapyTypeTherapist: [],
        therapistTypeTherapist: [],
        identityTypeTherapist: []
    });


    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        connected = loadState("connected", false)
        if (getRefreshToken()) {
            props.setLocation("/dashboard/userDashboard")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    setData(response.data);
                    const newFilterUserData = {
                        userId: response.data.id
                    };

                    saveState("role", 'ROLE_USER')

                    fetchUserTherapistConnectionData({id: response.data.id}).then((response) => {
                        connectedBoolean = true
                        setTherapistData(response.data)
                        saveState("myTherapistInfoId", response.data.id)
                        therapistId = response.data.id;
                        saveState("connected", true)
                        saveState("connected/id:" + response.data.id, true)

                        fetchConnectionsAmount({
                            therapistId: response.data.id
                        }).then((response) => {
                            setConnectionsAmount(response.data.amount);
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                        //Qtu ka met me kqyr endSessionBoolean !!!
                        fetchNextBooking({
                            clientId: newFilterUserData.userId,
                            therapistId: response.data.id
                        }).then((response) => {
                            if (response.data.bookingId !== 0) {
                                setBookingExists(true)
                                setNextBooking(response.data)
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                        if (!hideTherapists) {
                            const newFilterData = {
                                therapistId: response.data.id,
                                userId: newFilterUserData.userId
                            };
                            therapistFilterByGetStartedNotConnectedData(newFilterData).then((response) => {
                                if (response.data.length > 0) {
                                    setFilterName('')
                                    setAllUsers(response.data)
                                } else {
                                    fetchAllTherapistNotConnectedData(newFilterData).then((response) => {
                                        if (response.status === 200) {
                                            setFilterName('All')
                                            setAllUsers(response.data)
                                            setHideTherapists(true);
                                        } else {
                                            props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                                        }

                                    }).catch((err) => {

                                        if (err && err.response) {

                                            switch (err.response.status) {
                                                case 401:
                                                    console.log("401 status");
                                                    props.loginFailure("Authentication Failed.Bad Credentials");
                                                    break;
                                                default:
                                                    props.loginFailure('Something BABAAAAAA!Please Try Again');
                                            }
                                        } else {
                                            console.log("ERROR: ", err)
                                            props.loginFailure('Something NaNAAAAA!Please Try Again');
                                        }
                                    });
                                }
                            }).catch((e) => {
                                history('/loginBoot');
                            })
                        }
                    }).catch((e) => {
                        therapistFilterByGetStarted(newFilterUserData).then((response) => {
                            if (response.data.length > 0) {
                                setFilterName('')
                                setAllUsers(response.data)
                            } else {
                                fetchAllTherapistData().then((response) => {
                                    if (response.status === 200) {
                                        setFilterName('All')
                                        setAllUsers(response.data)
                                        setHideTherapists(true);
                                    } else {
                                        props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                                    }
                                }).catch((err) => {
                                    if (err && err.response) {
                                        switch (err.response.status) {
                                            case 401:
                                                console.log("401 status");
                                                props.loginFailure("Authentication Failed.Bad Credentials");
                                                break;
                                            default:
                                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                                        }
                                    } else {
                                        console.log("ERROR: ", err)
                                        props.loginFailure('Something NaNAAAAA!Please Try Again');
                                    }

                                });
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        })
                        saveState("connected", false)
                        if (e.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            // props.loginFailure(e.response.data);
                            console.log(e.response.data); // This will log 'Connect with a therapist!!!'
                            console.log(e.response.status); // This will log 404 (NOT_FOUND)
                        } else if (e.request) {
                            // The request was made but no response was received
                            console.log(e.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', e.message);
                        }
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });
            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation", '')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        } else if (getAccessToken()) {
            props.setLocation("/dashboard/userDashboard")
            connected = loadState("connected", false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    setData(response.data);
                    const newFilterUserData = {
                        userId: response.data.id
                    };

                    saveState("role", 'ROLE_USER')

                    fetchUserTherapistConnectionData({id: response.data.id}).then((response) => {
                        connectedBoolean = true
                        setTherapistData(response.data)
                        saveState("myTherapistInfoId", response.data.id)
                        therapistId = response.data.id;
                        saveState("connected", true)
                        saveState("connected/id:" + response.data.id, true)

                        fetchConnectionsAmount({
                            therapistId: response.data.id
                        }).then((response) => {
                            setConnectionsAmount(response.data.amount);
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                        fetchNextBooking({
                            clientId: newFilterUserData.userId,
                            therapistId: response.data.id
                        }).then((response) => {
                            if (response.data.bookingId !== 0) {
                                setBookingExists(true)
                                setNextBooking(response.data)
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                        if (!hideTherapists) {
                            const newFilterData = {
                                therapistId: response.data.id,
                                userId: newFilterUserData.userId
                            };
                            therapistFilterByGetStartedNotConnectedData(newFilterData).then((response) => {
                                if (response.data.length > 0) {
                                    setFilterName('')
                                    setAllUsers(response.data)
                                } else {
                                    fetchAllTherapistNotConnectedData(newFilterData).then((response) => {
                                        if (response.status === 200) {
                                            setFilterName("All")
                                            setAllUsers(response.data)
                                            setHideTherapists(true);
                                        } else {
                                            props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                                        }
                                    }).catch((err) => {
                                        if (err && err.response) {
                                            switch (err.response.status) {
                                                case 401:
                                                    console.log("401 status");
                                                    props.loginFailure("Authentication Failed.Bad Credentials");
                                                    break;
                                                default:
                                                    props.loginFailure('Something BABAAAAAA!Please Try Again');
                                            }
                                        } else {
                                            console.log("ERROR: ", err)
                                            props.loginFailure('Something NaNAAAAA!Please Try Again');
                                        }
                                    });
                                }
                            }).catch((e) => {
                                history('/loginBoot');
                            })
                        }
                    }).catch((e) => {
                        therapistFilterByGetStarted(newFilterUserData).then((response) => {
                            if (response.data.length > 0) {
                                setAllUsers(response.data)
                                setFilterName('')
                            } else {
                                fetchAllTherapistData().then((response) => {
                                    if (response.status === 200) {
                                        setFilterName('All')
                                        setAllUsers(response.data)
                                        setHideTherapists(true);
                                    } else {
                                        props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                                    }
                                }).catch((err) => {
                                    if (err && err.response) {
                                        switch (err.response.status) {
                                            case 401:
                                                console.log("401 status");
                                                props.loginFailure("Authentication Failed.Bad Credentials");
                                                break;
                                            default:
                                                props.loginFailure('Something BABAAAAAA!Please Try Again');
                                        }
                                    } else {
                                        console.log("ERROR: ", err)
                                        props.loginFailure('Something NaNAAAAA!Please Try Again');
                                    }

                                });
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        })
                        saveState("connected", false)
                        if (e.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            // props.loginFailure(e.response.data);
                            console.log(e.response.data); // This will log 'Connect with a therapist!!!'
                            console.log(e.response.status); // This will log 404 (NOT_FOUND)
                        } else if (e.request) {
                            // The request was made but no response was received
                            console.log(e.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', e.message);
                        }
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });
            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation", '')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        } else {
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    function handleBookSession() {
        history("/dashboard/userDashboard/addBookings")
    }

    function handleMessaging() {
        history("/dashboard/userDashboard/chatDashboard")
    }

    function handleMore() {
        history("/dashboard/userDashboard/myTherapistInfo")
    }

    function formatHour(hour) {
        return `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
    }

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => setIsPopupVisible(true);
    const hidePopup = () => setIsPopupVisible(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [openGenderFilter, setOpenGenderFilter] = useState(false);
    const [openExperienceFilter, setOpenExperienceFilter] = useState(false);
    const [openLocationFilter, setOpenLocationFilter] = useState(false);
    const [openLanguageFilter, setOpenLanguageFilter] = useState(false);
    const [openTherapyTypeFilter, setOpenTherapyTypeFilter] = useState(false);
    const [openIdentityTypeFilter, setOpenIdentityTypeFilter] = useState(false);
    const [openTherapistTypeFilter, setOpenTherapistTypeFilter] = useState(false);
    const [filterName, setFilterName] = useState('');

    function handleFilterByAll() {
        setFilterName('All')
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId
        };
        if (!connected) {
            fetchAllTherapistData().then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            fetchAllTherapistNotConnectedData(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }

    function handleFilterByGender(gender) {
        {gender==='M'?setFilterName('Male'):setFilterName('Female')}
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId,
            gender: gender
        };
        if (!connected) {
            therapistFilterByGender(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            therapistFilterByGenderNotConnected(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }
    }

    function handleFilterByTherapyType(therapyType) {
        {therapyType==='Individual'?setFilterName('Individual'):therapyType==='Couples'?setFilterName('Couples'):setFilterName('Teen')}
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId,
            therapyType: therapyType
        };
        if (!connected) {
            therapistFilterByTherapyType(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        } else {
            therapistFilterByTherapyTypeNotConnected(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }

    function handleFilterByIdentityType(identityType) {
        {identityType==='Straight'?setFilterName('Straight'):identityType==='Gay'?setFilterName('Gay'):setFilterName('Lesbian')}
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId,
            identityType: identityType
        };
        if (!connected) {
            therapistFilterByIdentityType(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        } else {
            therapistFilterByIdentityTypeNotConnected(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }

    function handleFilterByTherapistType(therapistType) {
        {therapistType==='Listens'?setFilterName('Therapy type: (A therapist that listens)'):therapistType==='ExploresPast'?setFilterName('Therapy type: (A therapist that explores my past)'):setFilterName('Therapy type: (A therapist that teaches new skills)')}
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId,
            therapistType: therapistType
        };
        if (!connected) {
            therapistFilterByTherapistType(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        } else {
            therapistFilterByTherapistTypeNotConnected(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }
            }).catch((err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        }
    }

    function handleFilterByLanguage(language) {
        {language==='Albanian'?setFilterName('Language: (Albanian)'):language==='English'?setFilterName('Language: (English)'):setFilterName('Language: (Serbian)')}
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId,
            language: language
        };
        if (!connected) {
            therapistFilterByLanguage(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            therapistFilterByLanguageNotConnected(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }
    }

    function handleFilterByExperience(experience) {
        setFilterName(`Years of Experience: (${experience})`)
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId,
            experience: experience
        };
        if (!connected) {
            therapistFilterByExperience(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');
                    }
                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }
            });
        } else {
            therapistFilterByExperienceNotConnected(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }

    }

    function handleFilterByLocation(location) {
        setFilterName(`Location: (${location})`)
        setOpenFilter(false)
        connected = loadState("connected", false)

        const newFilterData = {
            therapistId: therapistId,
            location: location
        };
        if (!connected) {
            therapistFilterByLocation(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        } else {
            therapistFilterByLocationNotConnected(newFilterData).then((response) => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                    setHideTherapists(true);
                } else {
                    props.loginFailure('Something LEKAAAAAAA!Please Try Again');
                }

            }).catch((err) => {

                if (err && err.response) {

                    switch (err.response.status) {
                        case 401:
                            console.log("401 status");
                            props.loginFailure("Authentication Failed.Bad Credentials");
                            break;
                        default:
                            props.loginFailure('Something BABAAAAAA!Please Try Again');

                    }

                } else {
                    console.log("ERROR: ", err)
                    props.loginFailure('Something NaNAAAAA!Please Try Again');
                }

            });
        }
    }

    let hours, minutes;
    if (nextBooking && nextBooking.hour) {
        [hours, minutes] = nextBooking.hour;
    }

    const currentTime = new Date();
    let meetingTime = currentTime;
    if (nextBooking && nextBooking.date) {
        const [year, month, day] = nextBooking.date;
        meetingTime = new Date(year, month - 1, day, hours, minutes);
    }

    const timeDifference = (currentTime - meetingTime) / 1000 / 60;

    useEffect(() => {
        handleFilterByAll()
        const results = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPage = loadState("loadPage", false)
        // Simulate a loading process
        if (loadPage) {

            const timer = setTimeout(() => {
                setIsLoading(false);
                saveState("loadPage", false)
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 600);

            return () => clearTimeout(timer);
        }
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser setAllUsers={setAllUsers} setHideTherapists={setHideTherapists}
                             connectedBoolean={connectedBoolean}/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser}/>

                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Dashboard</h1>
                            </div>
                            {connectedBoolean && <div>
                                <div className="card therapistCardInfo">
                                    {isPopupVisible && (
                                        <div className="overlay">
                                            <div className="popup">
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}>
                                                    <h4>{therapistData.name} {therapistData.surname}</h4>
                                                    <button className="closeButton" onClick={hidePopup}>×</button>
                                                </div>
                                                <hr/>
                                                <h5>Contact Info</h5>
                                                <p><b>Email</b>: {therapistData.email}</p>
                                                <p><b>Phone number</b>: +{therapistData.number}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className={"card-body"}>
                                        <div className="cardBackground"></div>
                                        {therapistData.gender.gender === "M" ? <img src={malePhoto} alt={"Photo"}/> :
                                            <img src={femalePhoto} alt={"Photo"}/>}
                                        <div className="card-body"
                                             style={{display: "flex", justifyContent: "space-between"}}>
                                            <div>
                                                <h3 style={{marginTop: "60px"}}> {therapistData.name} {therapistData.surname}</h3>
                                                <p>Therapist</p>
                                                <p style={{
                                                    fontSize: "14px",
                                                    color: "gray"
                                                }}>{therapistData.location.location}<span
                                                    style={{padding: "0 3px 0 3px"}}>·</span>
                                                    <button className={"contactButton"} onClick={showPopup}>Contact info
                                                    </button>
                                                </p>
                                                <p style={{fontSize: "14px", color: "gray"}}>{connectionsAmount} {connectionsAmount===1?'connection':'connections'}</p>
                                                <div>
                                                    <button className={"connectButton"}
                                                            onClick={handleMessaging}>
                                                        <FontAwesomeIcon icon={faInbox}/>
                                                        <span style={{
                                                            paddingLeft: "4px",
                                                            fontSize: "16px"
                                                        }}>Message
                                                        </span>
                                                    </button>
                                                    <button className={"moreButton"}
                                                            onClick={handleMore} style={{marginLeft: "5px"}}>
                                                        <FontAwesomeIcon icon={faEllipsisVertical}/>
                                                        <span style={{
                                                            paddingLeft: "4px",
                                                            fontSize: "16px"
                                                        }}>More
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                {bookingExists && timeDifference >= 0 && timeDifference <= 50 ?
                                                    <div className="card-body">
                                                        <h4 style={{
                                                            marginBottom: "20px"
                                                        }}
                                                            className="card-title">Session is in
                                                            progress
                                                        </h4>
                                                        <Link
                                                            to={"/dashboard/userDashboard/chatDashboard"}
                                                            type={"button"}
                                                            style={{borderRadius: "15px"}}
                                                            className={"btn btn-primary"}><FontAwesomeIcon
                                                            style={{marginRight: "3.5px"}} icon={faMessage}/>Chat with
                                                            Therapist
                                                        </Link>
                                                    </div> :
                                                    bookingExists ?
                                                        <div className="card-nextSession">
                                                            <h5 className="card-title">Next Session:</h5>
                                                            <p className="card-text">Date: {new Date(nextBooking.date).toLocaleDateString()}</p>
                                                            <p className="card-text">Hour: {nextBooking && nextBooking.hour && formatHour(nextBooking.hour)}</p>
                                                            <button className={"connectButton"}
                                                                    onClick={handleBookSession}>
                                                                <FontAwesomeIcon icon={faCalendarCheck}/>
                                                                <span style={{
                                                                    paddingLeft: "4px",
                                                                    fontSize: "16px"
                                                                }}>Go to Bookings</span>
                                                            </button>
                                                        </div> :
                                                        <div>
                                                            <p>No future bookings found. <br/>Please select a date
                                                                to<br/> initiate
                                                                a conversation.</p>
                                                            <button className={"connectButton"}
                                                                    onClick={handleBookSession}>
                                                                <FontAwesomeIcon icon={faPlus}/>
                                                                <span style={{
                                                                    paddingLeft: "4px",
                                                                    fontSize: "16px"
                                                                }}>Book session</span>
                                                            </button>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                            <br/>
                            <h2 style={{
                                textAlign: "center",
                                color: "#858796"
                            }}>{filterName.trim() === '' ? "Recommended" : filterName} Therapists</h2>


                                <a className={"filterMenu"}
                                   onClick={() => setOpenFilter(!openFilter)}
                                   aria-controls="collapseUtilities"
                                   aria-expanded={openFilter}>
                                    <span style={{fontSize: "15px"}}>Filter Menu</span>
                                    <FontAwesomeIcon style={{marginLeft: "16px"}} icon={faAngleDown}/>
                                </a>
                                <Collapse in={openFilter}>
                                    <div id="collapse-text" className="bg-white  collapse-inner rounded collapseDiv">
                                        <button className="collapse-item"
                                                onClick={() => handleFilterByAll()}>Show All Therapists
                                        </button>
                                        <button className="collapse-item"
                                                onClick={() => setOpenGenderFilter(!openGenderFilter)}>Filter By Gender
                                        </button>
                                        <Collapse in={openGenderFilter}>
                                            <div>
                                                <input type="radio" id="male" name="gender" value="M"
                                                       onChange={() => handleFilterByGender('M')}/>
                                                <label htmlFor="male" style={{color: "#0a66c2"}}>Male</label>
                                                <input type="radio" id="female" name="gender" value="F"
                                                       onChange={() => handleFilterByGender('F')}
                                                       style={{marginLeft: "3px"}}/>
                                                <label htmlFor="female" style={{color: "#0a66c2"}}>Female</label>
                                            </div>
                                        </Collapse>
                                        <button className="collapse-item"
                                                onClick={() => setOpenExperienceFilter(!openExperienceFilter)}>Filter
                                            By
                                            Experience
                                        </button>
                                        <Collapse in={openExperienceFilter}>
                                            <div>
                                                <select className={"collapseSelect"}
                                                        onChange={(event) => handleFilterByExperience(event.target.value)}>
                                                    <option value="">Select Number</option>
                                                    {[...Array(50).keys()].map((value, index) =>
                                                        <option key={index} value={value + 1}>{value + 1}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </Collapse>
                                        <button className="collapse-item"
                                                onClick={() => setOpenLocationFilter(!openLocationFilter)}>Filter By
                                            Location
                                        </button>
                                        <Collapse in={openLocationFilter}>
                                            <div>
                                                <select className={"collapseSelect"}
                                                        onChange={(event) => handleFilterByLocation(event.target.value)}>
                                                    <option value="">Select Location</option>
                                                    <option value="Kosovo">Kosovo</option>
                                                    <option value="Albania">Albania</option>
                                                    <option value="Montenegro">Montenegro</option>
                                                    <option value="North Macedonia">North Macedonia</option>
                                                    <option value="Serbia">Serbia</option>
                                                </select>
                                            </div>
                                        </Collapse>
                                        <button className="collapse-item"
                                                onClick={() => setOpenLanguageFilter(!openLanguageFilter)}>Filter By
                                            Language
                                        </button>
                                        <Collapse in={openLanguageFilter}>
                                            <div>
                                                <select className={"collapseSelect"}
                                                        onChange={(event) => handleFilterByLanguage(event.target.value)}>
                                                    <option value="">Select Language</option>
                                                    <option value="Albanian">Albanian</option>
                                                    <option value="English">English</option>
                                                    <option value="Serbian">Serbian</option>
                                                </select>
                                            </div>
                                        </Collapse>
                                        <button className="collapse-item"
                                                onClick={() => setOpenTherapyTypeFilter(!openTherapyTypeFilter)}>Filter
                                            By Therapy Type
                                        </button>
                                        <Collapse in={openTherapyTypeFilter}>
                                            <div>
                                                <select className={"collapseSelect"}
                                                        onChange={(event) => handleFilterByTherapyType(event.target.value)}>
                                                    <option value="">Therapy Type</option>
                                                    <option value="Individual">Individual Therapy</option>
                                                    <option value="Couples">Couples Therapy</option>
                                                    <option value="Teen">Teen Therapy</option>
                                                </select>
                                            </div>
                                        </Collapse>

                                        <button className="collapse-item"
                                                onClick={() => setOpenIdentityTypeFilter(!openIdentityTypeFilter)}>Filter
                                            By Identity Type
                                        </button>
                                        <Collapse in={openIdentityTypeFilter}>
                                            <div>
                                                <select className={"collapseSelect"}
                                                        onChange={(event) => handleFilterByIdentityType(event.target.value)}>
                                                    <option value="">Identity Type</option>
                                                    <option value="Straight">Straight</option>
                                                    <option value="Gay">Gay</option>
                                                    <option value="Lesbian">Lesbian</option>
                                                </select>
                                            </div>
                                        </Collapse>

                                        <button className="collapse-item" style={{borderBottom: 'none'}}
                                                onClick={() => setOpenTherapistTypeFilter(!openTherapistTypeFilter)}>Filter
                                            By Therapist Type
                                        </button>
                                        <Collapse in={openTherapistTypeFilter}>
                                            <div>
                                                <select className={"collapseSelect"}
                                                        onChange={(event) => handleFilterByTherapistType(event.target.value)}>
                                                    <option value="">Therapist Type</option>
                                                    <option value="Listens">A therapist that listens</option>
                                                    <option value="ExploresPast">A therapist that explores my past
                                                    </option>
                                                    <option value="TeachesSkills">A therapist that teaches new skills
                                                    </option>
                                                </select>
                                            </div>
                                        </Collapse>
                                    </div>
                                </Collapse>

                            <div style={{display: "flex", justifyContent: "end", alignItems: "start"}}>
                                <div style={{position: "relative"}}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search therapists by name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{paddingLeft: "30px"}}
                                    />
                                    <i style={{
                                        color:"#0a66c2",
                                        position: "absolute",
                                        left: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)"
                                    }} className="fa fa-search"></i>
                                </div>
                            </div>

                            {allUsers.length > 0 ?
                                searchTerm.length > 0 ?
                                    filteredUsers.length > 0 ? <div>
                                            <br/>
                                            <br/>
                                            {filteredUsers.map((card, index) => (
                                                <TherapistCards key={index} title={card.name + " " + card.surname}
                                                                email={card.email}
                                                                experience={card.experience} number={card.number}
                                                                id={card.id}
                                                                gender={card.gender} userId={data.id} connected={connected}
                                                />
                                            ))}
                                        </div> :
                                        <h3 style={{textAlign: "center", color: "red", marginBottom: "240px"}}>There are
                                            no
                                            therapists that match the filtering!!!
                                        </h3>
                                    :
                                    <div>
                                        <br/>
                                        <br/>
                                        {allUsers.map((card, index) => (
                                            <TherapistCards key={index} title={card.name + " " + card.surname}
                                                            email={card.email}
                                                            experience={card.experience} number={card.number}
                                                            id={card.id}
                                                            gender={card.gender} userId={data.id} connected={connected}
                                            />
                                        ))}
                                    </div> :
                                <h3 style={{textAlign: "center", color: "red", marginBottom: "240px"}}>There are no
                                    therapists that match the filtering!!!
                                </h3>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
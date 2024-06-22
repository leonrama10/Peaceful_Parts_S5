import React, {useEffect, useRef, useState} from 'react';
import {
    endSessionBoolean,
    fetchBookingByBookingId,
    fetchNextBooking,
    fetchUserData, fetchUserTherapistChats,
    fetchUserTherapistConnectionData, sendMessage
} from '../../../api/authService';
import {useLocation, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {Alert} from "reactstrap";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import '../../../css/Notification.css';
import sendButton from "../../../img/send.png";
import malePhoto from "../../../img/Depositphotos_484354208_S.jpg";
import femalePhoto from "../../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp";
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
let bookingId = 0;
function ChatTherapist({loading,error,...props}){
    let startTimerBoolean = null
    let startTimerValue = 0
    let chatStateLocation = ''
    const location = useLocation();
    const [refreshKey, setRefreshKey] = React.useState(0);
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [bookingExists,setBookingExists]=useState(false);
    const [nextBooking,setNextBooking]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [chats,setChats]=useState([]);
    const [connectionFailure, setConnectionFailure] = useState('');
    const [therapistData, setTherapistData] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        roles:[],
        number:'',
        experience:0,
        allRoles:[],
        university: '',
        location:{},
        gender:{},
    });

    const [values, setValues] = useState({
        therapistId:0,
        userId: 0,
        chatId: 0,
        message:'',
        writtenBy:''
    });


    useEffect(() => {
        let meetingAvailableUser = loadState("meetingAvailableUser",false)
        startTimerBoolean = loadState("startTimer",false)

        if(getRefreshToken()) {
            if (meetingAvailableUser) {
                props.setLocation("/dashboard/userDashboard/chatTherapist")
                localStorage.setItem('reloadUser', "true");

                fetchUserData().then((response) => {
                    if (response.data.roles.at(0)){
                        if (response.data.roles.at(0).role === 'ROLE_USER') {
                            
                            saveState("role",'ROLE_USER')
                        }
                    }
                }).catch((e) => {
                    history('/loginBoot');
                });
            } else {
                props.setLocation('/loginBoot')
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }
        }else if(getAccessToken()){
            if (meetingAvailableUser) {
                props.setLocation("/dashboard/userDashboard/chatTherapist")
                localStorage.setItem('reloadUser', "true");

                fetchUserData().then((response) => {
                    if (response.data.roles.at(0)){
                        if (response.data.roles.at(0).role === 'ROLE_USER') {
                            
                            saveState("role",'ROLE_USER')
                        }
                    }
                }).catch((e) => {
                    history('/loginBoot');
                });
            } else {
                props.setLocation('/loginBoot')
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);


    React.useEffect(() => {
        let interval = null;
        chatStateLocation = loadState("chatStateLocation","/dashboard/userDashboard/chatTherapist")
        connected = loadState("connected",false)
        const fetchData = async () => {
            try {
                const userData = await fetchUserData();
                if (userData.data.roles.at(0).role === 'ROLE_USER') {
                    setData(userData.data);
                    let userId = userData.data.id

                    const connectionData = await fetchUserTherapistConnectionData({id:userData.data.id});

                    setTherapistData(connectionData.data);
                    saveState("connected",true)

                    const therapistId = connectionData.data.id;

                    fetchNextBooking({therapistId:therapistId,clientId:userId}).then((response) => {
                        if(response.data.bookingId!==0){
                            bookingId = response.data.bookingId
                            setBookingExists(true)
                            setNextBooking(response.data)
                        }
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                    const chatData = await fetchUserTherapistChats({therapistId: therapistId, userId: userId});
                    setValues({
                        therapistId: therapistId,
                        userId: userId,
                        chatId: chatData.data.id,
                        message: '',
                        writtenBy: 'User'
                    });
                    if (chatData.data.messages !== null) {
                        setChats(chatData.data.messages);
                    }

                    // Check if the current page is the chat page
                    if (location.pathname === '/dashboard/userDashboard/chatTherapist') {
                        interval = setInterval(async () => {
                            const chatData = await fetchUserTherapistChats({therapistId: therapistId, userId: userId});
                            if(props.location!=='/dashboard/userDashboard/chatTherapist' && chatStateLocation!=='/dashboard/userDashboard/chatTherapist'){
                                console.log("PROPSSSSSSSSSSSSSS",props.location)
                                props.setLocation("")
                                saveState("chatStateLocation",'')
                                clearInterval(interval);
                            }

                            const bookingData = await fetchBookingByBookingId({bookingId:bookingId});
                            if(bookingData.data.endSessionBoolean){
                                console.log("ENDSESSIONBOOLEAN" )
                                props.setLocation("")
                                saveState("chatStateLocation",'')
                                clearInterval(interval);
                                history("/dashboard/userDashboard/chatDashboard")
                            }

                            if (chatData.data.messages !== null) {
                                setChats(chatData.data.messages);
                            }
                        }, 1800); // Fetches chat data every 1.9 seconds
                    }else {
                        clearInterval(interval);
                    }
                } else {
                    history('/loginBoot');
                }
            } catch (e) {
                history('/loginBoot');
            }
        };

        fetchData();

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [refreshKey]);


    function handleSend(evt) {
        evt.preventDefault();
        sendMessage(values).then((response) => {
            setValues({...values, message: ''});
            setRefreshKey(oldKey => oldKey + 1);
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

    React.useEffect(() => {
        console.log("VALUESSSSSSSSS",values)
    }, [values])

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setValues(values => ({ ...values, [name]: value }));

        // Check if the textarea is empty
        if (value.trim() === '' || value.isEmpty) {
            // Reset the height to min-height if empty
            e.target.style.height = '40px'; // This should match your CSS min-height
        } else {
            // Adjust the height of the textarea
            e.target.style.height = 'inherit'; // Reset the height
            e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
        }
    };

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

    //timer

    const [seconds, setSeconds] = useState(0);
    const [visible, setVisible] = useState(false);
    const [historyBoolean, setHistoryBoolean] = useState(false);

    let interval;

    React.useEffect(() => {
        startTimerBoolean = loadState("startTimer",false)
        startTimerValue = loadState("startTimerValue",0)

        if (startTimerBoolean) {
            setSeconds(startTimerValue);
            if (startTimerValue > 0) {
                interval = setInterval(() => {
                    setSeconds(prevSeconds => {
                        saveState("startTimerValue",prevSeconds)
                        if (prevSeconds===300){
                            setVisible(true);
                        }
                        if (prevSeconds <= 1) {
                            saveState("meetingAvailableUser",false)
                            saveState("startTimer",false)
                            saveState("endSession",true);
                            setHistoryBoolean(true);
                            clearInterval(interval);
                            return 0;
                        }
                        return prevSeconds - 1;
                    });
                }, 2000);
            }
        }
    }, [])

    useEffect(() => {
        if (historyBoolean) {
            history("/dashboard/userDashboard/chatDashboard"); // Navigate to the desired route
        }
    }, [historyBoolean]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleClose = () => {
        setVisible(false);
    };

    function endSession() {
        endSessionBoolean({bookingId:bookingId}).then((response) => {
            saveState("endSession",true);
            saveState("meetingAvailableUser",false)
            saveState("startTimer",false)
            history("/dashboard/userDashboard/chatDashboard");
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

    const chatContentRef = useRef(null);

    useEffect(() => {
        if (chatContentRef.current) {
            // Check if the user is near the top or the bottom of the chat container
            const isNearTop = chatContentRef.current.scrollTop < 100;
            const isNearBottom = chatContentRef.current.scrollHeight - chatContentRef.current.clientHeight <= chatContentRef.current.scrollTop + 100;

            // Scroll to the bottom if the user is near the top or the bottom
            if (isNearTop || isNearBottom) {
                chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
            }
        }
    }, [chats]);

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser hideFilterMenu={hideFilterMenu}/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        { connectionFailure &&
                            <Alert style={{marginTop:'20px'}} variant="danger">
                                {connectionFailure}
                            </Alert>
                        }

                        <div className="container-fluid">
                            {connected &&
                                <div className="card" style={{maxHeight: "calc(100vh - 125px)",marginBottom:"20px"}}>
                                    {visible &&
                                        <div className="notification-container">
                                            <div className="notification">
                                                You have 5 minutes left,
                                                It might be time to end the session :)
                                                <button className="close-button" onClick={handleClose}>
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    }

                                    <div className="booking-timer">
                                        <div style={{display: "flex", paddingLeft: "5px", paddingTop: "5px"}}>
                                            {therapistData.gender && therapistData.gender.gender === "M" ?
                                                <img style={{borderRadius: "100px", border: "1px solid grey"}}
                                                     width={"40px"} src={malePhoto} alt={"photo"}/> :
                                                <img style={{borderRadius: "100px", border: "1px solid grey"}}
                                                     width={"40px"} src={femalePhoto} alt={"photo"}/>
                                            }
                                            <h6 style={{paddingTop: "10px", paddingLeft: "10px"}}>
                                                {therapistData.name} {therapistData.surname}
                                            </h6>
                                        </div>
                                        <p className="timer-content">{formatTime(seconds)}</p>
                                        <button className="btn btn-danger btn-sm" onClick={endSession}>
                                            End Session
                                        </button>
                                    </div>

                                    <div className="card-body" style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    }}>
                                        <div className="chat-content" ref={chatContentRef}>
                                            {
                                                chats.length === 0 ? (
                                                    <p>No chats available, start your first conversation :) </p>
                                                ) : (
                                                    chats.map((data, index) => (
                                                        <div key={index} className="card" style={{
                                                            maxWidth: '30vw',
                                                            minHeight:"40px",
                                                            maxHeight:"240px",
                                                            marginTop:"10px",
                                                            marginLeft: data.writtenBy === 'User' ? 'auto' : '0',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: data.writtenBy === 'User' ? 'flex-end' : 'flex-start',
                                                            border:"none"
                                                        }}>
                                                            <div className="card-body" style={{
                                                                padding:"6px 6px 0 6px",
                                                                minHeight:"40px",
                                                                maxHeight:"240px",
                                                                color:"white",
                                                                maxWidth: '30vw',
                                                                backgroundColor: data.writtenBy === 'User' ? '#4e73df' : '#a3a3a3',
                                                                borderRadius: '10px'
                                                            }}>
                                                                <p style={{maxHeight:"240px"}}>{data.message}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </div>

                                        <br/>
                                        {bookingExists && nextBooking && timeDifference >= 0 && timeDifference <= 50 &&
                                            <form onSubmit={handleSend} style={{display: "flex", alignItems: "center",marginTop:"10px"}}>
                                            <textarea className={"sendBox"} id="message" name="message"
                                                      value={values.message}
                                                      placeholder="Enter your message here..."
                                                      onChange={handleChange}
                                            />
                                                <button style={{marginLeft: "5px", width: "45px"}} type="submit"
                                                        className="btn btn-primary btn-user btn-block">
                                                    <img width={"20px"} src={sendButton} alt={"Send"}/>
                                                </button>
                                            </form>
                                        }
                                    </div>
                                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatTherapist);
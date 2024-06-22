import React, {useEffect, useState} from 'react';
import {
    fetchAllUserTherapistOldConnectionData, fetchNextBooking,
    fetchUserData,
    fetchUserTherapistConnectionData
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage} from "@fortawesome/free-regular-svg-icons";
import {faChevronLeft, faMessage as faSolidMessage, faPlus} from "@fortawesome/free-solid-svg-icons";
import malePhoto from "../../../img/Depositphotos_484354208_S.jpg";
import femalePhoto from "../../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp";
import photo from "../../../img/3585145_66102-removebg-preview.jpg";
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
let endSession = loadState("endSession",false)
function ChatDashboard({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [bookingExists,setBookingExists]=useState(false);
    const [nextBooking,setNextBooking]=useState({});
    const [connectionFailure, setConnectionFailure] = useState('');
    const [therapistData, setTherapistData] = useState({
        id:0,
        name:'',
        surname:'',
        gender:{}
    });
    const [allTherapistData, setAllTherapistData] = useState([]);

    useEffect(() => {
        endSession = loadState("endSession",false)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/userDashboard/chatDashboard")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    
                    saveState("role",'ROLE_USER')
                    setData(response.data);
                    const userId = response.data.id;
                    let therapistId = 0;

                    fetchUserTherapistConnectionData({id:response.data.id}).then((response) => {
                        if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                            therapistId = response.data.id;
                            setTherapistData({
                                id: response.data.id,
                                name: response.data.name,
                                surname: response.data.surname,
                                gender:response.data.gender
                            });

                            saveState("connected",true)

                            fetchNextBooking({therapistId:response.data.id,clientId:userId,endSessionBoolean:endSession}).then((response) => {
                                if(response.data.bookingId!==0){
                                    setBookingExists(true)
                                    setNextBooking(response.data)
                                }
                            }).catch((e) => {
                                history('/loginBoot');
                            });

                        } else {
                            localStorage.clear();
                            history('/loginBoot');
                        }
                    }).catch((e) => {
                        saveState("connected",false)
                        if (e.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            setConnectionFailure(e.response.data);
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
                    fetchAllUserTherapistOldConnectionData({therapistId:therapistId,userId:userId}).then((response) => {
                        setAllTherapistData(response.data);
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/userDashboard/chatDashboard")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    
                    saveState("role",'ROLE_USER')
                    setData(response.data);
                    const userId = response.data.id;
                    let therapistId = 0;

                    fetchUserTherapistConnectionData({id:response.data.id}).then((response) => {
                        if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                            therapistId = response.data.id
                            setTherapistData({
                                id: response.data.id,
                                name: response.data.name,
                                surname: response.data.surname,
                                gender:response.data.gender
                            });

                            saveState("connected",true)

                            fetchNextBooking({therapistId:response.data.id,clientId:userId,endSessionBoolean:endSession}).then((response) => {
                                if(response.data.bookingId!==0){
                                    setBookingExists(true)
                                    setNextBooking(response.data)
                                }
                            }).catch((e) => {
                                history('/loginBoot');
                            });

                        } else {
                            localStorage.clear();
                            history('/loginBoot');
                        }
                    }).catch((e) => {
                        saveState("connected",false)
                        if (e.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            setConnectionFailure(e.response.data);
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
                    fetchAllUserTherapistOldConnectionData({therapistId:therapistId,userId:userId}).then((response) => {
                        setAllTherapistData(response.data);
                    }).catch((e) => {
                        history('/loginBoot');
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    function handleClick(time) {
        saveState("meetingAvailableUser",true)
        saveState("startTimer",true)
        saveState("startTimerValue",time)
        props.setLocation("/dashboard/userDashboard/chatTherapist")
        saveState("chatStateLocation",'/dashboard/userDashboard/chatTherapist')
        history("/dashboard/userDashboard/chatTherapist")
    }

    function handleOldClick(id) {
        saveState("chatTherapistId", id);
        props.setLocation("/dashboard/userDashboard/oldChatTherapist")
        history("/dashboard/userDashboard/oldChatTherapist")
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

    let meetingEndTime = meetingTime;
    meetingEndTime.setMinutes(meetingEndTime.getMinutes() + 50);

    const timeDifferenceForTimer = (meetingEndTime - currentTime) / 1000 / 60;

    const timeDifferenceInSeconds = Math.floor(timeDifferenceForTimer * 60)

    useEffect(() => {
        if (endSession){
            if(timeDifference >= 0 && timeDifference <= 50){
                saveState("endSession",true)
            }
            else {
                saveState("endSession",false)
            }
        }
    },[])

    function formatHour(hour) {
        return `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
    }

    function handleBookSession() {
        history("/dashboard/userDashboard/addBookings")
    }

    return (
        <main id="page-top">

            <div id="wrapper">
            
                <SideBarUser hideFilterMenu={hideFilterMenu}/>
            
                <div id="content-wrapper" className="d-flex flex-column">
            
                    <div id="content">
            
                        <DashboardNav data={data} setUser={props.setUser}/>

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/userDashboard"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Dashboard
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Message Center</h1>
                            </div>
                                {connected &&
                                    <div className="card shadow" style={{display: 'flex',flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding: '10px',marginBottom:"20px"}}>
                                        <div className="card-body" >
                                            <h4>My Therapist</h4>
                                            <div className="card-body">

                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}>
                                                    {therapistData.gender && therapistData.gender.gender === "M" ?
                                                        <img style={{
                                                            borderRadius: "100px",
                                                            border: "1px solid grey"
                                                        }}
                                                             width={"40px"} src={malePhoto} alt={"photo"}/> :
                                                        <img style={{
                                                            borderRadius: "100px",
                                                            border: "1px solid grey"
                                                        }}
                                                             width={"40px"} src={femalePhoto} alt={"photo"}/>
                                                    }
                                                    <h5 className="card-title" style={{paddingLeft: "10px"}}>{therapistData.name} {therapistData.surname}</h5>
                                                </div>
                                                <br/>

                                                {bookingExists && nextBooking && timeDifference >= 0 && timeDifference <= 50 &&
                                                    !endSession &&
                                                    <button className={"connectButton"}
                                                            onClick={() => handleClick(timeDifferenceInSeconds)}>
                                                        <FontAwesomeIcon icon={faMessage}/>
                                                        <span style={{
                                                            paddingLeft: "4px",
                                                            fontSize: "16px"
                                                        }}>Chat With Therapist</span>
                                                    </button>
                                                }
                                            </div>
                                        </div>

                                        {bookingExists ?
                                            <div>{nextBooking && timeDifference >= 0 && timeDifference <= 50 && !endSession ?
                                                <div className="card-body">
                                                    <h5 className="card-title">Session is in progress</h5>
                                                </div> : <div className="card-body">
                                                    <h5 className="card-title">Next Session:</h5>
                                                    <p className="card-text">Date: {new Date(nextBooking.date).toLocaleDateString()}</p>
                                                    <p className="card-text">Hour: {nextBooking && nextBooking.hour && formatHour(nextBooking.hour)}</p>
                                                </div>}
                                            </div> :
                                            <div>
                                                <p>No future bookings found. <br/>Please select a date to<br/> initiate
                                                    a conversation.</p>
                                                <button className={"connectButton"} onClick={handleBookSession}>
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                    <span style={{
                                                        paddingLeft: "4px",
                                                        fontSize: "16px"
                                                    }}>Book session</span>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                }

                            {allTherapistData.length > 0 ?
                                <div className="card shadow" style={{
                                    display: 'flex',
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: '10px',
                                    marginBottom: "20px"
                                }}>
                                    <div className="card-body">
                                        <h4>Chats</h4>
                                        {allTherapistData
                                            .filter((data, index, self) =>
                                                    index === self.findIndex((t) => (
                                                        t.therapistId === data.therapistId
                                                    ))
                                            )
                                            .map((data, index, array) => (
                                                <div key={index}>
                                                    <div>
                                                        <div className="card-body" style={{
                                                            display: 'flex',
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            alignItems: "center"
                                                        }}>

                                                            <div style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignItems: "center"
                                                            }}>
                                                                {data.gender && data.gender.gender === "M" ?
                                                                    <img style={{
                                                                        borderRadius: "100px",
                                                                        border: "1px solid grey"
                                                                    }}
                                                                         width={"40px"} src={malePhoto}
                                                                         alt={"photo"}/> :
                                                                    <img style={{
                                                                        borderRadius: "100px",
                                                                        border: "1px solid grey"
                                                                    }}
                                                                         width={"40px"} src={femalePhoto}
                                                                         alt={"photo"}/>
                                                                }
                                                                <h5 className="card-title"
                                                                    style={{paddingLeft: "10px"}}>{data.name} {data.surname}</h5>
                                                            </div>
                                                            <br/>

                                                            <button className={"connectButton"}
                                                                    onClick={() => handleOldClick(data.therapistId)}>
                                                                <FontAwesomeIcon icon={faSolidMessage}/>
                                                                <span style={{
                                                                    paddingLeft: "4px",
                                                                    fontSize: "16px"
                                                                }}>See Old Chats</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {index !== array.length - 1 && <hr/>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingTop: "20px"
                                }}>
                                    <img src={photo} style={{maxWidth: "250px"}} alt={"photo"}/>
                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>No Chats Available</h4>
                                    <p style={{
                                        maxWidth: "400px",
                                        textAlign: "center",
                                        color: "#858796"
                                    }}>You need to connect with a therapist first!</p>
                                    <Link to={"/dashboard/userDashboard"} className={"discoverButton"}
                                          type={"button"}>Discover</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboard);
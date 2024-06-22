import React, {useEffect, useState} from 'react';
import {
    fetchAllNextBookings,
    fetchAllUsersConnectedData, fetchAllUsersConnectedDataHistory,
    fetchUserData
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faMessage as faSolidMessage} from "@fortawesome/free-solid-svg-icons";
import {faMessage} from "@fortawesome/free-regular-svg-icons";
import malePhoto from "../../../img/Depositphotos_484354208_S.jpg";
import femalePhoto from "../../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp";
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
let endSessionTherapist = false
function TherapistChatDashboard({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allUserData, setAllUserData] = useState([]);
    const [allOldUsersData, setAllOldUsersData] = useState([]);
    const [allNextBookings, setAllNextBookings] = useState([]);

    useEffect(() => {
        endSessionTherapist = loadState("endSessionTherapist",false)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/therapistChatDashboard")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setData(response.data);
                    const therapistId = response.data.id;
                    
                    saveState("role",'ROLE_THERAPIST')

                    fetchAllUsersConnectedData({id:response.data.id}).then((response) => {
                        setAllUserData(response.data);

                        fetchAllUsersConnectedDataHistory({id:therapistId}).then((response) => {
                            setAllOldUsersData(response.data);
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                        fetchAllNextBookings({therapistId:therapistId,endSessionBoolean:endSessionTherapist}).then((response) => {
                            setAllNextBookings(response.data)
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    }).catch((e) => {
                        history('/loginBoot');
                    });
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/therapistDashboard/therapistChatDashboard")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setData(response.data);
                    const therapistId = response.data.id;
                    
                    saveState("role",'ROLE_THERAPIST')

                    fetchAllUsersConnectedData({id:response.data.id}).then((response) => {
                        setAllUserData(response.data);

                            fetchAllUsersConnectedDataHistory({id:therapistId}).then((response) => {
                                setAllOldUsersData(response.data);
                            }).catch((e) => {
                                history('/loginBoot');
                            });

                        fetchAllNextBookings({therapistId:therapistId,endSessionBoolean:endSessionTherapist}).then((response) => {
                                setAllNextBookings(response.data)
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadTherapist', "false");
                // Reload the page
                window.location.reload();
            }
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);

    function handleClick(id,time) {
        saveState("chatUserId", id);
        saveState("meetingAvailableTherapist/"+id,true)
        saveState("startTimerTherapist",true)
        saveState("startTimerValueTherapist",time)
        saveState("chatStateLocation",'/dashboard/therapistDashboard/chatClient')
        props.setLocation("/dashboard/therapistDashboard/chatClient")
        history("/dashboard/therapistDashboard/chatClient")
    }

    function handleOldClick(id) {
        saveState("chatUserId", id);
        props.setLocation("/dashboard/therapistDashboard/oldChatClient")
        history("/dashboard/therapistDashboard/oldChatClient")
    }

    const newArray = [...allOldUsersData];

    const uniqueArray = newArray.filter((newUserData, index, self) =>
        index === self.findIndex((t) => t.id === newUserData.id)
    );

    // Now filter out the oldUserData with the same id as the allUserData
    const filteredNewArray = uniqueArray.filter(newUserData =>
        !allUserData.some(oldUserData => oldUserData.id === newUserData.id)
    );

    //timer
    let timeDifference = 0

    useEffect(() => {
        if (endSessionTherapist){
            if(timeDifference >= 0 && timeDifference <= 50){
                saveState("endSessionTherapist",true)
            }
            else {
                saveState("endSessionTherapist",false)
            }
        }
    },[])

    function formatHour(hour) {
        return `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Dashboard
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Message Center</h1>
                            </div>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h4>Connected Clients Chats</h4>
                                    {allUserData.length > 0 ?
                                        allUserData.map((data, index, array) => (
                                            <div key={index}>
                                                <div className={"card-body"} style={{
                                                    marginTop: "5px",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "start"
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
                                                                 width={"40px"} src={malePhoto} alt={"photo"}/> :
                                                            <img style={{
                                                                borderRadius: "100px",
                                                                border: "1px solid grey"
                                                            }}
                                                                 width={"40px"} src={femalePhoto} alt={"photo"}/>
                                                        }
                                                        <h5 className="card-title"
                                                            style={{paddingLeft: "10px"}}>{data.name} {data.surname}
                                                        </h5>
                                                    </div>
                                                    <div>
                                                        {allNextBookings.some((booking) => booking.clientId === data.id) ? (
                                                            allNextBookings
                                                                .filter((booking) => booking.clientId === data.id)
                                                                .slice(0, 1)
                                                                .map((filteredBooking, index) => {
                                                                    let hours, minutes;
                                                                    if (filteredBooking && filteredBooking.hour) {
                                                                        [hours, minutes] = filteredBooking.hour;
                                                                    }

                                                                    const currentTime = new Date();
                                                                    let meetingTime = currentTime;
                                                                    if (filteredBooking && filteredBooking.date) {
                                                                        const [year, month, day] = filteredBooking.date;
                                                                        meetingTime = new Date(year, month - 1, day, hours, minutes);
                                                                    }

                                                                    timeDifference = (currentTime - meetingTime) / 1000 / 60;

                                                                    let meetingEndTime = meetingTime;
                                                                    meetingEndTime.setMinutes(meetingEndTime.getMinutes() + 50);

                                                                    const timeDifferenceForTimer = (meetingEndTime - currentTime) / 1000 / 60;

                                                                    const timeDifferenceInSeconds = Math.floor(timeDifferenceForTimer * 60)

                                                                    return (
                                                                        <div key={index}>
                                                                            <div>{timeDifference >= 0 && timeDifference <= 50 && !endSessionTherapist ?
                                                                                <div className="card-body">
                                                                                    <h4 className="card-title">Session
                                                                                        is in
                                                                                        progress</h4>
                                                                                </div> : <div className="card-body">
                                                                                    <h5 className="card-title">Next
                                                                                        Session:</h5>
                                                                                    <p className="card-text">Date: {new Date(filteredBooking.date).toLocaleDateString()}</p>
                                                                                    <p className="card-text">Hour: {filteredBooking && filteredBooking.hour && formatHour(filteredBooking.hour)}</p>
                                                                                </div>}
                                                                            </div>

                                                                            <div className="card-body">
                                                                                {timeDifference >= 0 && timeDifference <= 50 && !endSessionTherapist &&
                                                                                    <button className={"connectButton"}
                                                                                            onClick={() => handleClick(data.id, timeDifferenceInSeconds)}>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faMessage}/>
                                                                                        <span style={{
                                                                                            paddingLeft: "4px",
                                                                                            fontSize: "16px"
                                                                                        }}>Chat With Client
                                                                                    </span>
                                                                                    </button>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                        ) : (
                                                            <i style={{color: "#d10606"}}>No bookings in the
                                                                future!!!</i>
                                                        )}
                                                    </div>
                                                </div>
                                                {index !== array.length - 1 && <hr/>}
                                            </div>
                                        )) :
                                        <i style={{color: "#d10606"}}>No connected clients!!!</i>
                                    }
                                </div>
                            </div>
                            <br/>
                            <div className="card shadow">
                                <div className="card-body">
                                    <h4>Old Chats</h4>
                                    {allOldUsersData.length > 0 ?
                                        allOldUsersData
                                            .filter((value, index, self) =>
                                             index === self.findIndex((t) => t.id === value.id))
                                            .map((filteredData, filterIndex,array) => (
                                                <div key={filterIndex} >
                                                    <div className="card-body" style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center"
                                                    }}>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center"
                                                        }}>
                                                            {filteredData.gender && filteredData.gender.gender === "M" ?
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
                                                            <h5 className="card-title" style={{paddingLeft: "10px"}}>{filteredData.name} {filteredData.surname}</h5>
                                                        </div>
                                                        <br/>
                                                        <button className={"connectButton"}
                                                                onClick={() => handleOldClick(filteredData.id)}>
                                                            <FontAwesomeIcon icon={faSolidMessage}/>
                                                            <span style={{
                                                                paddingLeft: "4px",
                                                                fontSize: "16px"
                                                            }}>See Old Chats</span>
                                                        </button>
                                                    </div>
                                                    {filterIndex !== array.length - 1 && <hr/>}
                                                </div>
                                            ))
                                        :
                                        <i style={{color: "#d10606"}}>No past client!!!</i>
                                    }
                                </div>
                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistChatDashboard);
import React, {useEffect, useRef, useState} from 'react';
import {
    fetchUserData, fetchUserDataId, fetchUserTherapistChats
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faPlus} from "@fortawesome/free-solid-svg-icons";
import malePhoto from "../../../img/Depositphotos_484354208_S.jpg";
import femalePhoto from "../../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp";
import photo from "../../../img/graphic-cartoon-character-website-development-vector-37663439.jpg";
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
let userId = 0
function OldChatClient({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [oldChats,setOldChats]=useState([]);
    const [userData, setUserData] = useState({});
    const [values, setValues] = useState({
        therapistId:0,
        userId: 0,
        chatId: 0,
        message:'',
        writtenBy:''
    });

    useEffect(() => {
        userId = loadState("chatUserId",0)
        if(getRefreshToken()) {
                props.setLocation("/dashboard/therapistDashboard/oldChatClient")
                fetchUserData().then((response) => {
                    if (response.data.roles.at(0)) {
                        if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                            saveState("role", 'ROLE_THERAPIST')
                            const therapistId = response.data.id

                            fetchUserDataId({id:userId}).then((response) => {
                                if (response.data.roles.at(0).role === 'ROLE_USER') {
                                    setUserData({
                                        id: response.data.id,
                                        name: response.data.name,
                                        surname: response.data.surname
                                    });

                                    fetchUserTherapistChats({therapistId:therapistId,userId:response.data.id}).then((response) => {
                                        setValues({
                                            therapistId: therapistId,
                                            userId: userId,
                                            chatId: response.data.id,
                                            message: '',
                                            writtenBy: 'Therapist'
                                        });
                                        if (response.data.messages !== null) {
                                            setOldChats(response.data.messages);
                                        }
                                    }).catch((e) => {
                                        history('/loginBoot');
                                    });
                                } else {
                                    localStorage.clear();
                                    history('/loginBoot');
                                }
                            }).catch((e) => {
                                history('/loginBoot');
                            });
                        }
                    }
                }).catch((e) => {
                    history('/loginBoot');
                });

        }else if(getAccessToken()){
                props.setLocation("/dashboard/therapistDashboard/oldChatClient")
                fetchUserData().then((response) => {
                    if (response.data.roles.at(0)) {
                        if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                            saveState("role", 'ROLE_THERAPIST')
                            const therapistId = response.data.id

                            fetchUserDataId({id:userId}).then((response) => {
                                if (response.data.roles.at(0).role === 'ROLE_USER') {
                                    setUserData({
                                        id: response.data.id,
                                        name: response.data.name,
                                        surname: response.data.surname
                                    });

                                    fetchUserTherapistChats({therapistId:therapistId,userId:response.data.id}).then((response) => {
                                        setValues({
                                            therapistId: therapistId,
                                            userId: userId,
                                            chatId: response.data.id,
                                            message: '',
                                            writtenBy: 'Therapist'
                                        });
                                        if (response.data.messages !== null) {
                                            setOldChats(response.data.messages);
                                        }
                                    }).catch((e) => {
                                        history('/loginBoot');
                                    });

                                } else {
                                    localStorage.clear();
                                    history('/loginBoot');
                                }
                            }).catch((e) => {
                                history('/loginBoot');
                            });

                        }
                    }
                }).catch((e) => {
                    history('/loginBoot');
                });
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);


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
    }, [oldChats]);

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px", marginBottom: "10px"}}>
                                <Link to={"/dashboard/therapistDashboard/therapistChatDashboard"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Message
                                    Center
                                </Link>
                            </div>

                            <div className="card" style={{maxHeight: "calc(100vh - 125px)", marginBottom: "20px"}}>
                                <div style={{display: "flex", paddingLeft: "5px", paddingTop: "5px"}}>
                                    {userData.gender && userData.gender.gender === "M" ?
                                        <img style={{borderRadius: "100px", border: "1px solid grey"}}
                                             width={"40px"} src={malePhoto} alt={"photo"}/> :
                                        <img style={{borderRadius: "100px", border: "1px solid grey"}}
                                             width={"40px"} src={femalePhoto} alt={"photo"}/>
                                    }
                                    <h6 style={{paddingTop: "10px", paddingLeft: "10px"}}>
                                        {userData.name} {userData.surname}
                                    </h6>
                                </div>
                                <div className="card-body" style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}>
                                    <div className="chat-content" ref={chatContentRef}>
                                        {
                                            oldChats.length === 0 ? (
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    paddingBottom: "20px"
                                                }}>
                                                    <img src={photo} style={{maxWidth: "350px"}} alt={"photo"}/>
                                                    <h4 style={{
                                                        color: "#5b5c63",
                                                        fontSize: "28px",
                                                        paddingTop: "10px"
                                                    }}>No Chats Available!</h4>
                                                </div>
                                            ) : (
                                                oldChats.map((data, index) => (
                                                    <div key={index} className="card" style={{
                                                        maxWidth: '30vw',
                                                        minHeight: "40px",
                                                        maxHeight: "240px",
                                                        marginTop: "10px",
                                                        marginLeft: data.writtenBy === 'User' ? 'auto' : '0',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: data.writtenBy === 'User' ? 'flex-end' : 'flex-start',
                                                        border: "none"
                                                    }}>
                                                        <div className="card-body" style={{
                                                            padding: "6px 6px 0 6px",
                                                            minHeight: "40px",
                                                            maxHeight: "240px",
                                                            color: "white",
                                                            maxWidth: '30vw',
                                                            backgroundColor: data.writtenBy === 'User' ? '#4e73df' : '#a3a3a3',
                                                            borderRadius: '10px'
                                                        }}>
                                                            <p style={{maxHeight: "240px"}}>{data.message}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(OldChatClient);
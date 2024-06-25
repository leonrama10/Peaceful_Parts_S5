import React, {useEffect, useState} from 'react';
import {
    fetchConnectionsAmount,
    fetchUserData,
    fetchUserDataId,
    removeTherapist,
    userTherapistConnection
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import SideBarUser from "../SideBars/SideBarUser";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import "../../../css/TherapistCardInfo.css"
import malePhoto from "../../../img/Depositphotos_484354208_S.jpg"
import femalePhoto from "../../../img/person-gray-photo-placeholder-woman-600nw-1241538838.webp"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import '../../../css/PopupStyles.css';
import DashboardFooter from "../DashboardFooter";
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
let connected = false;
let therapistInfoId = 0;
let connectId = false
function TherapistCardInfo({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [bookingExists,setBookingExists]=useState(false);
    const [nextBooking,setNextBooking]=useState({});
    const [connectionsAmount, setConnectionsAmount] = useState(0);
    const [therapistData, setTherapistData] = useState({
        id:0,
        email: '',
        name:'',
        surname:'',
        password:'',
        roles:[],
        number:'',
        experience:0,
        location:{},
        gender:{},
        language:[],
        allRoles:[],
        university: {},
        therapyTypeTherapist:[],
        therapistTypeTherapist:[],
        identityTypeTherapist:[],
        about:''
    });
    const [userTherapistValues, setUserTherapistValues] = useState({
        userId:0,
        therapistId:0
    })

    useEffect(() => {
        therapistInfoId = loadState("therapistInfoId",0)
        connectId = loadState("connected/id:"+therapistInfoId,false)
        connected = loadState("connected",false)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/userDashboard/therapistInfo")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_USER'){
                    saveState("role",'ROLE_USER')
                    setData(response.data);
                    setUserTherapistValues(data => {
                        return {
                            ...data,
                            userId: response.data.id
                        };
                    });

                    fetchConnectionsAmount({
                        therapistId: therapistInfoId
                    }).then((response) => {
                        setConnectionsAmount(response.data.amount);
                    }).catch((e) => {
                        history('/loginBoot');
                    });


                        fetchUserDataId({id: therapistInfoId}).then((response) => {
                            if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                                setTherapistData({
                                    id: response.data.id,
                                    email: response.data.email,
                                    name: response.data.name,
                                    surname: response.data.surname,
                                    password: response.data.password,
                                    roles: response.data.roles,
                                    number: response.data.number,
                                    experience: response.data.experience,
                                    location: response.data.location,
                                    gender: response.data.gender,
                                    language: response.data.language,
                                    allRoles: response.data.allRoles,
                                    university: response.data.university,
                                    therapyTypeTherapist: response.data.therapyTypeTherapist,
                                    therapistTypeTherapist: response.data.therapistTypeTherapist,
                                    identityTypeTherapist: response.data.identityTypeTherapist,
                                    about: response.data.about
                                })

                                //problemi munet me kon te qikjo setUserThreapistValues nese ka naj error :)
                                setUserTherapistValues(data => {
                                    return {
                                        ...data,
                                        therapistId: response.data.id
                                    };
                                });
                                connected = loadState("connected", false)
                            } else {
                                localStorage.clear();
                                history('/loginBoot');
                            }
                        }).catch((e) => {
                            localStorage.clear();
                            history('/loginBoot');
                        })
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/userDashboard/therapistInfo")
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_USER'){
                    saveState("role",'ROLE_USER')
                    setData(response.data);
                    setUserTherapistValues(data => {
                        return {
                            ...data,
                            userId: response.data.id
                        };
                    });

                    fetchConnectionsAmount({
                        therapistId: therapistInfoId
                    }).then((response) => {
                        setConnectionsAmount(response.data.amount);
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                        fetchUserDataId({id: therapistInfoId}).then((response) => {
                            if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                                setTherapistData({
                                    id: response.data.id,
                                    email: response.data.email,
                                    name: response.data.name,
                                    surname: response.data.surname,
                                    password: response.data.password,
                                    roles: response.data.roles,
                                    number: response.data.number,
                                    experience: response.data.experience,
                                    location: response.data.location,
                                    gender: response.data.gender,
                                    language: response.data.language,
                                    allRoles: response.data.allRoles,
                                    university: response.data.university,
                                    therapyTypeTherapist: response.data.therapyTypeTherapist,
                                    therapistTypeTherapist: response.data.therapistTypeTherapist,
                                    identityTypeTherapist: response.data.identityTypeTherapist,
                                    about: response.data.about
                                })

                                //problemi munet me kon te qikjo setUserThreapistValues nese ka naj error :)
                                setUserTherapistValues(data => {
                                    return {
                                        ...data,
                                        therapistId: response.data.id
                                    };
                                });
                                connected = loadState("connected", false)
                            } else {
                                localStorage.clear();
                                history('/loginBoot');
                            }
                        }).catch((e) => {
                            localStorage.clear();
                            history('/loginBoot');
                        })

                } else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })

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

    const handleConnectedConnection = (e) => {
        e.preventDefault();

        if (!window.confirm("You are already connected with another therapist!\n" +
            "Are you sure you want to connect with another therapist?")) {
            return;  // If user clicks 'Cancel', stop the function here
        }

        removeTherapist(data.id).then((response)=>{
            if(response.status===200){
                saveState("connected/id:"+therapistData.id,false)
                userTherapistConnection(userTherapistValues).then((response)=>{
                    if(response.status===201){
                        saveState("connected",true)
                        saveState("connected/id:"+userTherapistValues.therapistId,true)
                        saveState("myTherapistInfoId",userTherapistValues.therapistId)
                        history("/dashboard/userDashboard/myTherapistInfo")
                    }
                    else{
                        props.connectionFailure('Something LEKAAAAAAA!Please Try Again');
                    }

                }).catch((err)=>{

                    if(err && err.response){

                        switch(err.response.status){
                            case 401:
                                console.log("401 status");
                                props.connectionFailure("U cant have two therapists at the same time!!!");
                                break;
                            default:
                                props.connectionFailure('Something BABAAAAAA!Please Try Again');
                        }
                    }
                    else{
                        console.log("ERROR: ",err)
                        props.connectionFailure('Something NaNAAAAA!Please Try Again');
                    }

                });
            } else{
                history('/loginBoot');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    };

    const handleConnection = (e) => {
        e.preventDefault();

        userTherapistConnection(userTherapistValues).then((response)=>{
            if(response.status===201){
                saveState("connected",true)
                saveState("connected/id:"+userTherapistValues.therapistId,true)
                saveState("myTherapistInfoId",userTherapistValues.therapistId)
                history("/dashboard/userDashboard/myTherapistInfo")
            }
            else{
                props.connectionFailure('Something LEKAAAAAAA!Please Try Again');
            }

        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.connectionFailure("U cant have two therapists at the same time!!!");
                        break;
                    default:
                        props.connectionFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.connectionFailure('Something NaNAAAAA!Please Try Again');
            }

        });
    };

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => setIsPopupVisible(true);
    const hidePopup = () => setIsPopupVisible(false);

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
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Therapist Info</h1>
                            </div>
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
                            <div className="card therapistCardInfo">
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
                                            {connected ?
                                                <div>
                                                    <i>You are already connected with another therapist!!!</i>
                                                    <br/>
                                                    <br/>
                                                    <button className={"connectButton"}
                                                            onClick={handleConnectedConnection}>
                                                        <FontAwesomeIcon icon={faUserPlus}/>
                                                        <span style={{
                                                            paddingLeft: "4px",
                                                            fontSize: "16px"
                                                        }}>Connect</span>
                                                    </button>
                                                </div> :
                                                <button className={"connectButton"} onClick={handleConnection}>
                                                    <FontAwesomeIcon icon={faUserPlus}/>
                                                    <span style={{
                                                        paddingLeft: "4px",
                                                        fontSize: "16px"
                                                    }}>Connect</span>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {therapistData.about && <div className="card therapistCardInfo">
                                <div className="card-body">
                                    <h4>About</h4>
                                    <p style={{fontSize: "14px"}}>{therapistData.about}</p>
                                </div>
                            </div>}
                            <div className="card therapistCardInfo">
                                <div className="card-body">
                                    <h4>Areas of Expertise</h4>
                                    <p style={{fontSize: "16px"}}>
                                        {therapistData.therapyTypeTherapist.map((type, index) => (
                                            <React.Fragment key={index}>
                                                <span> {type.therapyType==='Individual'?'Individual Therapy':type.therapyType==='Couples'?'Couples Therapy':type.therapyType==='Teen'?'Teen Therapy':''}</span>
                                                {index < therapistData.therapyTypeTherapist.length - 1 && (
                                                    <span style={{
                                                        display: 'block',
                                                        height: '1px',
                                                        background: 'lightgray',
                                                        margin: '0.5em 0'
                                                    }}></span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    <hr/>
                                    <p style={{fontSize: "16px"}}>
                                        {therapistData.therapistTypeTherapist.map((type, index) => (
                                            <React.Fragment key={index}>
                                                <span> {type.therapistType==='Listens'?'A therapist that listens':type.therapistType==='ExploresPast'?'A therapist that explores the past':type.therapistType==='TeachesSkills'?'A therapist that teaches new skills':''}</span>
                                                {index < therapistData.therapistTypeTherapist.length - 1 && (
                                                    <span style={{
                                                        display: 'block',
                                                        height: '1px',
                                                        background: 'lightgray',
                                                        margin: '0.5em 0'
                                                    }}></span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    <hr/>
                                    <p style={{fontSize: "16px"}}>
                                        {therapistData.identityTypeTherapist.map((type, index) => (
                                            <React.Fragment key={index}>
                                                <span> {type.identityType}</span>
                                                {index < therapistData.identityTypeTherapist.length - 1 && (
                                                    <span style={{
                                                        display: 'block',
                                                        height: '1px',
                                                        background: 'lightgray',
                                                        margin: '0.5em 0'
                                                    }}></span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="card therapistCardInfo">
                                <div className="card-body">
                                    <h4>Education</h4>
                                    <p style={{fontSize: "16px"}}>{therapistData.university.university}</p>
                                </div>
                            </div>
                            <div className="card therapistCardInfo">
                                <div className="card-body">
                                    <h4>Languages</h4>
                                    <p style={{fontSize: "16px"}}>
                                        {therapistData.language.map((language, index) => (
                                            <React.Fragment key={index}>
                                                <span>{language.language}</span>
                                                {index < therapistData.language.length - 1 && (
                                                    <span style={{
                                                        display: 'block',
                                                        height: '1px',
                                                        background: 'lightgray',
                                                        margin: '0.5em 0'
                                                    }}></span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DashboardFooter />
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
        connectionFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistCardInfo);
import React, {useEffect, useState} from 'react';
import {
    fetchConnectionsAmount,
    fetchNextBooking,
    fetchUserData,
    fetchUserDataId,
    removeTherapist, submitFeedback
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
import {faChevronLeft, faEllipsis, faInbox, faUserXmark} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import '../../../css/PopupStyles.css';
import {Button, Form, Modal, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
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
let myTherapistInfoId = 0;
let connectId = false
function MyTherapist({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [bookingExists,setBookingExists]=useState(false);
    const [nextBooking,setNextBooking]=useState({});
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
        identityTypeTherapist:[]
    });
    const [userTherapistValues, setUserTherapistValues] = useState({
        userId:0,
        therapistId:0
    })
    const [connectionsAmount, setConnectionsAmount] = useState(0);

    useEffect(() => {
        myTherapistInfoId = loadState("myTherapistInfoId",0)
        connectId = loadState("connected/id:"+myTherapistInfoId,false)
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
                        therapistId: myTherapistInfoId
                    }).then((response) => {
                        setConnectionsAmount(response.data.amount);
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                    if (connected) {
                        fetchNextBooking({clientId: response.data.id, therapistId: myTherapistInfoId}).then((response) => {
                            if (response.data.bookingId !== 0) {
                                setBookingExists(true)
                                setNextBooking(response.data)
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    }

                    fetchUserDataId({id: myTherapistInfoId}).then((response) => {
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
                                identityTypeTherapist: response.data.identityTypeTherapist
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
                        therapistId: myTherapistInfoId
                    }).then((response) => {
                        setConnectionsAmount(response.data.amount);
                    }).catch((e) => {
                        history('/loginBoot');
                    });


                        fetchNextBooking({clientId: response.data.id, therapistId: myTherapistInfoId}).then((response) => {
                            if (response.data.bookingId !== 0) {
                                setBookingExists(true)
                                setNextBooking(response.data)
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        });


                    fetchUserDataId({id: myTherapistInfoId}).then((response) => {
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
                                identityTypeTherapist: response.data.identityTypeTherapist
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

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => setIsPopupVisible(true);
    const hidePopup = () => setIsPopupVisible(false);

    const [feedbackModal, setFeedbackModal] = useState(false);
    const [feedback, setFeedback] = useState("");

    function handleBookSession() {
        history("/dashboard/userDashboard/addBookings")
    }

    function formatHour(hour) {
        return `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
    }

    function handleMessaging() {
        history("/dashboard/userDashboard/chatDashboard")
    }

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const toggleFeedbackModal = () => {
        setFeedbackModal(!feedbackModal);
    };

    const handleRemove = () => {
        toggleFeedbackModal();
    };

    const handleFeedbackSubmit = (userId,therapistId) => {
        const feedbackData = {
            userId: userId,
            therapistId: therapistId,
            feedback: feedback
        };

        // Remove therapist first
        removeTherapist(data.id).then(() => {
                toggleFeedbackModal();
                submitFeedback(feedbackData);
                saveState("therapistInfoId",therapistId)
                saveState("myTherapistInfoId",0)
                saveState("connected/id:"+therapistId,false)
                saveState("connected",false)
                history("/dashboard/userDashboard/therapistInfo")
        })
            .catch((error) => {
                console.error('Error:', error);
                if (error.response) {
                    console.error('Error Response:', error.response.data);
                } else if (error.request) {
                    console.error('Error Request:', error.request);
                } else {
                    console.error('Error Message:', error.message);
                }
            });
    };


    return (
        <main id="page-top">
            <Modal isOpen={feedbackModal} toggle={toggleFeedbackModal}>
                <ModalHeader toggle={toggleFeedbackModal}>Feedback Form</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="feedback">Before you remove your therapist, what is your reason for removing them?</Label>
                            <Input placeholder={"Write feedback here..."} type="textarea" name="feedback" id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleFeedbackSubmit(data.id, therapistData.id)}>Submit</Button>
                    <Button color="secondary" onClick={toggleFeedbackModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
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
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>My Therapist</h1>
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
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <button className={"connectButton"}
                                                        onClick={handleMessaging}>
                                                    <FontAwesomeIcon icon={faInbox}/>
                                                    <span style={{
                                                        paddingLeft: "4px",
                                                        fontSize: "16px"
                                                    }}>Message</span>
                                                </button>

                                                <button className="threeDotsButton" onClick={toggleDropdown}>
                                                    <FontAwesomeIcon icon={faEllipsis} />
                                                </button>
                                                {showDropdown && (
                                                    <div className="dropdownMenu shadow">
                                                        <button
                                                                onClick={handleRemove}>
                                                            <FontAwesomeIcon icon={faUserXmark}/>
                                                            <span style={{
                                                                paddingLeft: "4px",
                                                                fontSize: "16px"
                                                            }}>Remove Connection</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            {bookingExists ?
                                                <div className="card-nextSession">
                                                    <h5 className="card-title">Next Session:</h5>
                                                    <p className="card-text">Date: {new Date(nextBooking.date).toLocaleDateString()}</p>
                                                    <p className="card-text">Hour: {nextBooking && nextBooking.hour && formatHour(nextBooking.hour)}</p>
                                                </div> :
                                                <div>
                                                    <p>No future bookings found. <br/>Please select a date
                                                        to<br/> initiate
                                                        a conversation.
                                                    </p>
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
                                    </div>
                                </div>
                            </div>
                            <div className="card therapistCardInfo">
                                <div className="card-body">
                                    <h4>About</h4>
                                    <p style={{fontSize: "14px"}}>Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                        ever since the 1500s, when an unknown printer took a galley of type and
                                        scrambled it to make a type specimen book. It has survived not only five
                                        centuries, but also the leap into electronic typesetting, remaining essentially
                                        unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                        containing Lorem Ipsum passages, and more recently with desktop publishing
                                        software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                </div>
                            </div>
                            <div className="card therapistCardInfo">
                                <div className="card-body">
                                    <h4>Areas of Expertise</h4>
                                    <p style={{fontSize: "16px"}}>
                                        {therapistData.therapyTypeTherapist.map((type, index) => (
                                            <React.Fragment key={index}>
                                                <span> {type.therapyType}</span>
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
                                                <span> {type.therapistType}</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyTherapist);
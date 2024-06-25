import React, {useEffect, useState} from 'react';
import {fetchOldNotesHistory, fetchUserData} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import photo from "../../../img/360_F_522716503_R7mc1Xwqrc4kxqG2X7sOurKtQkgQ83XX-removebg-preview.png";
import Loading from "../LoadingPage";
import DashboardFooter from "../DashboardFooter";
let role;
let userRole;
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
let clientHistoryNotesId = 0
let clientHistoryNotesFullName = null
function TherapistOldNotesHistory({loading,error,...props}){

    const history = useNavigate ();
    const [userData,setUserData]=useState({});
    const [allNotes, setAllNotes] = useState([]);

    useEffect(() => {
        clientHistoryNotesId = loadState("clientHistoryNotesId",0)
        clientHistoryNotesFullName = loadState("clientHistoryNotesFullName",null)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/users/oldNotesHistory")

                fetchUserData().then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setUserData(response.data);
                        role = loadState("role", '');
                        
                        saveState("role",'ROLE_THERAPIST')
                        const newNotesData = {
                            therapistId: response.data.id,
                            clientId: clientHistoryNotesId
                        };
                        fetchOldNotesHistory(newNotesData).then((response) => {
                            setAllNotes(response.data)
                            userRole = loadState("userRole", '')
                        }).catch((e) => {
                            localStorage.clear();
                            history('/loginBoot');
                        })
                    } else {
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    localStorage.clear();
                    history('/loginBoot');
                })


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
            props.setLocation("/dashboard/therapistDashboard/users/oldNotesHistory")

            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setUserData(response.data);
                    role = loadState("role", '');
                    
                    saveState("role",'ROLE_THERAPIST')
                    const newNotesData = {
                        therapistId: response.data.id,
                        clientId: clientHistoryNotesId
                    };
                    fetchOldNotesHistory(newNotesData).then((response) => {
                        setAllNotes(response.data)
                        userRole = loadState("userRole", '')
                    }).catch((e) => {
                        localStorage.clear();
                        history('/loginBoot');
                    })
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                localStorage.clear();
                history('/loginBoot');
            })


            if (localStorage.getItem('reloadTherapist') === "true") {
                let userId = loadState("chatUserId",0)
                saveState("meetingAvailableTherapist/"+userId,false)
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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser} />

                        <div className="container-fluid" style={{marginBottom: '100px'}}>
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard/history"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Clients History
                                </Link>
                            </div>

                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#858796"}}>{clientHistoryNotesFullName} Notes</h1>
                            </div>

                            {allNotes.length > 0 ?
                                allNotes
                                    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                                    .map((note, index) => (
                                    <div key={index} className="card">
                                        <div className="card-body">
                                            <h4 className="card-title" style={{color: "#0d6efd" }}>Note {index + 1}</h4>
                                            <div className="card-body">
                                                <p className="card-text">Main Points:</p>
                                                <ul>
                                                    {note.mainPoints.map((point, i) => (
                                                        <li key={i}>{point}</li>
                                                    ))}
                                                </ul>
                                                <p className="card-text">Notes Text: {note.notesText}</p>
                                                <p className="card-text">Patient Mood Before: {note.patientMoodBefore}</p>
                                                <p className="card-text">Patient Mood After: {note.patientMoodAfter}</p>
                                                <p className="card-text">Date Added: {note.dateAdded}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <img src={photo} alt={"Photo"}/>
                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>Discover Clients</h4>
                                    <p style={{width: "400px", textAlign: "center", color: "#858796"}}>Find more about
                                        your clients by having conversations with them.</p>
                                    <Link to={"/dashboard/therapistDashboard/therapistChatDashboard"}
                                          className={"discoverButton"} type={"button"}>Discover</Link>
                                </div>
                            }
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
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistOldNotesHistory);
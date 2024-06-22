import React, {useEffect, useState} from 'react';
import {deleteNote, fetchOldNotes, fetchUserData, fetchUserDataId, updateNote} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {loadState, saveState} from "../../../helper/sessionStorage";
import photo from "../../../img/360_F_522716503_R7mc1Xwqrc4kxqG2X7sOurKtQkgQ83XX-removebg-preview.png";
import  "../../../css/TherapistOldNotes.css";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import Loading from "../LoadingPage";
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
let clientNotesId = 0
function TherapistOldNotes({loading,error,...props}){

    const history = useNavigate ();
    const [userData,setUserData]=useState({});
    const [allNotes, setAllNotes] = useState([]);
    const [clientData, setClientData] = useState({
        id: 0,
        name:'',
        surname: ''
    });


    useEffect(() => {
        clientNotesId = loadState("clientNotesId",0)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/users/oldNotes")

                fetchUserData().then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setUserData(response.data);
                        role = loadState("role", '');
                        
                        saveState("role",'ROLE_THERAPIST')
                        const newNotesData = {
                            therapistId: response.data.id,
                            clientId: clientNotesId
                        };

                        fetchUserDataId({id:clientNotesId}).then((response) => {
                            setClientData({
                                id: response.data.id,
                                name: response.data.name,
                                surname: response.data.surname
                            })
                        }).catch((e) => {
                            localStorage.clear();
                            history('/loginBoot');
                        })

                        fetchOldNotes(newNotesData).then((response) => {
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
            props.setLocation("/dashboard/therapistDashboard/users/oldNotes")

            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setUserData(response.data);
                    role = loadState("role", '');
                    
                    saveState("role",'ROLE_THERAPIST')
                    const newNotesData = {
                        therapistId: response.data.id,
                        clientId: clientNotesId
                    };

                    fetchUserDataId({id:clientNotesId}).then((response) => {
                        setClientData({
                            id: response.data.id,
                            name: response.data.name,
                            surname: response.data.surname
                        })
                    }).catch((e) => {
                        localStorage.clear();
                        history('/loginBoot');
                    })

                    fetchOldNotes(newNotesData).then((response) => {
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
        }else{
            props.loginFailure("Authentication Failed!!!");
            props.setLocation("/loginBoot")
            history('/loginBoot');
        }
    }, []);


    function handleEdit(id) {
        saveState("therapistClientNoteId", id);
        history(`/dashboard/therapistDashboard/users/oldNotes/edit`);
    }

    const handleDelete = (id) => {
        deleteNote(id).then((response)=>{
            window.location.reload()
        }).catch((err)=>{

            if(err && err.response){

                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something BABAAAAAA!Please Try Again');
                }
            }
            else{
                console.log("ERROR: ",err)
                props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    };

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

                        <div className="container-fluid" >
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard/users"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Current
                                    Clients
                                </Link>
                            </div>

                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>{clientData.name} {clientData.surname} Notes</h1>
                            </div>

                            {allNotes.length>0 ?
                                allNotes
                                    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                                    .map((note, index) => (
                                    <div key={index} className="card shadow" style={{marginBottom:"20px"}}>
                                        <div className="card-body">
                                            <h4 className="card-title" style={{color: "#0d6efd" }}>Note {index + 1}</h4>
                                            <div className="card-body" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                                <div>
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

                                                <div style={{display: "flex", flexDirection: "column"}}>
                                                    <button className="btn btn-info " style={{color: "white",marginBottom:"5px"}}
                                                            onClick={() => handleEdit(note.id)}>Edit Note
                                                    </button>
                                                    <button className="btn btn-danger"
                                                            onClick={() => handleDelete(note.id)}>Delete Note
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <img src={photo} alt={"Photo"} />
                                    <h4 style={{color: "#5b5c63",fontSize:"28px"}}>Discover Clients</h4>
                                    <p style={{width:"400px",textAlign:"center",color: "#858796"}}>Find more about your clients by having conversations with them.</p>
                                    <Link to={"/dashboard/therapistDashboard/therapistChatDashboard"} className={"discoverButton"} type={"button"}>Discover</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistOldNotes);
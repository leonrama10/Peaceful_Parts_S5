import React, {useEffect, useState} from 'react';
import {fetchOldNotesHistory, fetchUserData} from '../../../api/authService';
import {useNavigate, useParams} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess, setLocation,
    setTherapistAuthenticationState
} from "../../../redux/authActions";
import '../../../css/sb-admin-2.min.css';
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
let role;
let userRole;
const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated",false)
function TherapistOldNotesHistory({loading,error,...props}){

    const { id } = useParams();
    const idNumber = Number(id);
    const history = useNavigate ();
    const [userData,setUserData]=useState({});
    const [allNotes, setAllNotes] = useState([]);

    useEffect(() => {
        props.setLocation("/dashboard/therapistDashboard/users/oldNotesHistory/"+idNumber)
        if(isTherapistAuthenticatedBoolean){
            props.setTherapistAuthenticationState(true)
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    role = loadState("role",'');
                    const newNotesData = {
                        therapistId: response.data.id,
                        clientId:idNumber
                    };
                    fetchOldNotesHistory(newNotesData).then((response)=>{
                        setAllNotes(response.data)
                        userRole = loadState("userRole",'')
                    }).catch((e)=>{
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
        }else if(props.isTherapistAuthenticated){
            props.setTherapistAuthenticationState(true)
            saveState("isTherapistAuthenticated",props.isTherapistAuthenticated)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    role = loadState("role",'');
                    const newNotesData = {
                        therapistId: response.data.id,
                        clientId:idNumber
                    };

                    fetchOldNotesHistory(newNotesData).then((response)=>{
                        setAllNotes(response.data)
                        userRole = loadState("userRole",'')
                    }).catch((e)=>{
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
        }else{
            props.setLocation('/loginBoot')
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }

        if (localStorage.getItem('reloadTherapist')==="true") {
            // Set the 'reloaded' item in localStorage
            localStorage.setItem('reloadTherapist', "false");
            // Reload the page
            window.location.reload();
        }
    }, []);


    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser} setTherapistAuthenticationState={props.setTherapistAuthenticationState}/>

                        <div className="container-fluid" style={{marginBottom: '100px'}}>

                            {allNotes.map((note, index) => (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Note {index + 1}</h5>
                                        <p className="card-text">Main Points:</p>
                                        <ul>
                                            {note.mainPoints.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                        <p className="card-text">Notes Text: {note.notesText}</p>
                                        <p className="card-text">Patient Mood Before: {note.patientMoodBefore}</p>
                                        <p className="card-text">Patient Mood After: {note.patientMoodAfter}</p>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    <footer className="bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span style={{color: 'grey'}}>Copyright © PeacefulParts 2024</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>

            <script src="../../../js/sb-admin-2.min.js"></script>

            <script src="../../../vendor/chart.js/Chart.min.js"></script>

            <script src="../../../js/demo/chart-area-demo.js"></script>
            <script src="../../../js/demo/chart-pie-demo.js"></script>

        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isTherapistAuthenticated: auth.isTherapistAuthenticated,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistOldNotesHistory);
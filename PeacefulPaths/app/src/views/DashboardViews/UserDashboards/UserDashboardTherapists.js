import React, {useEffect, useState} from 'react';
import {
    fetchNextBooking,
    fetchUserData,
    fetchUserTherapistConnectionData,
    removeTherapist
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';

import '../../../css/UserDashboardTherapists.css';

import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {Alert} from "reactstrap";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation,
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";

let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function UserDashboardTherapists({loading,error,...props}){

    useEffect(() => {
        props.setLocation("/dashboard/userDashboard/therapists")
        if(!isUserAuthenticatedBoolean){
            if (!props.isUserAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                props.setLocation("/loginBoot")
                history('/loginBoot');
            }else{
                props.setUserAuthenticationState(true)
                saveState("isUserAuthenticated",props.isUserAuthenticated)
            }
        }else{
            props.setUserAuthenticationState(true)
            saveState("isUserAuthenticated",isUserAuthenticatedBoolean)
        }

        if (localStorage.getItem('reloadUser')==="true") {
            // Set the 'reloaded' item in localStorage
            localStorage.setItem('reloadUser', "false");
            // Reload the page
            window.location.reload();
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [bookingExists,setBookingExists]=useState(false);
    const [nextBooking,setNextBooking]=useState({});
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

    React.useEffect(() => {
        connected = loadState("connected",false)
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);

                const newBookingsData = {
                    clientId: response.data.id,
                    therapistId: 0
                };

                fetchUserTherapistConnectionData(response.data.id).then((response) => {
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
                           allRoles: response.data.allRoles,
                           university: response.data.university,
                           gender: response.data.gender
                        });
                        connected = loadState("connected",false)
                        if(response.data.id===0){
                            saveState("connected",false)
                        }else {
                            saveState("connected",true)
                        }

                        newBookingsData.therapistId = response.data.id

                        fetchNextBooking(newBookingsData).then((response) => {
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
                    connected = loadState("connected",false)
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
            } else {
                history('/loginBoot');
            }
        }).catch((e) => {
            history('/loginBoot');
        });
    }, []);

    function handleRemove(id) {
        removeTherapist(id).then((response)=>{
            if(response.status===200){
                saveState("connected",false)
                history('/dashboard/userDashboard')
            }
            else{
                //Add error on page if user cant be deleted
                history('/loginBoot');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    }

    function formatHour(hour) {
        return `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
    }


    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser hideFilterMenu={hideFilterMenu}/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState}/>

                        { connectionFailure &&
                            <Alert style={{marginTop:'20px'}} variant="danger">
                                {connectionFailure}
                            </Alert>
                        }

                        <div className="container-fluid-UserDashboardTherapists">
                            {connected && <div className="card" style={{display: "flex", flexDirection: "row"}}>
                                <div className="card-body-UserDashboardTherapists">
                                    <h5 className="card-title">Full
                                        name: {therapistData.name} {therapistData.surname}</h5>
                                    <span className="card-text-UserDashboardTherapists">Email:</span> <span>{therapistData.email}</span><br/>
                                    <span className="card-text-UserDashboardTherapists">Phone:</span> <span> {therapistData.number}</span><br/>
                                    <span className="card-text-UserDashboardTherapists">Gender:</span> <span> {therapistData.gender.gender}</span><br/>
                                    <span className="card-text-UserDashboardTherapists">Experience:</span> <span> {therapistData.experience} years</span><br/>
                                    <span className="card-text-UserDashboardTherapists">Location:</span> <span> {therapistData.location.location}</span><br/>
                                    <br/>

                                    <button className="button-UserDashboardTherapists" onClick={() => handleRemove(data.id)}>Remove Therapist</button>
                                </div>

                                {bookingExists ? <div className="card-body">
                                    <h5 className="card-title">Next Session:</h5>
                                    <p className="card-text">Date: {new Date(nextBooking.date).toLocaleDateString()}</p>
                                    <p className="card-text">Hour: {nextBooking && nextBooking.hour && formatHour(nextBooking.hour)}</p>
                                </div>:<div><p>No bookings in the future, <br/>why dont you select a date <br/>and talk some stuff :)</p>
                                    <Link to="/dashboard/userDashboard/addBookings">Click here</Link>
                                </div>
                                }
                            </div>}
                        </div>
                    </div>
                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
            </a>

            <script src="../../../vendor/jquery/jquery.min.js"></script>
            <script src="../../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../../../vendor/jquery-easing/jquery.easing.min.js"></script>

        </main>
    )

}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isUserAuthenticated: auth.isUserAuthenticated,
        location: auth.location
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboardTherapists);
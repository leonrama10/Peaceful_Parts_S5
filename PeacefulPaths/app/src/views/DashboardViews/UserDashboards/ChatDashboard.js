import React, {useEffect, useState} from 'react';
import {
    fetchAllUserTherapistOldConnectionData, fetchNextBooking,
    fetchUserData,
    fetchUserTherapistConnectionData
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import '../../../css/myCss.css';
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
function ChatDashboard({loading,error,...props}){

    useEffect(() => {
        props.setLocation("/dashboard/userDashboard/chatDashboard")
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
        name:'',
        surname:'',
    });
    const [allTherapistData, setAllTherapistData] = useState([]);

    React.useEffect(() => {
        connected = loadState("connected",false)
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);
                const userId = response.data.id;

                fetchUserTherapistConnectionData(response.data.id).then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setTherapistData({
                            id: response.data.id,
                            name: response.data.name,
                            surname: response.data.surname,
                        });
                        connected = loadState("connected",false)
                        if(response.data.id===0){
                            saveState("connected",false)
                        }else {
                            saveState("connected",true)
                        }

                        fetchAllUserTherapistOldConnectionData({therapistId:response.data.id,userId:userId}).then((response) => {
                            setAllTherapistData(response.data);
                        }).catch((e) => {
                            history('/loginBoot');
                        });


                        fetchNextBooking({therapistId:response.data.id,clientId:userId}).then((response) => {
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

    function handleClick() {
        saveState("meetingAvailable",true)
        props.setLocation("/dashboard/userDashboard/chatTherapist")
        history("/dashboard/userDashboard/chatTherapist")
    }

    function handleOldClick(id) {
        saveState("chatTherapistId", id);
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

                        <div className="container-fluid">
                             <div className="card">
                                {connected && <div className="card-body" style={{display: "flex", flexDirection: "row"}}>
                                    <div className="card-body">
                                        CONNECTED THERAPIST
                                        <h5 className="card-title">Full
                                            name: {therapistData.name} {therapistData.surname}</h5>
                                        <br/>

                                        {bookingExists && nextBooking && timeDifference >= 0 && timeDifference <= 50 && <button onClick={handleClick}>Chat With Therapist</button>}
                                    </div>

                                    {bookingExists ?
                                        <div>{nextBooking && timeDifference >= 0 && timeDifference <= 50 ?
                                            <div className="card-body">
                                                <h4 className="card-title">Session is in progress</h4>
                                            </div> : <div className="card-body">
                                                <h5 className="card-title">Next Session:</h5>
                                                <p className="card-text">Date: {new Date(nextBooking.date).toLocaleDateString()}</p>
                                                <p className="card-text">Hour: {nextBooking && nextBooking.hour && formatHour(nextBooking.hour)}</p>
                                            </div>}
                                        </div> :
                                        <div><p>No bookings in the future, <br/>why dont you select a date <br/>and talk
                                            some stuff :)</p>
                                            <Link to="/dashboard/userDashboard/addBookings">Click here</Link>
                                        </div>
                                    }
                                </div>} 

                                 <hr/>
                                 <div className="card-body">
                                     OLD THERAPIST CHATS:
                                     {allTherapistData.map((data, index) => (
                                         <div key={index} className="card">
                                             <div className="card-body">
                                                 <h5 className="card-title">Full
                                                     name: {data.name} {data.surname}</h5>
                                                 <br/>
                                                 <button onClick={() => handleOldClick(data.id)}>See Old Chats
                                                 </button>
                                             </div>
                                         </div>
                                     ))}

                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatDashboard);
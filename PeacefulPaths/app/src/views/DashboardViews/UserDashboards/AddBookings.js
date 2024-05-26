import React, {useEffect, useState} from 'react';
import {
    bookSession,
    fetchBookedHours,
    fetchUserData,
    fetchUserTherapistConnectionData, fetchWorkDays, removeTherapist, selectWorkDays
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
    authSuccess, setLocation,
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function AddBookings({loading,error,...props}){

    useEffect(() => {
        props.setLocation("/dashboard/userDashboard/addBookings")
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
    const [connectionFailure, setConnectionFailure] = useState('');
    const [hours, setHours] = useState([]);
    const [successfullyBooked, setSuccessfullyBooked] = useState(false);
    const [workDays,setWorkDays]=useState([]);
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

    const [values, setValues] = useState({
        clientId:0,
        therapistId: 0,
        date: '',
        hour:''
    });

    React.useEffect(() => {
        connected = loadState("connected",false)
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);
                const newBookingsData = {
                    clientId: response.data.id,
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
                            University: response.data.University,
                            gender: response.data.gender
                        });
                        connected = loadState("connected",false)
                        if(response.data.id===0){
                            saveState("connected",false)
                        }else {
                            saveState("connected",true)
                        }

                        setValues({
                            therapistId: response.data.id,
                            clientId: newBookingsData.clientId
                        })

                        fetchWorkDays({therapistId: response.data.id}).then((response)=>{
                            setWorkDays(response.data)
                        }).catch((e)=>{
                            localStorage.clear();
                            history('/loginBoot');
                        })

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


    function handleSubmit(evt) {
        evt.preventDefault();

        bookSession(values).then((response) => {
            setSuccessfullyBooked(true)
        }).catch((err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something BABAAAAAA!Please Try Again');

                }
            } else {
                console.log("ERROR: ", err)
                props.loginFailure('Something NaNAAAAA!Please Try Again');
            }
        });
    }

    React.useEffect(() => {
        console.log("VALUESSSSSSSSS",values)
    }, [values])

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setValues(values => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        if (values.date) {
            fetchBookedHours(values).then((response) => {
                console.log("RESPONSE",response.data)
                setHours(response.data);
            }).catch((e) => {
                history('/loginBoot');
            });
        }
    }, [values.date]);

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
                            {connected && <div className="card">
                                <div className="card-body">
                                    <p className="card-text">Select next session date and time:</p>
                                    <p>Therapist only works these days: </p>
                                    {workDays.map((workDay, index) => {
                                        // Access the day property from the workDay object
                                        const day = workDay.day;

                                        // Return a paragraph element with the day
                                        return (
                                            <p key={index}>{day}</p>
                                        );
                                    })}

                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="sessionDate">Date:</label><br/>
                                        <input type="date" id="sessionDate" name="date" defaultValue={values.date}
                                               min={new Date().toISOString().split('T')[0]}  onChange={handleChange}/><br/>
                                        <select name="hour" onChange={handleChange}>
                                            <option value="">Select an hour</option>
                                            {hours.map((hourObj, index) => {
                                                // Format the hour to look like time
                                                const hour = hourObj.hour.map(num => num < 10 ? `0${num}` : num).join(':');
                                                return (
                                                    <option key={index} value={hour}>
                                                        {hour}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <br/><br/>
                                        <i>Info: You cant have two bookings in the same day.</i>
                                        <br/><br/>
                                        <input type="submit" value="Submit"/>
                                    </form>


                                    {successfullyBooked && <p>Head to your bookings, to manage your bookings: <Link
                                        to="/dashboard/userDashboard/bookingsInfo">Manage Bookings</Link></p>}
                                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddBookings);
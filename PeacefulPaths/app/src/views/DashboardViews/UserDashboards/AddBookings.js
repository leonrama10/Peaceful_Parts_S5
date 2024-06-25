import React, {useEffect, useState} from 'react';
import {
    bookSession,
    fetchBookedHours,
    fetchUserData,
    fetchUserTherapistConnectionData, fetchWorkDays,
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import '../../../css/AddBookings.css';
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {Alert} from "reactstrap";
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import '../../../css/Bookings.css';
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import photo from "../../../img/3585145_66102-removebg-preview.jpg";
let connected = null;
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
let bookingsMessage = false
function AddBookings({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    const [connectionFailure, setConnectionFailure] = useState('');
    const [hours, setHours] = useState([]);
    const [successfullyBooked, setSuccessfullyBooked] = useState(false);
    const [workDays,setWorkDays]=useState([]);
    const [values, setValues] = useState({
        clientId:0,
        therapistId: 0,
        date: '',
        hour:''
    });

    useEffect(() => {
        bookingsMessage = loadState("bookingsMessage",false)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/userDashboard/addBookings")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    
                    saveState("role",'ROLE_USER')
                    setData(response.data);
                    const newBookingsData = {
                        clientId: response.data.id,
                    };

                    fetchUserTherapistConnectionData({id:response.data.id}).then((response) => {
                        saveState("connected",true)
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

                    }).catch((e) => {
                        saveState("connected",false)
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

            if (localStorage.getItem('reloadUser') === "true") {
                saveState("chatStateLocation",'')
                // Set the 'reloaded' item in localStorage
                localStorage.setItem('reloadUser', "false");
                // Reload the page
                window.location.reload();
            }
        }else if(getAccessToken()){
            props.setLocation("/dashboard/userDashboard/addBookings")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    
                    saveState("role",'ROLE_USER')
                    setData(response.data);
                    const newBookingsData = {
                        clientId: response.data.id,
                    };

                    fetchUserTherapistConnectionData({id:response.data.id}).then((response) => {
                        saveState("connected",true)

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

                    }).catch((e) => {
                        saveState("connected",false)
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


    function handleSubmit(evt) {
        evt.preventDefault();

        bookSession(values).then((response) => {
            saveState("bookingsMessage",false)
            history("/dashboard/userDashboard/bookingsInfo")
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

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{display: "flex", justifyContent: "start", alignItems: 'center'}}>
                                <Link  to={`/dashboard/userDashboard${workDays.length===0?'':bookingsMessage?'':'/bookingsInfo'}`} className="btn goBack" style={{color:"#0d6efd",marginLeft:"-10px"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight:"3.5px"}}/>{workDays.length===0?"Go to Dashboard":bookingsMessage?"Go to Dashboard":"Go to Bookings"}
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>Book a Session</h1>
                            </div>
                        </div>
                        <div style={{display:"flex",justifyContent:"center"}}>
                            {connected ?
                                workDays.length>0?
                                    <div className="card shadow" style={{width: "500px"}}>
                                        <div className="card-body">
                                            {bookingsMessage &&
                                                <Alert style={{marginTop: '20px'}} variant="info">
                                                    Make your first booking :)
                                                </Alert>
                                            }

                                            <h4>Therapist works these days:</h4>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                marginTop: "50px",
                                                marginBottom: "50px"
                                            }}>
                                                <div style={{display: 'flex'}}>
                                                    {workDays.map((workDay, index) => {
                                                        const day = workDay.day;
                                                        return (
                                                            <div key={index} style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                margin: '0 5px',
                                                                width: '45px',
                                                                height: '45px',
                                                                borderRadius: '50%',
                                                                background: '#0d6efd',
                                                                color: 'white',
                                                                fontWeight: 'bold'
                                                            }}>
                                                                <span>{day.slice(0, 3).toUpperCase()}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <form className="form-AddBookings" onSubmit={handleSubmit}>
                                                <label htmlFor="sessionDate">Select Date:</label><br/>
                                                <input type="date" id="sessionDate" name="date" defaultValue={values.date}
                                                       min={new Date().toISOString().split('T')[0]}
                                                       onChange={handleChange}/><br/>
                                                <select name="hour" onChange={handleChange}>
                                                    <option value="">Select Hour</option>
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

                                                <i style={{marginTop: "15px", marginBottom: "15px"}}>Info: You cant have two
                                                    bookings in the same day.</i>
                                                <br/><br/>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginBottom: "20px"
                                                }}>
                                                    <input type="submit" value="Save" className="btn btn-primary "/>
                                                    <Link className="btn btn-danger" style={{marginLeft: "5px"}}
                                                          type={"button"}
                                                          to="/dashboard/userDashboard/bookingsInfo">
                                                        Cancel
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>:
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingTop: "30px"
                                }}>
                                    <img src={photo} style={{maxWidth: "400px"}} alt={"photo"}/>
                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>Therapist is currently on a break :)</h4>
                                </div>
                                :
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingTop: "30px"
                                }}>
                                    <img src={photo} style={{maxWidth: "400px"}} alt={"photo"}/>
                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>Booking unavailable!</h4>
                                    <p style={{
                                        maxWidth: "400px",
                                        textAlign: "center",
                                        color: "#858796"
                                    }}>You need to connect with a therapist first!</p>
                                    <Link to={"/dashboard/userDashboard"} className={"discoverButton"}
                                       type={"button"}>Discover</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddBookings);
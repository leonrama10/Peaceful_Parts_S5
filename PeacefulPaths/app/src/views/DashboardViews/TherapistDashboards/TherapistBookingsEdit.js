import React, {useEffect, useState} from 'react';
import {
    fetchBookedHoursInEdit,
    fetchBookingByBookingId,
    fetchUserData,
    fetchWorkDays,
    updateBookingSession
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess,
    setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import SideBarTherapist from "../SideBars/SideBarTherapist";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
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
let therapistBookingId = loadState("therapistBookingId",0)
function TherapistBookingsEdit({loading,error,...props}){

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [hours, setHours] = useState([]);
    const [workDays,setWorkDays]=useState([]);
    const [booking,setBooking]=useState({});
    const [values, setValues] = useState({
        clientId:0,
        bookingId:0,
        therapistId: 0,
        date: '',
        hour:''
    });

    useEffect(() => {
        therapistBookingId = loadState("therapistBookingId",0)
        if(getRefreshToken()) {
            props.setLocation("/dashboard/therapistDashboard/bookings/editBooking")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setData(response.data);
                    const therapistId = response.data.id;
                    saveState("role",'ROLE_THERAPIST')

                    fetchBookingByBookingId({bookingId: therapistBookingId}).then((response) => {
                        setBooking(response.data);
                        setValues({
                            therapistId: therapistId,
                            clientId: response.data.clientId,
                            bookingId: therapistBookingId,
                            date: response.data.date,
                            hour: response.data.hour
                        })
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                    fetchWorkDays({therapistId: response.data.id}).then((response)=>{
                        setWorkDays(response.data)
                    }).catch((e)=>{
                        localStorage.clear();
                        history('/loginBoot');
                    })
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

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
            props.setLocation("/dashboard/therapistDashboard/bookings/editBooking")
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                    setData(response.data);
                    const therapistId = response.data.id;
                    saveState("role",'ROLE_THERAPIST')

                    fetchBookingByBookingId({bookingId: therapistBookingId}).then((response) => {
                        setBooking(response.data);
                        setValues({
                            therapistId: therapistId,
                            clientId: response.data.clientId,
                            bookingId: therapistBookingId,
                            date: response.data.date,
                            hour: response.data.hour
                        })
                    }).catch((e) => {
                        history('/loginBoot');
                    });

                    fetchWorkDays({therapistId: response.data.id}).then((response)=>{
                        setWorkDays(response.data)
                    }).catch((e)=>{
                        localStorage.clear();
                        history('/loginBoot');
                    })
                } else {
                    history('/loginBoot');
                }
            }).catch((e) => {
                history('/loginBoot');
            });

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

    function handleUpdate(evt) {
        evt.preventDefault();

        updateBookingSession(values).then((response) => {
            history("/dashboard/therapistDashboard/bookings")
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
            fetchBookedHoursInEdit(values).then((response) => {
                setHours(response.data);
            }).catch((e) => {
                history('/loginBoot');
            });
        }
    }, [values.date]);

    let formattedDate = null
    if (booking.date && booking.date.length === 3) {
        let dateArray = booking.date;
        let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]+1);

        formattedDate = date.toISOString().slice(0,10);
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarTherapist />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/therapistDashboard/bookings"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go
                                    to Bookings
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>Edit Booking</h1>
                            </div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <div className="card shadow" style={{width: "500px"}}>
                                    <div className="card-body">
                                        <h5>You only works these days: </h5>
                                        {workDays.map((workDay, index) => {
                                            // Access the day property from the workDay object
                                            const day = workDay.day;

                                            // Return a paragraph element with the day
                                            return (
                                                <p key={index}>{day}</p>
                                            );
                                        })}

                                        <form onSubmit={handleUpdate} style={{textAlign: "center"}}>
                                            <label htmlFor="sessionDate">Date:</label><br/>
                                            <input type="date" id="sessionDate" name="date" defaultValue={formattedDate}
                                                   onChange={handleChange}
                                                   min={new Date().toISOString().split('T')[0]}/><br/>
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
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <input type="submit" value="Save" className="btn btn-primary "/>
                                                <Link className="btn btn-danger" style={{marginLeft: "5px"}}
                                                      type={"button"}
                                                      to="/dashboard/therapistDashboard/bookings">
                                                    Cancel Update
                                                </Link>
                                            </div>
                                        </form>
                                        <br/>
                                    </div>
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
        loginFailure: (message) => dispatch(authFailure(message)),
        setLocation: (path) => dispatch(setLocation(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistBookingsEdit);
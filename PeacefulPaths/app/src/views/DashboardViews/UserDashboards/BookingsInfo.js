import React, {useEffect, useState} from 'react';
import {
    cancelBooking,
    fetchBookings,
    fetchUserData,
    fetchUserTherapistConnectionData
} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../css/myCss.css';
import '../../../css/Bookings.css';
import DashboardNav from "../DashboardNav";
import SideBarUser from "../SideBars/SideBarUser";
import {
    authenticate,
    authFailure,
    authSuccess, setLocation
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faChevronLeft, faPlus} from "@fortawesome/free-solid-svg-icons";
import photo from "../../../img/3585145_66102-removebg-preview.jpg";
import DashboardFooter from "../DashboardFooter";
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
function BookingsInfo({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allBookings, setAllBookings] = useState([]);
    const [hideFilterMenu,setHideFilterMenu]=useState(true);
    let emptyBoolean=false;
    let emptyAvailableBoolean=false;
    let emptyExpiredBoolean=false;
    const [info, setInfo] = useState(false);

    useEffect(() => {
        if(getRefreshToken()) {
            props.setLocation("/dashboard/userDashboard/bookingsInfo")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    setData(response.data);
                    
                    saveState("role",'ROLE_USER')

                    const newBookingsData = {
                        clientId: response.data.id,
                        therapistId: 0
                    };

                    fetchUserTherapistConnectionData({id:response.data.id}).then((response) => {
                        saveState("connected",true)
                        newBookingsData.therapistId = response.data.id

                        fetchBookings(newBookingsData).then((response) => {
                            if (response.data.length === 0){
                                setInfo(true);
                                saveState("bookingsMessage", true)
                                history("/dashboard/userDashboard/addBookings")
                            }else {
                                setAllBookings(response.data);
                                saveState("bookingsMessage", false)
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                    }).catch((e) => {
                        saveState("connected",false)
                        if (e.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
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
            props.setLocation("/dashboard/userDashboard/bookingsInfo")
            connected = loadState("connected",false)
            fetchUserData().then((response) => {
                if (response.data.roles.at(0).role === 'ROLE_USER') {
                    setData(response.data);
                    
                    saveState("role",'ROLE_USER')

                    const newBookingsData = {
                        clientId: response.data.id,
                        therapistId: 0
                    };

                    fetchUserTherapistConnectionData({id:response.data.id}).then((response) => {
                        saveState("connected",true)
                        newBookingsData.therapistId = response.data.id

                        fetchBookings(newBookingsData).then((response) => {
                            if (response.data.length === 0){
                                setInfo(true);
                                saveState("bookingsMessage", true)
                                history("/dashboard/userDashboard/addBookings")
                            }else {
                                setAllBookings(response.data);
                                saveState("bookingsMessage", false)
                            }
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                    }).catch((e) => {
                        saveState("connected",false)
                        if (e.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
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

    function handleCanceling(id) {
        cancelBooking({bookingId:id}).then((response)=>{
            if(response.status===200){
                window.location.reload();
            }
            else{
                //Add error on page if user cant be deleted
                history('/loginBoot');
            }
        }).catch((err)=>{
            history('/loginBoot');
        });
    }

    function handleClick() {
        history(`/dashboard/userDashboard/chatDashboard`);
    }

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser hideFilterMenu={hideFilterMenu} />

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
                                <h1 className="h3 mb-0 text-800" style={{color: "#5a5c69"}}>My Bookings</h1>
                                {connected && <Link to={"/dashboard/userDashboard/addBookings"} className="btn btn-primary"
                                      type="button"
                                ><FontAwesomeIcon icon={faPlus} style={{marginRight: "3.5px"}}/>Book a Session
                                </Link>}
                            </div>
                            <br/>
                            {connected ? <div >
                                {!info && <div>
                                    <div className={"card shadow"}>
                                        <div className={"card-body"}>
                                            <h4>Session in progress</h4>
                                            {allBookings
                                                .filter(booking => {
                                                    if (booking.endSessionBoolean) return false;
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                                    const currentDate = new Date();
                                                    const bookingDate = new Date(formattedDate);
                                                    const bookingTime = new Date(formattedDate + 'T' + formattedHour);

                                                    // If the booking is today and the current time is within the booking time, return true
                                                    if (currentDate.toDateString() === bookingDate.toDateString() && currentDate.getTime() >= bookingTime.getTime() && currentDate.getTime() <= bookingTime.getTime() + 50 * 60 * 1000) {
                                                        return true;
                                                    }
                                                })
                                                .sort((a, b) => {
                                                    const dateA = new Date(`${a.date[0]}-${a.date[1] < 10 ? '0' + a.date[1] : a.date[1]}-${a.date[2] < 10 ? '0' + a.date[2] : a.date[2]}`);
                                                    const dateB = new Date(`${b.date[0]}-${b.date[1] < 10 ? '0' + b.date[1] : b.date[1]}-${b.date[2] < 10 ? '0' + b.date[2] : b.date[2]}`);
                                                    return dateA - dateB;
                                                })
                                                .map((booking, index) => {
                                                    emptyBoolean = true;
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                                    return (
                                                        <div key={index}
                                                             style={{
                                                                 marginTop: '10px',
                                                                 display: "flex",
                                                                 flexDirection: "row",
                                                                 justifyContent: "space-between",
                                                                 alignItems: "center"
                                                             }}>
                                                            <div className="card-body">
                                                                <h5 className="card-title"
                                                                    style={{color: "#0d6efd"}}>Booking</h5>
                                                                <p className="card-text"
                                                                   style={{marginLeft: "10px"}}>Booking
                                                                    Id: {booking.bookingId}</p>
                                                                <p className="card-text"
                                                                   style={{marginLeft: "10px"}}>Therapist
                                                                    Id: {booking.therapistId}</p>
                                                                <p className="card-text"
                                                                   style={{marginLeft: "10px"}}>Client
                                                                    Id: {booking.clientId}</p>
                                                                <p className="card-text"
                                                                   style={{marginLeft: "10px"}}>Date: {formattedDate}</p>
                                                                <p className="card-text"
                                                                   style={{marginLeft: "10px"}}>Hour: {formattedHour}</p>
                                                            </div>

                                                            <button style={{color: "white"}} className="btn btn-info "
                                                                    onClick={handleClick}>
                                                                Go to Session <FontAwesomeIcon icon={faArrowRight}
                                                                                               style={{marginLeft: "3.5px"}}/>
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {!emptyBoolean && <i style={{color:"#d10606"}}>No bookings right now!</i>}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"card shadow"}>
                                        <div className={"card-body"}>
                                            <h4>Available bookings</h4>
                                            {allBookings
                                                .filter(booking => {
                                                    if (booking.endSessionBoolean) return false;
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                                    const currentDate = new Date();
                                                    const bookingTime = new Date(formattedDate + 'T' + formattedHour);

                                                    // Include bookings that are today or in the future
                                                    return currentDate <= bookingTime;
                                                })
                                                .sort((a, b) => {
                                                    const dateA = new Date(`${a.date[0]}-${a.date[1] < 10 ? '0' + a.date[1] : a.date[1]}-${a.date[2] < 10 ? '0' + a.date[2] : a.date[2]}`);
                                                    const dateB = new Date(`${b.date[0]}-${b.date[1] < 10 ? '0' + b.date[1] : b.date[1]}-${b.date[2] < 10 ? '0' + b.date[2] : b.date[2]}`);
                                                    return dateA - dateB;
                                                })
                                                .map((booking, index,array) => {
                                                    emptyAvailableBoolean = true
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                                    return (
                                                        <div key={index}>
                                                            <div style={{
                                                                marginTop: '10px',
                                                                display: "flex",
                                                                flexDirection: "row"
                                                            }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title"
                                                                        style={{color: "#0d6efd"}}>Booking</h5>
                                                                    <p className="card-text"
                                                                       style={{marginLeft: "10px"}}>Booking
                                                                        Id: {booking.bookingId}</p>
                                                                    <p className="card-text"
                                                                       style={{marginLeft: "10px"}}>Therapist
                                                                        Id: {booking.therapistId}</p>
                                                                    <p className="card-text"
                                                                       style={{marginLeft: "10px"}}>Client
                                                                        Id: {booking.clientId}</p>
                                                                    <p className="card-text"
                                                                       style={{marginLeft: "10px"}}>Date: {formattedDate}</p>
                                                                    <p className="card-text"
                                                                       style={{marginLeft: "10px"}}>Hour: {formattedHour}</p>
                                                                </div>

                                                                <div className="card-body" style={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "center",
                                                                    alignItems: "end"
                                                                }}>
                                                                    <button className="btn btn-danger "
                                                                            style={{marginTop: "5px"}}
                                                                            onClick={() => handleCanceling(booking.bookingId)}>Cancel
                                                                        Booking
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {index !== array.length - 1 && <hr/>}
                                                        </div>
                                                    )
                                                })}
                                            {!emptyAvailableBoolean && <i style={{color:"#d10606"}}>No bookings in the future!</i>}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"card shadow"} style={{marginBottom:"10px"}}>
                                        <div className={"card-body"}>
                                            <h4>Expired bookings</h4>
                                            {allBookings
                                                .filter(booking => {
                                                    if (booking.endSessionBoolean) return true;
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
                                                    const currentDate = new Date();
                                                    const bookingDate = new Date(formattedDate + ' ' + formattedHour);

                                                    const bookingDateTest = new Date(formattedDate);
                                                    const bookingTime = new Date(formattedDate + 'T' + formattedHour);

                                                    if (currentDate.toDateString() === bookingDateTest.toDateString() && currentDate.getTime() >= bookingTime.getTime() && currentDate.getTime() <= bookingTime.getTime() + 50 * 60 * 1000) {
                                                        return false;
                                                    }

                                                    return currentDate > bookingDate;
                                                })
                                                .sort((a, b) => {
                                                    const dateA = new Date(`${a.date[0]}-${a.date[1] < 10 ? '0' + a.date[1] : a.date[1]}-${a.date[2] < 10 ? '0' + a.date[2] : a.date[2]}`);
                                                    const dateB = new Date(`${b.date[0]}-${b.date[1] < 10 ? '0' + b.date[1] : b.date[1]}-${b.date[2] < 10 ? '0' + b.date[2] : b.date[2]}`);
                                                    return dateB - dateA;
                                                })
                                                .map((booking, index, array) => {
                                                    emptyExpiredBoolean = true
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                                    return (
                                                        <div key={index}>
                                                            <div
                                                                style={{
                                                                    marginTop: '10px',
                                                                    display: "flex",
                                                                    flexDirection: "row"
                                                                }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title"
                                                                        style={{color: "#90d3fc"}}>Booking</h5>
                                                                    <p className="card-text"
                                                                       style={{
                                                                           marginLeft: "10px",
                                                                           color: "#a1a1a1"
                                                                       }}>Booking
                                                                        Id: {booking.bookingId}</p>
                                                                    <p className="card-text"
                                                                       style={{
                                                                           marginLeft: "10px",
                                                                           color: "#a1a1a1"
                                                                       }}>Therapist
                                                                        Id: {booking.therapistId}</p>
                                                                    <p className="card-text"
                                                                       style={{
                                                                           marginLeft: "10px",
                                                                           color: "#a1a1a1"
                                                                       }}>Client
                                                                        Id: {booking.clientId}</p>
                                                                    <p className="card-text" style={{
                                                                        marginLeft: "10px",
                                                                        color: "#a1a1a1"
                                                                    }}>Date: {formattedDate}</p>
                                                                    <p className="card-text" style={{
                                                                        marginLeft: "10px",
                                                                        color: "#a1a1a1"
                                                                    }}>Hour: {formattedHour}</p>
                                                                </div>
                                                            </div>
                                                            {index !== array.length - 1 && <hr/>}
                                                        </div>
                                                    )
                                                })
                                            }
                                            {!emptyExpiredBoolean && <i style={{color:"#d10606"}}>No bookings in the past!</i>}
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>:
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingTop: "6px"
                                }}>
                                    <img src={photo} style={{maxWidth: "400px"}} alt={"photo"}/>
                                    <h4 style={{color: "#5b5c63", fontSize: "28px"}}>No Bookings Available</h4>
                                    <p style={{
                                        maxWidth: "400px",
                                        textAlign: "center",
                                        color: "#858796"
                                    }}>You need to connect with a therapist first!</p>
                                    <Link to={"/dashboard/userDashboard"} className={"discoverButton"} type={"button"}>Discover</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(BookingsInfo);
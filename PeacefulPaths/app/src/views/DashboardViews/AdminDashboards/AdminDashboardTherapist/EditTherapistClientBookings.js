import React, {useEffect, useState} from 'react';
import {cancelBooking, fetchBookings, fetchUserData} from '../../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../css/AdminDashboard.css';
import DashboardNav from "../../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess
} from "../../../../redux/authActions";
import {connect} from "react-redux";
import SideBarAdmin from "../../SideBars/SideBarAdmin";
import {loadState, saveState} from "../../../../helper/sessionStorage";
import {jwtDecode} from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import photo from "../../../../img/3585145_66102-removebg-preview.jpg";
import DashboardFooter from "../../DashboardFooter";
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
let editTherapistId =null
let editTherapistClientId =null
let editTherapistClientFullName = null
function EditTherapistClientBookings({loading,error,...props}){
    const history = useNavigate ();
    let emptyFutureBoolean=false;
    let emptyExpiredBoolean=false;
    const [data,setData]=useState({});
    const [info, setInfo] = useState(false);
    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        editTherapistId = loadState("editTherapistId", 0);
        editTherapistClientId = loadState("editTherapistClientId", 0);
        editTherapistClientFullName = loadState("editTherapistClientFullName", null);
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchBookings({therapistId: editTherapistId, clientId: editTherapistClientId}).then((response) => {
                            if (response.data.length === 0){
                                setInfo(true);
                            }else {setAllBookings(response.data);}
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else if(getAccessToken()){
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchBookings({therapistId: editTherapistId, clientId: editTherapistClientId}).then((response) => {
                            if (response.data.length === 0){
                                setInfo(true);
                            }else {setAllBookings(response.data);}
                        }).catch((e) => {
                            history('/loginBoot');
                        });
                    }
                }
            }).catch((e) => {
                history('/loginBoot');
            });
        } else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);

    function handleEdit(id) {
        saveState("editTherapistClientBookingId", id);
        history("/dashboard/adminDashboard/therapists/editTherapistClients/bookings/edit");
    }

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

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/adminDashboard/therapists/editTherapistClients"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Therapist Clients
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>{editTherapistClientFullName} Bookings</h1>
                            </div>

                                {!info ?
                                    <div>
                                        <div className={"card shadow"} style={{padding: '10px'}}>
                                            <h4>Available bookings</h4>
                                            {allBookings
                                                .filter(booking => {
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
                                                .map((booking, index, array) => {
                                                    emptyFutureBoolean = true;
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                                    return (
                                                        <div key={index} >
                                                            <div
                                                                 style={{
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
                                                                    <button className="btn btn-info"
                                                                            style={{color: "white"}}
                                                                            onClick={() => handleEdit(booking.bookingId)}>Edit
                                                                        Booking
                                                                    </button>
                                                                    <br/>
                                                                    <br/>
                                                                    <button className="btn btn-danger"
                                                                            style={{marginTop: "5px"}}
                                                                            onClick={() => handleCanceling(booking.bookingId)}>Cancel
                                                                        Booking
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {index !== array.length - 1 && <hr/>}
                                                        </div>
                                                    )
                                                })
                                            }
                                            {!emptyFutureBoolean && <i style={{color:"#d10606"}}>No bookings in the future!</i>}
                                        </div>

                                        <br/>

                                        <div className={"card shadow"} style={{padding: '10px',marginBottom:"20px"}}>
                                            <h4>Expired bookings</h4>
                                            {allBookings
                                                .filter(booking => {
                                                    const date = booking.date;
                                                    const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                    const hour = booking.hour;
                                                    const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;
                                                    const currentDate = new Date();
                                                    const bookingDate = new Date(formattedDate + ' ' + formattedHour);
                                                    return currentDate > bookingDate;
                                                })
                                                .sort((a, b) => {
                                                    const dateA = new Date(`${a.date[0]}-${a.date[1] < 10 ? '0' + a.date[1] : a.date[1]}-${a.date[2] < 10 ? '0' + a.date[2] : a.date[2]}`);
                                                    const dateB = new Date(`${b.date[0]}-${b.date[1] < 10 ? '0' + b.date[1] : b.date[1]}-${b.date[2] < 10 ? '0' + b.date[2] : b.date[2]}`);
                                                    return dateA - dateB;
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
                                                                       style={{marginLeft: "10px",
                                                                           color: "#a1a1a1"}}>Therapist
                                                                        Id: {booking.therapistId}</p>
                                                                    <p className="card-text"
                                                                       style={{
                                                                           marginLeft: "10px",
                                                                           color: "#a1a1a1"
                                                                       }}>Client
                                                                        Id: {booking.clientId}</p>
                                                                    <p className="card-text"
                                                                       style={{
                                                                           marginLeft: "10px",
                                                                           color: "#a1a1a1"
                                                                       }}>Date: {formattedDate}</p>
                                                                    <p className="card-text"
                                                                       style={{
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
                                            {!emptyExpiredBoolean && <i style={{color:"#d10606"}}>No expired bookings!</i>}
                                        </div>
                                    </div> :
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
                                        }}>This client has no bookings!</p>
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
        error: auth.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTherapistClientBookings);
import React, {useEffect, useState} from 'react';
import {
    fetchBookedHoursInEdit,
    fetchBookingByBookingId,
    fetchUserData,
    fetchWorkDays,
    updateBookingSession
} from '../../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../css/AdminDashboard.css';
import '../../../../css/EditTherapistClientBookingEdit.css';
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
let editTherapistClientBookingId =null
let editTherapistClientFullName =null
function EditTherapistClientBookingEdit({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [booking,setBooking]=useState({});
    const [hours, setHours] = useState([]);
    const [workDays,setWorkDays]=useState([]);
    const [values, setValues] = useState({
        clientId:0,
        bookingId:0,
        therapistId: 0,
        date: '',
        hour:''
    });

    useEffect(() => {
        editTherapistId = loadState("editTherapistId", 0);
        editTherapistClientId = loadState("editTherapistClientId", 0);
        editTherapistClientBookingId = loadState("editTherapistClientBookingId", 0);
        editTherapistClientFullName = loadState("editTherapistClientFullName", null);
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchBookingByBookingId({bookingId: editTherapistClientBookingId}).then((response) => {
                            setBooking(response.data);
                            setValues({
                                therapistId: response.data.therapistId,
                                clientId: response.data.clientId,
                                bookingId: editTherapistClientBookingId,
                                date: response.data.date,
                                hour: response.data.hour
                            })
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                        fetchWorkDays({therapistId: editTherapistId}).then((response)=>{
                            setWorkDays(response.data)
                        }).catch((e)=>{
                            localStorage.clear();
                            history('/loginBoot');
                        })
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

                        fetchBookingByBookingId({bookingId: editTherapistClientBookingId}).then((response) => {
                            setBooking(response.data);
                            setValues({
                                therapistId: response.data.therapistId,
                                clientId: response.data.clientId,
                                bookingId: editTherapistClientBookingId,
                                date: response.data.date,
                                hour: response.data.hour
                            })
                        }).catch((e) => {
                            history('/loginBoot');
                        });

                        fetchWorkDays({therapistId: editTherapistId}).then((response)=>{
                            setWorkDays(response.data)
                        }).catch((e)=>{
                            localStorage.clear();
                            history('/loginBoot');
                        })
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


    function handleUpdate(evt) {
        evt.preventDefault();

        updateBookingSession(values).then((response) => {
            history("/dashboard/adminDashboard/therapists/editTherapistClients/bookings")
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
        let dateArray = booking.date; // [2024, 6, 8]
        let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]+1);

        formattedDate = date.toISOString().slice(0,10); // "2024-06-08"
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
                                <Link to={"/dashboard/adminDashboard/therapists/editTherapistClients/bookings"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to {editTherapistClientFullName}'s Bookings
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>Edit Booking</h1>
                            </div>
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <div className="card shadow" style={{width:"500px"}}>
                                    <div className="card-body">
                                        <h4>Therapist works these days:</h4>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            marginTop:"50px",
                                            marginBottom:"50px"
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

                                        <form onSubmit={handleUpdate} style={{textAlign: "center"}}>
                                            <label htmlFor="sessionDate">Select Date:</label><br/>
                                            <input type="date" id="sessionDate" name="date" defaultValue={formattedDate}
                                                   onChange={handleChange}
                                                   min={new Date().toISOString().split('T')[0]}/><br/>
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
                                                      to="/dashboard/adminDashboard/therapists/editTherapistClients/bookings">
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
export default connect(mapStateToProps, mapDispatchToProps)(EditTherapistClientBookingEdit);
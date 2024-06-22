import React, {useEffect, useState} from 'react';
import {fetchBookingsHistory, fetchUserData} from '../../../../api/authService';
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
let editTherapistId =0
let editTherapistPastClientId =0
let editTherapistPastClientFullName =null
function EditTherapistPastClientBookings({loading,error,...props}){
    const history = useNavigate ();
    const [data,setData]=useState({});
    const [info, setInfo] = useState(false);
    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        editTherapistId = loadState("editTherapistId", 0);
        editTherapistPastClientId = loadState("editTherapistPastClientId", 0);
        editTherapistPastClientFullName = loadState("editTherapistPastClientFullName", 0);
        if(getRefreshToken()) {
            fetchUserData().then((response) => {
                if (response.data.roles.at(0)){
                    if (response.data.roles.at(0).role === 'ROLE_ADMIN') {
                        setData(response.data);
                        saveState("role",'ROLE_ADMIN')

                        fetchBookingsHistory({clientId: editTherapistPastClientId}).then((response) => {
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

                        fetchBookingsHistory({clientId: editTherapistPastClientId}).then((response) => {
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


    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarAdmin />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} />

                        <div className="container-fluid">
                            <div style={{marginLeft: "-10px", marginTop: "-15px"}}>
                                <Link to={"/dashboard/adminDashboard/therapists/editTherapistPastClients"}
                                      className="btn goBack"
                                      style={{color: "#0d6efd"}}
                                      type="button"
                                ><FontAwesomeIcon icon={faChevronLeft} style={{marginRight: "3.5px"}}/>Go to Therapist
                                    Past Clients
                                </Link>
                            </div>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-800"
                                    style={{color: "#5a5c69"}}>{editTherapistPastClientFullName} Bookings</h1>
                            </div>
                            <div className="card">
                                {!info ? <div className="card-body">
                                        <h4>Bookings History</h4>
                                        {allBookings
                                            .sort((a, b) => {
                                                const dateA = new Date(`${a.date[0]}-${a.date[1] < 10 ? '0' + a.date[1] : a.date[1]}-${a.date[2] < 10 ? '0' + a.date[2] : a.date[2]}`);
                                                const dateB = new Date(`${b.date[0]}-${b.date[1] < 10 ? '0' + b.date[1] : b.date[1]}-${b.date[2] < 10 ? '0' + b.date[2] : b.date[2]}`);
                                                return dateA - dateB;
                                            })
                                            .map((booking, index,array) => {
                                                const date = booking.date;
                                                const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;
                                                const hour = booking.hour;
                                                const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                                return (
                                                    <div key={index}>
                                                        <div
                                                             style={{marginTop: '10px', display: "flex", flexDirection: "row"}}>
                                                            <div className="card-body">
                                                                <h5 className="card-title"
                                                                    style={{color: "#0d6efd"}}>Booking</h5>
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
                                                                {booking.canceled &&  <p className="card-text" style={{
                                                                    marginLeft: "10px",
                                                                    color: "red"
                                                                }}>Canceled
                                                                </p>}
                                                            </div>
                                                        </div>
                                                        {index !== array.length - 1 && <hr/>}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> :
                                    <p>This client has no bookings!</p>
                                }
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
export default connect(mapStateToProps, mapDispatchToProps)(EditTherapistPastClientBookings);
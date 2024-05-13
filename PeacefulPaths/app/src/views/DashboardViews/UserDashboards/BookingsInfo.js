import React, {useEffect, useState} from 'react';
import {
    bookSession, cancelBooking,
    fetchBookedHours, fetchBookings,
    fetchUserData,
    fetchUserTherapistConnectionData, removeTherapist, selectWorkDays
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
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import {loadState, saveState} from "../../../helper/sessionStorage";
let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function BookingsInfo({loading,error,...props}){

    useEffect(() => {
        if(!isUserAuthenticatedBoolean){
            if (!props.isUserAuthenticated){
                props.loginFailure("Authentication Failed!!!");
                history('/loginBoot');
            }else{
                saveState("isUserAuthenticated",props.isUserAuthenticated)
            }
        }else{
            saveState("isUserAuthenticated",isUserAuthenticatedBoolean)
        }
    }, []);

    const history = useNavigate ();
    const [data,setData]=useState({});
    const [allBookings, setAllBookings] = useState([]);
    const [connectionFailure, setConnectionFailure] = useState('');
    const [info, setInfo] = useState(false);
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
                            University: response.data.University,
                            gender: response.data.gender
                        });
                        connected = loadState("connected",false)
                        if(response.data.id===0){
                            saveState("connected",false)
                        }else {
                            saveState("connected",true)
                        }

                        newBookingsData.therapistId = response.data.id

                        fetchBookings(newBookingsData).then((response) => {
                            if (response.data.length === 0){
                                setInfo(true);
                            }else {setAllBookings(response.data);}
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


    function handleEdit(id) {
        history(`/dashboard/userDashboard/editBooking/${id}`);
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

                <SideBarUser />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState}/>

                        <div className="container-fluid">
                            {connected && <div className="card">
                                {!info ? <div className="card-body">
                                    {allBookings.map((booking, index) => {
                                        const date = booking.date;
                                        const formattedDate = `${date[0]}-${date[1] < 10 ? '0' + date[1] : date[1]}-${date[2] < 10 ? '0' + date[2] : date[2]}`;

                                        // Convert the hour into a more readable format
                                        const hour = booking.hour;
                                        const formattedHour = `${hour[0] < 10 ? '0' + hour[0] : hour[0]}:${hour[1] < 10 ? '0' + hour[1] : hour[1]}`;

                                        return (
                                            <div key={index} className="card"
                                                 style={{marginTop: '10px', display: "flex", flexDirection: "row"}}>
                                                <div className="card-body">
                                                    <h5 className="card-title">Booking {index + 1}</h5>
                                                    <p className="card-text">Date: {formattedDate}</p>
                                                    <p className="card-text">Hour: {formattedHour}</p>
                                                </div>

                                                <div className="card-body" style={{marginLeft: '800px'}}>
                                                    <button className="btn btn-info btn-sm" onClick={() => handleEdit(booking.bookingId)}>Edit Session
                                                    </button>
                                                    <br/>
                                                    <br/>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleCanceling(booking.bookingId)}>Cancel Session
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div> : <p>You need to make booking first: <Link
                                    to="/dashboard/userDashboard/addBookings">Click here to book your first
                                    session.</Link></p>
                                }
                            </div>}
                        </div>

                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
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

        </main>
    )

}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isUserAuthenticated: auth.isUserAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setUserAuthenticationState: (boolean) => dispatch(setUserAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookingsInfo);
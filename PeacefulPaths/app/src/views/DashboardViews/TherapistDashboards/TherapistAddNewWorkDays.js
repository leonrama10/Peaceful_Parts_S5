import React, {useEffect, useState} from 'react';
import {fetchUserData, selectWorkDays, userRegister} from '../../../api/authService';
import {useNavigate} from 'react-router-dom';
import {
    authenticate,
    authFailure,
    authSuccess,
    setTherapistAuthenticationState
} from "../../../redux/authActions";
import '../../../css/sb-admin-2.min.css';
import {loadState, saveState} from "../../../helper/sessionStorage";
import {connect} from "react-redux";
import DashboardNav from "../DashboardNav";
import SideBarTherapist from "../SideBars/SideBarTherapist";
let role;
const isTherapistAuthenticatedBoolean = loadState("isTherapistAuthenticated",false)
function TherapistAddNewWorkDays({loading,error,...props}){

    const history = useNavigate ();
    const [userData,setUserData]=useState({});
    const [values, setValues] = useState({
        therapistId: 0,
        days: [],
        workhours: [],
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        if(isTherapistAuthenticatedBoolean){
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    values.therapistId = response.data.id
                    role = loadState("role",'');
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })
        }else if(props.isTherapistAuthenticated){
            saveState("isTherapistAuthenticated",props.isTherapistAuthenticated)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    values.therapistId = response.data.id
                    role = loadState("role",'');
                }
                else{
                    history('/loginBoot');
                }
            }).catch((e)=>{
                localStorage.clear();
                history('/loginBoot');
            })
        }else{
            props.loginFailure("Authentication Failed!!!");
            history('/loginBoot');
        }
    }, []);


    const dayToNumber = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    };

    useEffect(() => {
        if (values.startTime && values.endTime) {
            const startHour = parseInt(values.startTime.split(':')[0]);
            const endHour = parseInt(values.endTime.split(':')[0]);
            const workhours = [];

            for (let i = startHour; i <= endHour; i++) {
                const hour = i < 10 ? `0${i}:00` : `${i}:00`;
                workhours.push({ id: i, hour });
            }

            setValues(values => ({ ...values, 'workhours': workhours }));
        }
    }, [values.startTime, values.endTime]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'days') {
            const selectedDays = Array.from(e.target.selectedOptions, option => ({ id: dayToNumber[option.value], day: option.value }));
            setValues(values => ({ ...values, [name]: selectedDays }));
        } else {
            setValues(values => ({ ...values, [name]: value }));
        }
    };


    React.useEffect(() => {
        console.log("VALUESSSSSSSSS",values)
    }, [values])

    function handleSubmit(evt) {
        evt.preventDefault();

        selectWorkDays(values).then((response) => {
            history("/dashboard/therapistDashboard/currentWorkDays")
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

    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser} setTherapistAuthenticationState={props.setTherapistAuthenticationState}/>

                        <div className="container-fluid" style={{marginBottom: '100px'}}>

                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="therapistId" value={values.therapistId}/>
                                <label htmlFor="days">Select work days for the week:</label><br/>
                                <select multiple={true} id="days" name="days"
                                        value={values.days.map(dayObj => dayObj.day)} onChange={handleChange}>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select><br/><br/>
                                <label htmlFor="startTime">Start Time:</label><br/>
                                <input type="time" id="startTime" name="startTime" value={values.startTime}
                                       onChange={handleChange}/><br/><br/>
                                <label htmlFor="endTime">End Time:</label><br/>
                                <input type="time" id="endTime" name="endTime" value={values.endTime}
                                       onChange={handleChange}/><br/><br/>

                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                    Submit
                                </button>
                            </form>

                        </div>
                    </div>

                    <footer className="bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span style={{color: 'grey'}}>Copyright © PeacefulParts 2024</span>
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

            <script src="../../../js/sb-admin-2.min.js"></script>

            <script src="../../../vendor/chart.js/Chart.min.js"></script>

            <script src="../../../js/demo/chart-area-demo.js"></script>
            <script src="../../../js/demo/chart-pie-demo.js"></script>

        </main>
    )
}

const mapStateToProps = ({auth}) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error,
        isTherapistAuthenticated: auth.isTherapistAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message)),
        setTherapistAuthenticationState: (boolean) => dispatch(setTherapistAuthenticationState(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TherapistAddNewWorkDays);
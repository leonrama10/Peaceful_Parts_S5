import React, {useEffect, useState} from 'react';
import {fetchUserData, fetchWorkDays, fetchWorkHours, selectWorkDays} from '../../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
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
function TherapistCurrentWorkDays({loading,error,...props}){

    const history = useNavigate ();
    const [userData,setUserData]=useState({});
    const [workDays,setWorkDays]=useState([]);
    const [info,setInfo]=useState(false);
    const [workHours,setWorkHours]=useState({
        startTime:'',
        endTime:''
    });

    useEffect(() => {
        if(isTherapistAuthenticatedBoolean){
            saveState("isTherapistAuthenticated",isTherapistAuthenticatedBoolean)
            fetchUserData().then((response)=>{
                if (response.data.roles.at(0).role === 'ROLE_THERAPIST'){
                    setUserData(response.data);
                    role = loadState("role",'');

                    fetchWorkDays({therapistId: response.data.id}).then((response)=>{
                        setWorkDays(response.data)
                    }).catch((e)=>{
                        localStorage.clear();
                        history('/loginBoot');
                    })

                    fetchWorkHours({therapistId: response.data.id}).then((response)=>{
                        if (response.data.length === 0){
                            console.log("IIIIIIIII", response.data)
                            setInfo(true)
                        }else {
                            console.log("SSSSSSSSSSSSSSSS", response.data)
                            setWorkHours({
                                startTime: response.data[0].hour,
                                endTime: response.data[response.data.length - 1].hour
                            });
                        }
                    }).catch((e)=>{
                        localStorage.clear();
                        history('/loginBoot');
                    })
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
                    role = loadState("role",'');

                    fetchWorkDays({therapistId: response.data.id}).then((response)=>{
                        setWorkDays(response.data)
                    }).catch((e)=>{
                        localStorage.clear();
                        history('/loginBoot');
                    })

                    fetchWorkHours({therapistId: response.data.id}).then((response)=>{
                        if (response.data.length === 0){
                            console.log("GGGGGGGGGG", response.data)
                            setInfo(true)
                        }else {
                            console.log("TTTTTTTTTTTT", response.data)
                            setWorkHours({
                                startTime: response.data[0].hour,
                                endTime: response.data[response.data.length - 1].hour
                            });
                        }
                    }).catch((e)=>{
                        localStorage.clear();
                        history('/loginBoot');
                    })
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

    const formatTime = (timeArray) => {
        const hours = timeArray[0];
        const mins = timeArray[1];
        return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
    };

    return (
        <main id="page-top" style={{height: '100%'}}>

            <div id="wrapper">

                <SideBarTherapist/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={userData} setUser={props.setUser} setTherapistAuthenticationState={props.setTherapistAuthenticationState}/>

                        {!info ? <div className="container-fluid" style={{marginBottom: '100px'}}>
                            <h4>Work Days:</h4>
                            {workDays.map((workDay, index) => {
                                // Access the day property from the workDay object
                                const day = workDay.day;

                                // Return a paragraph element with the day
                                return (
                                    <p key={index}>{day}</p>
                                );
                            })}
                            <br/>
                            <h4>From:</h4>
                            <p>{formatTime(workHours.startTime)}</p>

                            <br/>
                            <h4>To:</h4>
                            <p>{formatTime(workHours.endTime)}</p>
                        </div>:<p>You need to set your work days and hours first: <Link to="/dashboard/therapistDashboard/addNewWorkDays">Click here to set them.</Link></p>
                        }

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
export default connect(mapStateToProps, mapDispatchToProps)(TherapistCurrentWorkDays);
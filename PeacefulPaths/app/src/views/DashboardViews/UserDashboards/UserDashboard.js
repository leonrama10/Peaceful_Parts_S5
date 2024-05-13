import React, {useEffect, useState} from 'react';
import {
    fetchUserData,
    fetchUserTherapistConnectionData, therapistFilterByGetStarted, therapistFilterByGetStartedNotConnectedData
} from '../../../api/authService';
import {useNavigate} from 'react-router-dom';
import '../../../css/sb-admin-2.css';
import DashboardNav from "../DashboardNav";
import {
    authenticate,
    authFailure,
    authSuccess,
    setUserAuthenticationState
} from "../../../redux/authActions";
import {connect} from "react-redux";
import SideBarUser from "../SideBars/SideBarUser";
import TherapistCards from "./TherapistCards";
import {loadState, saveState} from "../../../helper/sessionStorage";
let connected = null;
const isUserAuthenticatedBoolean = loadState("isUserAuthenticated",false)
function UserDashboard({loading,error,...props}){

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
    const [allUsers, setAllUsers] = useState([]);
    const [data,setData]=useState({});
    const [hideTherapists,setHideTherapists]=useState(false);
    const [therapistData, setTherapistData] = useState({
        id:0,
    });

    React.useEffect(() => {
        connected = loadState("connected",false)
        fetchUserData().then((response) => {
            if (response.data.roles.at(0).role === 'ROLE_USER') {
                setData(response.data);
                const newFilterUserData = {
                    userId:response.data.id
                };
                fetchUserTherapistConnectionData(response.data.id).then((response) => {
                    if (response.data.roles.at(0).role === 'ROLE_THERAPIST') {
                        setTherapistData({
                            id: response.data.id
                        });
                        saveState("therapistId",response.data.id)
                        if(response.data.id===0){
                            saveState("connected",false)
                        }else {
                            saveState("connected",true)
                        }

                        if(!hideTherapists){
                            const newFilterData = {
                                therapistId: response.data.id,
                                userId:newFilterUserData.userId
                            };
                            therapistFilterByGetStartedNotConnectedData(newFilterData).then((response)=>{
                                setAllUsers(response.data)
                            }).catch((e)=>{
                                history('/loginBoot');
                            })
                        }
                    } else {
                        localStorage.clear();
                        history('/loginBoot');
                    }
                }).catch((e) => {
                    therapistFilterByGetStarted(newFilterUserData).then((response)=>{
                        setAllUsers(response.data)
                    }).catch((e)=>{
                        history('/loginBoot');
                    })
                    connected = loadState("connected",false)
                    if (e.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        // props.loginFailure(e.response.data);
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

    return (
        <main id="page-top">

            <div id="wrapper">

                <SideBarUser setAllUsers={setAllUsers} setHideTherapists={setHideTherapists}/>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <DashboardNav data={data} setUser={props.setUser} setUserAuthenticationState={props.setUserAuthenticationState}/>

                        <div className="container-fluid">

                            {allUsers.map((card, index) => (
                                <TherapistCards key={index} title={card.name} id={card.id} />
                            ))}

                        </div>
                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>&copy; 2024 PeacefulPaths</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);